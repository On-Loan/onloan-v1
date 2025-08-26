// src/pages/dashboard/Overview.jsx (Enhanced with more features: Added progress ring for credit score, using SVG for uniqueness)
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/Web3Provider';
import { FaChartPie, FaDollarSign, FaStar } from 'react-icons/fa';  // Added icons for better UX

const Overview = () => {
  const { contract, address } = useContext(Web3Context);
  const [poolLiquidity, setPoolLiquidity] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [lenderBalance, setLenderBalance] = useState(0);
  const [accruedInterest, setAccruedInterest] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (contract && address) {
        setPoolLiquidity(ethers.formatUnits(await contract.totalPoolLiquidity(), 6));
        setCreditScore(Number(await contract.creditScores(address)));
        setBorrowLimit(ethers.formatUnits(await contract.borrowLimits(address), 6));
        setLenderBalance(ethers.formatUnits(await contract.lenderBalances(address), 6));
        setAccruedInterest(ethers.formatUnits(await contract.getAccruedInterest(address), 6));
      }
    };
    fetchData();
  }, [contract, address]);

  // Progress ring for credit score (0-1000)
  const scorePercentage = (creditScore / 1000) * 100;
  const circumference = 2 * Math.PI * 45;  // r=45
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  return (
    <div className="font-sans">  {/* Clean font */}
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow flex items-center space-x-4">
          <FaChartPie className="text-lime text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Pool Liquidity</h2>
            <p className="text-2xl">${poolLiquidity}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Credit Score</h2>
          <svg className="w-32 h-32">
            <circle cx="64" cy="64" r="45" stroke="gray" strokeWidth="10" fill="none" />
            <circle cx="64" cy="64" r="45" stroke="lime" strokeWidth="10" fill="none"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 64 64)" />
            <text x="64" y="64" textAnchor="middle" dy=".3em" className="text-2xl">{creditScore}</text>
          </svg>
        </div>
        <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow flex items-center space-x-4">
          <FaDollarSign className="text-lime text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Borrow Limit</h2>
            <p className="text-2xl">${borrowLimit}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow flex items-center space-x-4">
          <FaStar className="text-lime text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Your Lent Balance</h2>
            <p className="text-2xl">${lenderBalance}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow flex items-center space-x-4">
          <FaDollarSign className="text-lime text-4xl" />
          <div>
            <h2 className="text-xl font-semibold">Accrued Interest</h2>
            <p className="text-2xl">${accruedInterest}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;