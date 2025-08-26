// src/components/LendingForm.jsx (Updated)
import { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../context/Web3Provider';

const LendingForm = () => {
  const { contract, usdtContract, address } = useContext(Web3Context);
  const [amount, setAmount] = useState('');
  const [apy, setApy] = useState(5);  // Fetch if possible
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const parsedAmount = ethers.parseUnits(amount, 6);
      const allowance = await usdtContract.allowance(address, contractAddress);
      if (allowance < parsedAmount) {
        const txApprove = await usdtContract.approve(contractAddress, parsedAmount);
        await txApprove.wait();
      }
      const tx = await contract.depositToPool(parsedAmount);
      await tx.wait();
      toast.success('Deposited!');
      setAmount('');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Lend USDT</h2>
      <p className="mb-4">Current APY: {apy}%</p>
      <label className="block mb-2">Amount (USDT)</label>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime" />
      <button onClick={handleDeposit} disabled={loading || !amount} className="bg-lime text-navy w-full py-2 rounded">
        {loading ? 'Depositing...' : 'Deposit'}
      </button>
    </div>
  );
};

export default LendingForm;