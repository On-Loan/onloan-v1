// src/pages/About.jsx
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  const team = [
    // {
    //   name: 'Goekcen B.',
    //   role: 'Founder & Team Lead',
    //   bio: 'Expert in ZKP and Solidity with a passion for secure, scalable solutions.',
    //   image: '',
    //   social: {
    //     linkedin: '#',
    //     github: '#',
    //     twitter: '#'
    //   }
    // },
    {
      name: 'Akanimoh Johnson',
      role: 'Developer & Founder ',
      bio: 'Blockchain Developer with 2 years in fintech. Pioneer in DeFi solutions.',
      image: '',
      social: {
        linkedin: '#',
        github: '#',
        twitter: '#'
      }
    },
    // {
    //   name: 'Alex Johnson',
    //   role: 'Product Designer',
    //   bio: 'UI/UX specialist focusing on creating intuitive DeFi experiences.',
    //   image: 'https://randomuser.me/api/portraits/men/2.jpg',
    //   social: {
    //     linkedin: '#',
    //     github: '#',
    //     twitter: '#'
    //   }
    // },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="bg-navy min-h-screen text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-lime/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
              Revolutionizing P2P Lending
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              OnLoan is a decentralized platform revolutionizing P2P lending with blockchain technology. 
              Our mission is to make finance accessible, secure, and efficient for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-b from-navy via-navy/95 to-navy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We envision a future where financial services are accessible to everyone, 
                regardless of their location or traditional banking status. Through blockchain 
                technology and smart contracts, we're making this vision a reality.
              </p>
              <ul className="space-y-4">
                {['Democratizing Finance', 'Transparent Lending', 'Secure Platform'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-lime rounded-full"></div>
                    <span className="text-gray-200">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime/20 to-transparent rounded-2xl filter blur-3xl"></div>
              <img
                src="/heroImage.svg"
                alt="Vision"
                className="relative z-10 w-full h-auto rounded-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300">
              Passionate individuals dedicated to transforming the future of finance
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover="hover"
                layout
                className="group relative bg-navy/30 backdrop-blur-sm rounded-xl p-8
                  border border-lime/20 hover:border-lime/50 transition-all duration-300
                  hover:shadow-xl hover:shadow-lime/10"
              >
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-lime/20
                    group-hover:border-lime/50 transition-all duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2
                    bg-gradient-to-r from-lime to-lime/90 px-4 py-1 rounded-full">
                    <span className="text-navy font-semibold text-sm">{member.role}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-center mb-3">{member.name}</h3>
                <p className="text-gray-300 text-center mb-6">{member.bio}</p>

                <div className="flex justify-center space-x-4">
                  {Object.entries(member.social).map(([platform, link], index) => {
                    const Icon = platform === 'linkedin' ? FaLinkedin :
                              platform === 'github' ? FaGithub : FaTwitter;
                    return (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-lime transition-colors duration-200"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime/0 to-lime/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;