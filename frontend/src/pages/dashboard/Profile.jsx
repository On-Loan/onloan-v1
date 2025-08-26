// src/pages/dashboard/Profile.jsx (Implemented: Basic profile with wallet info, theme toggle already in sidebar)
import { useContext } from 'react';
import { Web3Context } from '../../context/Web3Provider';
import { ThemeContext } from '../../context/ThemeProvider';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';  // Icons for profile

const Profile = () => {
  const { address, ethBalance, usdtBalance } = useContext(Web3Context);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="font-sans">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <FaUserCircle className="mr-2 text-lime" /> Profile & Settings
      </h1>
      <div className="bg-white dark:bg-navy/50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Account Info</h2>
        <p>Wallet Address: {address}</p>
        <p>ETH Balance: {ethBalance} ETH</p>
        <p>USDT Balance: {usdtBalance} USDT</p>
      </div>
      <div className="mt-6 bg-white dark:bg-navy/50 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>
        <button onClick={toggleTheme} className="flex items-center space-x-2 bg-lime text-navy px-4 py-2 rounded">
          {theme === 'dark' ? <FaSun /> : <FaMoon />} <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
        </button>
        {/* Add more settings: e.g., notifications, etc. */}
      </div>
    </div>
  );
};

export default Profile;