// src/components/WalletDropdown.jsx
import { useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../context/Web3Provider';
import { FaWallet } from 'react-icons/fa';

const formatBalance = (balance, decimals = 3) => {
  if (!balance) return '0';
  return Number(balance).toFixed(decimals);
};

const WalletDropdown = () => {
  const { provider, signer, address, usdtBalance, ethBalance, connectWallet, disconnectWallet } = useContext(Web3Context);
  const [isOpen, setIsOpen] = useState(false);
  
  const formattedEthBalance = formatBalance(ethBalance);
  const formattedUsdtBalance = formatBalance(usdtBalance);

  return (
    <div className="mb-8">
      {!address ? (
        <button 
          onClick={connectWallet} 
          className="bg-gradient-to-r from-lime to-lime/90 text-navy px-4 py-3 rounded-lg 
          w-full flex items-center justify-center space-x-2 font-semibold
          shadow-lg hover:shadow-lime/20 hover:scale-105 transition-all duration-300"
        >
          <FaWallet className="text-xl" />
          <span>Connect Wallet</span>
        </button>
      ) : (
        <>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="bg-gradient-to-r from-lime to-lime/90 text-navy px-4 py-3 rounded-lg
            w-full flex items-center justify-between font-semibold
            shadow-lg hover:shadow-lime/20 hover:scale-105 transition-all duration-300"
          >
            <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
            <FaWallet className="text-xl" />
          </button>
          {isOpen && (
            <div className="mt-3 bg-white dark:bg-navy/95 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-navy/50">
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-navy/50 rounded-lg">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <img src="/02 Ethereum.svg" alt="ETH" className="w-5 h-5" />
                      <span className="font-medium">ETH Balance</span>
                    </div>
                    <span className="font-bold text-navy/90 dark:text-white">
                      {formattedEthBalance} ETH
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-navy/50 rounded-lg">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <img src="/USDTIcon.svg" alt="USDT" className="w-5 h-5" />
                      <span className="font-medium">USDT Balance</span>
                    </div>
                    <span className="font-bold text-navy/90 dark:text-white">
                      {formattedUsdtBalance} USDT
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={disconnectWallet} 
                className="mt-4 w-full text-red-500 hover:text-red-600 py-2 px-4 rounded-lg
                border border-red-500 hover:bg-red-500/5 transition-colors duration-300 text-sm font-medium"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WalletDropdown;