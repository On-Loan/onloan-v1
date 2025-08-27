// src/pages/dashboard/Lend.jsx
import { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../../context/Web3Provider';
import LendingForm from '../../components/LendingForm';
import { motion } from 'framer-motion';
import { 
  FaChartLine, 
  FaMoneyBillWave, 
  FaPercent, 
  FaHandHoldingUsd,
  FaHistory
} from 'react-icons/fa';

const Lend = () => {
  const { contract, address } = useContext(Web3Context);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [lenderBalance, setLenderBalance] = useState(0);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (contract && address) {
        setLenderBalance(ethers.formatUnits(await contract.lenderBalances(address), 6));
      }
    };
    fetchBalance();
  }, [contract, address]);

  const handleWithdraw = async () => {
    if (!withdrawAmount || Number(withdrawAmount) > lenderBalance) return;
    setLoadingWithdraw(true);
    try {
      const parsedWithdraw = ethers.parseUnits(withdrawAmount, 6);
      const tx = await contract.withdrawFromPool(parsedWithdraw);
      await tx.wait();
      toast.success('Withdrawn!');
      setWithdrawAmount('');
      setLenderBalance(ethers.formatUnits(await contract.lenderBalances(address), 6));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingWithdraw(false);
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
      {/* Header with Stats */}
      <motion.div className="relative mb-8" variants={itemVariants}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-lime bg-clip-text text-transparent mb-2">
              Lend to Pool
            </h1>
            <p className="text-gray-400">Earn passive income by providing liquidity</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-4 border border-lime/20">
              <p className="text-sm text-gray-400 mb-1">Your Balance</p>
              <p className="text-2xl font-bold text-white">${Number(lenderBalance).toFixed(2)}</p>
            </div>
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-4 border border-lime/20">
              <p className="text-sm text-gray-400 mb-1">Current APY</p>
              <p className="text-2xl font-bold text-lime">12.5%</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent rounded-3xl filter blur-3xl opacity-30 -z-10"></div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lending Form Column */}
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
            <LendingForm />
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Withdrawal Card */}
          <motion.div
            variants={itemVariants}
            className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20 group"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaMoneyBillWave className="mr-3 text-lime group-hover:scale-110 transition-transform duration-300" />
              <span>Withdraw from Pool</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Withdraw Amount (USDT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
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
              
              <div className="p-4 bg-navy/50 rounded-lg border border-lime/20">
                <div className="flex justify-between items-center text-gray-300 mb-2">
                  <span>Available Balance:</span>
                  <span className="text-lime font-bold">${Number(lenderBalance).toFixed(2)}</span>
                </div>
                <div className="mt-3 w-full bg-navy/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-lime to-lime/80 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((Number(withdrawAmount) / Number(lenderBalance)) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <button 
                onClick={handleWithdraw} 
                disabled={loadingWithdraw || !withdrawAmount || Number(withdrawAmount) > Number(lenderBalance)}
                className="w-full bg-gradient-to-r from-lime to-lime/90 text-navy font-bold py-3 px-6 rounded-lg
                  hover:shadow-lg hover:shadow-lime/20 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loadingWithdraw ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-navy" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Withdrawing...</span>
                  </>
                ) : (
                  <>
                    <FaHandHoldingUsd className="text-xl" />
                    <span>Withdraw Funds</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            variants={itemVariants}
            className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20 group"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaChartLine className="mr-3 text-lime group-hover:scale-110 transition-transform duration-300" />
              <span>Lending Stats</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-navy/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Total Supplied</p>
                  <div className="flex items-center text-lime">
                    <span className="text-xs mr-1">+8.3%</span>
                    <FaChartLine className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mt-1">$892,451</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Interest Earned</p>
                <p className="text-2xl font-bold text-lime mt-1">$1,245</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Active Loans Funded</p>
                <p className="text-2xl font-bold text-white mt-1">23</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Lend;