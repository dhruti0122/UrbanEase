import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Bell, 
  Calendar, 
  CreditCard, 
  FileText, 
  AlertTriangle, 
  Settings, 
  ChevronRight,
  User,
  LogOut,
  MessageSquare,
  Shield,
  Vote
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Dashboard components
const DashboardHome = () => {
  const { user } = useAuth();
  const upcomingPayments = [
    { id: 1, type: 'Maintenance', amount: 5000, dueDate: '2025-05-15' },
    { id: 2, type: 'Water Bill', amount: 850, dueDate: '2025-05-20' }
  ];

  const recentComplaints = [
    { id: 1, title: 'Water Leakage', status: 'In Progress', date: '2025-05-01' },
    { id: 2, title: 'Elevator Issue', status: 'Resolved', date: '2025-04-28' }
  ];

  const announcements = [
    { id: 1, title: 'Elevator Maintenance', date: '2025-05-15', content: 'Tower A elevator will be under maintenance from 10 AM to 2 PM.' },
    { id: 2, title: 'Society General Meeting', date: '2025-05-20', content: 'Annual general meeting will be held at 6 PM in the community hall.' }
  ];

  const bookedFacilities = [
    { id: 1, facility: 'Club House', date: '2025-05-10', time: '6:00 PM - 9:00 PM' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name}</h2>
        <p className="text-gray-600">Apartment {user?.apartmentId}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold mt-1">₹5,850</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <CreditCard size={20} className="text-red-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/payments" className="text-sm text-blue-700 flex items-center">
              View Details <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Complaints</p>
              <p className="text-2xl font-bold mt-1">1</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <AlertTriangle size={20} className="text-orange-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/complaints" className="text-sm text-blue-700 flex items-center">
              View Details <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold mt-1">2</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Calendar size={20} className="text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link to="/events" className="text-sm text-blue-700 flex items-center">
              View Calendar <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upcoming Payments</h3>
          <Link to="/payments" className="text-sm text-blue-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.type}</td>
                  <td className="px-4 py-4 whitespace-nowrap">₹{payment.amount}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{payment.dueDate}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <Link 
                      to={`/payments?id=${payment.id}`}
                      className="text-blue-700 hover:text-blue-800 font-medium"
                    >
                      Pay Now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Announcements</h3>
          <Link to="/announcements" className="text-sm text-blue-700">View All</Link>
        </div>
        <div className="space-y-4">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-md">
              <div className="flex justify-between">
                <h4 className="font-medium">{announcement.title}</h4>
                <span className="text-sm text-gray-500">{announcement.date}</span>
              </div>
              <p className="mt-1 text-gray-600">{announcement.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Complaints</h3>
            <Link to="/complaints" className="text-sm text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">{complaint.title}</h4>
                  <p className="text-sm text-gray-500">{complaint.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  complaint.status === 'Resolved' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booked Facilities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Your Bookings</h3>
            <Link to="/facility-booking" className="text-sm text-blue-700">Book Facility</Link>
          </div>
          <div className="space-y-4">
            {bookedFacilities.map((booking) => (
              <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <h4 className="font-medium">{booking.facility}</h4>
                  <p className="text-sm text-gray-500">{booking.date}, {booking.time}</p>
                </div>
                <Link 
                  to={`/facility-booking?id=${booking.id}`}
                  className="text-sm text-blue-700"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('9876543210');
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">Apartment Number</label>
          <input
            type="text"
            id="apartment"
            value={user?.apartmentId}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm cursor-not-allowed"
          />
          <p className="mt-1 text-sm text-gray-500">Contact admin to update apartment details</p>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const ResidentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarLinks = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/resident-dashboard' },
    { icon: <CreditCard size={20} />, text: 'Payments', path: '/payments' },
    { icon: <AlertTriangle size={20} />, text: 'Complaints', path: '/complaints' },
    { icon: <Calendar size={20} />, text: 'Facility Booking', path: '/facility-booking' },
    { icon: <Shield size={20} />, text: 'Gatepass', path: '/gatepass' },
    { icon: <Vote size={20} />, text: 'Voting', path: '/voting' },
    { icon: <FileText size={20} />, text: 'Documents', path: '/documents' },
    { icon: <MessageSquare size={20} />, text: 'Community', path: '/community' },
    { icon: <Bell size={20} />, text: 'Notifications', path: '/notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:sticky md:top-16 md:h-[calc(100vh-4rem)]`}
      >
        <div className="flex flex-col h-full">
          {/* User info */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={20} className="text-blue-700" />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">Resident</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {sidebarLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/resident-dashboard/settings"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-700"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Settings size={20} className="mr-3" />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-red-600 text-left"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 p-4 pb-16">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 className="text-xl font-bold">Resident Dashboard</h1>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ResidentDashboard;