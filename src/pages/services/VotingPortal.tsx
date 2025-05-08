import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Vote, Check, AlertTriangle, Users, BarChart, Calendar, ChevronDown, ChevronUp, Filter, Search, RefreshCw, Plus, Trophy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Mock poll data
const mockPolls = [
  { 
    id: 1, 
    title: 'Installation of EV Charging Stations', 
    description: 'Proposal to install electric vehicle charging stations in the parking area. The estimated cost is ₹5,00,000 and will be divided among all residents.',
    startDate: '2025-05-01',
    endDate: '2025-05-15',
    status: 'Active',
    votedOption: null,
    options: [
      { id: 1, text: 'Yes, approve installation', votes: 45 },
      { id: 2, text: 'No, reject proposal', votes: 15 }
    ],
    totalVotes: 60,
    totalEligibleVoters: 120,
    createdBy: 'Society Management'
  },
  { 
    id: 2, 
    title: 'Selection of New Security Agency', 
    description: 'Choose from the following security agencies for the next contract period.',
    startDate: '2025-05-05',
    endDate: '2025-05-20',
    status: 'Active',
    votedOption: 1,
    options: [
      { id: 1, text: 'SecureGuard Solutions', votes: 32 },
      { id: 2, text: 'SafeHomes Security', votes: 28 },
      { id: 3, text: 'Elite Protection Services', votes: 15 }
    ],
    totalVotes: 75,
    totalEligibleVoters: 120,
    createdBy: 'Society Management'
  },
  { 
    id: 3, 
    title: 'Garden Renovation', 
    description: 'Proposal to renovate the society garden with new plants, walkways, and seating areas.',
    startDate: '2025-04-10',
    endDate: '2025-04-25',
    status: 'Completed',
    votedOption: 2,
    options: [
      { id: 1, text: 'Japanese Garden Style', votes: 25 },
      { id: 2, text: 'Modern Minimalist Design', votes: 42 },
      { id: 3, text: 'Child-friendly Play Area', votes: 38 }
    ],
    totalVotes: 105,
    totalEligibleVoters: 120,
    createdBy: 'Society Management',
    winningOption: 2
  }
];

// Poll categories
const pollCategories = [
  'Infrastructure', 'Maintenance', 'Security', 'Events', 'Financial', 'General'
];

