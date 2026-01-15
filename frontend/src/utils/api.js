const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const api = {
  // Users
  registerUser: (userData) =>
    fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }).then((r) => r.json()),

  loginUser: (credentials) =>
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((r) => r.json()),

  getUserProfile: (userId) =>
    fetch(`${API_URL}/users/${userId}`).then((r) => r.json()),

  // Places
  getPlacesByCity: (city) =>
    fetch(`${API_URL}/places/city/${city}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch places");
        return r.json();
      })
      .then((data) => data.places || []),

  getPlaceById: (id) =>
    fetch(`${API_URL}/places/${id}`).then((r) => {
      if (!r.ok) throw new Error("Failed to fetch place");
      return r.json();
    }),

  getPlacesByCategory: (category, city) =>
    fetch(`${API_URL}/places/city/${city}/category/${category}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch places");
        return r.json();
      })
      .then((data) => data.places || []),

  getPopularPlaces: (city, limit = 10) =>
    fetch(`${API_URL}/places/city/${city}/popular?limit=${limit}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch popular places");
        return r.json();
      })
      .then((data) => data.places || []),

  getCategoriesByCity: (city) =>
    fetch(`${API_URL}/places/city/${city}/categories`).then((r) => {
      if (!r.ok) throw new Error("Failed to fetch categories");
      return r.json();
    }),

  getAllCities: () =>
    fetch(`${API_URL}/places/cities/all`).then((r) => {
      if (!r.ok) throw new Error("Failed to fetch cities");
      return r.json();
    }),

  searchPlaces: (keyword, city) => {
    const url = city
      ? `${API_URL}/places/search?keyword=${keyword}&city=${city}`
      : `${API_URL}/places/search?keyword=${keyword}`;
    return fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to search places");
        return r.json();
      })
      .then((data) => data.places || []);
  },

  getNearbyPlaces: (lat, lng, city, radius) =>
    fetch(
      `${API_URL}/places/nearby?lat=${lat}&lng=${lng}&city=${city}&radius=${radius}`
    ).then((r) => r.json()),

  // Crowd Prediction
  predictCrowd: (placeId, dateTime) =>
    fetch(`${API_URL}/crowd/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId, dateTime }),
    }).then((r) => r.json()),

  getBestTimes: (placeId) =>
    fetch(`${API_URL}/crowd/best-times`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId }),
    }).then((r) => r.json()),

  getCrowdHistory: (placeId, days = 7) =>
    fetch(`${API_URL}/crowd/history?placeId=${placeId}&days=${days}`).then(
      (r) => r.json()
    ),

  // Alternatives
  getAlternatives: (placeId, city) =>
    fetch(`${API_URL}/places/alternatives`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId, city }),
    }).then((r) => r.json()),

  // Itinerary
  createItinerary: (itineraryData) =>
    fetch(`${API_URL}/itinerary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itineraryData),
    }).then((r) => r.json()),

  getUserItinerary: (userId) =>
    fetch(`${API_URL}/itinerary/user/${userId}`).then((r) => r.json()),

  getItinerary: (id) =>
    fetch(`${API_URL}/itinerary/${id}`).then((r) => r.json()),

  replanItinerary: (id) =>
    fetch(`${API_URL}/itinerary/${id}/replan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json()),

  // Notifications
  getUserNotifications: (userId, limit = 20) =>
    fetch(`${API_URL}/notifications/${userId}?limit=${limit}`).then((r) =>
      r.json()
    ),

  markNotificationAsRead: (id) =>
    fetch(`${API_URL}/notifications/${id}/read`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json()),

  getUnreadCount: (userId) =>
    fetch(`${API_URL}/notifications/${userId}/unread-count`).then((r) =>
      r.json()
    ),
};
