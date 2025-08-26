// src/pages/About.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const team = [
    { name: 'John Doe', role: 'Founder & CEO', bio: 'Blockchain enthusiast with 10+ years in fintech.' },
    { name: 'Jane Smith', role: 'Lead Developer', bio: 'Expert in Solidity and React.js.' },
    { name: 'Alex Johnson', role: 'Designer', bio: 'UI/UX specialist focusing on user-friendly DeFi apps.' },
  ];

  return (
    <div className="bg-navy min-h-screen text-white">
      <Navbar />
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">About Us</h1>
        <p className="text-center mb-10">OnLoan is a decentralized platform revolutionizing P2P lending with blockchain technology. Our mission is to make finance accessible, secure, and efficient for everyone.</p>
        <h2 className="text-3xl font-semibold text-center mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-navy/50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-lime">{member.role}</p>
              <p className="mt-2">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;