import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar, ArrowLeft, ArrowRight, Info, Play, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Facility types with images
const facilityTypes = [
  {
    id: 1,
    name: 'Clubhouse',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'Perfect for parties and events with a fully equipped kitchen and audio system.',
    pricing: 'Residents: ₹2,000 for 4 hours | Non-residents: ₹5,000 for 4 hours',
    capacity: 'Up to 50 people',
    availableTimeSlots: ['10:00 AM - 2:00 PM', '3:00 PM - 7:00 PM', '8:00 PM - 12:00 AM']
  },
  {
    id: 2,
    name: 'Swimming Pool',
    image: 'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'Olympic-sized swimming pool with dedicated lanes and a lifeguard on duty.',
    pricing: 'Residents: Free | Guests: ₹200 per visit',
    capacity: 'Up to 30 people',
    availableTimeSlots: ['6:00 AM - 9:00 AM', '10:00 AM - 1:00 PM', '4:00 PM - 8:00 PM']
  },
  {
    id: 3,
    name: 'Gym',
    image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'Modern gym with cardio equipment, weights, and personal trainers available.',
    pricing: 'Residents: ₹500 monthly | Pay-per-use: ₹100 per visit',
    capacity: 'Up to 20 people',
    availableTimeSlots: ['5:00 AM - 10:00 PM (Open all day)']
  },
  {
    id: 4,
    name: 'Tennis Court',
    image: 'https://images.pexels.com/photos/2171277/pexels-photo-2171277.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'Professional-grade tennis court with lighting for evening play.',
    pricing: 'Residents: ₹200 per hour | Non-residents: ₹500 per hour',
    capacity: '4 players',
    availableTimeSlots: ['6:00 AM - 10:00 AM', '4:00 PM - 10:00 PM']
  }
];

// Mock bookings data
const mockBookings = [
  { id: 1, facilityId: 1, date: '2025-05-10', timeSlot: '3:00 PM - 7:00 PM', status: 'Confirmed' },
  { id: 2, facilityId: 2, date: '2025-05-12', timeSlot: '6:00 AM - 9:00 AM', status: 'Pending' },
  { id: 3, facilityId: 3, date: '2025-05-15', timeSlot: '5:00 AM - 10:00 PM', status: 'Confirmed' }
];

