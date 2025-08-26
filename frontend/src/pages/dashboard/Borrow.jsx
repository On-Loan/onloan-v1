// src/pages/dashboard/Borrow.jsx (Enhanced: Added collateral calculator)
import { useState } from 'react';
import BorrowingForm from '../../components/BorrowingForm';
import { FaCalculator } from 'react-icons/fa';

const Borrow = () => {
  const [calcAmount, setCalcAmount] = useState(0);
  const requiredCollateral = calcAmount * 1.5;

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold mb-6">Borrow USDT</h1>
      <BorrowingForm />
      <div className="mt-8 bg-white dark:bg-navy/50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaCalculator className="mr-2 text-lime" /> Collateral Calculator
        </h2>
        <label className="block mb-2">Loan Amount (USDT)</label>
        <input
          type="number"
          value={calcAmount}
          onChange={(e) => setCalcAmount(Number(e.target.value))}
          className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime"
        />
        <p>Required Collateral: ${requiredCollateral} (150%)</p>
      </div>
    </div>
  );
};

export default Borrow;