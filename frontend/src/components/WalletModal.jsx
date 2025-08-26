// src/components/WalletModal.jsx
import { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const WalletModal = ({ onClose }) => {
  const [connecting, setConnecting] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('MetaMask is not installed!');
      return;
    }

    setConnecting(true);
    try {
      // Use BrowserProvider for ethers v6 compatibility
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setConnectedAddress(address);
      toast.success(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
      // You can store the provider/signer in context or global state here if needed
    } catch (error) {
      toast.error('Connection failed: ' + error.message);
    } finally {
      setConnecting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-navy">
        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        {!connectedAddress ? (
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="bg-lime text-navy w-full py-2 rounded mb-4"
          >
            {connecting ? 'Connecting...' : 'Connect MetaMask'}
          </button>
        ) : (
          <p className="text-center mb-4">Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}</p>
        )}
        <button onClick={onClose} className="bg-gray-300 text-navy w-full py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletModal;



// import { createContext, useState, useCallback } from 'react';
// import { ethers } from 'ethers';
// import { toast } from 'react-toastify';

// export const WalletContext = createContext({
//   provider: null,
//   signer: null,
//   connectedAddress: null,
//   connectWallet: () => {},
//   disconnectWallet: () => {},
// });

// export const WalletProvider = ({ children }) => {
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [connectedAddress, setConnectedAddress] = useState(null);

//   const connectWallet = useCallback(async () => {
//     if (!window.ethereum) {
//       toast.error('MetaMask is not installed!');
//       return;
//     }

//     try {
//       const newProvider = new ethers.BrowserProvider(window.ethereum);
//       await newProvider.send('eth_requestAccounts', []);
//       const newSigner = await newProvider.getSigner();
//       const address = await newSigner.getAddress();
//       setProvider(newProvider);
//       setSigner(newSigner);
//       setConnectedAddress(address);
//       toast.success(`Connected: ${address.slice(0, 6)}...${address.slice(-4)}`);
//     } catch (error) {
//       toast.error('Connection failed: ' + error.message);
//     }
//   }, []);

//   const disconnectWallet = useCallback(() => {
//     setProvider(null);
//     setSigner(null);
//     setConnectedAddress(null);
//     toast.info('Wallet disconnected');
//   }, []);

//   return (
//     <WalletContext.Provider value={{ provider, signer, connectedAddress, connectWallet, disconnectWallet }}>
//       {children}
//     </WalletContext.Provider>
//   );
// };