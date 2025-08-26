// src/context/Web3Provider.jsx
import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { contractABI, contractAddress } from '../utils/web3';

export const Web3Context = createContext();

const Web3ProviderComponent = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);
  const [ethBalance, setEthBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);

  const USDT_ADDRESS = "0xc2132D05D31c914a87C6611c10748AEb04B58e8F";  // Polygon USDT
  const USDT_ABI = [
    "function balanceOf(address) view returns (uint256)",
    "function approve(address, uint256) returns (bool)",
    "function allowance(address, address) view returns (uint256)"
  ];

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask not installed');
      return false;
    }
    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      await prov.send('eth_requestAccounts', []);
      const sign = await prov.getSigner();
      const addr = await sign.getAddress();
      setProvider(prov);
      setSigner(sign);
      setAddress(addr);

      const cont = new ethers.Contract(contractAddress, contractABI, sign);
      setContract(cont);

      const usdt = new ethers.Contract(USDT_ADDRESS, USDT_ABI, sign);
      setUsdtContract(usdt);

      toast.success('Wallet connected');
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAddress(null);
    setContract(null);
    setUsdtContract(null);
    setEthBalance(0);
    setUsdtBalance(0);
    toast.info('Wallet disconnected');
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (provider && address) {
        const ethBal = await provider.getBalance(address);
        setEthBalance(ethers.formatEther(ethBal));

        if (usdtContract) {
          const usdtBal = await usdtContract.balanceOf(address);
          setUsdtBalance(ethers.formatUnits(usdtBal, 6));
        }
      }
    };
    fetchBalances();
  }, [provider, address, usdtContract]);

  return (
    <Web3Context.Provider value={{ provider, signer, address, contract, usdtContract, ethBalance, usdtBalance, connectWallet, disconnectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ProviderComponent;