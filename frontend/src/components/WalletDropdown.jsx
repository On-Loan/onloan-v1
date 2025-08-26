// src/components/WalletDropdown.jsx
import { useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Web3Context } from '../context/Web3Provider';
import { FaWallet } from 'react-icons/fa';

const WalletDropdown = () => {
  const { provider, signer, address, usdtBalance, ethBalance, connectWallet, disconnectWallet } = useContext(Web3Context);
  const [isOpen, setIsOpen] = useState(false);

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
              <div className="space-y-2">
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span>ETH Balance:</span>
                  <span className="font-medium">{ethBalance} ETH</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                  <span>USDT Balance:</span>
                  <span className="font-medium">{usdtBalance} USDT</span>
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