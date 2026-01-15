import React, { useState } from 'react';
import { FiMapPin, FiStar, FiDollarSign } from 'react-icons/fi';

const PlaceCard = ({ place, onSelect, isSelected }) => {
  const getDistanceColor = (distance) => {
    if (distance < 1) return 'text-green-600';
    if (distance < 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      {place.imageUrl && (
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{place.name}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FiMapPin size={16} />
            <span>{place.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiStar size={16} className="text-yellow-500" />
            <span className="font-medium">{place.rating.toFixed(1)}</span>
            <span className="text-gray-600">({place.category})</span>
          </div>

          {place.entryFee && (
            <div className="flex items-center gap-2 text-gray-600">
              <FiDollarSign size={16} />
              <span>₹{place.entryFee}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-xs">
              ⏱ {place.avgVisitDuration} mins
            </span>
          </div>
        </div>

        {place.distance && (
          <div className={`mt-3 text-sm font-medium ${getDistanceColor(place.distance)}`}>
            {place.distance.toFixed(1)} km away
          </div>
        )}

        {place.crowdLevel && (
          <div className="mt-3 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit">
            {place.crowdLevel}
          </div>
        )}

        {isSelected && (
          <div className="mt-3 text-xs text-blue-600 font-medium">
            ✓ Selected
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
