import React, { useState, useEffect } from 'react';
import CrowdChart from '../components/CrowdChart';
import CrowdIndicator from '../components/CrowdIndicator';
import AlternativeCard from '../components/AlternativeCard';
import { api } from '../utils/api';
import { FiCalendar, FiMapPin } from 'react-icons/fi';

const CrowdDashboard = ({ placeId }) => {
  const [crowdData, setCrowdData] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [bestTimes, setBestTimes] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [placeId, selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Get current crowd prediction
      const crowdResponse = await api.predictCrowd(placeId, selectedDate);
      setCrowdData(crowdResponse);

      // Get best times
      const bestTimesResponse = await api.getBestTimes(placeId);
      setBestTimes(bestTimesResponse);
      setPredictions(bestTimesResponse.allPredictions || []);

      // Get alternatives if crowd is high
      if (crowdResponse.crowd_score > 60) {
        const altResponse = await api.getAlternatives(placeId, 'currentCity');
        setAlternatives(altResponse.alternatives || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading crowd data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Date Picker */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <label className="flex items-center gap-2 font-medium mb-2">
          <FiCalendar /> Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Current Crowd Status */}
      {crowdData && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Current Crowd Status</h2>
          <CrowdIndicator
            crowdScore={crowdData.crowd_score}
            crowdLevel={crowdData.crowd_level}
          />
        </div>
      )}

      {/* Crowd Chart */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">24-Hour Forecast</h2>
        {predictions.length > 0 ? (
          <CrowdChart predictions={predictions} />
        ) : (
          <p className="text-gray-600 text-center py-8">No predictions available</p>
        )}
      </div>

      {/* Best & Worst Times */}
      {bestTimes && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              ✅ Best Times to Visit
            </h3>
            <div className="space-y-3">
              {bestTimes.bestTimes.slice(0, 3).map((time, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <p className="font-medium">
                    {new Date(time.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Crowd: {time.crowdLevel} ({time.crowdScore.toFixed(0)}%)
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 mb-4">
              ⏰ Times to Avoid
            </h3>
            <div className="space-y-3">
              {bestTimes.avoidTimes.slice(0, 3).map((time, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <p className="font-medium">
                    {new Date(time.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    Crowd: {time.crowdLevel} ({time.crowdScore.toFixed(0)}%)
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FiMapPin /> Nearby Alternatives
          </h3>
          <p className="text-gray-600 mb-4">
            This place is crowded. Consider these nearby options instead:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alternatives.map((place) => (
              <AlternativeCard key={place.placeId} place={place} onSelect={() => {}} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdDashboard;
