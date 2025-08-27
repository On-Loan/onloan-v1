// src/pages/dashboard/Borrow.jsx
import { useState } from 'react';
import BorrowingForm from '../../components/BorrowingForm';
import { FaCalculator, FaInfoCircle, FaChartLine } from 'react-icons/fa';

const Borrow = () => {
  const [calcAmount, setCalcAmount] = useState(0);
  const requiredCollateral = calcAmount * 1.5;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
          Borrow USDT
        </h1>
        <p className="text-gray-400 mt-2">Secure a loan with competitive interest rates</p>
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
            hover:border-lime/50 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaCalculator className="mr-3 text-lime" /> 
              <span>Collateral Calculator</span>
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Loan Amount (USDT)
                </label>
                <input
                  type="number"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full p-3 bg-navy/50 border border-lime/20 rounded-lg text-white
                    focus:border-lime focus:ring-1 focus:ring-lime outline-none
                    transition-all duration-300"
                  placeholder="Enter amount..."
                />
              </div>
              <div className="p-4 bg-navy/50 rounded-lg border border-lime/20">
                <div className="flex justify-between items-center text-gray-300 mb-2">
                  <span>Required Collateral:</span>
                  <span className="text-lime font-semibold">${requiredCollateral}</span>
                </div>
                <div className="text-gray-400 text-sm">
                  150% collateralization ratio required
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
              <FaInfoCircle className="mr-3 text-lime" />
              <span>Borrowing Info</span>
            </h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-lime rounded-full mt-2 mr-2"></div>
                <span>Minimum loan duration: 7 days</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-lime rounded-full mt-2 mr-2"></div>
                <span>Interest rates from 5% APR</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-lime rounded-full mt-2 mr-2"></div>
                <span>No prepayment penalties</span>
              </li>
            </ul>
          </div>

          {/* Market Stats Card */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
              <FaChartLine className="mr-3 text-lime" />
              <span>Market Stats</span>
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-gray-300">
                <span>Total Borrowed:</span>
                <span className="text-white">$1,234,567</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Active Loans:</span>
                <span className="text-white">142</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Avg. Interest Rate:</span>
                <span className="text-white">6.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrow;