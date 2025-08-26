// src/pages/dashboard/Lend.jsx (Enhanced: Added withdraw feature)
import { useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../../context/Web3Provider';
import LendingForm from '../../components/LendingForm';
// import { FaWithdraw } from 'react-icons/fa';  // Assume icon, or use FaMoneyBill

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

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold mb-6">Lend to Pool</h1>
      <LendingForm />
      <div className="mt-8 bg-white dark:bg-navy/50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Withdraw from Pool</h2>
        <p>Available: ${lenderBalance}</p>
        <label className="block mb-2 mt-4">Withdraw Amount (USDT)</label>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime"
        />
        <button onClick={handleWithdraw} disabled={loadingWithdraw || !withdrawAmount} className="bg-lime text-navy px-4 py-2 rounded">
          {loadingWithdraw ? 'Withdrawing...' : 'Withdraw'}
        </button>
      </div>
    </div>
  );
};

export default Lend;