import React, { useState, useEffect } from 'react';
import ItineraryCard from '../components/ItineraryCard';
import { api } from '../utils/api';
import { FiPlus } from 'react-icons/fi';

const ItineraryPage = ({ userId }) => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchItineraries();
    }
  }, [userId]);

  const fetchItineraries = async () => {
    try {
      setLoading(true);
      const data = await api.getUserItinerary(userId);
      setItineraries(data);
    } catch (error) {
      console.error('Error fetching itineraries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplan = async (itineraryId) => {
    try {
      const updated = await api.replanItinerary(itineraryId);
      setItineraries(itineraries.map(i => i._id === itineraryId ? updated : i));
      alert('Itinerary replanned successfully!');
    } catch (error) {
      console.error('Error replanning itinerary:', error);
      alert('Failed to replan itinerary');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading itineraries...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Itineraries</h1>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
            <FiPlus /> Create New Itinerary
          </button>
        </div>

        {itineraries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">
              You haven't created any itineraries yet
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Create Your First Itinerary
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itineraries.map((itinerary) => (
              <ItineraryCard
                key={itinerary._id}
                itinerary={itinerary}
                onReplan={handleReplan}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPage;
