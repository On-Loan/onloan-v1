import { useState } from 'react';

const LoanSelector = () => {
  const [amount, setAmount] = useState(37000);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3>Select Loan Amount</h3>
      <p className="text-3xl">USD ${amount.toFixed(2)}</p>
      <input type="range" min={1000} max={50000} value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full" />
      <div className="flex justify-between text-sm">
        <span>USD $1000</span>
        <span>USD $50000</span>
      </div>
      <button className="bg-lime text-navy w-full py-2 mt-4 rounded">Get Started</button>
    </div>
  );
};

export default LoanSelector;