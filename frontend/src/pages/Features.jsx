// src/pages/Features.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaCheckCircle } from 'react-icons/fa';

const Features = () => {
  const features = [
    { title: 'Decentralized Lending', desc: 'Peer-to-peer lending without intermediaries using blockchain.' },
    { title: 'Stablecoin Focus', desc: 'Use USDT to avoid volatility in loans and investments.' },
    { title: 'Onchain Credit Scoring', desc: 'Dynamic credit scores based on repayment history.' },
    { title: 'Multiple Loan Types', desc: 'Personal, Home, Business, and Auto loans with customizable terms.' },
    { title: 'Automated Matching and Liquidation', desc: 'Smart contracts handle matching and risk management.' },
    { title: 'Dashboard Insights', desc: 'Track scores, limits, loans, and earnings in real-time.' },
  ];

  return (
    <div className="bg-navy min-h-screen text-white">
      <Navbar />
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-navy/50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <FaCheckCircle className="text-lime text-4xl mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Features;