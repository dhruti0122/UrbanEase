import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, AlertTriangle, ChevronDown, ChevronUp, Search, Filter, RefreshCw, Plus, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Mock complaints data
const mockComplaints = [
  { 
    id: 1, 
    title: 'Water Leakage', 
    description: 'There is water leaking from the ceiling in the bathroom. The issue started yesterday evening.',
    category: 'Plumbing',
    status: 'In Progress',
    priority: 'High',
    date: '2025-05-01',
    updates: [
      { date: '2025-05-01', message: 'Complaint registered' },
      { date: '2025-05-02', message: 'Assigned to maintenance team' },
      { date: '2025-05-03', message: 'Technician scheduled for visit on May 5th' }
    ]
  },
  { 
    id: 2, 
    title: 'Elevator Issue', 
    description: 'The elevator in Block B is making strange noises and stops between floors sometimes.',
    category: 'Elevator',
    status: 'Resolved',
    priority: 'Critical',
    date: '2025-04-28',
    updates: [
      { date: '2025-04-28', message: 'Complaint registered' },
      { date: '2025-04-28', message: 'Assigned to elevator service team' },
      { date: '2025-04-29', message: 'Technician inspection completed' },
      { date: '2025-04-30', message: 'Issue fixed and tested' }
    ]
  },
  { 
    id: 3, 
    title: 'Street Light Not Working', 
    description: 'The street light near Block C entrance is not working for the past 3 days.',
    category: 'Electrical',
    status: 'Pending',
    priority: 'Medium',
    date: '2025-05-04',
    updates: [
      { date: '2025-05-04', message: 'Complaint registered' }
    ]
  }
];

// Category options for complaints
const categories = [
  'Electrical', 'Plumbing', 'Elevator', 'Security', 'Cleaning', 'Parking', 'Common Areas', 'Other'
];

const ComplaintSystem = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('complaints');
  const [complaints, setComplaints] = useState(mockComplaints);
  const [showForm, setShowForm] = useState(false);
  const [expandedComplaint, setExpandedComplaint] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New complaint form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [files, setFiles] = useState<FileList | null>(null);

  const toggleComplaintDetails = (id: number) => {
    if (expandedComplaint === id) {
      setExpandedComplaint(null);
    } else {
      setExpandedComplaint(id);
    }
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a complaint');
      return;
    }

    if (!title || !description || !category) {
      toast.error('Please fill all required fields');
      return;
    }

    const newComplaint = {
      id: complaints.length + 1,
      title,
      description,
      category,
      status: 'Pending',
      priority,
      date: new Date().toISOString().split('T')[0],
      updates: [
        { date: new Date().toISOString().split('T')[0], message: 'Complaint registered' }
      ]
    };

    setComplaints([newComplaint, ...complaints]);
    toast.success('Complaint submitted successfully!');
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('Medium');
    setFiles(null);
    setShowForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Resolved':
        return <CheckCircle2 size={16} className="text-green-600" />;
      case 'In Progress':
        return <RefreshCw size={16} className="text-blue-600" />;
      case 'Pending':
        return <Clock size={16} className="text-orange-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filterStatus && complaint.status !== filterStatus) return false;
    if (searchQuery && !complaint.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Complaint Management System</h1>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'complaints'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('complaints')}
          >
            Your Complaints
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'new'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('new');
              setShowForm(true);
            }}
          >
            Submit New Complaint
          </button>
        </div>

        {/* Complaints listing */}
        {activeTab === 'complaints' && (
          <div>
            {/* Filters and search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative w-40">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 appearance-none"
                    >
                      <option value="">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter size={18} className="text-gray-400" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFilterStatus('');
                      setSearchQuery('');
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Reset filters"
                  >
                    <RefreshCw size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Complaints list */}
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12">
                <AlertTriangle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Complaints Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || filterStatus 
                    ? "No complaints match your search criteria." 
                    : "You haven't submitted any complaints yet."}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('new');
                    setShowForm(true);
                  }}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Submit New Complaint
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredComplaints.map((complaint) => (
                  <div key={complaint.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-start">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority} Priority
                            </span>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {complaint.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mt-2">{complaint.title}</h3>
                          <p className="text-sm text-gray-500">Submitted on {complaint.date}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                            <span className="mr-1">{getStatusIcon(complaint.status)}</span>
                            {complaint.status}
                          </span>
                          <button
                            onClick={() => toggleComplaintDetails(complaint.id)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            {expandedComplaint === complaint.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expandedComplaint === complaint.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                            <p className="text-gray-600">{complaint.description}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Status Updates</h4>
                            <div className="border-l-2 border-blue-200 pl-4 space-y-3">
                              {complaint.updates.map((update, index) => (
                                <div key={index} className="relative">
                                  <div className="absolute -left-6 mt-1 w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                                  <p className="text-sm text-gray-600">{update.message}</p>
                                  <p className="text-xs text-gray-500">{update.date}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="mt-6 flex items-center space-x-4">
                            {complaint.status !== 'Resolved' && (
                              <button
                                className="text-red-700 hover:text-red-800 text-sm font-medium"
                              >
                                Cancel Complaint
                              </button>
                            )}
                            <button
                              className="text-blue-700 hover:text-blue-800 text-sm font-medium"
                            >
                              <Download size={16} className="inline mr-1" />
                              Download Report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* New complaint form */}
        {activeTab === 'new' && showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Submit New Complaint</h2>
            <form onSubmit={handleSubmitComplaint} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Brief title describing the issue"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Provide detailed description of the issue"
                  required
                ></textarea>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Camera size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    Drag and drop files here, or click to upload
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: JPG, PNG, PDF (Max: 5MB)
                  </p>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  <p className="text-sm text-yellow-700 font-medium mb-2">
                    Please log in to submit a complaint
                  </p>
                  <Link 
                    to="/login" 
                    className="text-sm text-blue-700 hover:underline"
                  >
                    Login to your account
                  </Link>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                  disabled={!isAuthenticated}
                >
                  <Plus size={16} className="inline mr-1" />
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintSystem;