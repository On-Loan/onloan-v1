import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';  // Hamburger for mobile

const Navbar = ({ onConnectWallet }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-navy text-white">
      <Link to="/" className="text-lime text-2xl font-bold">
        <img src="/logo.svg" alt="" />
      </Link>
      <div className="hidden md:flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/about">About</Link>
        <Link to="/support">Support</Link>
      </div>
      <button onClick={onConnectWallet} className="bg-lime text-navy px-4 py-2 rounded">Get Started</button>
      {/* Mobile menu with FaBars */}
    </nav>
  );
};

export default Navbar;