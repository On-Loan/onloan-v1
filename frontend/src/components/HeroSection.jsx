import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Web3Context } from '../context/Web3Provider';
import { toast } from 'react-toastify';

const HeroSection = () => {
  const navigate = useNavigate();
  const { address } = useContext(Web3Context);
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      {/* Background gradient effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-transparent"></div> */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-20 md:py-32">
          {/* Text Content */}
          <div className="relative z-10 max-w-2xl md:w-1/2 text-center md:text-left mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
              Optimize Your Investments And Loans Effortlessly
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Experience the future of P2P lending with our secure and efficient platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => {
                  if (address) {
                    toast.info('Already connected! Redirecting to dashboard...');
                    navigate('/dashboard/lend');
                  } else {
                    toast.info('Please connect your wallet first');
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-lime to-lime/90 text-navy rounded-lg font-bold text-lg 
                  hover:shadow-lg hover:shadow-lime/20 transition-all duration-300 transform hover:scale-105"
              >
                Start Lending
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="px-8 py-4 bg-transparent border-2 border-lime text-lime rounded-lg font-bold text-lg 
                  hover:bg-lime/10 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-lg xl:max-w-xl">
              <div className="absolute -top-12 -left-12 w-72 h-72 bg-lime/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-lime/10 rounded-full filter blur-3xl animate-pulse delay-700"></div>
              <img 
                src="/heroImage.svg" 
                alt="OnLoan Platform" 
                className="relative z-10 w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime/50 to-transparent"></div>
    </section>
  );
};

export default HeroSection;