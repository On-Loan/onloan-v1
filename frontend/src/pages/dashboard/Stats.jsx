// src/pages/dashboard/Stats.jsx
import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../../context/Web3Provider';
import { motion } from 'framer-motion';
import { 
  FaChartBar, 
  FaExclamationTriangle, 
  FaChartLine,
  FaHistory,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

const Stats = () => {
  const { contract, usdtContract, address, signer } = useContext(Web3Context);
  const [loan, setLoan] = useState(null);
  const [dueAmount, setDueAmount] = useState(0);
  const [repayAmount, setRepayAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoan = async () => {
      if (contract && address) {
        const userLoan = await contract.userLoans(address);
        setLoan(userLoan);
        if (userLoan.isActive) {
          const due = await contract.calculateDueAmount(address);
          setDueAmount(ethers.formatUnits(due, 6));
        }
      }
    };
    fetchLoan();
  }, [contract, address]);

  const handleRepay = async () => {
    if (!repayAmount || !loan.isActive) return;
    setLoading(true);
    try {
      const parsedRepay = ethers.parseUnits(repayAmount, 6);
      const allowance = await usdtContract.allowance(address, contractAddress);
      if (allowance < parsedRepay) {
        const txApprove = await usdtContract.approve(contractAddress, parsedRepay);
        await txApprove.wait();
      }
      const tx = await contract.repay(parsedRepay);
      await tx.wait();
      toast.success('Repaid!');
      // Refresh
      const due = await contract.calculateDueAmount(address);
      setDueAmount(ethers.formatUnits(due, 6));
      setRepayAmount('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Overview Stats */}
      <motion.div className="relative mb-8" variants={itemVariants}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-lime bg-clip-text text-transparent mb-2">
              Stats & Tracking
            </h1>
            <p className="text-gray-400">Monitor your lending and borrowing activities</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-4 border border-lime/20">
              <p className="text-sm text-gray-400 mb-1">Total Value Locked</p>
              <p className="text-2xl font-bold text-white">$1,234,567</p>
            </div>
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-4 border border-lime/20">
              <p className="text-sm text-gray-400 mb-1">Your Credit Score</p>
              <p className="text-2xl font-bold text-lime">750</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent rounded-3xl filter blur-3xl opacity-30 -z-10"></div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Loan Status */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          {loan && loan.isActive ? (
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
                <FaExclamationTriangle className="mr-3 text-yellow-500" />
                <span>Active Loan Status</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="p-4 bg-navy/20 rounded-lg">
                    <p className="text-gray-400 text-sm">Borrowed Amount</p>
                    <p className="text-2xl font-bold text-white">{ethers.formatUnits(loan.amount, 6)} USDT</p>
                  </div>
                  <div className="p-4 bg-navy/20 rounded-lg">
                    <p className="text-gray-400 text-sm">Due Amount</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-lime">${dueAmount}</p>
                      <FaMoneyBillWave className="text-lime text-xl" />
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-4 bg-navy/20 rounded-lg">
                    <p className="text-gray-400 text-sm">Interest Rate</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-white">{loan.interestRate / 100}%</p>
                      <FaChartLine className="text-lime text-xl" />
                    </div>
                  </div>
                  <div className="p-4 bg-navy/20 rounded-lg">
                    <p className="text-gray-400 text-sm">Collateral</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-white">
                        {loan.isCollateralETH 
                          ? ethers.formatEther(loan.collateral) + ' ETH' 
                          : ethers.formatUnits(loan.collateral, 6) + ' USDT'
                        }
                      </p>
                      <img 
                        src={loan.isCollateralETH ? "/02 Ethereum.svg" : "/USDTIcon.svg"} 
                        alt="Token" 
                        className="w-6 h-6" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Repayment Section */}
              <div className="mt-8 p-6 bg-navy/20 rounded-xl border border-lime/10">
                <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                  <FaCheckCircle className="mr-2 text-lime" />
                  Repay Loan
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2 text-sm font-medium">
                      Repayment Amount (USDT)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={repayAmount}
                        onChange={(e) => setRepayAmount(e.target.value)}
                        className="w-full p-3 pl-10 bg-navy/50 border border-lime/20 rounded-lg text-white
                          focus:border-lime focus:ring-1 focus:ring-lime outline-none
                          transition-all duration-300"
                        placeholder="Enter amount..."
                      />
                      <img 
                        src="/USDTIcon.svg" 
                        alt="USDT" 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleRepay}
                    disabled={loading || !repayAmount}
                    className="w-full bg-gradient-to-r from-lime to-lime/90 text-navy font-bold py-3 px-6 rounded-lg
                      hover:shadow-lg hover:shadow-lime/20 disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FaMoneyBillWave className="text-xl" />
                        <span>Repay Loan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-8 border border-lime/20 text-center">
              <FaChartBar className="text-lime text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Active Loans</h2>
              <p className="text-gray-400">Start borrowing to see detailed stats and tracking information.</p>
            </div>
          )}
        </motion.div>

        {/* Right Sidebar Stats */}
        <div className="space-y-6">
          {/* Borrowing History */}
          <motion.div
            variants={itemVariants}
            className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20 group"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaHistory className="mr-3 text-lime group-hover:rotate-180 transition-transform duration-500" />
              <span>Borrowing History</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-navy/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Total Borrowed</p>
                  <div className="flex items-center text-lime">
                    <span className="text-xs mr-1">+15.2%</span>
                    <FaChartLine className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mt-1">$15,750</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Active Loans</p>
                <p className="text-2xl font-bold text-white mt-1">1</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Repayment Rate</p>
                <p className="text-2xl font-bold text-lime mt-1">98.5%</p>
              </div>
            </div>
          </motion.div>

          {/* Time Analytics */}
          <motion.div
            variants={itemVariants}
            className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20 group"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaClock className="mr-3 text-lime group-hover:rotate-12 transition-transform duration-300" />
              <span>Time Analytics</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Average Loan Duration</p>
                <p className="text-2xl font-bold text-white mt-1">45 days</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Time Until Next Due</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">15 days</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stats;