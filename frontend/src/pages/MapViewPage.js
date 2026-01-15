import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiTrendingUp,
  FiFilter,
  FiX,
} from "react-icons/fi";
import CrowdMap from "../components/CrowdMap";
import { api } from "../utils/api";

const MapViewPage = () => {
  const { city } = useParams();
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCrowdLevel, setSelectedCrowdLevel] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Monument",
    "Beach",
    "Park",
    "Museum",
    "Temple",
    "Market",
    "Food",
  ];
  const crowdLevels = ["All", "Low", "Medium", "High", "Very High"];

  useEffect(() => {
    fetchPlaces();
  }, [city]);

  useEffect(() => {
    applyFilters();
  }, [places, selectedCategory, selectedCrowdLevel, searchTerm]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const data = await api.getPlacesByCity(city);
      setPlaces(data);
      if (data.length > 0) {
        setSelectedPlace(data[0]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = places;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by crowd level
    if (selectedCrowdLevel !== "All") {
      filtered = filtered.filter((p) => p.crowdLevel === selectedCrowdLevel);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPlaces(filtered);
  };

  const getCrowdColor = (crowdLevel) => {
    switch (crowdLevel) {
      case "Low":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "High":
        return "text-orange-600 bg-orange-50";
      case "Very High":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getCrowdBadgeColor = (crowdLevel) => {
    switch (crowdLevel) {
      case "Low":
        return "bg-green-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-gray-900";
      case "High":
        return "bg-orange-500 text-white";
      case "Very High":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-white shadow-sm overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Map Explorer</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Toggle filters"
            >
              <FiFilter className="text-gray-600" size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            {city} • {filteredPlaces.length} places
          </p>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 border-b border-gray-200 p-6">
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      selectedCategory === cat
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Crowd Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Crowd Level
              </label>
              <div className="space-y-2">
                {crowdLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedCrowdLevel(level)}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition ${
                      selectedCrowdLevel === level
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Places List */}
        <div className="p-6 space-y-3">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading places...</p>
            </div>
          ) : filteredPlaces.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No places found</p>
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <button
                key={place._id}
                onClick={() => setSelectedPlace(place)}
                className={`w-full p-4 rounded-lg border-2 transition text-left ${
                  selectedPlace?._id === place._id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getCrowdBadgeColor(
                      place.crowdLevel
                    )}`}
                  >
                    {place.crowdLevel}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3 flex items-center gap-1">
                  <FiMapPin size={12} />
                  {place.address}
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div
                    className={`p-2 rounded ${getCrowdColor(place.crowdLevel)}`}
                  >
                    <div className="font-semibold">
                      {place.crowdScore?.toFixed(0) || 0}%
                    </div>
                    <div className="text-xs">Crowd</div>
                  </div>
                  <div className="p-2 rounded bg-purple-50">
                    <div className="font-semibold text-purple-600">
                      ⭐ {place.rating || "N/A"}
                    </div>
                    <div className="text-xs text-purple-600">Rating</div>
                  </div>
                  <div className="p-2 rounded bg-blue-50">
                    <div className="font-semibold text-blue-600">
                      ${place.entryFee || "Free"}
                    </div>
                    <div className="text-xs text-blue-600">Fee</div>
                  </div>
                </div>

                {place.openingHours && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600 flex items-center gap-1">
                    <FiClock size={12} />
                    {place.openingHours}
                  </div>
                )}

                {place.description && (
                  <p className="mt-3 text-xs text-gray-600 line-clamp-2">
                    {place.description}
                  </p>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Map View */}
      <div className="flex-1 relative">
        <CrowdMap
          places={filteredPlaces.length > 0 ? filteredPlaces : places}
          selectedPlace={selectedPlace}
          onPlaceSelect={setSelectedPlace}
          city={city}
        />

        {/* Place Details Panel */}
        {selectedPlace && (
          <div className="absolute top-6 left-6 bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 z-20">
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition"
            >
              <FiX className="text-gray-600" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-4 pr-6">
              {selectedPlace.name}
            </h2>

            {/* Crowd Status */}
            <div
              className={`p-4 rounded-lg mb-4 ${getCrowdColor(
                selectedPlace.crowdLevel
              )}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Current Crowd Status</span>
                <FiUsers className="text-lg" />
              </div>
              <div className="text-2xl font-bold">
                {selectedPlace.crowdScore?.toFixed(0) || 0}%
              </div>
              <div className="text-sm">{selectedPlace.crowdLevel}</div>
            </div>

            {/* Details Grid */}
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Rating</p>
                  <p className="text-lg font-bold text-gray-900">
                    ⭐ {selectedPlace.rating || "N/A"}/5
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Entry Fee</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${selectedPlace.entryFee || "Free"}
                  </p>
                </div>
              </div>

              {selectedPlace.category && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Category</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {selectedPlace.category}
                  </p>
                </div>
              )}

              {selectedPlace.address && (
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiMapPin size={12} /> Address
                  </p>
                  <p className="text-sm text-gray-900">
                    {selectedPlace.address}
                  </p>
                </div>
              )}

              {selectedPlace.openingHours && (
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <FiClock size={12} /> Hours
                  </p>
                  <p className="text-sm text-gray-900">
                    {selectedPlace.openingHours}
                  </p>
                </div>
              )}
            </div>

            {selectedPlace.description && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-600 mb-1">About</p>
                <p className="text-sm text-gray-900">
                  {selectedPlace.description}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
              Add to Itinerary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapViewPage;
