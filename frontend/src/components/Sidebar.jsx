// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaHome, FaHandHoldingUsd, FaMoneyCheck, FaChartLine, FaHistory, FaUser, FaMoon, FaSun } from 'react-icons/fa';
import WalletDropdown from './WalletDropdown';
import { ThemeContext } from '../context/ThemeProvider';

const Sidebar = ({ onClose }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const navLinkClass = (path) => `
    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
    ${isActive(path)
      ? 'bg-lime/10 text-lime font-medium'
      : 'text-gray-600 dark:text-gray-300 hover:bg-lime/5 hover:text-lime'
    }
  `;

  return (
    <aside className="w-72 min-h-screen bg-navy/95 backdrop-blur-xl flex flex-col border-r border-lime/10 sticky top-0">
      <div className="p-6">
        <Link to="/dashboard" className="mb-8 block transition-transform duration-300 hover:scale-105">
          <img src="/logo.svg" alt="OnLoan" className="h-10" />
        </Link>
        <WalletDropdown />
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard/borrow" 
              className={navLinkClass("/dashboard/borrow")}
              onClick={handleNavClick}
            >
              <FaHandHoldingUsd className={`text-xl ${isActive("/dashboard/borrow") ? "text-lime" : ""}`} />
              <span>Borrow</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/lend" 
              className={navLinkClass("/dashboard/lend")}
              onClick={handleNavClick}
            >
              <FaMoneyCheck className={`text-xl ${isActive("/dashboard/lend") ? "text-lime" : ""}`} />
              <span>Lend</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/stats" 
              className={navLinkClass("/dashboard/stats")}
              onClick={handleNavClick}
            >
              <FaChartLine className={`text-xl ${isActive("/dashboard/stats") ? "text-lime" : ""}`} />
              <span>Stats & Tracking</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/history" 
              className={navLinkClass("/dashboard/history")}
              onClick={handleNavClick}
            >
              <FaHistory className={`text-xl ${isActive("/dashboard/history") ? "text-lime" : ""}`} />
              <span>Transaction History</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/profile" 
              className={navLinkClass("/dashboard/profile")}
              onClick={handleNavClick}
            >
              <FaUser className={`text-xl ${isActive("/dashboard/profile") ? "text-lime" : ""}`} />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-6 border-t border-gray-200 dark:border-navy/50">
        <button 
          onClick={toggleTheme} 
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg
          text-gray-600 dark:text-gray-300 hover:bg-lime/5 hover:text-lime
          transition-all duration-300"
        >
          {theme === 'dark' ? (
            <>
              <FaSun className="text-xl" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <FaMoon className="text-xl" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;