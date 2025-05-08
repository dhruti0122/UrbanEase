import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Target, 
  Award, 
  Check, 
  Clock, 
  Shield,
  Building,
  Home,
  ArrowRight
} from 'lucide-react';


const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Dhrutisundar Behera',
      role: 'Frontend Designer',
      image: "https://i.postimg.cc/5tSj0v3g/me.jpg",
      bio: 'Dhruti specializes in building scalable Frontend systems and ensuring to give seamless experience.',
    },
    {
      name: 'Ashish Kumar',
      role: 'Backend Developer',
      image: "https://i.postimg.cc/8k0cjTh2/ashish.jpg",
      bio: 'Ashish specializes in building scalable backend systems and ensuring seamless API integrations.',
    },
    {
      name: 'Ashutosh Upadhyay',
      role: 'Database Administrator',
      image: "https://i.postimg.cc/k4j4NmLt/vodka.jpg",
      bio: 'Ashutosh specializes in building Databases and ensuring seamless integrations.',
    },
    {
      name: 'Archita Panda',
      role: 'API Connectivity',
      image: "https://i.postimg.cc/L8BmBS16/archita.jpg",
      bio: 'Archita ensures robust API connectivity and smooth data exchange between systems.',
    }
  ];

  const stats = [
    { value: '200+', label: 'Societies Served', icon: <Building size={24} className="text-blue-600" /> },
    { value: '50,000+', label: 'Residents', icon: <Users size={24} className="text-blue-600" /> },
    { value: '99.8%', label: 'Uptime', icon: <Clock size={24} className="text-blue-600" /> },
    { value: '24/7', label: 'Support', icon: <Shield size={24} className="text-blue-600" /> }
  ];

  const values = [
    {
      title: 'Community First',
      icon: <Users size={48} className="text-blue-600" />,
      description: 'We believe in the power of strong, connected communities. Everything we build is designed to foster better community relationships.'
    },
    {
      title: 'Transparency',
      icon: <Shield size={48} className="text-blue-600" />,
      description: 'We ensure complete transparency in all society operations, from financial management to decision-making processes.'
    },
    {
      title: 'Innovation',
      icon: <Target size={48} className="text-blue-600" />,
      description: 'We continuously evolve our platform with innovative solutions that address the unique challenges of community living.'
    },
    {
      title: 'Excellence',
      icon: <Award size={48} className="text-blue-600" />,
      description: 'We commit to excellence in everything we do, from customer service to product development.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-4">About Neighborly</h1>
          <p className="text-xl max-w-2xl">
            We're transforming society management with technology that brings communities together and streamlines operations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                UrbanEase was born from a simple observation: society management was stuck in the past, relying on outdated methods, paperwork, and disconnected systems.
              </p>
              <p className="text-gray-700 mb-4">
                Founded in 2024, our mission was clear—to build a platform that would revolutionize how residential communities operate, communicate, and thrive.
              </p>
              <p className="text-gray-700 mb-4">
                Today, we serve hundreds of societies across the country, helping them streamline operations, build stronger communities, and create better living experiences for residents.
              </p>
              <div className="mt-8">
                <Link to="/services" className="text-blue-700 hover:text-blue-800 font-medium flex items-center">
                  Explore our services
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Team discussion" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-700 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <Home size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">All-in-One Platform</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Comprehensive solution for all society management needs</span>
                </li>
                <li className="flex">
                  <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Integrated modules for seamless operations</span>
                </li>
                <li className="flex">
                  <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Customizable to fit the unique needs of each society</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-6">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">User-Centric Design</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Intuitive interface for users of all technical abilities</span>
                </li>
                <li className="flex">
                  <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Mobile-first approach for on-the-go management</span>
                </li>
                <li className="flex">
                  <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                  <span>Continuous improvements based on user feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your society?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of societies already using Neighborly to streamline operations and build stronger communities.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-700 hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg font-medium inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;