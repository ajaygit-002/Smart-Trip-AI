const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Users
  registerUser: (userData) => fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(r => r.json()),

  loginUser: (credentials) => fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }).then(r => r.json()),

  getUserProfile: (userId) => fetch(`${API_URL}/users/${userId}`).then(r => r.json()),

  // Places
  getPlacesByCity: (city) => fetch(`${API_URL}/places?city=${city}`).then(r => r.json()),

  getPlaceById: (id) => fetch(`${API_URL}/places/id/${id}`).then(r => r.json()),

  getPlacesByCategory: (category, city) => 
    fetch(`${API_URL}/places/category?category=${category}&city=${city}`).then(r => r.json()),

  getNearbyPlaces: (lat, lng, city, radius) =>
    fetch(`${API_URL}/places/nearby?lat=${lat}&lng=${lng}&city=${city}&radius=${radius}`).then(r => r.json()),

  // Crowd Prediction
  predictCrowd: (placeId, dateTime) => fetch(`${API_URL}/crowd/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placeId, dateTime })
  }).then(r => r.json()),

  getBestTimes: (placeId) => fetch(`${API_URL}/crowd/best-times`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placeId })
  }).then(r => r.json()),

  getCrowdHistory: (placeId, days = 7) => 
    fetch(`${API_URL}/crowd/history?placeId=${placeId}&days=${days}`).then(r => r.json()),

  // Alternatives
  getAlternatives: (placeId, city) => fetch(`${API_URL}/places/alternatives`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ placeId, city })
  }).then(r => r.json()),

  // Itinerary
  createItinerary: (itineraryData) => fetch(`${API_URL}/itinerary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itineraryData)
  }).then(r => r.json()),

  getUserItinerary: (userId) => fetch(`${API_URL}/itinerary/user/${userId}`).then(r => r.json()),

  getItinerary: (id) => fetch(`${API_URL}/itinerary/${id}`).then(r => r.json()),

  replanItinerary: (id) => fetch(`${API_URL}/itinerary/${id}/replan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.json()),

  // Notifications
  getUserNotifications: (userId, limit = 20) => 
    fetch(`${API_URL}/notifications/${userId}?limit=${limit}`).then(r => r.json()),

  markNotificationAsRead: (id) => fetch(`${API_URL}/notifications/${id}/read`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  }).then(r => r.json()),

  getUnreadCount: (userId) => fetch(`${API_URL}/notifications/${userId}/unread-count`).then(r => r.json()),
};
