import { FaMoneyBillAlt, FaHome, FaBriefcase, FaCar } from 'react-icons/fa';

const LoanTypes = () => {
  const types = [
    {
      icon: <FaMoneyBillAlt className="text-3xl" />,
      title: 'Personal Loan',
      desc: 'Flexible funds for your personal needs with competitive interest rates and quick approval.'
    },
    {
      icon: <FaHome className="text-3xl" />,
      title: 'Home Loan',
      desc: 'Affordable financing solutions to help you achieve your dream of homeownership.'
    },
    {
      icon: <FaBriefcase className="text-3xl" />,
      title: 'Business Loan',
      desc: 'Empower your business growth with our tailored financing solutions and expert support.'
    },
    {
      icon: <FaCar className="text-3xl" />,
      title: 'Auto Loan',
      desc: 'Drive your dream car with our competitive auto loan rates and flexible terms.'
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
          Loan Solutions
        </h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Discover our range of flexible loan options designed to meet your specific needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type, i) => (
            <div 
              key={i} 
              className="group relative bg-navy/30 backdrop-blur-sm rounded-xl p-6 border border-lime/20
                hover:border-lime/50 transition-all duration-300 transform hover:-translate-y-1
                hover:shadow-lg hover:shadow-lime/10"
            >
              {/* Icon Circle */}
              <div className="absolute -top-6 left-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime to-lime/80 
                  flex items-center justify-center shadow-lg shadow-lime/20
                  transform group-hover:scale-110 transition-transform duration-300">
                  {type.icon}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-3">{type.title}</h3>
                <p className="text-gray-300 leading-relaxed">{type.desc}</p>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-lime/0 to-lime/5 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoanTypes;