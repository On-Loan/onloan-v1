import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import { ThemeContext } from '../context/ThemeProvider';

const Navbar = ({ onGetStarted, showWallet = false, showGetStarted = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    relative py-2 px-1 transition-all duration-300 font-medium
    ${isActive(path) 
      ? 'text-lime' 
      : 'text-gray-200 hover:text-lime'
    }
    after:content-[''] after:absolute after:left-0 after:bottom-0
    after:h-0.5 after:bg-lime after:transition-all after:duration-300
    ${isActive(path) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `;

  return (
    <nav className="relative flex justify-between w-full lg:w-[1400px] mx-auto items-center p-6 text-white font-sans shadow-lg">
      <Link to="/" className="text-lime transition-transform duration-300 hover:scale-105">
        <img src="/logo.svg" alt="OnLoan" className="h-12" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className={navLinkClass("/")}>
          Home
        </Link>
        <Link to="/features" className={navLinkClass("/features")}>
          Features
        </Link>
        <Link to="/about" className={navLinkClass("/about")}>
          About
        </Link>
        <Link to="/support" className={navLinkClass("/support")}>
          Support
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-2xl z-50 p-2 hover:text-lime transition-colors duration-300"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      <div className={`${
        isMenuOpen ? "flex" : "hidden"
      } md:hidden fixed inset-0 bg-gradient-to-b from-navy to-navy/95 z-40 flex-col items-center justify-center space-y-6 backdrop-blur-sm`}>
        <div className="flex flex-col items-center space-y-6">
          <Link 
            to="/" 
            className={`${navLinkClass("/")} text-xl`} 
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className={`${navLinkClass("/features")} text-xl`}
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/about" 
            className={`${navLinkClass("/about")} text-xl`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/support" 
            className={`${navLinkClass("/support")} text-xl`}
            onClick={() => setIsMenuOpen(false)}
          >
            Support
          </Link>
        </div>
        {showGetStarted && (
          <button
            onClick={() => {
              onGetStarted();
              setIsMenuOpen(false);
            }}
            className="bg-gradient-to-r from-lime to-lime/90 text-navy px-8 py-3 rounded-lg 
            font-semibold shadow-lg hover:shadow-lime/20 hover:scale-105 
            transition-all duration-300 mt-4 text-lg"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Desktop CTA */}
      <div className="hidden md:flex items-center space-x-6">
        {showGetStarted && (
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-lime to-lime/90 text-navy px-6 py-2.5 rounded-lg 
            font-semibold shadow-lg hover:shadow-lime/20 hover:scale-105 
            transition-all duration-300"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import { Link } from 'react-router-dom';
// import { FaBars } from 'react-icons/fa';  // Hamburger for mobile

// const Navbar = ({ onConnectWallet }) => {
//   return (
//     <nav className="flex justify-between items-center p-4 bg-navy text-white">
//       <Link to="/" className="text-lime text-2xl font-bold">
//         <img src="/logo.svg" alt="" />
//       </Link>
//       <div className="hidden md:flex space-x-4">
//         <Link to="/">Home</Link>
//         <Link to="/features">Features</Link>
//         <Link to="/about">About</Link>
//         <Link to="/support">Support</Link>
//       </div>
//       <button onClick={onConnectWallet} className="bg-lime text-navy px-4 py-2 rounded">Get Started</button>
//       {/* Mobile menu with FaBars */}
//     </nav>
//   );
// };

// export default Navbar;
