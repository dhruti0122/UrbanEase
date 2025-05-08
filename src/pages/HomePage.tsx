import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, CalendarCheck, Shield, PenTool as Tool, Wrench, UserCheck, Vote, HelpCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case 'resident': return '/resident-dashboard';
      case 'owner': return '/owner-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/login';
    }
  };

  const services = [
    {
      title: 'Maintenance',
      icon: <Wrench size={28} className="text-blue-600" />,
      description: 'Request repairs and track status in real-time',
      link: '/services#maintenance'
    },
    {
      title: 'Security',
      icon: <Shield size={28} className="text-blue-600" />,
      description: 'Manage visitor access and security concerns',
      link: '/services#security'
    },
    {
      title: 'Facilities',
      icon: <Tool size={28} className="text-blue-600" />,
      description: 'Book common areas and track availability',
      link: '/facility-booking'
    },
    {
      title: 'Voting',
      icon: <Vote size={28} className="text-blue-600" />,
      description: 'Participate in society decisions and polls',
      link: '/voting'
    },
    {
      title: 'Helpdesk',
      icon: <HelpCircle size={28} className="text-blue-600" />,
      description: 'Get assistance for all your society-related queries',
      link: '/services#helpdesk'
    }
  ];

  const announcements = [
    {
      title: "Elevator Maintenance",
      date: "15 May 2025",
      message: "Tower A elevator will be under maintenance from 10 AM to 2 PM."
    },
    {
      title: "Water Supply Interruption",
      date: "18 May 2025",
      message: "Water supply will be interrupted from 9 AM to 12 PM due to tank cleaning."
    },
    {
      title: "Society General Meeting",
      date: "20 May 2025",
      message: "Annual general meeting will be held at 6 PM in the community hall."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your One-Stop Society Hub
              </h1>
              <p className="text-xl opacity-90">
                Pay dues, book services, vote, and more - all in one place.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  to={isAuthenticated ? "/payments" : "/login"}
                  className="bg-white text-blue-700 hover:bg-gray-100 transition-colors px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  Pay Maintenance
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link 
                  to={isAuthenticated ? "/complaints" : "/login"}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors border border-blue-500 px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  Raise Complaint
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link 
                  to={isAuthenticated ? "/facility-booking" : "/login"}
                  className="bg-blue-600 hover:bg-blue-700 transition-colors border border-blue-500 px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  Book Facility
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Modern apartment building" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
              >
                <div className="p-6">
                  <div className="mb-4 p-3 bg-blue-50 inline-block rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Live Announcements</h2>
            <Link to="/announcements" className="text-blue-700 hover:text-blue-800 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-gray-700">{announcement.message}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard CTA */}
      <section className="bg-blue-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to manage your society experience?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Access your personal dashboard to track maintenance requests, payments, upcoming events, and more.
          </p>
          <Link
            to={getDashboardLink()}
            className="bg-white text-blue-700 hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg font-medium inline-flex items-center"
          >
            Go to Dashboard
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Neighborly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <CalendarCheck size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book facilities, schedule maintenance, and manage visitor access with just a few clicks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <AlertCircle size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications about maintenance, security alerts, and society announcements.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 p-3 rounded-full inline-block mb-4">
                <UserCheck size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Access</h3>
              <p className="text-gray-600">
                Role-based permissions ensure that users only access what they're authorized to see.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;