// src/layouts/DashboardLayout.jsx
import { useContext, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Overview from '../pages/dashboard/Overview';
import Borrow from '../pages/dashboard/Borrow';
import Lend from '../pages/dashboard/Lend';
import Stats from '../pages/dashboard/Stats';
import History from '../pages/dashboard/History';
import Profile from '../pages/dashboard/Profile';
import { Web3Context } from '../context/Web3Provider';

const DashboardLayout = () => {
  const { address } = useContext(Web3Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!address) {
      navigate('/');
    }
  }, [address, navigate]);

  if (!address) {
    return <Navigate to="/" replace />;}

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-navy/90">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/lend" element={<Lend />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;