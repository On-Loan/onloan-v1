// src/pages/dashboard/Borrow.jsx
import { useState } from 'react';
import BorrowingForm from '../../components/BorrowingForm';
import { FaCalculator, FaInfoCircle, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Borrow = () => {
  const [calcAmount, setCalcAmount] = useState(0);
  const requiredCollateral = calcAmount * 1.5;

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-lime bg-clip-text text-transparent mb-2">
              Borrow USDT
            </h1>
            <p className="text-gray-400">Secure a loan with competitive interest rates</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-4 border border-lime/20">
              <p className="text-sm text-gray-400 mb-1">Available to Borrow</p>
              <p className="text-2xl font-bold text-white">$50,000</p>
            </div>
            <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-4 border border-lime/20">
              <p className="text-sm text-gray-400 mb-1">Current Rate</p>
              <p className="text-2xl font-bold text-lime">5% APR</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent rounded-3xl filter blur-3xl opacity-30 -z-10"></div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Borrowing Form Column */}
        <div className="lg:col-span-2">
          <BorrowingForm />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Collateral Calculator Card */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20
            hover:border-lime/50 transition-all duration-300 group">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaCalculator className="mr-3 text-lime transform group-hover:rotate-180 transition-transform duration-500" /> 
              <span>Collateral Calculator</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Loan Amount (USDT)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
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
              <div className="mt-4 p-4 bg-navy/50 rounded-lg border border-lime/20">
                <div className="flex justify-between items-center text-gray-300 mb-3">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-lime rounded-full mr-2"></span>
                    Required Collateral:
                  </span>
                  <span className="text-lime font-bold text-lg">${requiredCollateral}</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <FaInfoCircle className="mr-2 text-lime" />
                  150% collateralization ratio required
                </div>
                <div className="mt-3 w-full bg-navy/30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-lime to-lime/80 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((calcAmount / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20 group">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaInfoCircle className="mr-3 text-lime group-hover:rotate-12 transition-transform duration-300" />
              <span>Borrowing Info</span>
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center space-x-3 p-3 bg-navy/20 rounded-lg hover:bg-navy/30 transition-colors duration-200">
                <div className="flex-shrink-0 w-10 h-10 bg-lime/10 rounded-full flex items-center justify-center">
                  <span className="text-lime font-bold">7d</span>
                </div>
                <div>
                  <p className="font-medium">Minimum Loan Duration</p>
                  <p className="text-sm text-gray-400">7 days minimum term</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 p-3 bg-navy/20 rounded-lg hover:bg-navy/30 transition-colors duration-200">
                <div className="flex-shrink-0 w-10 h-10 bg-lime/10 rounded-full flex items-center justify-center">
                  <span className="text-lime font-bold">5%</span>
                </div>
                <div>
                  <p className="font-medium">Competitive Rates</p>
                  <p className="text-sm text-gray-400">Starting from 5% APR</p>
                </div>
              </li>
              <li className="flex items-center space-x-3 p-3 bg-navy/20 rounded-lg hover:bg-navy/30 transition-colors duration-200">
                <div className="flex-shrink-0 w-10 h-10 bg-lime/10 rounded-full flex items-center justify-center">
                  <span className="text-lime font-bold">$0</span>
                </div>
                <div>
                  <p className="font-medium">No Hidden Fees</p>
                  <p className="text-sm text-gray-400">No prepayment penalties</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Market Stats Card */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20 group">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaChartLine className="mr-3 text-lime group-hover:scale-110 transition-transform duration-300" />
              <span>Market Stats</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-4 bg-navy/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">Total Borrowed</p>
                  <div className="flex items-center text-lime">
                    <span className="text-xs mr-1">+12.5%</span>
                    <FaChartLine className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mt-1">$1,234,567</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Active Loans</p>
                <p className="text-2xl font-bold text-white mt-1">142</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400">Average Interest Rate</p>
                <p className="text-2xl font-bold text-white mt-1">6.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrow;