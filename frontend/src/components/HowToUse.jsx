import { FaWallet, FaHandHoldingUsd, FaMoneyCheck, FaChartLine } from 'react-icons/fa';

const HowToUse = () => {
  const steps = [
    {
      icon: <FaWallet className="text-4xl" />,
      title: 'Connect Wallet',
      desc: 'Start by connecting your MetaMask wallet securely to access the platform.'
    },
    {
      icon: <FaHandHoldingUsd className="text-4xl" />,
      title: 'Lend USDT',
      desc: 'Deposit your USDT into our lending pool and start earning competitive interest.'
    },
    {
      icon: <FaMoneyCheck className="text-4xl" />,
      title: 'Borrow USDT',
      desc: 'Request loans by providing collateral and get instant access to funds.'
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: 'Track Earnings',
      desc: 'Monitor your lending earnings and loan status through our intuitive dashboard.'
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
            How to Get Started
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow these simple steps to start your lending and borrowing journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-lime/50 via-lime/20 to-lime/50"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-lime text-navy
                flex items-center justify-center font-bold text-lg z-10">
                {i + 1}
              </div>

              <div className="group bg-navy/30 backdrop-blur-sm rounded-xl p-8 border border-lime/20
                hover:border-lime/50 transition-all duration-300 transform hover:-translate-y-2
                hover:shadow-lg hover:shadow-lime/10">
                
                {/* Icon Container */}
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300
                  text-lime">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.desc}</p>

                {/* Hover Gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime/0 to-lime/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;