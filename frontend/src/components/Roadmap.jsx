const Roadmap = () => {
  const milestones = [
    {
      quarter: 'Q3 2025',
      title: 'Platform Launch',
      desc: 'Launch of our MVP with core lending and borrowing functionality, smart contract audits, and initial liquidity pools.',
      status: 'completed'
    },
    {
      quarter: 'Q4 2025',
      title: 'Multi-Chain Expansion',
      desc: 'Integration with multiple blockchain networks to provide cross-chain lending and borrowing capabilities.',
      status: 'in-progress'
    },
    {
      quarter: 'Q4 2025',
      title: 'NFT Collateral',
      desc: 'Support for NFTs as collateral, enabling users to leverage their digital assets.',
      status: 'upcoming'
    },
    {
      quarter: 'Q1 2026',
      title: 'DAO Governance',
      desc: 'Launch of DAO governance system and native token for community-driven decision making.',
      status: 'upcoming'
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-lime bg-clip-text text-transparent">
            Our Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow our journey as we build the future of decentralized lending
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime via-lime/50 to-lime/20"></div>

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-8 md:gap-16 relative ${
                i % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2">
                  <div className={`w-4 h-4 rounded-full border-2 border-lime ${
                    milestone.status === 'completed' 
                      ? 'bg-lime' 
                      : milestone.status === 'in-progress'
                      ? 'bg-navy animate-pulse'
                      : 'bg-navy'
                  }`}></div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="group relative bg-navy/30 backdrop-blur-sm rounded-xl p-8 border border-lime/20
                    hover:border-lime/50 transition-all duration-300 transform hover:-translate-y-1
                    hover:shadow-lg hover:shadow-lime/10">
                    
                    {/* Quarter Badge */}
                    <div className={`absolute ${i % 2 === 0 ? '-right-3' : '-left-3'} top-4
                      bg-gradient-to-r from-lime to-lime/80 text-navy px-4 py-1 rounded-full
                      text-sm font-semibold transform -rotate-2`}>
                      {milestone.quarter}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-2xl font-semibold mb-4 text-white">{milestone.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{milestone.desc}</p>
                    </div>

                    {/* Status Indicator */}
                    <div className={`absolute bottom-4 ${i % 2 === 0 ? 'left-4' : 'right-4'}
                      text-sm font-medium ${
                        milestone.status === 'completed' 
                          ? 'text-lime' 
                          : milestone.status === 'in-progress'
                          ? 'text-yellow-400'
                          : 'text-gray-400'
                      }`}>
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </div>

                    {/* Hover Gradient */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime/0 to-lime/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;