// src/App.jsx
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Support from './pages/Support';
import DashboardLayout from './layouts/DashboardLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './context/ThemeProvider';
import Web3Provider from './context/Web3Provider';

function App() {
  return (
    <ThemeProvider>
      <Web3Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;



// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Features from './pages/Features';
// import About from './pages/About';
// import Support from './pages/Support';
// import DashboardPage from './pages/DashboardPage';
// import WalletModal from './components/WalletModal';
// import { useState } from 'react';

// function App() {
//   const [isWalletModalOpen, setWalletModalOpen] = useState(false);

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home onConnectWallet={() => setWalletModalOpen(true)} />} />
//         <Route path="/features" element={<Features />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/support" element={<Support />} />
//         <Route path="/dashboard" element={<DashboardPage />} />
//       </Routes>
//       {isWalletModalOpen && <WalletModal onClose={() => setWalletModalOpen(false)} />}
//     </>
//   );
// }

// export default App;