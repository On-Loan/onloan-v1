// src/pages/dashboard/Stats.jsx (Enhanced: Added repay button if active loan, due amount calculation)
import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../../context/Web3Provider';
import { FaChartBar, FaExclamationTriangle } from 'react-icons/fa';  // Icons for stats and warnings

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

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaChartBar className="mr-2 text-lime" /> Stats & Tracking
      </h1>
      {loan && loan.isActive ? (
        <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaExclamationTriangle className="mr-2 text-yellow-500" /> Active Loan
          </h2>
          <p>Amount: {ethers.formatUnits(loan.amount, 6)} USDT</p>
          <p>Due Amount: ${dueAmount}</p>
          <p>Interest Rate: {loan.interestRate / 100}%</p>
          <p>Collateral: {loan.isCollateralETH ? ethers.formatEther(loan.collateral) + ' ETH' : ethers.formatUnits(loan.collateral, 6) + ' USDT'}</p>
          <div className="mt-4">
            <label className="block mb-2">Repay Amount (USDT)</label>
            <input
              type="number"
              value={repayAmount}
              onChange={(e) => setRepayAmount(e.target.value)}
              className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime"
            />
            <button onClick={handleRepay} disabled={loading} className="bg-lime text-navy px-4 py-2 rounded">
              {loading ? 'Repaying...' : 'Repay'}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No active loan. Start borrowing to see stats.</p>
      )}
      {/* Add more: e.g., chart for borrow history using react-chartjs-2 if installed, but placeholder */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Borrowing Trends</h2>
        <p>(Chart placeholder: Implement with Chart.js for visual trends)</p>
      </div>
    </div>
  );
};

export default Stats;