const FacilityBooking = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('facilities');
  const [selectedFacility, setSelectedFacility] = useState<number | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [bookings, setBookings] = useState(mockBookings);
  
  // Generate week days for the calendar
  const weekStart = startOfWeek(new Date());
  const weekDays = Array.from({length: 14}, (_, i) => addDays(weekStart, i));

  const handleFacilitySelect = (id: number) => {
    setSelectedFacility(id);
    setBookingStep(1);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleNextStep = () => {
    if (bookingStep === 1) {
      if (!selectedDate || !selectedTimeSlot) {
        toast.error('Please select both date and time');
        return;
      }
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (!isAuthenticated) {
        toast.error('Please login to complete booking');
        return;
      }
      // Add new booking
      const newBooking = {
        id: bookings.length + 1,
        facilityId: selectedFacility || 0,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTimeSlot,
        status: 'Pending'
      };
      setBookings([...bookings, newBooking]);
      toast.success('Booking request submitted successfully!');
      setActiveTab('bookings');
      resetBookingForm();
    }
  };

  const resetBookingForm = () => {
    setSelectedFacility(null);
    setSelectedDate(new Date());
    setSelectedTimeSlot('');
    setNumGuests(1);
    setPurpose('');
    setBookingStep(1);
  };

  const cancelBooking = (id: number) => {
    setBookings(bookings.filter(booking => booking.id !== id));
    toast.success('Booking cancelled successfully!');
  };

  const getFacilityById = (id: number) => {
    return facilityTypes.find(facility => facility.id === id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Facility Booking</h1>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'facilities'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('facilities')}
          >
            Available Facilities
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            Your Bookings
          </button>
        </div>

        {/* Facilities listing */}
        {activeTab === 'facilities' && !selectedFacility && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilityTypes.map((facility) => (
              <div key={facility.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                  <p className="text-gray-600 mb-4">{facility.description}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleFacilitySelect(facility.id)}
                      className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => handleFacilitySelect(facility.id)}
                      className="text-blue-700 hover:underline"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Facility booking process */}
        {activeTab === 'facilities' && selectedFacility && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Facility header */}
            <div className="relative h-64">
              <img 
                src={getFacilityById(selectedFacility)?.image} 
                alt={getFacilityById(selectedFacility)?.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <button 
                    onClick={() => setSelectedFacility(null)}
                    className="mb-2 text-white flex items-center hover:underline"
                  >
                    <ArrowLeft size={16} className="mr-1" /> Back to facilities
                  </button>
                  <h2 className="text-2xl font-bold">{getFacilityById(selectedFacility)?.name}</h2>
                </div>
              </div>
            </div>

            {/* Booking steps */}
            <div className="p-6">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                        bookingStep >= 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        1
                      </div>
                      <div className="ml-2 text-sm font-medium">Select Date & Time</div>
                    </div>
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${bookingStep >= 2 ? 'bg-blue-700' : 'bg-gray-200'}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                        bookingStep >= 2 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        2
                      </div>
                      <div className="ml-2 text-sm font-medium">Confirm Details</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 1: Select Date & Time */}
              {bookingStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
                  
                  {/* Calendar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-medium">Available Dates</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <ArrowLeft size={16} />
                        </button>
                        <button className="p-1 rounded-full hover:bg-gray-100">
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex overflow-x-auto space-x-2 pb-4">
                      {weekDays.map((day, index) => {
                        const isSelected = format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day)}
                            className={`flex flex-col items-center p-3 rounded-lg min-w-[70px] ${
                              isSelected 
                                ? 'bg-blue-700 text-white' 
                                : 'bg-white border border-gray-200 hover:border-blue-500'
                            }`}
                          >
                            <span className="text-xs">{format(day, 'EEE')}</span>
                            <span className="text-lg font-bold">{format(day, 'd')}</span>
                            <span className="text-xs">{format(day, 'MMM')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium mb-4">Available Time Slots</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {getFacilityById(selectedFacility)?.availableTimeSlots.map((slot, index) => {
                        const isBooked = bookings.some(
                          b => b.facilityId === selectedFacility && 
                              format(selectedDate, 'yyyy-MM-dd') === b.date && 
                              b.timeSlot === slot
                        );
                        return (
                          <button
                            key={index}
                            onClick={() => !isBooked && handleTimeSlotSelect(slot)}
                            disabled={isBooked}
                            className={`p-3 rounded-lg border ${
                              isBooked 
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                                : selectedTimeSlot === slot
                                  ? 'bg-blue-700 text-white border-blue-700'
                                  : 'bg-white border-gray-200 hover:border-blue-500'
                            }`}
                          >
                            <span className="block text-center">{slot}</span>
                            {isBooked && (
                              <span className="block text-center text-xs mt-1">Already Booked</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Confirm Details */}
              {bookingStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Confirm Booking Details</h3>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Facility</p>
                        <p className="font-medium">{getFacilityById(selectedFacility)?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time</p>
                        <p className="font-medium">{selectedTimeSlot}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Pricing</p>
                        <p className="font-medium">{getFacilityById(selectedFacility)?.pricing}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Guests
                      </label>
                      <select
                        id="guests"
                        value={numGuests}
                        onChange={(e) => setNumGuests(Number(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {Array.from({length: 20}, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                        Purpose of Booking
                      </label>
                      <textarea
                        id="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Brief description of your event or purpose"
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-md mb-6 flex items-start">
                    <Info size={20} className="text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-700">
                      Your booking will be reviewed by the society management. You will receive a confirmation notification once approved. Payment details will be provided after approval.
                    </p>
                  </div>

                  {!isAuthenticated && (
                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md mb-6">
                      <p className="text-sm text-yellow-700 font-medium mb-2">
                        Please log in to complete your booking
                      </p>
                      <Link 
                        to="/login" 
                        className="text-sm text-blue-700 hover:underline"
                      >
                        Login to your account
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-between mt-8">
                {bookingStep > 1 ? (
                  <button
                    onClick={() => setBookingStep(bookingStep - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  {bookingStep === 2 ? 'Confirm Booking' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings listing */}
        {activeTab === 'bookings' && (
          <div>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Bookings Yet</h3>
                <p className="text-gray-500 mb-6">You haven't made any facility bookings yet.</p>
                <button
                  onClick={() => setActiveTab('facilities')}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Book a Facility
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const facility = getFacilityById(booking.facilityId);
                  return (
                    <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/4 h-48 md:h-auto">
                          <img 
                            src={facility?.image} 
                            alt={facility?.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-3/4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{facility?.name}</h3>
                              <p className="text-gray-500">{booking.date} | {booking.timeSlot}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 md:gap-4 text-sm mb-4">
                            <div className="flex items-center">
                              <Calendar size={16} className="text-gray-500 mr-1" />
                              <span>Booked on {booking.date}</span>
                            </div>
                            {booking.status === 'Confirmed' && (
                              <div className="flex items-center">
                                <CheckCircle size={16} className="text-green-500 mr-1" />
                                <span>Confirmed</span>
                              </div>
                            )}
                            {booking.status === 'Pending' && (
                              <div className="flex items-center">
                                <Play size={16} className="text-yellow-500 mr-1" />
                                <span>Awaiting Confirmation</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              {booking.status === 'Confirmed' && (
                                <Link 
                                  to="#"
                                  className="text-blue-700 hover:underline mr-4"
                                >
                                  View Details
                                </Link>
                              )}
                              {booking.status === 'Pending' && (
                                <button
                                  onClick={() => cancelBooking(booking.id)}
                                  className="text-red-700 hover:underline flex items-center"
                                >
                                  <X size={16} className="mr-1" />
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                            {booking.status === 'Confirmed' && (
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Payment Status</p>
                                <p className="font-medium text-green-700">Paid</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityBooking;