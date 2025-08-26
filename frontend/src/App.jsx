import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Support from './pages/Support';
import DashboardPage from './pages/DashboardPage';
import WalletModal from './components/WalletModal';
import { useState } from 'react';

function App() {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onConnectWallet={() => setWalletModalOpen(true)} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      {isWalletModalOpen && <WalletModal onClose={() => setWalletModalOpen(false)} />}
    </>
  );
}

export default App;