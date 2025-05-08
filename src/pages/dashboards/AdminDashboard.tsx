import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Home, Users, DollarSign, FileText, Settings, LogOut, Bell, Building, User, Calendar, BarChart, AlertTriangle, MessageSquare, Shield, Database, ShieldAlert, UserPlus, Layers, PenTool as Tool, Plus, Search, ChevronDown, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Dashboard components
const AdminDashboardHome = () => {
  const stats = [
    { 
      title: 'Total Societies', 
      value: '24', 
      change: '+2', 
      status: 'increase',
      icon: <Building size={20} className="text-blue-500" />
    },
    { 
      title: 'Total Users', 
      value: '2,845', 
      change: '+125', 
      status: 'increase',
      icon: <Users size={20} className="text-green-500" />
    },
    { 
      title: 'Average Uptime', 
      value: '99.9%', 
      change: '+0.2%', 
      status: 'increase',
      icon: <Activity size={20} className="text-purple-500" />
    },
    { 
      title: 'Support Tickets', 
      value: '18', 
      change: '-3', 
      status: 'decrease',
      icon: <AlertTriangle size={20} className="text-orange-500" />
    }
  ];

  const recentSocieties = [
    { id: 1, name: 'Sunshine Apartments', location: 'New York', units: 120, status: 'Active', date: '2025-04-25' },
    { id: 2, name: 'Green Valley Society', location: 'San Francisco', units: 85, status: 'Active', date: '2025-04-28' },
    { id: 3, name: 'Riverdale Heights', location: 'Chicago', units: 150, status: 'Pending', date: '2025-05-01' }
  ];

  const activeIssues = [
    { id: 1, society: 'Sunshine Apartments', issue: 'Payment Gateway Error', priority: 'High', status: 'Open' },
    { id: 2, society: 'Green Valley Society', issue: 'Database Sync Issue', priority: 'Medium', status: 'In Progress' },
    { id: 3, society: 'Riverdale Heights', issue: 'User Authentication Problem', priority: 'Critical', status: 'Open' }
  ];

  const recentUpdates = [
    { type: 'System', message: 'Database optimization completed successfully', time: '2 hours ago' },
    { type: 'Security', message: 'New security patch deployed', time: '6 hours ago' },
    { type: 'Feature', message: 'Voting module enhancements released', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
            <Plus size={16} className="mr-2" />
            Add New Society
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
                stat.title === 'Support Tickets' ? 'bg-orange-50' : 'bg-blue-50'
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
        {/* Recently Added Societies */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recently Added Societies</h2>
            <Link to="/admin-dashboard/societies" className="text-sm text-blue-700">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Society Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSocieties.map((society) => (
                  <tr key={society.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                          <Building size={16} />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{society.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{society.location}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{society.units}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        society.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {society.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {society.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Updates */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">System Updates</h2>
            <Link to="/admin-dashboard/system" className="text-sm text-blue-700">View All</Link>
          </div>
          <div className="space-y-4">
            {recentUpdates.map((update, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center mb-1">
                  <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full ${
                    update.type === 'Security' 
                      ? 'bg-red-100 text-red-600' 
                      : update.type === 'Feature'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                  }`}>
                    {update.type === 'Security' ? <Shield size={14} /> : 
                     update.type === 'Feature' ? <Tool size={14} /> : 
                     <Database size={14} />}
                  </span>
                  <span className="ml-2 font-medium">{update.type} Update</span>
                </div>
                <p className="text-sm text-gray-600">{update.message}</p>
                <p className="text-xs text-gray-500 mt-1">{update.time}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
            Run System Check
          </button>
        </div>
      </div>

      {/* Active Issues */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Issues</h2>
          <Link to="/admin-dashboard/issues" className="text-sm text-blue-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Society</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeIssues.map((issue) => (
                <tr key={issue.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{issue.society}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{issue.issue}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.priority === 'Critical' 
                        ? 'bg-red-100 text-red-800' 
                        : issue.priority === 'High'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      issue.status === 'Open' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-700 hover:text-blue-900">Assign</button>
                    <span className="mx-1">|</span>
                    <button className="text-green-700 hover:text-green-900">Resolve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center text-center">
          <UserPlus size={24} className="text-blue-700 mb-2" />
          <span className="text-sm font-medium">Add New Admin</span>
        </button>
        <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center text-center">
          <Building size={24} className="text-green-700 mb-2" />
          <span className="text-sm font-medium">Create Society</span>
        </button>
        <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center text-center">
          <Database size={24} className="text-purple-700 mb-2" />
          <span className="text-sm font-medium">Database Backup</span>
        </button>
        <button className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg flex flex-col items-center text-center">
          <ShieldAlert size={24} className="text-orange-700 mb-2" />
          <span className="text-sm font-medium">Security Audit</span>
        </button>
      </div>
    </div>
  );
};

const SocietyManagement = () => {
  const societies = [
    { id: 1, name: 'Sunshine Apartments', location: 'New York', units: 120, status: 'Active', date: '2025-03-15' },
    { id: 2, name: 'Green Valley Society', location: 'San Francisco', units: 85, status: 'Active', date: '2025-03-28' },
    { id: 3, name: 'Riverdale Heights', location: 'Chicago', units: 150, status: 'Pending', date: '2025-04-10' },
    { id: 4, name: 'Blue Horizon Towers', location: 'Miami', units: 200, status: 'Active', date: '2025-01-20' },
    { id: 5, name: 'Mountain View Residency', location: 'Denver', units: 75, status: 'Active', date: '2025-02-05' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Society Management</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
          <Plus size={16} className="mr-2" />
          Add New Society
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
              placeholder="Search societies..."
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none pr-10">
              <option value="">Filter by Location</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Chicago">Chicago</option>
              <option value="Miami">Miami</option>
              <option value="Denver">Denver</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none pr-10">
              <option value="">Filter by Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Societies Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Society Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {societies.map((society) => (
                <tr key={society.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                        <Building size={16} />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{society.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{society.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{society.units}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      society.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {society.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {society.date}
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

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarLinks = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/admin-dashboard' },
    { icon: <Building size={20} />, text: 'Societies', path: '/admin-dashboard/societies' },
    { icon: <Users size={20} />, text: 'Users', path: '/admin-dashboard/users' },
    { icon: <DollarSign size={20} />, text: 'Billing', path: '/admin-dashboard/billing' },
    { icon: <BarChart size={20} />, text: 'Analytics', path: '/admin-dashboard/analytics' },
    { icon: <AlertTriangle size={20} />, text: 'Issues', path: '/admin-dashboard/issues' },
    { icon: <Database size={20} />, text: 'System', path: '/admin-dashboard/system' },
    { icon: <Shield size={20} />, text: 'Security', path: '/admin-dashboard/security' },
    { icon: <FileText size={20} />, text: 'Reports', path: '/admin-dashboard/reports' },
    { icon: <Layers size={20} />, text: 'API', path: '/admin-dashboard/api' },
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
                <ShieldAlert size={20} className="text-blue-700" />
              </div>
              <div className="ml-3">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">Admin</p>
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
                  to="/admin-dashboard/settings"
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
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<AdminDashboardHome />} />
            <Route path="/societies" element={<SocietyManagement />} />
            {/* Additional routes for other dashboard sections */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;