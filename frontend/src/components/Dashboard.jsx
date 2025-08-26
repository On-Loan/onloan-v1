import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { contractABI, contractAddress } from '../utils/web3';
import BorrowingForm from './BorrowingForm';

const Dashboard = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [creditScore, setCreditScore] = useState(0);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [poolLiquidity, setPoolLiquidity] = useState(0);
  const [accruedInterest, setAccruedInterest] = useState(0);


  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const prov = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(prov);
        await prov.send("eth_requestAccounts", []);
        const sign = prov.getSigner();
        setSigner(sign);
        const cont = new ethers.Contract(contractAddress, contractABI, sign);
        setContract(cont);

        // Fetch data
        const addr = await sign.getAddress();
        setCreditScore(await cont.creditScores(addr));
        setBorrowLimit(await cont.borrowLimits(addr));
        setPoolLiquidity(await cont.totalPoolLiquidity());
        setAccruedInterest(await cont.getAccruedInterest(addr));
      }
    };
    init();
  }, []);

  const deposit = async (amount) => {
    try {
      const tx = await contract.depositToPool(ethers.utils.parseUnits(amount, 6));  // USDT decimals
      await tx.wait();
      toast.success('Deposited!');
    } catch (e) {
      toast.error(e.message);
    }
  };

  // Similar for borrow, repay, etc.

  return (
    <div className="p-4">
      <BorrowingForm />
      <h2>Dashboard</h2>
      <p>Credit Score: {creditScore}</p>
      <p>Borrow Limit: ${borrowLimit / 10**6}</p>
      <p>Pool Liquidity: ${poolLiquidity / 10**6}</p>
      <p>Accrued Interest: ${accruedInterest / 10**6}</p>
      <button onClick={() => deposit('100')}>Deposit to Pool</button>
      {/* Slider for borrow, etc. */}
    </div>
  );
};

export default Dashboard;