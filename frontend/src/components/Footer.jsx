import { FaTwitter, FaDiscord, FaTelegram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-navy text-white py-6 px-4">
      <div className="flex justify-between">
        <div>OnLoan</div>
        <div className="space-x-4">
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaDiscord /></a>
          <a href="#"><FaTelegram /></a>
          <a href="#"><FaGithub /></a>
        </div>
      </div>
      <p className="text-center mt-4">&copy; 2025 OnLoan</p>
    </footer>
  );
};

export default Footer;