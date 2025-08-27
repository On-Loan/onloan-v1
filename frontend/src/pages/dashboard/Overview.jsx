// src/pages/dashboard/Overview.jsx
import { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../../context/Web3Provider';
import { 
  FaChartPie, 
  FaDollarSign, 
  FaStar, 
  FaWallet, 
  FaChartLine, 
  FaHandHoldingUsd 
} from 'react-icons/fa';
import { ethers } from 'ethers';

const StatCard = ({ title, value, icon: Icon, trend, prefix = '', suffix = '', decimals = 3 }) => (
  <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20
    hover:border-lime/50 transition-all duration-300 transform hover:-translate-y-1
    hover:shadow-lg hover:shadow-lime/10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
      <Icon className="text-lime text-xl" />
    </div>
    <div className="space-y-2">
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-white">
          {prefix}{typeof value === 'string' ? value : value.toFixed(decimals)}{suffix}
        </span>
      </div>
      {trend && (
        <div className="flex items-center text-sm">
          <span className={trend > 0 ? 'text-green-400' : 'text-red-400'}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-gray-400 ml-1">vs last week</span>
        </div>
      )}
    </div>
  </div>
);

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
        try {
          const [liquidity, score, limit, balance, interest] = await Promise.all([
            contract.totalPoolLiquidity(),
            contract.creditScores(address),
            contract.borrowLimits(address),
            contract.lenderBalances(address),
            contract.getAccruedInterest(address)
          ]);

          setPoolLiquidity(ethers.formatUnits(liquidity, 6));
          setCreditScore(Number(score));
          setBorrowLimit(ethers.formatUnits(limit, 6));
          setLenderBalance(ethers.formatUnits(balance, 6));
          setAccruedInterest(ethers.formatUnits(interest, 6));
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      }
    };
    fetchData();
  }, [contract, address]);

  // Progress ring for credit score (0-1000)
  const scorePercentage = (creditScore / 1000) * 100;
  const circumference = 2 * Math.PI * 45;  // r=45
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">Monitor your lending and borrowing activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Credit Score Card */}
        <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20
          hover:border-lime/50 transition-all duration-300 transform hover:-translate-y-1
          hover:shadow-lg hover:shadow-lime/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-200">Credit Score</h2>
            <FaStar className="text-lime text-xl" />
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-lime transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-white">{creditScore}</span>
                <span className="text-sm text-gray-400">out of 1000</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-400">Your credit rating is</p>
            <p className="text-lg font-semibold text-lime">
              {creditScore >= 800 ? 'Excellent' :
               creditScore >= 600 ? 'Good' :
               creditScore >= 400 ? 'Fair' : 'Poor'}
            </p>
          </div>
        </div>

        {/* Pool Liquidity Card */}
        <StatCard
          title="Pool Liquidity"
          value={parseFloat(poolLiquidity)}
          icon={FaChartPie}
          prefix="$"
          trend={5.2}
        />

        {/* Borrow Limit Card */}
        <StatCard
          title="Borrow Limit"
          value={parseFloat(borrowLimit)}
          icon={FaHandHoldingUsd}
          prefix="$"
          trend={2.8}
        />

        {/* Lender Balance Card */}
        <StatCard
          title="Your Balance"
          value={parseFloat(lenderBalance)}
          icon={FaWallet}
          prefix="$"
          decimals={3}
        />

        {/* Accrued Interest Card */}
        <StatCard
          title="Accrued Interest"
          value={parseFloat(accruedInterest)}
          icon={FaChartLine}
          prefix="$"
          trend={3.5}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {/* Placeholder for recent activities */}
          <p className="text-gray-400">No recent activities to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;