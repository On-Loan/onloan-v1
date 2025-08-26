// src/components/BorrowingForm.jsx (Updated with better UX)
import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../context/Web3Provider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BorrowingForm = () => {
  const { contract, usdtContract, signer, address } = useContext(Web3Context);
  const [amount, setAmount] = useState(10);
  const [durationDate, setDurationDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));  // 30 days default
  const [loanType, setLoanType] = useState(0);
  const [useETHCollateral, setUseETHCollateral] = useState(false);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [loading, setLoading] = useState(false);

  const loanTypes = ['Personal', 'Home', 'Business', 'Auto'];

  useEffect(() => {
    const fetchLimit = async () => {
      if (contract && address) {
        const limit = await contract.borrowLimits(address);
        setBorrowLimit(Number(ethers.formatUnits(limit, 6)));
      }
    };
    fetchLimit();
  }, [contract, address]);

  const handleBorrow = async () => {
    if (!contract || amount > borrowLimit) return;
    setLoading(true);
    try {
      const parsedAmount = ethers.parseUnits(amount.toString(), 6);
      const duration = Math.floor((durationDate - new Date()) / 1000);  // Seconds
      let options = {};

      if (useETHCollateral) {
        const requiredCollateralUSD = amount * 1.5;
        const ethPrice = Number(await contract.getETHPrice()) / 1e8;  // Adjust decimals
        const requiredETH = requiredCollateralUSD / ethPrice;
        options.value = ethers.parseEther(requiredETH.toFixed(18));
      } else {
        const requiredCollateral = parsedAmount * 150n / 100n;
        const allowance = await usdtContract.allowance(address, contractAddress);
        if (allowance < requiredCollateral) {
          const txApprove = await usdtContract.approve(contractAddress, requiredCollateral);
          await txApprove.wait();
        }
      }

      const tx = await contract.borrowFromPool(parsedAmount, duration, loanType, useETHCollateral, options);
      await tx.wait();
      toast.success('Borrowed!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Borrow USDT</h2>
      <p className="mb-4">Borrow Limit: ${borrowLimit}</p>
      <label className="block mb-2">Amount (${amount})</label>
      <input type="range" min={1} max={borrowLimit} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full mb-4" />
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime" />
      <label className="block mb-2">Duration</label>
      <DatePicker selected={durationDate} onChange={setDurationDate} minDate={new Date()} className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime" />
      <label className="block mb-2">Loan Type</label>
      <select value={loanType} onChange={(e) => setLoanType(Number(e.target.value))} className="w-full p-2 mb-4 border rounded dark:bg-navy dark:border-lime">
        {loanTypes.map((type, i) => <option key={i} value={i}>{type}</option>)}
      </select>
      <label className="flex items-center mb-4">
        <input type="checkbox" checked={useETHCollateral} onChange={(e) => setUseETHCollateral(e.target.checked)} className="mr-2" />
        Use ETH Collateral
      </label>
      <button onClick={handleBorrow} disabled={loading || amount > borrowLimit} className="bg-lime text-navy w-full py-2 rounded">
        {loading ? 'Borrowing...' : 'Borrow'}
      </button>
    </div>
  );
};

export default BorrowingForm;





// // src/components/BorrowingForm.jsx
// import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { toast } from 'react-toastify';
// import { contractABI, contractAddress } from '../utils/web3';

// const BorrowingForm = () => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [contract, setContract] = useState(null);
//   const [usdtContract, setUsdtContract] = useState(null);
//   const [amount, setAmount] = useState(10);
//   const [duration, setDuration] = useState(2592000);  // 30 days in seconds
//   const [loanType, setLoanType] = useState(0);  // 0: Personal, etc.
//   const [useETHCollateral, setUseETHCollateral] = useState(false);
//   const [borrowLimit, setBorrowLimit] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const loanTypes = ['Personal', 'Home', 'Business', 'Auto'];

//   useEffect(() => {
//     const init = async () => {
//       if (window.ethereum) {
//         const prov = new ethers.BrowserProvider(window.ethereum);
//         setProvider(prov);
//         await prov.send("eth_requestAccounts", []);
//         const sign = await prov.getSigner();
//         setSigner(sign);
//         const cont = new ethers.Contract(contractAddress, contractABI, sign);
//         setContract(cont);

//         const addr = await sign.getAddress();
//         const limit = await cont.borrowLimits(addr);
//         setBorrowLimit(Number(ethers.formatUnits(limit, 6)));

//         // USDT for collateral if not ETH
//         const USDT_ADDRESS = "0xc2132D05D31c914a87C6611c10748AEb04B58e8F";
//         const USDT_ABI = [
//           "function approve(address spender, uint256 amount) external returns (bool)",
//           "function allowance(address owner, address spender) external view returns (uint256)"
//         ];
//         const usdt = new ethers.Contract(USDT_ADDRESS, USDT_ABI, sign);
//         setUsdtContract(usdt);
//       } else {
//         toast.error('MetaMask not detected');
//       }
//     };
//     init();
//   }, []);

//   const handleBorrow = async () => {
//     if (!contract || !amount || amount > borrowLimit) return;
//     setLoading(true);
//     try {
//       const parsedAmount = ethers.parseUnits(amount.toString(), 6);
//       const options = { value: 0 };

//       if (!useETHCollateral) {
//         const requiredCollateral = parsedAmount * BigInt(150) / BigInt(100);
//         const addr = await signer.getAddress();
//         const allowance = await usdtContract.allowance(addr, contractAddress);
//         if (allowance < requiredCollateral) {
//           const txApprove = await usdtContract.approve(contractAddress, requiredCollateral);
//           await txApprove.wait();
//           toast.success('USDT approved for collateral');
//         }
//       } else {
//         // Calculate required ETH
//         // Assuming requiredCollateral in USD, but need to send ETH value
//         // For simplicity, assume user sends exact ETH, but in code, calculate
//         const requiredCollateralUSD = Number(amount) * 1.5;
//         const ethPrice = 2000;  // Fetch from contract.getETHPrice() if async
//         const requiredETH = ethers.parseEther((requiredCollateralUSD / ethPrice).toString());
//         options.value = requiredETH;
//       }

//       const tx = await contract.borrowFromPool(parsedAmount, duration, loanType, useETHCollateral, options);
//       await tx.wait();
//       toast.success('Loan borrowed!');
//       setAmount(10);
//     } catch (error) {
//       toast.error('Borrow failed: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-navy/50 p-6 rounded-lg text-white">
//       <h2 className="text-2xl font-bold mb-4">Borrow USDT</h2>
//       <p className="mb-2">Your Borrow Limit: ${borrowLimit}</p>
//       <label className="block mb-2">Amount: ${amount}</label>
//       <input
//         type="range"
//         min={1}
//         max={borrowLimit}
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         className="w-full mb-4"
//       />
//       <label className="block mb-2">Duration (seconds):</label>
//       <input
//         type="number"
//         value={duration}
//         onChange={(e) => setDuration(Number(e.target.value))}
//         className="w-full p-2 mb-4 bg-navy text-white border border-lime rounded"
//       />
//       <label className="block mb-2">Loan Type:</label>
//       <select
//         value={loanType}
//         onChange={(e) => setLoanType(Number(e.target.value))}
//         className="w-full p-2 mb-4 bg-navy text-white border border-lime rounded"
//       >
//         {loanTypes.map((type, index) => (
//           <option key={index} value={index}>{type}</option>
//         ))}
//       </select>
//       <label className="flex items-center mb-4">
//         <input
//           type="checkbox"
//           checked={useETHCollateral}
//           onChange={(e) => setUseETHCollateral(e.target.checked)}
//           className="mr-2"
//         />
//         Use ETH as Collateral
//       </label>
//       <button
//         onClick={handleBorrow}
//         disabled={loading || amount > borrowLimit}
//         className="bg-lime text-navy w-full py-2 rounded"
//       >
//         {loading ? 'Borrowing...' : 'Borrow'}
//       </button>
//     </div>
//   );
// };

// export default BorrowingForm;