import React, { useState } from 'react';
import { FiMapPin, FiStar, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

const AlternativeCard = ({ place, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">{place.name}</h3>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded mt-1">
            {place.category}
          </span>
        </div>
        <button
          onClick={onSelect}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
          title="Choose this place"
        >
          <FiCheckCircle size={20} />
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <FiMapPin size={16} className="text-blue-600" />
          <span className="font-medium text-blue-600">{place.distance.toFixed(1)} km</span>
          <span className="text-gray-600">away</span>
        </div>

        <div className="flex items-center gap-2">
          <FiStar size={16} className="text-yellow-500" />
          <span className="font-medium">{place.rating.toFixed(1)}</span>
          <span className="text-gray-600">rating</span>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
          <p className="text-xs font-medium text-gray-700 mb-1">Current Crowd</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    place.crowdScore <= 25
                      ? 'bg-green-500'
                      : place.crowdScore <= 50
                      ? 'bg-yellow-500'
                      : place.crowdScore <= 75
                      ? 'bg-orange-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${place.crowdScore}%` }}
                ></div>
              </div>
            </div>
            <span className="text-xs font-bold">{place.crowdScore.toFixed(0)}%</span>
          </div>
          <p className="text-xs mt-1 font-medium">{place.crowdLevel}</p>
        </div>

        {place.entryFee && (
          <div className="flex items-center gap-2 text-gray-600 border-t pt-2 mt-2">
            <FiDollarSign size={16} />
            <span>₹{place.entryFee} entry fee</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlternativeCard;
