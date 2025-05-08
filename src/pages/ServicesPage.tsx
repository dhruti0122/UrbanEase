import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Shield, PenTool as Tool, Vote, HelpCircle, ChevronDown, ChevronUp, Users, CreditCard, FileText, Check, Truck, Key, Camera, Clock, AlertTriangle } from 'lucide-react';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('maintenance');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const services = [
    {
      id: 'maintenance',
      title: 'Maintenance',
      icon: <Wrench size={24} className="text-blue-600" />,
      description: 'Keep your society in top condition with our comprehensive maintenance services.',
      features: [
        { title: 'Request Tracking', icon: <Check size={18} />, description: 'Track your maintenance requests from submission to completion' },
        { title: 'Regular Upkeep', icon: <Tool size={18} />, description: 'Schedule routine maintenance for common areas and facilities' },
        { title: 'Emergency Repairs', icon: <AlertTriangle size={18} />, description: 'Quick response to urgent maintenance issues' },
      ],
      cta: { text: 'Raise a Maintenance Request', link: '/complaints' }
    },
    {
      id: 'security',
      title: 'Security',
      icon: <Shield size={24} className="text-blue-600" />,
      description: 'Enhance the safety of your society with our advanced security features.',
      features: [
        { title: 'Visitor Management', icon: <Users size={18} />, description: 'Control and monitor visitor access to your society' },
        { title: 'Security Cameras', icon: <Camera size={18} />, description: 'Live feed and recordings from security cameras' },
        { title: 'Guard Tracking', icon: <Clock size={18} />, description: 'Monitor security personnel activities and shifts' },
      ],
      cta: { text: 'Manage Security Settings', link: '/gatepass' }
    },
    {
      id: 'facilities',
      title: 'Facilities',
      icon: <Tool size={24} className="text-blue-600" />,
      description: 'Book and manage common facilities in your society.',
      features: [
        { title: 'Clubhouse Booking', icon: <Key size={18} />, description: 'Reserve the clubhouse for events and gatherings' },
        { title: 'Sports Facilities', icon: <Users size={18} />, description: 'Book tennis courts, swimming pools, and more' },
        { title: 'Parking Management', icon: <Truck size={18} />, description: 'Assign and manage parking spaces' },
      ],
      cta: { text: 'Book a Facility', link: '/facility-booking' }
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: <CreditCard size={24} className="text-blue-600" />,
      description: 'Manage all your society-related payments in one place.',
      features: [
        { title: 'Maintenance Dues', icon: <FileText size={18} />, description: 'Pay and track your maintenance payments' },
        { title: 'Utility Bills', icon: <FileText size={18} />, description: 'Pay water, electricity, and other utility bills' },
        { title: 'Payment History', icon: <Clock size={18} />, description: 'View your complete payment history' },
      ],
      cta: { text: 'Make a Payment', link: '/payments' }
    },
    {
      id: 'voting',
      title: 'Voting',
      icon: <Vote size={24} className="text-blue-600" />,
      description: 'Participate in society decisions through our secure voting system.',
      features: [
        { title: 'Society Polls', icon: <Users size={18} />, description: 'Vote on society matters and proposals' },
        { title: 'Committee Elections', icon: <Users size={18} />, description: 'Elect society committee members' },
        { title: 'Result Analytics', icon: <FileText size={18} />, description: 'View detailed voting results and analytics' },
      ],
      cta: { text: 'View Active Polls', link: '/voting' }
    },
    {
      id: 'helpdesk',
      title: 'Helpdesk',
      icon: <HelpCircle size={24} className="text-blue-600" />,
      description: 'Get assistance for all your society-related queries.',
      features: [
        { title: 'FAQs', icon: <FileText size={18} />, description: 'Find answers to commonly asked questions' },
        { title: 'Support Tickets', icon: <FileText size={18} />, description: 'Raise support tickets for specific issues' },
        { title: 'Live Chat', icon: <Users size={18} />, description: 'Chat with our support team for immediate assistance' },
      ],
      cta: { text: 'Contact Helpdesk', link: '/helpdesk' }
    }
  ];

  const faqs = [
    {
      id: 'faq1',
      question: 'How do I register a complaint?',
      answer: 'You can register a complaint by logging into your account, navigating to the Complaints section, and clicking on "Raise a New Complaint". Fill in the required details and submit your complaint.'
    },
    {
      id: 'faq2',
      question: 'How do I book a facility?',
      answer: 'To book a facility, go to the Facilities section, select the facility you want to book, choose the date and time, and confirm your booking. You will receive a confirmation notification once your booking is approved.'
    },
    {
      id: 'faq3',
      question: 'How do I pay my maintenance dues?',
      answer: 'You can pay your maintenance dues through the Payments section. Select "Maintenance Dues", choose the payment method, and complete the payment. You will receive a receipt via email once the payment is processed.'
    },
    {
      id: 'faq4',
      question: 'How do I register a new tenant?',
      answer: 'To register a new tenant, go to your Dashboard, select "Manage Property", and click on "Add Tenant". Fill in the tenant details and submit. The tenant will receive an invitation to create their account.'
    },
    {
      id: 'faq5',
      question: 'How do I update my contact information?',
      answer: 'You can update your contact information in the Profile section. Click on "Edit Profile", update your information, and save the changes.'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-2xl">
            Discover the comprehensive range of services available to make your community living experience seamless and enjoyable.
          </p>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="sticky top-16 bg-white shadow-md z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex overflow-x-auto no-scrollbar">
            {services.map((service) => (
              <button
                key={service.id}
                className={`flex items-center px-6 py-4 whitespace-nowrap border-b-2 ${
                  activeTab === service.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-600 hover:text-blue-700'
                }`}
                onClick={() => setActiveTab(service.id)}
              >
                <span className="mr-2">{service.icon}</span>
                <span>{service.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {services.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-lg shadow-md p-8 mb-8 ${
                activeTab === service.id ? 'block' : 'hidden'
              }`}
              id={service.id}
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-50 rounded-lg mr-4">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold">{service.title}</h2>
              </div>
              
              <p className="text-lg text-gray-700 mb-8">{service.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-50 rounded-full mr-3 text-blue-600">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <Link
                to={service.cta.link}
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg inline-block transition-colors"
              >
                {service.cta.text}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div 
                key={faq.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  {activeAccordion === faq.id ? 
                    <ChevronUp size={20} className="text-blue-600" /> : 
                    <ChevronDown size={20} className="text-gray-500" />
                  }
                </button>
                <div 
                  className={`px-5 pb-5 ${activeAccordion === faq.id ? 'block' : 'hidden'}`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-16 px-4 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Need more information?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our helpdesk team is available to answer any questions you might have about our services.
          </p>
          <Link
            to="/helpdesk"
            className="bg-white text-blue-700 hover:bg-gray-100 transition-colors px-8 py-3 rounded-lg font-medium inline-block"
          >
            Contact Helpdesk
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;