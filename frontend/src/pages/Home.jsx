import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Web3Context } from '../context/Web3Provider';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LoanTypes from '../components/LoanTypes';
import LoanSelector from '../components/LoanSelector';
import HowToUse from '../components/HowToUse';
import WhatWeDo from '../components/WhatWeDo';
import Roadmap from '../components/Roadmap';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();
  const { connectWallet, address } = useContext(Web3Context);

  const handleGetStarted = async () => {
    const success = await connectWallet();
    if (success) {
      navigate('/dashboard');
    }
  };

  // If already connected, redirect to dashboard
  if (address) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="bg-navy min-h-screen text-white ">
      <div className='w-full lg:w-[1400px] mx-auto'>
      <Navbar onGetStarted={handleGetStarted} showGetStarted={true} showWallet={false} />
      <HeroSection />
      {/* <section className="py-10 px-4 flex flex-col md:flex-row justify-between max-w-6xl mx-auto">
        <LoanSelector />
      </section> */}
        <LoanTypes />
      <HowToUse />
      <WhatWeDo />
      <Roadmap />
      <Footer />
      </div>
    </div>
  );
};

export default Home;



// // src/pages/Home.jsx
// import { useState } from 'react';
// import Navbar from '../components/Navbar';
// import HeroSection from '../components/HeroSection';
// import LoanTypes from '../components/LoanTypes';
// import LoanSelector from '../components/LoanSelector';
// import HowToUse from '../components/HowToUse';
// import WhatWeDo from '../components/WhatWeDo';
// import Roadmap from '../components/Roadmap';
// import Footer from '../components/Footer';

// const Home = ({ onConnectWallet }) => {
//   return (
//     <div className="bg-navy min-h-screen text-white">
//       <Navbar onConnectWallet={onConnectWallet} />
//       <HeroSection />
//       <section className="py-10 px-4 flex flex-col md:flex-row justify-between max-w-6xl mx-auto">
//         <LoanTypes />
//         <LoanSelector />
//       </section>
//       <HowToUse />
//       <WhatWeDo />
//       <Roadmap />
//       <Footer />
//     </div>
//   );
// };

// export default Home;