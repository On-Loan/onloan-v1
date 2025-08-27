// src/pages/Support.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Support = () => {
  const faqs = [
    { question: 'How do I connect my wallet?', answer: 'Click "Connect Wallet" and select MetaMask or compatible wallet.' },
    { question: 'What is the minimum borrow amount?', answer: 'For new users, it starts at $10 USDT.' },
    { question: 'How is interest calculated?', answer: 'Fixed or variable rates based on loan type, accrued over time.' },
    { question: 'What happens if I default?', answer: 'Collateral is liquidated automatically via smart contracts.' },
    { question: 'Can I use ETH as collateral?', answer: 'Yes, over-collateralized at 150%.' },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-navy min-h-screen text-white">
      <Navbar />
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Support & FAQ</h1>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-navy/50 p-4 rounded-lg cursor-pointer" onClick={() => toggleFAQ(i)}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{faq.question}</h2>
                {openIndex === i ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === i && <p className="mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Support;