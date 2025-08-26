const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("OnLoan Contract", function () {
  let OnLoan, onLoan, USDT, usdt, PriceFeed, priceFeed;
  let owner, lender, borrower, other;
  const USDT_DECIMALS = 6;
  const INITIAL_LIMIT = ethers.parseUnits("10", USDT_DECIMALS); // $10 USDT
  const MIN_SCORE = 100;
  const COLLATERAL_RATIO = 150;

  beforeEach(async function () {
    [owner, lender, borrower, other] = await ethers.getSigners();

    // Deploy mock USDT contract
    USDT = await ethers.getContractFactory("MockERC20");
    usdt = await USDT.deploy("Tether USD", "USDT", USDT_DECIMALS);
    await usdt.waitForDeployment();

    // Deploy mock Chainlink price feed (ETH/USD, 8 decimals)
    PriceFeed = await ethers.getContractFactory("MockV3Aggregator");
    priceFeed = await PriceFeed.deploy(8, ethers.parseUnits("2000", 8)); // $2000/ETH
    await priceFeed.waitForDeployment();

    // Deploy OnLoan contract
    OnLoan = await ethers.getContractFactory("OnLoan");
    onLoan = await OnLoan.deploy(await usdt.getAddress(), await priceFeed.getAddress());
    await onLoan.waitForDeployment();

    // Mint USDT to lender and borrower
    await usdt.mint(lender.address, ethers.parseUnits("1000", USDT_DECIMALS));
    await usdt.mint(borrower.address, ethers.parseUnits("1000", USDT_DECIMALS));

    // Approve USDT spending
    await usdt.connect(lender).approve(onLoan.getAddress(), ethers.parseUnits("1000", USDT_DECIMALS));
    await usdt.connect(borrower).approve(onLoan.getAddress(), ethers.parseUnits("1000", USDT_DECIMALS));

    // Set initial credit score and borrow limit for borrower
    await onLoan.connect(owner).updateCreditScore(borrower.address, true);
    await onLoan.connect(owner).updateBorrowLimit(borrower.address);
  });

  describe("Deployment", function () {
    it("should set the correct USDT and price feed addresses", async function () {
      expect(await onLoan.usdt()).to.equal(await usdt.getAddress());
      expect(await onLoan.priceFeed()).to.equal(await priceFeed.getAddress());
    });
  });

  describe("Deposit to Pool", function () {
    it("should allow lender to deposit USDT to pool", async function () {
      const amount = ethers.parseUnits("100", USDT_DECIMALS);
      await expect(onLoan.connect(lender).depositToPool(amount))
        .to.emit(onLoan, "DepositToPool")
        .withArgs(lender.address, amount);
      expect(await onLoan.lenderBalances(lender.address)).to.equal(amount);
      expect(await onLoan.totalPoolLiquidity()).to.equal(amount);
      expect(await usdt.balanceOf(onLoan.getAddress())).to.equal(amount);
    });

    it("should revert on zero deposit", async function () {
      await expect(onLoan.connect(lender).depositToPool(0)).to.be.revertedWithCustomError(onLoan, "InvalidAmount");
    });
  });

  describe("Withdraw from Pool", function () {
    it("should allow lender to withdraw USDT from pool", async function () {
      const amount = ethers.parseUnits("100", USDT_DECIMALS);
      await onLoan.connect(lender).depositToPool(amount);
      await expect(onLoan.connect(lender).withdrawFromPool(amount))
        .to.emit(onLoan, "WithdrawalFromPool")
        .withArgs(lender.address, amount);
      expect(await onLoan.lenderBalances(lender.address)).to.equal(0);
      expect(await onLoan.totalPoolLiquidity()).to.equal(0);
      expect(await usdt.balanceOf(lender.address)).to.equal(ethers.parseUnits("1000", USDT_DECIMALS));
    });

    it("should revert on withdrawing more than balance", async function () {
      await expect(onLoan.connect(lender).withdrawFromPool(ethers.parseUnits("100", USDT_DECIMALS)))
        .to.be.revertedWithCustomError(onLoan, "InvalidAmount");
    });
  });

  describe("Borrow from Pool", function () {
    beforeEach(async function () {
      await onLoan.connect(lender).depositToPool(ethers.parseUnits("500", USDT_DECIMALS));
    });

    it("should allow borrowing with ETH collateral", async function () {
      const amount = ethers.parseUnits("100", USDT_DECIMALS);
      const collateral = ethers.parseEther("0.075"); // $150 at $2000/ETH
      await expect(
        onLoan.connect(borrower).borrowFromPool(amount, 30 * 24 * 60 * 60, 0, true, { value: collateral })
      )
        .to.emit(onLoan, "LoanCreated")
        .withArgs(borrower.address, amount, 30 * 24 * 60 * 60, 0);
      const loan = await onLoan.userLoans(borrower.address);
      expect(loan.amount).to.equal(amount);
      expect(loan.collateral).to.equal(collateral);
      expect(loan.isCollateralETH).to.be.true;
      expect(loan.isActive).to.be.true;
      expect(await onLoan.totalPoolLiquidity()).to.equal(ethers.parseUnits("400", USDT_DECIMALS));
    });

    it("should allow borrowing with USDT collateral", async function () {
      const amount = ethers.parseUnits("100", USDT_DECIMALS);
      const collateral = ethers.parseUnits("150", USDT_DECIMALS); // 150% ratio
      await expect(onLoan.connect(borrower).borrowFromPool(amount, 30 * 24 * 60 * 60, 0, false))
        .to.emit(onLoan, "LoanCreated")
        .withArgs(borrower.address, amount, 30 * 24 * 60 * 60, 0);
      const loan = await onLoan.userLoans(borrower.address);
      expect(loan.collateral).to.equal(collateral);
      expect(loan.isCollateralETH).to.be.false;
    });

    it("should revert if credit score is too low", async function () {
      await onLoan.connect(owner).updateCreditScore(borrower.address, false); // Set score to 0
      await expect(
        onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
          value: ethers.parseEther("0.075"),
        })
      ).to.be.revertedWithCustomError(onLoan, "InsufficientScore");
    });

    it("should revert if loan already active", async function () {
      await onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
        value: ethers.parseEther("0.075"),
      });
      await expect(
        onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
          value: ethers.parseEther("0.075"),
        })
      ).to.be.revertedWithCustomError(onLoan, "LoanAlreadyActive");
    });

    it("should revert if insufficient pool liquidity", async function () {
      await expect(
        onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("600", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
          value: ethers.parseEther("0.225"),
        })
      ).to.be.revertedWithCustomError(onLoan, "InsufficientPoolLiquidity");
    });

    it("should revert if insufficient collateral (ETH)", async function () {
      await expect(
        onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
          value: ethers.parseEther("0.01"), // Too low
        })
      ).to.be.revertedWithCustomError(onLoan, "InsufficientCollateral");
    });
  });

  describe("Repay Loan", function () {
    beforeEach(async function () {
      await onLoan.connect(lender).depositToPool(ethers.parseUnits("500", USDT_DECIMALS));
      await onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
        value: ethers.parseEther("0.075"),
      });
    });

    it("should allow partial repayment", async function () {
      const repayAmount = ethers.parseUnits("50", USDT_DECIMALS);
      await expect(onLoan.connect(borrower).repay(repayAmount))
        .to.emit(onLoan, "RepaymentMade")
        .withArgs(borrower.address, repayAmount);
      const loan = await onLoan.userLoans(borrower.address);
      expect(loan.repaidAmount).to.equal(repayAmount);
      expect(loan.isActive).to.be.true;
    });

    it("should allow full repayment and return collateral", async function () {
      const repayAmount = ethers.parseUnits("108", USDT_DECIMALS); // Approx amount + interest
      const initialBalance = await ethers.provider.getBalance(borrower.address);
      await onLoan.connect(borrower).repay(repayAmount);
      const loan = await onLoan.userLoans(borrower.address);
      expect(loan.isActive).to.be.false;
      expect(await ethers.provider.getBalance(borrower.address)).to.be.closeTo(
        initialBalance.add(ethers.parseEther("0.075")),
        ethers.parseEther("0.01") // Account for gas
      );
    });

    it("should revert on zero repayment", async function () {
      await expect(onLoan.connect(borrower).repay(0)).to.be.revertedWithCustomError(onLoan, "InvalidAmount");
    });

    it("should revert if no active loan", async function () {
      await expect(onLoan.connect(other).repay(ethers.parseUnits("100", USDT_DECIMALS))).to.be.revertedWithCustomError(
        onLoan,
        "LoanNotDue"
      );
    });
  });

  describe("Liquidation", function () {
    beforeEach(async function () {
      await onLoan.connect(lender).depositToPool(ethers.parseUnits("500", USDT_DECIMALS));
      await onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
        value: ethers.parseEther("0.075"),
      });
    });

    it("should liquidate when collateral value drops", async function () {
      // Update price feed to lower ETH price (e.g., $1000/ETH)
      await priceFeed.updateAnswer(ethers.parseUnits("1000", 8));
      await expect(onLoan.connect(owner).liquidate(borrower.address))
        .to.emit(onLoan, "Liquidated")
        .withArgs(borrower.address, ethers.parseEther("0.075"));
      const loan = await onLoan.userLoans(borrower.address);
      expect(loan.isActive).to.be.false;
      expect(await onLoan.creditScores(borrower.address)).to.be.lessThan(MIN_SCORE);
    });

    it("should not liquidate if collateral is sufficient", async function () {
      await onLoan.connect(owner).liquidate(borrower.address);
      const loan = await onLoan.userLoans(borrower.address);
      expect(loan.isActive).to.be.true; // Not liquidated
    });
  });

  describe("Credit Score and Borrow Limit", function () {
    it("should increase credit score and borrow limit on successful repayment", async function () {
      await onLoan.connect(lender).depositToPool(ethers.parseUnits("500", USDT_DECIMALS));
      await onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
        value: ethers.parseEther("0.075"),
      });
      const initialScore = await onLoan.creditScores(borrower.address);
      const initialLimit = await onLoan.borrowLimits(borrower.address);
      await onLoan.connect(borrower).repay(ethers.parseUnits("108", USDT_DECIMALS));
      expect(await onLoan.creditScores(borrower.address)).to.be.greaterThan(initialScore);
      expect(await onLoan.borrowLimits(borrower.address)).to.be.greaterThan(initialLimit);
    });

    it("should decrease credit score on liquidation", async function () {
      await onLoan.connect(lender).depositToPool(ethers.parseUnits("500", USDT_DECIMALS));
      await onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
        value: ethers.parseEther("0.075"),
      });
      const initialScore = await onLoan.creditScores(borrower.address);
      await priceFeed.updateAnswer(ethers.parseUnits("1000", 8));
      await onLoan.connect(owner).liquidate(borrower.address);
      expect(await onLoan.creditScores(borrower.address)).to.be.lessThan(initialScore);
    });
  });

  describe("Pause/Unpause", function () {
    it("should allow owner to pause and block actions", async function () {
      await onLoan.connect(owner).pause();
      await expect(
        onLoan.connect(lender).depositToPool(ethers.parseUnits("100", USDT_DECIMALS))
      ).to.be.revertedWith("Pausable: paused");
    });

    it("should allow owner to unpause and allow actions", async function () {
      await onLoan.connect(owner).pause();
      await onLoan.connect(owner).unpause();
      await expect(onLoan.connect(lender).depositToPool(ethers.parseUnits("100", USDT_DECIMALS))).to.not.be.reverted;
    });

    it("should revert if non-owner tries to pause", async function () {
      await expect(onLoan.connect(lender).pause()).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Interest Calculation", function () {
    it("should calculate due amount with interest", async function () {
      await onLoan.connect(lender).depositToPool(ethers.parseUnits("500", USDT_DECIMALS));
      await onLoan.connect(borrower).borrowFromPool(ethers.parseUnits("100", USDT_DECIMALS), 30 * 24 * 60 * 60, 0, true, {
        value: ethers.parseEther("0.075"),
      });
      await time.increase(365 * 24 * 60 * 60); // 1 year
      const dueAmount = await onLoan.calculateDueAmount(borrower.address);
      const expectedInterest = ethers.parseUnits("100", USDT_DECIMALS).mul(800).div(10000); // 8% for Personal loan
      expect(dueAmount).to.be.closeTo(
        ethers.parseUnits("108", USDT_DECIMALS),
        ethers.parseUnits("0.1", USDT_DECIMALS)
      );
    });

    it("should return 0 for inactive loan", async function () {
      expect(await onLoan.calculateDueAmount(other.address)).to.equal(0);
    });
  });
});

// Mock ERC20 for testing
const { abi: ERC20_ABI, bytecode: ERC20_BYTECODE } = require("./MockERC20.json");
ethers.getContractFactory("MockERC20").then((factory) =>
  factory.attach(ethers.constants.AddressZero).interface.parse(ERC20_ABI)
);

// Mock Chainlink Aggregator
const { abi: AGGREGATOR_ABI, bytecode: AGGREGATOR_BYTECODE } = require("./MockV3Aggregator.json");
ethers.getContractFactory("MockV3Aggregator").then((factory) =>
  factory.attach(ethers.constants.AddressZero).interface.parse(AGGREGATOR_ABI)
);