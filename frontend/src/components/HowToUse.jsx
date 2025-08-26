import { FaWallet, FaHandHoldingUsd, FaMoneyCheck, FaChartLine } from 'react-icons/fa';

const HowToUse = () => {
  const steps = [
    { icon: <FaWallet />, title: 'Connect Wallet', desc: 'Use MetaMask to connect.' },
    { icon: <FaHandHoldingUsd />, title: 'Lend USDT', desc: 'Deposit to pool.' },
    { icon: <FaMoneyCheck />, title: 'Borrow USDT', desc: 'Request loan with collateral.' },
    { icon: <FaChartLine />, title: 'Track Earnings', desc: 'View dashboard.' },
  ];

  return (
    <section className="py-10">
      <h2 className="text-3xl text-center">How to Use the App</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <div key={i} className="bg-navy/20 p-6 rounded text-center">
            {step.icon}
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToUse;