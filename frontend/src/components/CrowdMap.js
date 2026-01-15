import React, { useEffect, useRef, useState } from "react";
import { FiMapPin, FiClock, FiTrendingUp, FiInfo } from "react-icons/fi";

const CrowdMap = ({
  places = [],
  selectedPlace = null,
  onPlaceSelect = () => {},
  city = "Unknown",
}) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [map, setMap] = useState(null);
  const [infoWindows, setInfoWindows] = useState({});

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

  // Load Google Maps Script
  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.warn("Google Maps API key not configured");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,marker`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [GOOGLE_MAPS_API_KEY]);

  const initMap = () => {
    if (!mapRef.current || !window.google) return;

    // Default center (adjust based on city)
    const defaultCenter = { lat: 28.6139, lng: 77.209 }; // Delhi

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: defaultCenter,
      mapTypeControl: true,
      fullscreenControl: true,
      zoomControl: true,
      streetViewControl: true,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f3f3f3" }, { lightness: 20 }],
        },
      ],
    });

    setMap(mapInstance);
  };

  // Add markers to map
  useEffect(() => {
    if (!map || !places.length) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
    markersRef.current = {};
    infoWindows.forEach((iw) => iw.close());

    let bounds = new window.google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.location || !place.location.coordinates) return;

      const { coordinates } = place.location;
      const [lng, lat] = coordinates;
      const position = { lat, lng };

      // Determine marker color based on crowd level
      const crowdColor = getMarkerColor(place.crowdLevel);

      // Create SVG marker
      const markerIcon = {
        path: "M12 0C7.06 0 3 4.06 3 9c0 5.25 9 23 9 23s9-17.75 9-23c0-4.94-4.06-9-9-9zm0 12.5c-1.933 0-3.5-1.567-3.5-3.5S10.067 5.5 12 5.5s3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z",
        fillColor: crowdColor,
        fillOpacity: 0.9,
        strokeColor: "#fff",
        strokeWeight: 2,
        scale: 2.5,
        anchor: new window.google.maps.Point(12, 24),
      };

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: place.name,
        icon: markerIcon,
        animation:
          selectedPlace?._id === place._id
            ? window.google.maps.Animation.BOUNCE
            : null,
      });

      // Create info window content
      const infoContent = `
        <div class="crowd-info-window" style="max-width: 300px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="padding: 12px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1a1a1a;">
              ${place.name}
            </h3>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
              <strong>Category:</strong> ${place.category}
            </p>
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #666;">
              <strong>Address:</strong> ${place.address || "N/A"}
            </p>
            <div style="margin: 12px 0; padding: 12px; background: #f5f5f5; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #1a1a1a;">Crowd Level:</span>
                <span style="background: ${crowdColor}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px;">
                  ${place.crowdLevel || "Unknown"}
                </span>
              </div>
              <div style="font-size: 12px; color: #666;">
                <strong>${
                  place.crowdScore?.toFixed(0) || 0
                }%</strong> Current Crowd
              </div>
            </div>
            <p style="margin: 8px 0; font-size: 13px; color: #666;">
              <strong>Rating:</strong> ⭐ ${place.rating || "N/A"} / 5
            </p>
            <p style="margin: 8px 0; font-size: 13px; color: #666;">
              <strong>Entry Fee:</strong> $${place.entryFee || "Free"}
            </p>
            <button onclick="window.placeSelected('${
              place._id
            }')" style="width: 100%; padding: 8px 12px; margin-top: 12px; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; font-size: 13px;">
              View Details
            </button>
          </div>
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent,
      });

      // Make the placeSelected function globally accessible
      window.placeSelected = (placeId) => {
        const selectedP = places.find((p) => p._id === placeId);
        if (selectedP) onPlaceSelect(selectedP);
      };

      marker.addListener("click", () => {
        // Close all other info windows
        Object.values(infoWindows).forEach((iw) => iw.close());
        infoWindow.open(map, marker);
        onPlaceSelect(place);

        // Bounce animation
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 750);
      });

      markersRef.current[place._id] = marker;
      bounds.extend(position);
    });

    // Fit map to bounds
    if (places.length > 1) {
      map.fitBounds(bounds, { padding: 50 });
    } else if (places.length === 1) {
      map.setCenter(bounds.getCenter());
      map.setZoom(15);
    }
  }, [map, places, selectedPlace, onPlaceSelect]);

  const getMarkerColor = (crowdLevel) => {
    switch (crowdLevel) {
      case "Low":
        return "#10b981";
      case "Medium":
        return "#f59e0b";
      case "High":
        return "#ef6461";
      case "Very High":
        return "#dc2626";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="w-full h-screen rounded-lg overflow-hidden shadow-lg relative bg-gray-100">
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FiInfo className="text-blue-600" />
          Crowd Levels
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Low (0-25%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700">Medium (25-50%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-700">High (50-75%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span className="text-gray-700">Very High (75-100%)</span>
          </div>
        </div>
      </div>

      {/* Stats Panel */}
      <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs z-10">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FiMapPin className="text-red-600" />
          {city}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Total Places:</span>
            <span className="font-semibold text-gray-900">{places.length}</span>
          </div>
          {selectedPlace && (
            <>
              <div className="border-t pt-2 mt-2">
                <p className="font-semibold text-gray-900 mb-2">
                  {selectedPlace.name}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <FiTrendingUp
                    className={
                      getMarkerColor(selectedPlace.crowdLevel) === "#10b981"
                        ? "text-green-500"
                        : getMarkerColor(selectedPlace.crowdLevel) === "#f59e0b"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  />
                  <span>
                    {selectedPlace.crowdScore?.toFixed(0) || 0}% Crowd -{" "}
                    {selectedPlace.crowdLevel}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* No API Key Warning */}
      {!GOOGLE_MAPS_API_KEY && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg z-20">
          <div className="bg-white rounded-lg p-6 text-center max-w-sm">
            <p className="text-gray-900 font-semibold mb-2">
              Google Maps API Not Configured
            </p>
            <p className="text-gray-600 text-sm mb-4">
              Please add your Google Maps API key to the .env file:
            </p>
            <code className="bg-gray-100 p-3 rounded text-xs text-gray-800 block">
              REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrowdMap;
