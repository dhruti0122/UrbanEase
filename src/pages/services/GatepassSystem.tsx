import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Clock, Plus, Camera, AlarmCheck, QrCode, Filter, Search, RefreshCw, Download, Shield, Edit, Trash, CheckCircle, AlertTriangle, X, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Mock gatepass data
const mockVisitors = [
  { 
    id: 1, 
    name: 'John Smith', 
    type: 'Guest',
    purpose: 'Personal Visit',
    arrivalDate: '2025-05-10',
    arrivalTime: '14:30',
    departureDate: '2025-05-10',
    departureTime: '18:00',
    status: 'Approved',
    entryTime: null,
    exitTime: null,
    contactNumber: '9876543210',
    vehicleNumber: '',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    qrCode: 'GP1234567',
  },
  { 
    id: 2, 
    name: 'Service Electrician', 
    type: 'Service Provider',
    purpose: 'Electrical Repair',
    arrivalDate: '2025-05-08',
    arrivalTime: '10:00',
    departureDate: '2025-05-08',
    departureTime: '12:00',
    status: 'Completed',
    entryTime: '10:05',
    exitTime: '11:55',
    contactNumber: '9876543211',
    vehicleNumber: 'MH 01 AB 1234',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    qrCode: 'GP7654321',
  },
  { 
    id: 3, 
    name: 'Courier Delivery', 
    type: 'Delivery',
    purpose: 'Package Delivery',
    arrivalDate: '2025-05-15',
    arrivalTime: '11:00',
    departureDate: '2025-05-15',
    departureTime: '11:30',
    status: 'Pending',
    entryTime: null,
    exitTime: null,
    contactNumber: '9876543212',
    vehicleNumber: 'MH 02 CD 5678',
    photo: '',
    qrCode: 'GP9876543',
  }
];

// Mock domestic help data
const mockDomesticHelp = [
  {
    id: 1,
    name: 'Sarah Johnson',
    type: 'Maid',
    workingDays: ['Monday', 'Wednesday', 'Friday'],
    arrivalTime: '08:00',
    departureTime: '11:00',
    contactNumber: '9876543213',
    status: 'Active',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    qrCode: 'DH1234567',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    type: 'Cook',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    arrivalTime: '19:00',
    departureTime: '21:00',
    contactNumber: '9876543214',
    status: 'Active',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    qrCode: 'DH7654321',
  }
];

// Visitor types
const visitorTypes = [
  'Guest', 'Service Provider', 'Delivery', 'Taxi', 'Other'
];

// Domestic help types
const domesticHelpTypes = [
  'Maid', 'Cook', 'Driver', 'Gardener', 'Nanny', 'Other'
];

// Days of week
const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const GatepassSystem = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('visitors');
  const [visitors, setVisitors] = useState(mockVisitors);
  const [domesticHelp, setDomesticHelp] = useState(mockDomesticHelp);
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [showDomesticHelpForm, setShowDomesticHelpForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState<number | null>(null);
  
  // Visitor form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorType, setVisitorType] = useState('');
  const [visitorPurpose, setVisitorPurpose] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  
  // Domestic help form state
  const [helpName, setHelpName] = useState('');
  const [helpType, setHelpType] = useState('');
  const [helpContact, setHelpContact] = useState('');
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [helpArrivalTime, setHelpArrivalTime] = useState('');
  const [helpDepartureTime, setHelpDepartureTime] = useState('');

  const handleViewVisitor = (id: number) => {
    setSelectedVisitor(id);
  };

  const handleSubmitVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to create a visitor pass');
      return;
    }

    if (!visitorName || !visitorType || !arrivalDate || !arrivalTime) {
      toast.error('Please fill all required fields');
      return;
    }

    const newVisitor = {
      id: visitors.length + 1,
      name: visitorName,
      type: visitorType,
      purpose: visitorPurpose,
      arrivalDate,
      arrivalTime,
      departureDate: departureDate || arrivalDate,
      departureTime,
      status: 'Pending',
      entryTime: null,
      exitTime: null,
      contactNumber,
      vehicleNumber,
      photo: '',
      qrCode: `GP${Math.floor(Math.random() * 10000000)}`,
    };

    setVisitors([newVisitor, ...visitors]);
    toast.success('Visitor pass created successfully!');
    resetVisitorForm();
  };
  
  const handleSubmitDomesticHelp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to register domestic help');
      return;
    }

    if (!helpName || !helpType || !helpContact || workingDays.length === 0 || !helpArrivalTime || !helpDepartureTime) {
      toast.error('Please fill all required fields');
      return;
    }

    const newHelp = {
      id: domesticHelp.length + 1,
      name: helpName,
      type: helpType,
      workingDays,
      arrivalTime: helpArrivalTime,
      departureTime: helpDepartureTime,
      contactNumber: helpContact,
      status: 'Active',
      photo: '',
      qrCode: `DH${Math.floor(Math.random() * 10000000)}`,
    };

    setDomesticHelp([newHelp, ...domesticHelp]);
    toast.success('Domestic help registered successfully!');
    resetDomesticHelpForm();
  };

  const resetVisitorForm = () => {
    setVisitorName('');
    setVisitorType('');
    setVisitorPurpose('');
    setArrivalDate('');
    setArrivalTime('');
    setDepartureDate('');
    setDepartureTime('');
    setContactNumber('');
    setVehicleNumber('');
    setShowVisitorForm(false);
  };
  
  const resetDomesticHelpForm = () => {
    setHelpName('');
    setHelpType('');
    setHelpContact('');
    setWorkingDays([]);
    setHelpArrivalTime('');
    setHelpDepartureTime('');
    setShowDomesticHelpForm(false);
  };

  const toggleWorkingDay = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Completed':
        return <CheckCircle size={16} className="text-blue-600" />;
      case 'Pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'Active':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'Inactive':
        return <X size={16} className="text-gray-600" />;
      default:
        return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    if (filterStatus && visitor.status !== filterStatus) return false;
    if (searchQuery && !visitor.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredDomesticHelp = domesticHelp.filter(help => {
    if (filterStatus && help.status !== filterStatus) return false;
    if (searchQuery && !help.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Gatepass System</h1>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'visitors'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('visitors');
              setShowVisitorForm(false);
              setShowDomesticHelpForm(false);
              setSelectedVisitor(null);
            }}
          >
            Visitor Passes
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'domestic'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('domestic');
              setShowVisitorForm(false);
              setShowDomesticHelpForm(false);
              setSelectedVisitor(null);
            }}
          >
            Domestic Help
          </button>
        </div>

        {/* Visitor passes section */}
        {activeTab === 'visitors' && !showVisitorForm && selectedVisitor === null && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Visitor Passes</h2>
              <button
                onClick={() => {
                  setShowVisitorForm(true);
                  setSelectedVisitor(null);
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Create New Pass
              </button>
            </div>

            {/* Filters and search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search visitors..."
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
                      <option value="Approved">Approved</option>
                      <option value="Completed">Completed</option>
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

            {/* Visitors list */}
            {filteredVisitors.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Visitor Passes Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || filterStatus 
                    ? "No visitor passes match your search criteria." 
                    : "You haven't created any visitor passes yet."}
                </p>
                <button
                  onClick={() => setShowVisitorForm(true)}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Create New Pass
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVisitors.map((visitor) => (
                  <div key={visitor.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(visitor.status)}`}>
                            <span className="mr-1">{getStatusIcon(visitor.status)}</span>
                            {visitor.status}
                          </span>
                          <h3 className="text-lg font-semibold mt-2">{visitor.name}</h3>
                          <p className="text-sm text-gray-500">{visitor.type}</p>
                        </div>
                        {visitor.photo ? (
                          <img 
                            src={visitor.photo} 
                            alt={visitor.name} 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users size={20} className="text-gray-500" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <span>{visitor.arrivalDate}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="text-gray-400 mr-2" />
                          <span>{visitor.arrivalTime} - {visitor.departureTime}</span>
                        </div>
                        {visitor.purpose && (
                          <div className="text-sm">
                            <span className="text-gray-500">Purpose:</span> {visitor.purpose}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleViewVisitor(visitor.id)}
                          className="text-blue-700 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                        {visitor.status === 'Approved' && (
                          <button className="text-sm text-blue-700 hover:text-blue-800 flex items-center">
                            <QrCode size={16} className="mr-1" />
                            Show QR
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Visitor details view */}
        {activeTab === 'visitors' && selectedVisitor !== null && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header with back button */}
            {(() => {
              const visitor = visitors.find(v => v.id === selectedVisitor);
              if (!visitor) return null;
              
              return (
                <>
                  <div className="bg-blue-700 text-white p-6">
                    <button
                      onClick={() => setSelectedVisitor(null)}
                      className="mb-4 flex items-center text-white hover:text-blue-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                      <span className="ml-2">Back to All Passes</span>
                    </button>
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-2xl font-bold">{visitor.name}</h2>
                        <p className="opacity-90">{visitor.type}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        visitor.status === 'Approved' 
                          ? 'bg-green-900 text-green-100' 
                          : visitor.status === 'Completed'
                            ? 'bg-blue-900 text-blue-100'
                            : 'bg-yellow-900 text-yellow-100'
                      }`}>
                        {visitor.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Left column: Visitor info */}
                      <div className="md:col-span-2 space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Visitor Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Purpose</p>
                              <p className="font-medium">{visitor.purpose || 'Not specified'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Contact Number</p>
                              <p className="font-medium">{visitor.contactNumber || 'Not provided'}</p>
                            </div>
                            {visitor.vehicleNumber && (
                              <div>
                                <p className="text-sm text-gray-500">Vehicle Number</p>
                                <p className="font-medium">{visitor.vehicleNumber}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-4">Visit Details</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Arrival Date</p>
                              <p className="font-medium">{visitor.arrivalDate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Arrival Time</p>
                              <p className="font-medium">{visitor.arrivalTime}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Departure Date</p>
                              <p className="font-medium">{visitor.departureDate || 'Same day'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Departure Time</p>
                              <p className="font-medium">{visitor.departureTime || 'Not specified'}</p>
                            </div>
                          </div>
                        </div>

                        {(visitor.entryTime || visitor.exitTime) && (
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Access Logs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {visitor.entryTime && (
                                <div>
                                  <p className="text-sm text-gray-500">Entry Time</p>
                                  <p className="font-medium">{visitor.entryTime}</p>
                                </div>
                              )}
                              {visitor.exitTime && (
                                <div>
                                  <p className="text-sm text-gray-500">Exit Time</p>
                                  <p className="font-medium">{visitor.exitTime}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right column: Photo & QR */}
                      <div>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                          <div className="text-center">
                            {visitor.photo ? (
                              <img 
                                src={visitor.photo} 
                                alt={visitor.name} 
                                className="h-32 w-32 rounded-full object-cover mx-auto"
                              />
                            ) : (
                              <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                                <Users size={48} className="text-gray-500" />
                              </div>
                            )}
                            <p className="text-sm text-gray-500 mt-2">Visitor Photo</p>
                          </div>

                          {visitor.status === 'Approved' && (
                            <div className="text-center mt-4">
                              <div className="bg-white p-3 rounded-lg inline-block">
                                <QrCode size={120} className="text-blue-700 mx-auto" />
                              </div>
                              <p className="text-sm text-gray-500 mt-2">QR Code: {visitor.qrCode}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                      {visitor.status === 'Pending' && (
                        <>
                          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                            <Edit size={16} className="mr-2" />
                            Edit
                          </button>
                          <button className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 flex items-center">
                            <Trash size={16} className="mr-2" />
                            Cancel Pass
                          </button>
                        </>
                      )}
                      {visitor.status === 'Approved' && (
                        <>
                          <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center">
                            <Send size={16} className="mr-2" />
                            Share Pass
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                            <Download size={16} className="mr-2" />
                            Download
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* New visitor form */}
        {activeTab === 'visitors' && showVisitorForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create Visitor Pass</h2>
              <button
                onClick={() => setShowVisitorForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmitVisitor} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="visitorName" className="block text-sm font-medium text-gray-700 mb-1">
                    Visitor Name *
                  </label>
                  <input
                    type="text"
                    id="visitorName"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter visitor name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="visitorType" className="block text-sm font-medium text-gray-700 mb-1">
                    Visitor Type *
                  </label>
                  <select
                    id="visitorType"
                    value={visitorType}
                    onChange={(e) => setVisitorType(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select visitor type</option>
                    {visitorTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Date *
                  </label>
                  <input
                    type="date"
                    id="arrivalDate"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="arrivalTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Time *
                  </label>
                  <input
                    type="time"
                    id="arrivalTime"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave blank for same day visit</p>
                </div>

                <div>
                  <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Time
                  </label>
                  <input
                    type="time"
                    id="departureTime"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="visitorPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose of Visit
                  </label>
                  <input
                    type="text"
                    id="visitorPurpose"
                    value={visitorPurpose}
                    onChange={(e) => setVisitorPurpose(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter purpose of visit"
                  />
                </div>

                <div>
                  <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter contact number"
                  />
                </div>

                <div>
                  <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Number (if any)
                  </label>
                  <input
                    type="text"
                    id="vehicleNumber"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter vehicle number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visitor Photo (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Camera size={32} className="mx-auto text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a photo</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  <p className="text-sm text-yellow-700 font-medium mb-2">
                    Please log in to create a visitor pass
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
                  onClick={() => setShowVisitorForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
                  disabled={!isAuthenticated}
                >
                  <AlarmCheck size={16} className="mr-2" />
                  Create Pass
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Domestic help section */}
        {activeTab === 'domestic' && !showDomesticHelpForm && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Domestic Help</h2>
              <button
                onClick={() => setShowDomesticHelpForm(true)}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Register New Help
              </button>
            </div>

            {/* Filters and search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search domestic help..."
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
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
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

            {/* Domestic help list */}
            {filteredDomesticHelp.length === 0 ? (
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Domestic Help Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || filterStatus 
                    ? "No records match your search criteria." 
                    : "You haven't registered any domestic help yet."}
                </p>
                <button
                  onClick={() => setShowDomesticHelpForm(true)}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Register New Help
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDomesticHelp.map((help) => (
                  <div key={help.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(help.status)}`}>
                            <span className="mr-1">{getStatusIcon(help.status)}</span>
                            {help.status}
                          </span>
                          <h3 className="text-lg font-semibold mt-2">{help.name}</h3>
                          <p className="text-sm text-gray-500">{help.type}</p>
                        </div>
                        {help.photo ? (
                          <img 
                            src={help.photo} 
                            alt={help.name} 
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users size={20} className="text-gray-500" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <Calendar size={16} className="text-gray-400 mr-2" />
                          <span>{help.workingDays.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock size={16} className="text-gray-400 mr-2" />
                          <span>{help.arrivalTime} - {help.departureTime}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Contact:</span> {help.contactNumber}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <button className="text-blue-700 hover:text-blue-800 text-sm font-medium">
                          Edit Details
                        </button>
                        <button className="text-sm text-blue-700 hover:text-blue-800 flex items-center">
                          <QrCode size={16} className="mr-1" />
                          Show QR
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* New domestic help form */}
        {activeTab === 'domestic' && showDomesticHelpForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Register Domestic Help</h2>
              <button
                onClick={() => setShowDomesticHelpForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmitDomesticHelp} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="helpName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="helpName"
                    value={helpName}
                    onChange={(e) => setHelpName(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="helpType" className="block text-sm font-medium text-gray-700 mb-1">
                    Help Type *
                  </label>
                  <select
                    id="helpType"
                    value={helpType}
                    onChange={(e) => setHelpType(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select help type</option>
                    {domesticHelpTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="helpContact" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="helpContact"
                    value={helpContact}
                    onChange={(e) => setHelpContact(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter contact number"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Working Days *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="flex items-center">
                        <input
                          id={`day-${day}`}
                          type="checkbox"
                          checked={workingDays.includes(day)}
                          onChange={() => toggleWorkingDay(day)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`day-${day}`} className="ml-2 block text-sm text-gray-700">
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="helpArrivalTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival Time *
                  </label>
                  <input
                    type="time"
                    id="helpArrivalTime"
                    value={helpArrivalTime}
                    onChange={(e) => setHelpArrivalTime(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="helpDepartureTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Departure Time *
                  </label>
                  <input
                    type="time"
                    id="helpDepartureTime"
                    value={helpDepartureTime}
                    onChange={(e) => setHelpDepartureTime(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <Camera size={32} className="mx-auto text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="help-photo-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a photo</span>
                          <input id="help-photo-upload" name="help-photo-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-4 flex items-start">
                <Shield size={20} className="text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  For security reasons, registered domestic help will be issued an authorized QR code that they must present at the gate for entry.
                </p>
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  <p className="text-sm text-yellow-700 font-medium mb-2">
                    Please log in to register domestic help
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
                  onClick={() => setShowDomesticHelpForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
                  disabled={!isAuthenticated}
                >
                  <Users size={16} className="mr-2" />
                  Register
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GatepassSystem;