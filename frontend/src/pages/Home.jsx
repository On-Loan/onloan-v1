// src/pages/Home.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LoanTypes from '../components/LoanTypes';
import LoanSelector from '../components/LoanSelector';
import HowToUse from '../components/HowToUse';
import WhatWeDo from '../components/WhatWeDo';
import Roadmap from '../components/Roadmap';
import Footer from '../components/Footer';

const Home = ({ onConnectWallet }) => {
  return (
    <div className="bg-navy min-h-screen text-white">
      <Navbar onConnectWallet={onConnectWallet} />
      <HeroSection />
      <section className="py-10 px-4 flex flex-col md:flex-row justify-between max-w-6xl mx-auto">
        <LoanTypes />
        <LoanSelector />
      </section>
      <HowToUse />
      <WhatWeDo />
      <Roadmap />
      <Footer />
    </div>
  );
};

export default Home;