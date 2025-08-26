const Roadmap = () => {
  const milestones = [
    { quarter: 'Q1 2024', desc: 'Launch MVP' },
    { quarter: 'Q2 2024', desc: 'Add Multi-Chain Support' },
    { quarter: 'Q3 2024', desc: 'Integrate NFTs as Collateral' },
  ];

  return (
    <section className="py-10">
      <h2 className="text-3xl text-center">Roadmap</h2>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-x-4 md:space-y-0">
        {milestones.map((m, i) => (
          <div key={i} className="bg-lime/20 p-4 rounded">
            <h3>{m.quarter}</h3>
            <p>{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;