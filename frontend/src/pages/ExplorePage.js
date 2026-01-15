import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FiFilter, FiSearch } from 'react-icons/fi';
import PlaceCard from '../components/PlaceCard';
import CrowdIndicator from '../components/CrowdIndicator';
import { api } from '../utils/api';

const ExplorePage = () => {
  const { city } = useParams();
  const location = useLocation();
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [crowdData, setCrowdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'All',
    'Monument',
    'Beach',
    'Park',
    'Museum',
    'Temple',
    'Market',
    'Food'
  ];

  useEffect(() => {
    fetchPlaces();
  }, [city]);

  useEffect(() => {
    filterPlaces();
  }, [places, selectedCategory, searchTerm]);

  useEffect(() => {
    if (selectedPlace) {
      fetchCrowdData(selectedPlace._id);
    }
  }, [selectedPlace]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const data = await api.getPlacesByCity(city);
      setPlaces(data);
      if (data.length > 0) {
        setSelectedPlace(data[0]);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlaces = () => {
    let filtered = places;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPlaces(filtered);
  };

  const fetchCrowdData = async (placeId) => {
    try {
      const data = await api.predictCrowd(placeId, new Date().toISOString());
      setCrowdData(data);
    } catch (error) {
      console.error('Error fetching crowd data:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading places...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Explore {city}</h1>
        <p className="text-gray-600 mb-8">
          {places.length} tourist places found
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Filters and Selected Place */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-6 sticky top-4">
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FiFilter /> Filter by Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Place Details */}
              {selectedPlace && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">{selectedPlace.name}</h3>

                  {crowdData && (
                    <div className="mb-6">
                      <CrowdIndicator
                        crowdScore={crowdData.crowd_score}
                        crowdLevel={crowdData.crowd_level}
                      />
                    </div>
                  )}

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Category:</span>{' '}
                      {selectedPlace.category}
                    </p>
                    <p>
                      <span className="font-medium">Open:</span>{' '}
                      {selectedPlace.openTime} - {selectedPlace.closeTime}
                    </p>
                    <p>
                      <span className="font-medium">Avg Visit:</span>{' '}
                      {selectedPlace.avgVisitDuration} mins
                    </p>
                    <p>
                      <span className="font-medium">Rating:</span>{' '}
                      {selectedPlace.rating.toFixed(1)} ⭐
                    </p>
                    {selectedPlace.entryFee && (
                      <p>
                        <span className="font-medium">Entry Fee:</span> ₹
                        {selectedPlace.entryFee}
                      </p>
                    )}
                  </div>

                  {selectedPlace.description && (
                    <p className="text-xs text-gray-600 mt-4">
                      {selectedPlace.description}
                    </p>
                  )}

                  <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add to Itinerary
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Places Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard
                  key={place._id}
                  place={place}
                  onSelect={() => setSelectedPlace(place)}
                  isSelected={selectedPlace?._id === place._id}
                />
              ))}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No places found matching your criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
