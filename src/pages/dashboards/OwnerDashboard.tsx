import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  DollarSign, 
  FileText, 
  Settings, 
  LogOut,
  Bell,
  Building,
  User,
  Calendar,
  BarChart,
  AlertTriangle,
  MessageSquare,
  Shield,
  CheckCircle,
  Plus,
  Search,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Dashboard components
const OwnerDashboardHome = () => {
  const stats = [
    { 
      title: 'Total Residents', 
      value: '120', 
      change: '+5%', 
      status: 'increase',
      icon: <Users size={20} className="text-blue-500" />
    },
    { 
      title: 'Monthly Collection', 
      value: '₹4.2L', 
      change: '+12%', 
      status: 'increase',
      icon: <DollarSign size={20} className="text-green-500" />
    },
    { 
      title: 'Pending Dues', 
      value: '₹85K', 
      change: '-3%', 
      status: 'decrease',
      icon: <AlertTriangle size={20} className="text-orange-500" />
    },
    { 
      title: 'Active Complaints', 
      value: '8', 
      change: '+2', 
      status: 'increase',
      icon: <AlertTriangle size={20} className="text-red-500" />
    }
  ];

  const recentPayments = [
    { id: 1, resident: 'John Doe', apartment: 'A-101', amount: 5000, date: '2025-05-01', type: 'Maintenance' },
    { id: 2, resident: 'Sarah Smith', apartment: 'B-204', amount: 5000, date: '2025-05-02', type: 'Maintenance' },
    { id: 3, resident: 'Michael Johnson', apartment: 'C-302', amount: 850, date: '2025-05-03', type: 'Water Bill' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'Guest Registration', resident: 'John Doe', apartment: 'A-101', date: '2025-05-05' },
    { id: 2, type: 'Facility Booking', resident: 'Priya Sharma', apartment: 'B-205', date: '2025-05-08' },
    { id: 3, type: 'Maintenance Request', resident: 'Robert Chen', apartment: 'C-301', date: '2025-05-04' }
  ];

  const announcements = [
    { id: 1, title: 'Elevator Maintenance', date: '2025-05-15', status: 'Scheduled' },
    { id: 2, type: 'Society General Meeting', date: '2025-05-20', status: 'Upcoming' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Society Dashboard</h1>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
            <Plus size={16} className="mr-2" />
            New Announcement
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.status === 'increase' ? 'bg-blue-50' : 'bg-orange-50'
              }`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${
                stat.status === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Payments</h2>
            <Link to="/owner-dashboard/finances" className="text-sm text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resident</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-4 py-4 whitespace-nowrap">{payment.resident}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{payment.apartment}</td>
                    <td className="px-4 py-4 whitespace-nowrap">₹{payment.amount}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{payment.type}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <Link to="/owner-dashboard/approvals" className="text-sm text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-medium">{approval.type}</p>
                  <p className="text-sm text-gray-600">{approval.resident} • {approval.apartment}</p>
                  <p className="text-xs text-gray-500">{approval.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                    <CheckCircle size={18} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements and Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Announcements</h2>
            <button className="text-sm text-blue-700">Add New</button>
          </div>
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-md">
                <div className="flex justify-between">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Status: {announcement.status}</p>
                <div className="mt-2 flex">
                  <button className="text-sm text-blue-700 mr-3">Edit</button>
                  <button className="text-sm text-red-700">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Issues */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Open Issues</h2>
            <Link to="/owner-dashboard/maintenance" className="text-sm text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 border border-orange-200 bg-orange-50 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-medium">Water Leakage</h3>
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">In Progress</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Reported by: John Doe (A-101)</p>
              <p className="mt-1 text-sm text-gray-600">Assigned to: Maintenance Team</p>
            </div>
            <div className="p-4 border border-red-200 bg-red-50 rounded-md">
              <div className="flex justify-between">
                <h3 className="font-medium">Elevator Issue</h3>
                <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Urgent</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Reported by: Sarah Smith (B-204)</p>
              <p className="mt-1 text-sm text-gray-600">Assigned to: Elevator Service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResidentManagement = () => {
  const residents = [
    { id: 1, name: 'John Doe', apartment: 'A-101', status: 'Active', email: 'john@example.com', phone: '9876543210' },
    { id: 2, name: 'Sarah Smith', apartment: 'B-204', status: 'Active', email: 'sarah@example.com', phone: '9876543211' },
    { id: 3, name: 'Michael Johnson', apartment: 'C-302', status: 'Active', email: 'michael@example.com', phone: '9876543212' },
    { id: 4, name: 'Priya Sharma', apartment: 'B-205', status: 'Active', email: 'priya@example.com', phone: '9876543213' },
    { id: 5, name: 'Robert Chen', apartment: 'C-301', status: 'Active', email: 'robert@example.com', phone: '9876543214' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resident Management</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
          <Plus size={16} className="mr-2" />
          Add Resident
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search residents..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none pr-10">
              <option value="">Filter by Block</option>
              <option value="A">Block A</option>
              <option value="B">Block B</option>
              <option value="C">Block C</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none pr-10">
              <option value="">Filter by Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Residents Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {residents.map((resident) => (
                <tr key={resident.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        {resident.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.apartment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resident.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {resident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-700 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-700 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const OwnerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarLinks = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/owner-dashboard' },
    { icon: <Users size={20} />, text: 'Residents', path: '/owner-dashboard/residents' },
    { icon: <DollarSign size={20} />, text: 'Finances', path: '/owner-dashboard/finances' },
    { icon: <Calendar size={20} />, text: 'Society Events', path: '/owner-dashboard/events' },
    { icon: <BarChart size={20} />, text: 'Reports', path: '/owner-dashboard/reports' },
    { icon: <Building size={20} />, text: 'Facilities', path: '/owner-dashboard/facilities' },
    { icon: <AlertTriangle size={20} />, text: 'Maintenance', path: '/owner-dashboard/maintenance' },
    { icon: <Shield size={20} />, text: 'Security', path: '/owner-dashboard/security' },
    { icon: <FileText size={20} />, text: 'Documents', path: '/owner-dashboard/documents' },
    { icon: <MessageSquare size={20} />, text: 'Communications', path: '/owner-dashboard/communications' },
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
                <Building size={20} className="text-blue-700" />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">Society Owner</p>
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
                  to="/owner-dashboard/settings"
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
          <h1 className="text-xl font-bold">Owner Dashboard</h1>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<OwnerDashboardHome />} />
            <Route path="/residents" element={<ResidentManagement />} />
            {/* Additional routes for other dashboard sections */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;