const HeroSection = () => {
  return (
    <section className="bg-navy text-white py-20 px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-lg">
        <h1 className="text-5xl font-bold">Optimize Your Investments And Loans Effortlessly</h1>
      </div>
      <img src="/heroImage.svg" alt="Abstract wave" className="w-1/2" />  {/* Placeholder SVG */}
    </section>
  );
};

export default HeroSection;