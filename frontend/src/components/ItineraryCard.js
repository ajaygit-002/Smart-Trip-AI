import React, { useState, useEffect } from 'react';
import { FiMapPin, FiClock, FiUsers } from 'react-icons/fi';
import { api } from '../utils/api';

const ItineraryCard = ({ itinerary, onReplan }) => {
  const [expanded, setExpanded] = useState(false);

  const handleReplan = async () => {
    try {
      await onReplan(itinerary._id);
    } catch (error) {
      console.error('Error replanning itinerary:', error);
    }
  };

  const getCrowdColor = (crowdLevel) => {
    switch (crowdLevel) {
      case 'Low':
        return 'text-green-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'High':
        return 'text-orange-600';
      case 'Very High':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">
            {new Date(itinerary.date).toLocaleDateString()}
          </h3>
          <p className="text-sm text-gray-500">
            {itinerary.places.length} places planned
          </p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800"
        >
          {expanded ? 'Hide' : 'View'}
        </button>
      </div>

      {expanded && (
        <div className="space-y-3 mt-4">
          {itinerary.places.map((place, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium">{place.placeId?.name || 'Unknown Place'}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <FiClock size={16} />
                      <span>{place.plannedTime}</span>
                    </div>
                    <div className={`flex items-center gap-1 font-medium ${getCrowdColor(place.predictedCrowd)}`}>
                      <FiUsers size={16} />
                      <span>{place.predictedCrowd}</span>
                    </div>
                  </div>
                </div>
                <span className="bg-gray-100 px-3 py-1 rounded text-sm">
                  #{place.order}
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={handleReplan}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Replan Itinerary
          </button>

          <p className="text-xs text-gray-500 mt-2">
            Auto-replanned {itinerary.autoReplanCount} times
          </p>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;
