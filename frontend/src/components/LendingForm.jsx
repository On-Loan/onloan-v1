// src/components/LendingForm.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { contractABI, contractAddress } from '../utils/web3';  // Assume ABI and address

const LendingForm = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);
  const [amount, setAmount] = useState('');
  const [apy, setApy] = useState(5);  // Placeholder, fetch if possible
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const prov = new ethers.BrowserProvider(window.ethereum);
        setProvider(prov);
        await prov.send("eth_requestAccounts", []);
        const sign = await prov.getSigner();
        setSigner(sign);
        const cont = new ethers.Contract(contractAddress, contractABI, sign);
        setContract(cont);

        // USDT contract for approval
        const USDT_ADDRESS = "0xc2132D05D31c914a87C6611c10748AEb04B58e8F";  // Polygon USDT example
        const USDT_ABI = [  // Minimal ABI for approve
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)"
        ];
        const usdt = new ethers.Contract(USDT_ADDRESS, USDT_ABI, sign);
        setUsdtContract(usdt);

        // Fetch APY if implemented in contract
        // setApy(await cont.getAPY() / 100);  // Assume method
      } else {
        toast.error('MetaMask not detected');
      }
    };
    init();
  }, []);

  const handleDeposit = async () => {
    if (!contract || !usdtContract || !amount) return;
    setLoading(true);
    try {
      const parsedAmount = ethers.parseUnits(amount, 6);  // USDT 6 decimals

      // Check and approve if needed
      const addr = await signer.getAddress();
      const allowance = await usdtContract.allowance(addr, contractAddress);
      if (allowance < parsedAmount) {
        const txApprove = await usdtContract.approve(contractAddress, parsedAmount);
        await txApprove.wait();
        toast.success('USDT approved');
      }

      const tx = await contract.depositToPool(parsedAmount);
      await tx.wait();
      toast.success('Deposited to pool!');
      setAmount('');
    } catch (error) {
      toast.error('Deposit failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy/50 p-6 rounded-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Lend USDT to Pool</h2>
      <p className="mb-2">Current APY: {apy}%</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in USDT"
        className="w-full p-2 mb-4 bg-navy text-white border border-lime rounded"
      />
      <button
        onClick={handleDeposit}
        disabled={loading || !amount}
        className="bg-lime text-navy w-full py-2 rounded"
      >
        {loading ? 'Depositing...' : 'Deposit'}
      </button>
    </div>
  );
};

export default LendingForm;