// src/layouts/DashboardLayout.jsx
import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Overview from '../pages/dashboard/Overview';
import Borrow from '../pages/dashboard/Borrow';
import Lend from '../pages/dashboard/Lend';
import Stats from '../pages/dashboard/Stats';
import History from '../pages/dashboard/History';
import Profile from '../pages/dashboard/Profile';
import { Web3Context } from '../context/Web3Provider';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

const DashboardLayout = () => {
  const { address } = useContext(Web3Context);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!address) {
      navigate('/');
    }
  }, [address, navigate]);

  if (!address) {
    return <Navigate to="/" replace />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-navy to-navy/95">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-navy/95 text-white hover:bg-navy/80 transition-colors"
      >
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-full
          transform lg:transform-none transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 relative z-0">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/borrow" element={<Borrow />} />
                <Route path="/lend" element={<Lend />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;