// src/pages/dashboard/Profile.jsx (Implemented: Basic profile with wallet info, theme toggle already in sidebar)
import { useContext } from 'react';
import { Web3Context } from '../../context/Web3Provider';
import { ThemeContext } from '../../context/ThemeProvider';
import { FaUserCircle, FaMoon, FaSun } from 'react-icons/fa';  // Icons for profile

const Profile = () => {
  const { address, ethBalance, usdtBalance } = useContext(Web3Context);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-lime bg-clip-text text-transparent mb-2">
              Profile & Settings
            </h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent rounded-3xl filter blur-3xl opacity-30 -z-10"></div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Account Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wallet Information */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaUserCircle className="mr-3 text-lime" />
              <span>Wallet Information</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-navy/20 rounded-lg border border-lime/10">
                <p className="text-gray-400 text-sm mb-1">Wallet Address</p>
                <div className="flex items-center gap-3">
                  <p className="text-white font-mono">{address}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(address)}
                    className="text-lime hover:text-lime/80 transition-colors"
                  >
                    <FaUserCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-navy/20 rounded-lg border border-lime/10">
                  <p className="text-gray-400 text-sm mb-1">ETH Balance</p>
                  <div className="flex items-center gap-2">
                    <img src="/02 Ethereum.svg" alt="ETH" className="w-5 h-5" />
                    <p className="text-2xl font-bold text-white">{ethBalance} ETH</p>
                  </div>
                </div>

                <div className="p-4 bg-navy/20 rounded-lg border border-lime/10">
                  <p className="text-gray-400 text-sm mb-1">USDT Balance</p>
                  <div className="flex items-center gap-2">
                    <img src="/USDTIcon.svg" alt="USDT" className="w-5 h-5" />
                    <p className="text-2xl font-bold text-white">{usdtBalance} USDT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaUserCircle className="mr-3 text-lime" />
              <span>Activity Overview</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400 mb-2">Total Borrowed</p>
                <p className="text-2xl font-bold text-white">$12,500</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400 mb-2">Active Loans</p>
                <p className="text-2xl font-bold text-white">2</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400 mb-2">Total Lent</p>
                <p className="text-2xl font-bold text-white">$25,000</p>
              </div>
              <div className="p-4 bg-navy/20 rounded-lg">
                <p className="text-gray-400 mb-2">Active Lending</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          {/* Settings Card */}
          <div className="bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-white">
              <FaUserCircle className="mr-3 text-lime" />
              <span>Settings</span>
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-navy/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Theme Preference</p>
                    <p className="text-gray-400 text-sm">Toggle light/dark mode</p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="p-2 bg-navy/50 rounded-lg border border-lime/20 hover:border-lime/50 transition-colors"
                  >
                    {theme === 'dark' ? (
                      <FaSun className="w-5 h-5 text-lime" />
                    ) : (
                      <FaMoon className="w-5 h-5 text-lime" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-navy/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Notifications</p>
                    <p className="text-gray-400 text-sm">Email alerts for activities</p>
                  </div>
                  <button className="w-12 h-6 bg-lime/20 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-lime rounded-full transition-transform" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-navy/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Two-Factor Auth</p>
                    <p className="text-gray-400 text-sm">Enhanced security</p>
                  </div>
                  <button className="w-12 h-6 bg-lime/20 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-gray-400 rounded-full transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;