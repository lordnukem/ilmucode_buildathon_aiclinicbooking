import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, Mail, Phone, User, Plus, Check, AlertCircle, FileText } from 'lucide-react';

export default function AIClinicBookingSystem() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedSession, setSelectedSession] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '' });
  const [sessions, setSessions] = useState([
    { id: 1, date: '2024-02-07', time: '2:00 PM - 5:00 PM', available: 10, total: 10, status: 'available', waitlist: [] },
    { id: 2, date: '2024-03-06', time: '2:00 PM - 5:00 PM', available: 7, total: 10, status: 'available', waitlist: [] },
    { id: 3, date: '2024-04-03', time: '2:00 PM - 5:00 PM', available: 0, total: 10, status: 'full', waitlist: ['John Doe', 'Jane Smith'] },
    { id: 4, date: '2024-05-01', time: '2:00 PM - 5:00 PM', available: 10, total: 10, status: 'available', waitlist: [] },
  ]);
  const [bookings, setBookings] = useState([
    { id: 1, sessionId: 2, name: 'Alice Johnson', email: 'alice@example.com', status: 'confirmed' },
    { id: 2, sessionId: 2, name: 'Bob Wilson', email: 'bob@example.com', status: 'confirmed' },
    { id: 3, sessionId: 2, name: 'Carol Davis', email: 'carol@example.com', status: 'confirmed' },
  ]);

  const facilitators = [
    { name: 'Ahmad Fadzly Effendy Mustapa', role: 'Lead Facilitator' },
    { name: 'Sarah Chen', role: 'Assistant Facilitator' },
    { name: 'Michael Brown', role: 'Assistant Facilitator' },
  ];

  const handleBooking = () => {
    if (selectedSession && bookingForm.name && bookingForm.email) {
      const newBooking = {
        id: bookings.length + 1,
        sessionId: selectedSession.id,
        name: bookingForm.name,
        email: bookingForm.email,
        status: 'confirmed',
      };

      setBookings([...bookings, newBooking]);

      const updatedSessions = sessions.map(session => {
        if (session.id === selectedSession.id) {
          if (session.available > 0) {
            return { ...session, available: session.available - 1 };
          } else {
            return { ...session, waitlist: [...session.waitlist, bookingForm.name] };
          }
        }
        return session;
      });

      setSessions(updatedSessions);
      setShowBookingModal(false);
      setBookingForm({ name: '', email: '', phone: '' });
      setSelectedSession(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available': return <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Available</span>;
      case 'full': return <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Full</span>;
      case 'waitlisted': return <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Waitlisted</span>;
      case 'confirmed': return <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Confirmed</span>;
      default: return <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-900">Upcoming Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(session => (
            <div key={session.id} className="bg-amber-50 rounded-xl border border-amber-100 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-serif font-medium text-gray-900">{session.date}</h3>
                  <p className="text-sm text-gray-600 font-sans mt-1">{session.time}</p>
                </div>
                {getStatusBadge(session.status)}
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Seats Available</span>
                  <span className="font-medium">{session.available}/{session.total}</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(session.available / session.total) * 100}%` }}
                  />
                </div>
              </div>
              {session.waitlist.length > 0 && (
                <p className="text-sm text-amber-600 mb-4">
                  Waitlist: {session.waitlist.length} people
                </p>
              )}
              <button
                onClick={() => {
                  setSelectedSession(session);
                  setShowBookingModal(true);
                }}
                className="w-full bg-amber-600 text-white py-2 px-4 rounded-full hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                {session.available > 0 ? 'Book Session' : 'Join Waitlist'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-900">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Participant</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Session</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map(booking => {
                const session = sessions.find(s => s.id === booking.sessionId);
                return (
                  <tr key={booking.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{booking.name}</p>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{session?.date}</td>
                    <td className="py-3 px-4">{getStatusBadge(booking.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBookingInterface = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-900">Book a Session</h2>
        <div className="space-y-4 mb-8">
          {sessions.map(session => (
            <div key={session.id} className="bg-amber-50 rounded-xl border border-amber-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="session"
                      id={`session-${session.id}`}
                      onChange={() => setSelectedSession(session)}
                      className="w-4 h-4 text-amber-600"
                    />
                    <label htmlFor={`session-${session.id}`} className="cursor-pointer">
                      <p className="font-serif font-medium text-gray-900">{session.date}</p>
                      <p className="text-sm text-gray-600 font-sans mt-1">{session.time}</p>
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(session.status)}
                  <span className="text-sm font-medium text-gray-700">
                    {session.available} seats available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            if (selectedSession) {
              setShowBookingModal(true);
            }
          }}
          disabled={!selectedSession}
          className="w-full bg-amber-600 text-white py-3 px-4 rounded-full hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          Continue to Registration
        </button>
      </div>
    </div>
  );

  const renderFacilitatorView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-900">Session Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sessions.map(session => {
            const sessionBookings = bookings.filter(b => b.sessionId === session.id);
            return (
              <div key={session.id} className="bg-amber-50 rounded-xl border border-amber-100 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-serif font-medium text-gray-900">{session.date}</h3>
                    <p className="text-sm text-gray-600 font-sans mt-1">{session.time}</p>
                  </div>
                  {getStatusBadge(session.status)}
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Participants ({sessionBookings.length})</p>
                  <div className="space-y-1">
                    {sessionBookings.map(booking => (
                      <div key={booking.id} className="flex justify-between text-sm">
                        <span className="text-gray-900">{booking.name}</span>
                        <span className="text-gray-600">{booking.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {session.waitlist.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Waitlist ({session.waitlist.length})</p>
                    <div className="space-y-1">
                      {session.waitlist.map((person, idx) => (
                        <div key={idx} className="text-sm text-gray-600">{person}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-900">Facilitators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilitators.map((facilitator, idx) => (
            <div key={idx} className="bg-amber-50 rounded-xl border border-amber-100 p-6">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-serif font-medium mr-3">
                  {facilitator.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-serif font-medium text-gray-900">{facilitator.name}</h3>
                  <p className="text-sm text-gray-600 font-sans">{facilitator.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-white border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-serif font-semibold text-gray-900">AI Clinic Booking System</h1>
            <nav className="flex space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 text-sm font-medium rounded-full ${
                  currentView === 'dashboard'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('booking')}
                className={`px-3 py-2 text-sm font-medium rounded-full ${
                  currentView === 'booking'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Book Session
              </button>
              <button
                onClick={() => setCurrentView('facilitator')}
                className={`px-3 py-2 text-sm font-medium rounded-full ${
                  currentView === 'facilitator'
                    ? 'bg-amber-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Facilitator View
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'booking' && renderBookingInterface()}
            {currentView === 'facilitator' && renderFacilitatorView()}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-serif font-semibold mb-4 text-gray-900">System Status</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions</span>
                  <span className="font-medium text-gray-900">{sessions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bookings</span>
                  <span className="font-medium text-gray-900">{bookings.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-serif font-semibold mb-4 text-gray-900">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-amber-100 text-amber-800 py-2 px-4 rounded-full hover:bg-amber-200 transition-colors text-sm font-medium flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Report
                </button>
                <button className="w-full bg-amber-100 text-amber-800 py-2 px-4 rounded-full hover:bg-amber-200 transition-colors text-sm font-medium flex items-center justify-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Reminders
                </button>
                <button className="w-full bg-amber-100 text-amber-800 py-2 px-4 rounded-full hover:bg-amber-200 transition-colors text-sm font-medium flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-serif font-semibold mb-4 text-gray-900">
              {selectedSession?.available > 0 ? 'Book Session' : 'Join Waitlist'}
            </h2>
            {selectedSession && (
              <p className="text-sm text-gray-600 mb-4">
                {selectedSession.date} at {selectedSession.time}
              </p>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  Name
                </label>
                <input
                  type="text"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your phone"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleBooking}
                className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-full hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                Submit
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  setBookingForm({ name: '', email: '', phone: '' });
                  setSelectedSession(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}