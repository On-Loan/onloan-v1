// src/pages/DashboardPage.jsx
import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import Footer from '../components/Footer';

const DashboardPage = () => {
  return (
    <div className="bg-navy min-h-screen text-white">
      <Navbar />
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Your Dashboard</h1>
        <Dashboard />
      </section>
      <Footer />
    </div>
  );
};

export default DashboardPage;