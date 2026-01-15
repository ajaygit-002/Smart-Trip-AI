import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import { api } from '../utils/api';

const HomePage = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const popularCities = [
    'Hyderabad',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata'
  ];

  const handleExplore = async (selectedCity) => {
    setLoading(true);
    try {
      const places = await api.getPlacesByCity(selectedCity);
      navigate(`/explore/${selectedCity}`, { state: { places } });
    } catch (error) {
      console.error('Error exploring city:', error);
      alert('Failed to load places. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="text-center text-white mb-12">
          <h1 className="text-5xl font-bold mb-4">
            🎯 Tourist Crowd Predictor
          </h1>
          <p className="text-xl text-blue-100 mb-2">
            Discover places with less crowd
          </p>
          <p className="text-lg text-blue-100">
            Plan your perfect trip with real-time crowd insights
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleExplore(city)}
              disabled={!city || loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 transition-colors"
            >
              <FiArrowRight /> {loading ? 'Loading...' : 'Explore'}
            </button>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600 font-medium">Popular Cities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {popularCities.map((popularCity) => (
              <button
                key={popularCity}
                onClick={() => handleExplore(popularCity)}
                disabled={loading}
                className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FiMapPin size={18} />
                <span>{popularCity}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <p className="text-3xl mb-2">📊</p>
            <h3 className="font-semibold mb-2">Real-Time Predictions</h3>
            <p className="text-sm text-gray-600">
              Get accurate crowd forecasts for your favorite places
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <p className="text-3xl mb-2">📍</p>
            <h3 className="font-semibold mb-2">Smart Alternatives</h3>
            <p className="text-sm text-gray-600">
              Find nearby places when your first choice is crowded
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 text-center shadow-lg">
            <p className="text-3xl mb-2">🗺️</p>
            <h3 className="font-semibold mb-2">Auto Itinerary Replan</h3>
            <p className="text-sm text-gray-600">
              Your schedule adjusts automatically based on crowd levels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
