import { FaMoneyBillAlt, FaHome, FaBriefcase, FaCar } from 'react-icons/fa';

const LoanTypes = () => {
  const types = [
    { icon: <FaMoneyBillAlt className="text-lime" />, title: 'Personal Loan', desc: 'Flexible funds for your needs...' },
    { icon: <FaHome className="text-lime" />, title: 'Home Loan', desc: 'Affordable financing...' },
    { icon: <FaBriefcase className="text-lime" />, title: 'Business Loan', desc: 'Empower your business...' },
    { icon: <FaCar className="text-lime" />, title: 'Auto Loan', desc: 'Drive your dream car...' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {types.map((type, i) => (
        <div key={i} className="bg-navy/50 p-4 rounded text-white flex items-center space-x-2">
          {type.icon}
          <div>
            <h3>{type.title}</h3>
            <p>{type.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanTypes;