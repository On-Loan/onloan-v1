// src/components/BorrowingForm.jsx
import { useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../context/Web3Provider';
import DatePicker from 'react-datepicker';
import { CurrencyDollarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import 'react-datepicker/dist/react-datepicker.css';

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
      active 
        ? 'bg-lime text-navy' 
        : 'bg-navy/50 text-gray-300 hover:bg-navy/70'
    }`}
  >
    {children}
  </button>
);

const BorrowingForm = () => {
  const { contract, usdtContract, signer, address } = useContext(Web3Context);
  const [amount, setAmount] = useState(10);
  const [durationDate, setDurationDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
  const [loanType, setLoanType] = useState(0);
  const [useETHCollateral, setUseETHCollateral] = useState(false);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const loanTypes = [
    { name: 'Personal', description: 'For individual needs' },
    { name: 'Home', description: 'For real estate purposes' },
    { name: 'Business', description: 'For business expansion' },
    { name: 'Auto', description: 'For vehicle purchases' }
  ];

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
      const duration = Math.floor((durationDate - new Date()) / 1000);  // Seconds
      let options = {};

      if (useETHCollateral) {
        const requiredCollateralUSD = amount * 1.5;
        const ethPrice = Number(await contract.getETHPrice()) / 1e8;  // Adjust decimals
        const requiredETH = requiredCollateralUSD / ethPrice;
        options.value = ethers.parseEther(requiredETH.toFixed(18));
        
        toast.info('Waiting for ETH collateral approval...');
      } else {
        const requiredCollateral = parsedAmount * 150n / 100n;
        const allowance = await usdtContract.allowance(address, contractAddress);
        if (allowance < requiredCollateral) {
          toast.info('Approving USDT collateral...');
          const txApprove = await usdtContract.approve(contractAddress, requiredCollateral);
          await txApprove.wait();
        }
      }

      toast.info('Submitting borrow request...');
      const tx = await contract.borrowUSDT(parsedAmount, duration, useETHCollateral, options);
      await tx.wait();
      toast.success('Loan successfully created!');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Transaction failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-navy-800 dark:to-navy-900 rounded-2xl shadow-lg overflow-hidden p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
        Borrow USDT
      </h2>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-navy-700/50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Borrow Limit</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">${borrowLimit}</p>
        </div>

        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Amount (USDT)
          </label>
          <div className="relative">
            <input
              type="range"
              min={1}
              max={borrowLimit}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full mb-2 accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>$1</span>
              <span>${amount}</span>
              <span>${borrowLimit}</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-2 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all text-gray-700 dark:text-gray-300 bg-white dark:bg-navy-800"
              placeholder="Enter amount"
            />
          </div>
          {amount > borrowLimit && (
            <p className="mt-1 text-red-500 text-sm">Amount exceeds borrow limit</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Loan Duration
          </label>
          <DatePicker
            selected={durationDate}
            onChange={setDurationDate}
            minDate={new Date()}
            className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all text-gray-700 dark:text-gray-300 bg-white dark:bg-navy-800"
            placeholderText="Select end date"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Loan Type
          </label>
          <select
            value={loanType}
            onChange={(e) => setLoanType(Number(e.target.value))}
            className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all text-gray-700 dark:text-gray-300 bg-white dark:bg-navy-800"
          >
            {loanTypes.map((type, i) => (
              <option key={i} value={i}>{type.name} - {type.description}</option>
            ))}
          </select>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-navy-700/50 rounded-lg">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={useETHCollateral}
                onChange={(e) => setUseETHCollateral(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-300">Use ETH as collateral</span>
          </label>
        </div>

        <button
          onClick={handleBorrow}
          disabled={loading || amount > borrowLimit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <span>Borrow Now</span>
              <ArrowRightIcon className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
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