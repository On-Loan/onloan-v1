import { FaTwitter, FaDiscord, FaTelegram, FaGithub, FaMedium, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'How It Works', href: '/about' },
      { name: 'Security', href: '/about#security' },
      { name: 'Roadmap', href: '/#roadmap' },
    ],
    support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API', href: '/api' },
      { name: 'Contact', href: '/support#contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Disclaimer', href: '/disclaimer' },
      { name: 'Licenses', href: '/licenses' },
    ],
  };

  const socialLinks = [
    { icon: <FaTwitter className="h-6 w-6" />, href: '#' },
    { icon: <FaGithub className="h-6 w-6" />, href: 'https://github.com/On-Loan/onloan-v1' },
    // { icon: <FaDiscord className="h-6 w-6" />, href: '#' },
    // { icon: <FaTelegram className="h-6 w-6" />, href: '#' },
    // { icon: <FaMedium className="h-6 w-6" />, href: '#' },
    // { icon: <FaLinkedin className="h-6 w-6" />, href: '#' },
  ];

  return (
    <footer className="relative bg-navy pt-16 pb-10">
      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <img src="/logo.svg" alt="OnLoan" className="h-12" />
            </Link>
            <p className="text-gray-300 mb-6">Peer-to-Peer Lending</p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              OnLoan is revolutionizing the lending industry through decentralized finance, 
              providing secure, transparent, and efficient P2P lending solutions.
            </p>
          </div>

          {/* Quick Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-lg capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {items.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-lime transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links and Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-lime transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} OnLoan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;