const VotingPortal = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('active');
  const [polls, setPolls] = useState(mockPolls);
  const [showNewPollForm, setShowNewPollForm] = useState(false);
  const [expandedPoll, setExpandedPoll] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New poll form state
  const [pollTitle, setPollTitle] = useState('');
  const [pollDescription, setDescription] = useState('');
  const [pollCategory, setPollCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  const togglePollDetails = (id: number) => {
    if (expandedPoll === id) {
      setExpandedPoll(null);
    } else {
      setExpandedPoll(id);
    }
  };

  const handleVote = (pollId: number, optionId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to vote');
      return;
    }

    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        if (poll.votedOption !== null) {
          toast.error('You have already voted in this poll');
          return poll;
        }

        const updatedOptions = poll.options.map(option => {
          if (option.id === optionId) {
            return { ...option, votes: option.votes + 1 };
          }
          return option;
        });

        return {
          ...poll,
          votedOption: optionId,
          options: updatedOptions,
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    });

    setPolls(updatedPolls);
    toast.success('Your vote has been recorded');
  };

  const handleAddOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handleRemoveOption = (index: number) => {
    if (pollOptions.length <= 2) {
      toast.error('At least two options are required');
      return;
    }
    const newOptions = [...pollOptions];
    newOptions.splice(index, 1);
    setPollOptions(newOptions);
  };

  const handleChangeOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmitPoll = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to create a poll');
      return;
    }

    if (!pollTitle || !pollDescription || !startDate || !endDate || !pollCategory) {
      toast.error('Please fill all required fields');
      return;
    }

    const validOptions = pollOptions.filter(option => option.trim() !== '');
    if (validOptions.length < 2) {
      toast.error('At least two valid options are required');
      return;
    }

    // In a real app, this would be an API call
    toast.success('Your poll has been submitted for approval');
    resetPollForm();
  };

  const resetPollForm = () => {
    setPollTitle('');
    setDescription('');
    setPollCategory('');
    setStartDate('');
    setEndDate('');
    setPollOptions(['', '']);
    setShowNewPollForm(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (percent: number) => {
    if (percent < 25) return 'bg-red-500';
    if (percent < 50) return 'bg-orange-500';
    if (percent < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const filteredPolls = polls.filter(poll => {
    if (activeTab === 'active' && poll.status !== 'Active') return false;
    if (activeTab === 'completed' && poll.status !== 'Completed') return false;
    if (filterStatus && poll.status !== filterStatus) return false;
    if (searchQuery && !poll.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Society Voting Portal</h1>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('active');
              setShowNewPollForm(false);
            }}
          >
            Active Polls
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'completed'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('completed');
              setShowNewPollForm(false);
            }}
          >
            Completed Polls
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'new'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setActiveTab('new');
              setShowNewPollForm(true);
            }}
          >
            Create Poll
          </button>
        </div>

        {/* Poll listing */}
        {(activeTab === 'active' || activeTab === 'completed') && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{activeTab === 'active' ? 'Active' : 'Completed'} Polls</h2>
              <button
                onClick={() => {
                  setActiveTab('new');
                  setShowNewPollForm(true);
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Create New Poll
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
                    placeholder="Search polls..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  {activeTab === 'active' && (
                    <div className="relative w-40">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 appearance-none"
                      >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Upcoming">Upcoming</option>
                      </select>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Filter size={18} className="text-gray-400" />
                      </div>
                    </div>
                  )}

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

            {/* Polls list */}
            {filteredPolls.length === 0 ? (
              <div className="text-center py-12">
                <Vote size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Polls Found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || filterStatus 
                    ? "No polls match your search criteria." 
                    : activeTab === 'active'
                      ? "There are no active polls at the moment."
                      : "There are no completed polls."}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('new');
                    setShowNewPollForm(true);
                  }}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Create New Poll
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPolls.map((poll) => (
                  <div key={poll.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-start">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(poll.status)}`}>
                              {poll.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mt-2">{poll.title}</h3>
                          <div className="flex items-center text-sm mt-1">
                            <Calendar size={16} className="text-gray-400 mr-2" />
                            <span>
                              {poll.startDate} to {poll.endDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="text-sm text-gray-500">
                            <span>{poll.totalVotes}</span> of <span>{poll.totalEligibleVoters}</span> votes
                          </div>
                          <div className="w-full md:w-32 h-2 bg-gray-200 rounded-full mt-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(poll.totalVotes / poll.totalEligibleVoters * 100)}`} 
                              style={{ width: `${(poll.totalVotes / poll.totalEligibleVoters * 100)}%` }}
                            ></div>
                          </div>
                          <button
                            onClick={() => togglePollDetails(poll.id)}
                            className="mt-3 text-blue-700 hover:text-blue-800 text-sm font-medium flex items-center"
                          >
                            {expandedPoll === poll.id ? (
                              <>Hide Details <ChevronUp size={16} className="ml-1" /></>
                            ) : (
                              <>View Details <ChevronDown size={16} className="ml-1" /></>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expandedPoll === poll.id && (
                        <div className="mt-6 pt-4 border-t">
                          <p className="text-gray-700 mb-6">{poll.description}</p>

                          {poll.status === 'Completed' ? (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-4">Results</h4>
                              {poll.options.map((option) => {
                                const percent = Math.round((option.votes / poll.totalVotes) * 100) || 0;
                                return (
                                  <div key={option.id} className="mb-4">
                                    <div className="flex justify-between items-center mb-1">
                                      <div className="flex items-center">
                                        <span className="text-sm font-medium">
                                          {option.text}
                                          {poll.winningOption === option.id && (
                                            <span className="ml-2 inline-flex items-center text-yellow-600">
                                              <Trophy size={16} className="mr-1" /> Winner
                                            </span>
                                          )}
                                        </span>
                                      </div>
                                      <span className="text-sm font-medium">{percent}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                      <div 
                                        className={`h-2 rounded-full ${poll.winningOption === option.id ? 'bg-yellow-500' : 'bg-blue-500'}`}
                                        style={{ width: `${percent}%` }}
                                      ></div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      {option.votes} votes
                                      {poll.votedOption === option.id && (
                                        <span className="ml-2 text-green-600">(Your vote)</span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-4">Vote</h4>
                              {poll.options.map((option) => (
                                <div key={option.id} className="mb-3">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => handleVote(poll.id, option.id)}
                                      disabled={poll.votedOption !== null || !isAuthenticated}
                                      className={`w-full p-3 border rounded-md flex justify-between items-center ${
                                        poll.votedOption === option.id
                                          ? 'bg-green-50 border-green-500 text-green-700'
                                          : poll.votedOption !== null
                                            ? 'bg-gray-50 border-gray-300 text-gray-700 cursor-not-allowed'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                      }`}
                                    >
                                      <span>{option.text}</span>
                                      {poll.votedOption === option.id && (
                                        <Check size={20} className="text-green-600" />
                                      )}
                                    </button>
                                  </div>
                                </div>
                              ))}
                              
                              {poll.votedOption !== null && (
                                <div className="bg-green-50 border border-green-100 p-3 rounded-md mt-4 flex items-start">
                                  <Check size={20} className="text-green-600 mr-2 flex-shrink-0" />
                                  <p className="text-sm text-green-700">
                                    Your vote has been recorded. Thank you for participating!
                                  </p>
                                </div>
                              )}
                              
                              {!isAuthenticated && (
                                <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-md mt-4 flex items-start">
                                  <AlertTriangle size={20} className="text-yellow-600 mr-2 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm text-yellow-700 font-medium">
                                      Please login to vote
                                    </p>
                                    <Link 
                                      to="/login" 
                                      className="text-sm text-blue-700 hover:underline mt-1 inline-block"
                                    >
                                      Login to your account
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-6 pt-4 border-t text-sm text-gray-500">
                            <p>Poll created by: {poll.createdBy}</p>
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

        {/* New poll form */}
        {activeTab === 'new' && showNewPollForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Create New Poll</h2>
              <button
                onClick={() => setShowNewPollForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmitPoll} className="space-y-6">
              <div>
                <label htmlFor="pollTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Poll Title *
                </label>
                <input
                  type="text"
                  id="pollTitle"
                  value={pollTitle}
                  onChange={(e) => setPollTitle(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter a clear and specific question"
                  required
                />
              </div>

              <div>
                <label htmlFor="pollDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="pollDescription"
                  value={pollDescription}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Provide context and information about the poll"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="pollCategory" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="pollCategory"
                    value={pollCategory}
                    onChange={(e) => setPollCategory(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select category</option>
                    {pollCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Poll Options *
                  </label>
                  <button
                    type="button"
                    onClick={handleAddOption}
                    className="text-sm text-blue-700 hover:text-blue-800 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Option
                  </button>
                </div>
                <div className="space-y-3">
                  {pollOptions.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleChangeOption(index, e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder={`Option ${index + 1}`}
                          required
                        />
                      </div>
                      {index > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveOption(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Minimum 2 options are required</p>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-md flex items-start">
                <Users size={20} className="text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  All society residents are eligible to vote. One vote per resident account is allowed. Poll results will be visible to all residents after the poll ends.
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-b border-gray-200 py-4 my-4">
                <div className="flex items-center">
                  <ThumbsUp size={20} className="text-green-600 mr-2" />
                  <div>
                    <p className="font-medium">Poll will be reviewed before publishing</p>
                    <p className="text-sm text-gray-500">Society admins will review and approve your poll</p>
                  </div>
                </div>
                <BarChart size={24} className="text-blue-700" />
              </div>

              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md">
                  <p className="text-sm text-yellow-700 font-medium mb-2">
                    Please log in to create a poll
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
                  onClick={() => setShowNewPollForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 flex items-center"
                  disabled={!isAuthenticated}
                >
                  <Vote size={16} className="mr-2" />
                  Submit Poll
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingPortal;