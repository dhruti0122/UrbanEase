import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CreditCard, CalendarClock, ChevronDown, ChevronUp, Download, Check, ExternalLink, RefreshCw, FileText, Filter, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Mock payment data
const mockPayments = [
  { 
    id: 1, 
    type: 'Maintenance',
    description: 'Monthly maintenance fee for May 2025',
    amount: 5000,
    dueDate: '2025-05-15',
    status: 'Pending',
    createdAt: '2025-05-01'
  },
  { 
    id: 2, 
    type: 'Water Bill',
    description: 'Water charges for April 2025',
    amount: 850,
    dueDate: '2025-05-20',
    status: 'Pending',
    createdAt: '2025-05-02'
  },
  { 
    id: 3, 
    type: 'Electricity',
    description: 'Common area electricity for March 2025',
    amount: 1200,
    dueDate: '2025-04-15',
    status: 'Paid',
    createdAt: '2025-03-30',
    paidAt: '2025-04-10',
    transactionId: 'TX12345678'
  },
  { 
    id: 4, 
    type: 'Parking',
    description: 'Additional parking spot fee for April 2025',
    amount: 500,
    dueDate: '2025-04-30',
    status: 'Paid',
    createdAt: '2025-04-01',
    paidAt: '2025-04-25',
    transactionId: 'TX87654321'
  }
];

// Payment types
const paymentTypes = [
  'Maintenance', 'Water Bill', 'Electricity', 'Parking', 'Club Membership', 'Special Levy', 'Repair Fund'
];

