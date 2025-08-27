// src/components/BorrowingForm.jsx
import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../context/Web3Provider';
import DatePicker from 'react-datepicker';
import { CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const loanTypes = [
  { name: 'Personal', description: 'For individual needs' },
  { name: 'Home', description: 'For real estate purposes' },
  { name: 'Business', description: 'For business expansion' },
  { name: 'Auto', description: 'For vehicle purchases' }
];

const BorrowingForm = () => {
  const { contract, usdtContract, signer, address } = useContext(Web3Context);
  const [amount, setAmount] = useState(10);
  const [durationDate, setDurationDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [loanType, setLoanType] = useState(0);
  const [useETHCollateral, setUseETHCollateral] = useState(false);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const fetchLimit = async () => {
      if (contract && address) {
        try {
          const limit = await contract.borrowLimits(address);
          setBorrowLimit(Number(ethers.formatUnits(limit, 6)));
        } catch (error) {
          console.error('Error fetching borrow limit:', error);
          toast.error('Failed to fetch borrow limit');
        }
      }
    };
    fetchLimit();
  }, [contract, address]);

  const handleBorrow = async () => {
    if (!contract || amount > borrowLimit) {
      toast.error('Invalid amount or exceeds borrow limit');
      return;
    }
    
    setLoading(true);
    try {
      const parsedAmount = ethers.parseUnits(amount.toString(), 6);
      const duration = Math.floor((durationDate - new Date()) / 1000);
      let options = {};

      if (useETHCollateral) {
        const requiredCollateralUSD = amount * 1.5;
        const ethPrice = Number(await contract.getETHPrice()) / 1e8;
        const requiredETH = requiredCollateralUSD / ethPrice;
        options.value = ethers.parseEther(requiredETH.toFixed(18));
        toast.info('Waiting for ETH collateral approval...');
      } else {
        const requiredCollateral = parsedAmount * 150n / 100n;
        const allowance = await usdtContract.allowance(address, contract.address);
        if (allowance < requiredCollateral) {
          toast.info('Approving USDT collateral...');
          const txApprove = await usdtContract.approve(contract.address, requiredCollateral);
          await txApprove.wait();
        }
      }

      toast.info('Submitting borrow request...');
      const tx = await contract.borrowUSDT(parsedAmount, duration, useETHCollateral, options);
      await tx.wait();
      toast.success('Loan successfully created!');
    } catch (error) {
      console.error(error);
      toast.error('Transaction failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleBorrow();
  };

  return (
    <motion.div
      className="w-full"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Loan Type Selection */}
      <motion.div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4" variants={itemVariants}>
        {loanTypes.map((type, index) => (
          <motion.button
            key={type.name}
            type="button"
            onClick={() => setLoanType(index)}
            className={`p-4 rounded-xl border transition-all duration-300 ${
              loanType === index
                ? 'border-lime bg-lime/10 text-lime shadow-lg shadow-lime/20'
                : 'border-lime/20 bg-navy/50 text-gray-300 hover:border-lime/50'
            }`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-medium">{type.name}</p>
            <p className="text-sm text-gray-400 mt-1">{type.description}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Main Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20"
        variants={itemVariants}
      >
        <div className="space-y-6">
          {/* Amount Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Amount (USDT)
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 pl-10 bg-navy/50 border border-lime/20 rounded-lg text-white
                  focus:border-lime focus:ring-1 focus:ring-lime outline-none
                  transition-all duration-300"
                min="10"
                max={borrowLimit}
                required
                placeholder="Enter amount..."
              />
              <img 
                src="/USDTIcon.svg" 
                alt="USDT" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
              />
            </div>
            {amount > borrowLimit && (
              <p className="mt-2 text-red-400 text-sm flex items-center">
                <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                Amount exceeds borrow limit
              </p>
            )}
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Available</span>
                <span className="text-lime">{borrowLimit} USDT</span>
              </div>
              <div className="w-full bg-navy/30 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-lime to-lime/80 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((amount / borrowLimit) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Duration Picker */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Duration
            </label>
            <div className="relative">
              <DatePicker
                selected={durationDate}
                onChange={(date) => setDurationDate(date)}
                minDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                className="w-full p-3 bg-navy/50 border border-lime/20 rounded-lg text-white
                  focus:border-lime focus:ring-1 focus:ring-lime outline-none
                  transition-all duration-300"
              />
              <CurrencyDollarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-lime" />
            </div>
          </motion.div>

          {/* Collateral Type */}
          <motion.div variants={itemVariants} className="p-4 bg-navy/50 rounded-lg border border-lime/20">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <img src={useETHCollateral ? "/02 Ethereum.svg" : "/USDTIcon.svg"} alt="Token" className="w-6 h-6" />
                <div>
                  <p className="text-white font-medium">Use ETH as collateral</p>
                  <p className="text-sm text-gray-400">Toggle to use ETH instead of USDT</p>
                </div>
              </div>
              <div 
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  useETHCollateral ? 'bg-lime' : 'bg-navy/50'
                } relative border border-lime/20`}
                onClick={() => setUseETHCollateral(!useETHCollateral)}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
                    useETHCollateral ? 'right-1' : 'left-1'
                  }`} 
                />
              </div>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-lime to-lime/90 text-navy font-bold py-3 px-6 rounded-lg
              hover:shadow-lg hover:shadow-lime/20 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 mt-6 flex items-center justify-center gap-2"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                <span>Submit Loan Request</span>
                <ArrowRightIcon className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* Progress Steps */}
      <motion.div className="mt-8 grid grid-cols-3 gap-4" variants={itemVariants}>
        {['Loan Details', 'Review', 'Confirmation'].map((stepName, index) => (
          <div 
            key={stepName}
            className={`p-4 rounded-lg border ${
              index + 1 === step
                ? 'border-lime bg-lime/10 text-lime'
                : 'border-lime/20 bg-navy/50 text-gray-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                index + 1 === step ? 'bg-lime text-navy' : 'bg-navy/50'
              }`}>
                {index + 1}
              </span>
              <span>{stepName}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BorrowingForm;
