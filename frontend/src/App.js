import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ItineraryPage from './pages/ItineraryPage';
import NotificationPanel from './components/NotificationPanel';
import { initializeSocket, joinRoom } from './utils/socket';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize WebSocket
    const socket = initializeSocket();

    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      joinRoom(userData.id);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">
              🎯 Crowd Predictor
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              {user && (
                <>
                  <a href="/my-itineraries" className="text-gray-700 hover:text-blue-600 transition-colors">
                    My Itineraries
                  </a>
                  <div className="flex items-center gap-4 border-l pl-6">
                    <NotificationPanel userId={user.id} />
                    <span className="text-sm text-gray-600">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-red-600 transition-colors flex items-center gap-1"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                </>
              )}
              {!user && (
                <button
                  onClick={() => setUser({ id: 'demo-user', name: 'Demo User' })}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-gray-50 border-t p-4 space-y-3">
              <a href="/" className="block text-gray-700 hover:text-blue-600">
                Home
              </a>
              {user && (
                <>
                  <a href="/my-itineraries" className="block text-gray-700 hover:text-blue-600">
                    My Itineraries
                  </a>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:text-red-800 py-2"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <button
                  onClick={() => setUser({ id: 'demo-user', name: 'Demo User' })}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore/:city" element={<ExplorePage />} />
          <Route
            path="/my-itineraries"
            element={
              user ? (
                <ItineraryPage userId={user.id} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="mb-2">
              © 2026 Real-Time Tourist Crowd Predictor | Smart Itinerary Replanner
            </p>
            <p className="text-gray-400 text-sm">
              Helping tourists make better travel decisions with real-time crowd insights
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