const PaymentMethods = () => {
  return (
    <div className="space-y-6 mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
        <button className="text-blue-700 text-sm hover:underline flex items-center">
          <CreditCard size={16} className="mr-1" />
          Add New Card
        </button>
      </div>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-md p-4 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-blue-50">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="5" width="32" height="21" rx="3" fill="#016FD0"/>
                  <path d="M15.1817 21.4458H11.8042V10.5542H15.1817V21.4458Z" fill="white"/>
                  <path d="M12.1533 15.9998C12.1533 14.156 13.0063 12.5383 14.3146 11.6467C13.5763 11.048 12.6495 10.6968 11.6363 10.6968C8.98425 10.6968 6.83325 13.0717 6.83325 15.9998C6.83325 18.9279 8.98425 21.3028 11.6363 21.3028C12.6495 21.3028 13.5763 20.9516 14.3146 20.3528C13.0063 19.4613 12.1533 17.8435 12.1533 15.9998Z" fill="white"/>
                  <path d="M23.0534 16.0002C23.0534 18.9283 20.9024 21.3033 18.2505 21.3033C17.2373 21.3033 16.3102 20.9521 15.5721 20.3532C16.8804 19.4612 17.7334 17.8439 17.7334 16.0002C17.7334 14.1565 16.8804 12.5387 15.5721 11.6472C16.3102 11.0483 17.2373 10.6972 18.2505 10.6972C20.9024 10.6972 23.0534 13.0721 23.0534 16.0002Z" fill="white"/>
                  <path d="M22.186 21.4458H18.8085V10.5542H22.186V21.4458Z" fill="white"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-500">Expires 12/28</p>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Default
              </span>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-md p-4 bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-green-50">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="5" width="32" height="21" rx="3" fill="#F7F7F7"/>
                  <path d="M20.8533 16.0001C20.8533 18.0617 19.18 19.7334 17.1167 19.7334C15.0533 19.7334 13.38 18.0617 13.38 16.0001C13.38 13.9384 15.0533 12.2667 17.1167 12.2667C19.18 12.2667 20.8533 13.9384 20.8533 16.0001Z" fill="#EB001B"/>
                  <path d="M20.8533 16.0001C20.8533 18.0617 19.18 19.7334 17.1167 19.7334C15.0533 19.7334 13.38 18.0617 13.38 16.0001C13.38 13.9384 15.0533 12.2667 17.1167 12.2667C19.18 12.2667 20.8533 13.9384 20.8533 16.0001Z" fill="#EB001B"/>
                  <path d="M17.1166 19.7334C19.18 19.7334 20.8533 18.0617 20.8533 16.0001C20.8533 13.9384 19.18 12.2667 17.1166 12.2667" fill="#F79E1B"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.3799 16.0001C13.3799 13.9384 15.0533 12.2667 17.1166 12.2667C19.18 12.2667 20.8533 13.9384 20.8533 16.0001C20.8533 18.0617 19.18 19.7334 17.1166 19.7334C15.0533 19.7334 13.3799 18.0617 13.3799 16.0001Z" fill="#FF5F00"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.88 22.7267H22.12V9.27344H15.88V22.7267Z" fill="#FF5F00"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.2067 16.0001C16.2067 14.4117 16.96 12.9951 18.1467 12.1334C17.1067 11.3867 15.8133 11.0001 14.4533 11.0001C10.88 11.0001 8 13.1817 8 16.0001C8 18.8184 10.88 21.0001 14.4533 21.0001C15.8133 21.0001 17.1067 20.6134 18.1467 19.8667C16.96 19.0051 16.2067 17.5884 16.2067 16.0001Z" fill="#EB001B"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M24 16.0001C24 18.8184 21.12 21.0001 17.5467 21.0001C16.1867 21.0001 14.8933 20.6134 13.8533 19.8667C15.04 19.0051 15.7933 17.5884 15.7933 16.0001C15.7933 14.4117 15.04 12.9951 13.8533 12.1334C14.8933 11.3867 16.1867 11.0001 17.5467 11.0001C21.12 11.0001 24 13.1817 24 16.0001Z" fill="#F79E1B"/>
                </svg>
              </div>
              <div className="ml-4">
                <p className="font-medium">•••• •••• •••• 5678</p>
                <p className="text-sm text-gray-500">Expires 03/27</p>
              </div>
            </div>
            <div>
              <button className="text-red-700 text-sm hover:underline">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Other Payment Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="border border-gray-200 rounded-md p-4 bg-white hover:bg-gray-50 flex items-center">
            <div className="p-2 rounded-md bg-gray-100 mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0002 0H2.00016C0.900156 0 0 0.900156 0 2.00016V16.0002C0 17.1003 0.900156 18 2.00016 18H16.0002C17.1003 18 18 17.1003 18 16.0002V2.00016C18 0.900156 17.1003 0 16.0002 0Z" fill="#6200EA"/>
                <path d="M15.9998 17.9996H1.99984C0.899844 17.9996 0 18.8994 0 19.9994V21.9996C0 23.0997 0.899844 23.9995 1.99984 23.9995H15.9998C17.0999 23.9995 17.9997 23.0997 17.9997 21.9996V19.9994C17.9997 18.8994 17.0999 17.9996 15.9998 17.9996Z" fill="#3700B3"/>
                <path d="M23.9999 1.99984V15.9998C23.9999 17.0999 23.1001 17.9997 22.0001 17.9997H20C18.8999 17.9997 18.0001 17.0999 18.0001 15.9998V1.99984C18.0001 0.899844 18.8999 0 20 0H22.0001C23.1001 0 23.9999 0.899844 23.9999 1.99984Z" fill="#AE00FF"/>
                <path d="M24 19.9994V21.9996C24 23.0997 23.1002 23.9995 22.0001 23.9995H20C18.8999 23.9995 18.0001 23.0997 18.0001 21.9996V19.9994C18.0001 18.8994 18.8999 17.9996 20 17.9996H22.0001C23.1002 17.9996 24 18.8994 24 19.9994Z" fill="#7C4DFF"/>
                </svg>
            </div>
            <div className="text-left">
              <p className="font-medium">UPI Payment</p>
              <p className="text-sm text-gray-500">Pay using any UPI app</p>
            </div>
          </button>
          <button className="border border-gray-200 rounded-md p-4 bg-white hover:bg-gray-50 flex items-center">
            <div className="p-2 rounded-md bg-gray-100 mr-3">
              <FileText size={24} className="text-gray-600" />
            </div>
            <div className="text-left">
              <p className="font-medium">Bank Transfer</p>
              <p className="text-sm text-gray-500">Pay via direct bank transfer</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentHistory = () => {
  const [expandedPayment, setExpandedPayment] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const togglePaymentDetails = (id: number) => {
    if (expandedPayment === id) {
      setExpandedPayment(null);
    } else {
      setExpandedPayment(id);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayments = mockPayments.filter(payment => {
    if (filterStatus && payment.status !== filterStatus) return false;
    if (searchQuery && !payment.type.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
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
              placeholder="Search payments..."
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
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
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

      {/* Payments list */}
      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <div key={payment.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-start">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mt-2">{payment.type}</h3>
                  <p className="text-sm text-gray-500">{payment.description}</p>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <p className="text-lg font-bold">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                  </div>
                  <button
                    onClick={() => togglePaymentDetails(payment.id)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    {expandedPayment === payment.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {expandedPayment === payment.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Payment Date</p>
                      <p className="font-medium">{payment.paidAt || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transaction ID</p>
                      <p className="font-medium">{payment.transactionId || '-'}</p>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {payment.status === 'Pending' && (
                      <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center">
                        <CreditCard size={16} className="mr-2" />
                        Pay Now
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                      <Download size={16} className="mr-2" />
                      Download Receipt
                    </button>
                    {payment.status === 'Paid' && (
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center">
                        <ExternalLink size={16} className="mr-2" />
                        View Transaction
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PaymentPortal = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dues');
  const [showNewPayment, setShowNewPayment] = useState(false);
  
  // New payment form state
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const pendingPayments = mockPayments.filter(payment => payment.status === 'Pending');
  const totalDue = pendingPayments.reduce((total, payment) => total + payment.amount, 0);

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to make payments');
      return;
    }

    if (!paymentType || !amount) {
      toast.error('Please fill all required fields');
      return;
    }

    toast.success('Payment processed successfully!');
    resetForm();
  };

  const resetForm = () => {
    setPaymentType('');
    setAmount('');
    setDescription('');
    setShowNewPayment(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Payment Portal</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Due</p>
                <p className="text-2xl font-bold mt-1">₹{totalDue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <DollarSign size={20} className="text-red-600" />
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('dues');
                setShowNewPayment(false);
              }}
              className="mt-4 text-sm text-blue-700 flex items-center hover:underline"
            >
              View Pending Dues <ChevronDown size={14} className="ml-1" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">Payment Methods</p>
                <p className="text-2xl font-bold mt-1">2</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <CreditCard size={20} className="text-blue-600" />
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('methods');
                setShowNewPayment(false);
              }}
              className="mt-4 text-sm text-blue-700 flex items-center hover:underline"
            >
              Manage Payment Methods <ChevronDown size={14} className="ml-1" />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Due Date</p>
                <p className="text-2xl font-bold mt-1">15 May</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <CalendarClock size={20} className="text-yellow-600" />
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('schedule');
                setShowNewPayment(false);
              }}
              className="mt-4 text-sm text-blue-700 flex items-center hover:underline"
            >
              Set Payment Reminders <ChevronDown size={14} className="ml-1" />
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'dues'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('dues');
              setShowNewPayment(false);
            }}
          >
            Pending Dues
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('history');
              setShowNewPayment(false);
            }}
          >
            Payment History
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'methods'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('methods');
              setShowNewPayment(false);
            }}
          >
            Payment Methods
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dues' && !showNewPayment && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Pending Dues</h2>
              <button
                onClick={() => setShowNewPayment(true)}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
              >
                <DollarSign size={16} className="mr-2" />
                Make a Payment
              </button>
            </div>
            
            {pendingPayments.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Check size={24} />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Pending Payments</h3>
                <p className="text-gray-500 mb-6">You are up to date with all your payments.</p>
                <button
                  onClick={() => setShowNewPayment(true)}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Make a Voluntary Payment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="md:flex md:justify-between md:items-center">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Due: {payment.dueDate}
                        </span>
                        <h3 className="text-lg font-semibold mt-2">{payment.type}</h3>
                        <p className="text-sm text-gray-500">{payment.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center">
                        <p className="text-xl font-bold mr-4">₹{payment.amount.toLocaleString()}</p>
                        <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'dues' && showNewPayment && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Make a Payment</h2>
              <button
                onClick={() => setShowNewPayment(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              <div>
                <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type *
                </label>
                <select
                  id="paymentType"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select payment type</option>
                  {paymentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (₹) *
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="any"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Add a note (optional)"
                ></textarea>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6 flex items-start">
                <Check size={20} className="text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Your payment details are secure. We use industry-standard encryption to protect your information.
                </p>
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  <p className="text-sm text-yellow-700 font-medium mb-2">
                    Please log in to make payments
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
                  onClick={() => setShowNewPayment(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
                  disabled={!isAuthenticated}
                >
                  <CreditCard size={16} className="mr-2" />
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'history' && (
          <PaymentHistory />
        )}

        {activeTab === 'methods' && (
          <PaymentMethods />
        )}
      </div>
    </div>
  );
};

export default PaymentPortal;