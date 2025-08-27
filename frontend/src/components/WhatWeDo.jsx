import { FaHandshake, FaChartLine, FaShieldAlt, FaClock } from 'react-icons/fa';

const WhatWeDo = () => {
  const features = [
    {
      icon: <FaHandshake className="text-4xl" />,
      title: "P2P Lending with USDT",
      description: "Connect directly with lenders and borrowers through our secure USDT-based lending platform."
    },
    {
      icon: <FaChartLine className="text-4xl" />,
      title: "On-Chain Credit Scoring",
      description: "Transparent credit scoring system based on blockchain data and transaction history."
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Pool-Based Lending",
      description: "Participate in secure lending pools with automated interest rates and risk management."
    },
    {
      icon: <FaClock className="text-4xl" />,
      title: "Instant Processing",
      description: "Experience fast loan approvals and instant fund transfers through smart contracts."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
            What Our Platform Offers
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of decentralized lending with our comprehensive feature set
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-navy/30 backdrop-blur-sm rounded-xl p-8
                border border-lime/20 hover:border-lime/50 transition-all duration-300
                transform hover:-translate-y-2 hover:shadow-lg hover:shadow-lime/10"
            >
              {/* Feature Icon */}
              <div className="mb-6 text-lime transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-semibold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime/0 to-lime/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-lime to-lime/90 text-navy 
            rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-lime/20 
            transition-all duration-300 transform hover:scale-105">
            Start Lending Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;