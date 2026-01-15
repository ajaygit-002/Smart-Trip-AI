# API Documentation - All Endpoints

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Health Check
```
GET /health
```
Returns: `{ status: 'Backend is running' }`

---

## 👤 User Endpoints

### Register User
```
POST /users/register
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "preferences": ["historical", "food", "beach"]
}

Response (201):
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "preferences": ["historical", "food", "beach"]
  },
  "token": "jwt_token"
}
```

### Login User
```
POST /users/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "password123"
}

Response (200):
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token"
}
```

### Get User Profile
```
GET /users/:id
Authorization: Bearer {token}

Response (200):
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "preferences": ["historical", "food"],
  "createdAt": "2026-01-14T12:00:00Z"
}
```

### Update User Profile
```
PUT /users/:id
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "name": "John Smith",
  "preferences": ["museum", "park", "beach"]
}

Response (200):
{
  "id": "user_id",
  "name": "John Smith",
  "email": "john@example.com",
  "preferences": ["museum", "park", "beach"]
}
```

---

## 📍 Place Endpoints

### Get Places by City
```
GET /places?city=Hyderabad
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "place_id",
    "name": "Charminar",
    "city": "Hyderabad",
    "category": "Monument",
    "location": {
      "lat": 17.3616,
      "lng": 78.4747
    },
    "openTime": "09:00",
    "closeTime": "21:00",
    "avgVisitDuration": 60,
    "rating": 4.5,
    "entryFee": 20
  }
]
```

### Get Place by ID
```
GET /places/id/:id
Authorization: Bearer {token}

Response (200):
{
  "_id": "place_id",
  "name": "Charminar",
  "city": "Hyderabad",
  "category": "Monument",
  "location": { "lat": 17.3616, "lng": 78.4747 },
  "description": "Iconic 16th century monument",
  "openTime": "09:00",
  "closeTime": "21:00",
  "avgVisitDuration": 60,
  "rating": 4.5,
  "entryFee": 20,
  "imageUrl": "https://..."
}
```

### Get Places by Category
```
GET /places/category?category=Monument&city=Hyderabad
Authorization: Bearer {token}

Response (200):
[
  { place object }, ...
]
```

### Get Nearby Places
```
GET /places/nearby?lat=17.3616&lng=78.4747&city=Hyderabad&radius=2
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "place_id",
    "name": "Place Name",
    "distance": 1.2,
    ...place object
  }
]
```

### Create Place (Admin)
```
POST /places
Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "name": "New Monument",
  "city": "Hyderabad",
  "category": "Monument",
  "location": { "lat": 17.3616, "lng": 78.4747 },
  "description": "...",
  "openTime": "09:00",
  "closeTime": "21:00",
  "avgVisitDuration": 60,
  "rating": 4.5,
  "entryFee": 20
}

Response (201):
{ created place object }
```

### Update Place (Admin)
```
PUT /places/:id
Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "rating": 4.7,
  "entryFee": 25
}

Response (200):
{ updated place object }
```

### Delete Place (Admin)
```
DELETE /places/:id
Authorization: Bearer {admin_token}

Response (200):
{ "message": "Place deleted successfully" }
```

---

## 📊 Crowd Prediction Endpoints

### Predict Crowd
```
POST /crowd/predict
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "placeId": "place_id",
  "dateTime": "2026-01-16T18:00:00"
}

Response (200):
{
  "placeId": "place_id",
  "dateTime": "2026-01-16T18:00:00",
  "crowdScore": 85,
  "crowdLevel": "Very High",
  "source": "ml-model"
}
```

### Get Best Visiting Times
```
POST /crowd/best-times
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "placeId": "place_id"
}

Response (200):
{
  "placeId": "place_id",
  "bestTimes": [
    {
      "time": "2026-01-16T07:00:00",
      "crowdScore": 20,
      "crowdLevel": "Low"
    },
    ...
  ],
  "avoidTimes": [
    {
      "time": "2026-01-16T18:00:00",
      "crowdScore": 90,
      "crowdLevel": "Very High"
    },
    ...
  ],
  "allPredictions": [...]
}
```

### Get Crowd History
```
GET /crowd/history?placeId=place_id&days=7
Authorization: Bearer {token}

Response (200):
[
  {
    "_id": "record_id",
    "placeId": "place_id",
    "day": "Monday",
    "timeSlot": "18:00",
    "crowdScore": 85,
    "crowdLevel": "Very High",
    "recordedAt": "2026-01-14T12:00:00Z"
  },
  ...
]
```

### Record Crowd Data (Admin)
```
POST /crowd/record
Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "placeId": "place_id",
  "day": "Monday",
  "timeSlot": "18:00",
  "crowdScore": 85,
  "isWeekend": false,
  "isHoliday": false,
  "weather": "Clear",
  "season": "Summer"
}

Response (201):
{ recorded object }
```

---

## 🎯 Alternative Suggestions Endpoints

### Get Alternatives
```
POST /places/alternatives
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "placeId": "place_id",
  "city": "Hyderabad",
  "radius": 5
}

Response (200):
{
  "originalPlace": { place object },
  "alternatives": [
    {
      "placeId": "alt_place_id",
      "name": "Alternative Place",
      "category": "Monument",
      "distance": 2.5,
      "rating": 4.6,
      "crowdScore": 40,
      "crowdLevel": "Medium",
      "entryFee": 25
    },
    ...
  ],
  "city": "Hyderabad"
}
```

---

## 📅 Itinerary Endpoints

### Create Itinerary
```
POST /itinerary
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "userId": "user_id",
  "date": "2026-01-16",
  "placeIds": ["place_id1", "place_id2", "place_id3"]
}

Response (201):
{
  "_id": "itinerary_id",
  "userId": "user_id",
  "date": "2026-01-16",
  "places": [
    {
      "placeId": "place_id",
      "plannedTime": "10:00",
      "predictedCrowd": "Medium",
      "crowdScore": 45,
      "visitDuration": 60,
      "order": 1
    },
    ...
  ],
  "autoReplanCount": 0,
  "lastUpdated": "2026-01-14T12:00:00Z"
}
```

### Get User Itineraries
```
GET /itinerary/user/:userId
Authorization: Bearer {token}

Response (200):
[
  { itinerary object }, ...
]
```

### Get Specific Itinerary
```
GET /itinerary/:id
Authorization: Bearer {token}

Response (200):
{ itinerary object with populated places }
```

### Replan Itinerary (Auto Algorithm)
```
POST /itinerary/:id/replan
Authorization: Bearer {token}
Content-Type: application/json

Response (200):
{
  "_id": "itinerary_id",
  "places": [
    {
      "placeId": "place_id",
      "plannedTime": "09:00",
      "predictedCrowd": "Low",
      "order": 1
    },
    ...
  ],
  "autoReplanCount": 1,
  "lastUpdated": "2026-01-14T14:00:00Z"
}
```

### Update Itinerary
```
PUT /itinerary/:id
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "places": [
    {
      "placeId": "place_id",
      "plannedTime": "11:00",
      "order": 2
    },
    ...
  ]
}

Response (200):
{ updated itinerary object }
```

### Delete Itinerary
```
DELETE /itinerary/:id
Authorization: Bearer {token}

Response (200):
{ "message": "Itinerary deleted successfully" }
```

---

## 🔔 Notification Endpoints

### Get User Notifications
```
GET /notifications/:userId?limit=20&skip=0
Authorization: Bearer {token}

Response (200):
{
  "notifications": [
    {
      "_id": "notif_id",
      "userId": "user_id",
      "message": "Crowd increasing at Charminar",
      "type": "crowd-alert",
      "read": false,
      "createdAt": "2026-01-14T12:00:00Z"
    },
    ...
  ],
  "total": 50,
  "hasMore": true
}
```

### Mark Notification as Read
```
PUT /notifications/:id/read
Authorization: Bearer {token}

Response (200):
{ notification object with read: true }
```

### Mark All as Read
```
PUT /notifications/:userId/read-all
Authorization: Bearer {token}

Response (200):
{ "message": "All notifications marked as read" }
```

### Create Notification (System/Admin)
```
POST /notifications
Authorization: Bearer {admin_token}
Content-Type: application/json

Request:
{
  "userId": "user_id",
  "message": "Your itinerary has been updated",
  "type": "itinerary-update",
  "relatedItinerary": "itinerary_id"
}

Response (201):
{ notification object }
```

### Delete Notification
```
DELETE /notifications/:id
Authorization: Bearer {token}

Response (200):
{ "message": "Notification deleted successfully" }
```

### Get Unread Count
```
GET /notifications/:userId/unread-count
Authorization: Bearer {token}

Response (200):
{
  "unreadCount": 5
}
```

---

## 🔌 WebSocket Events

### Connect to WebSocket
```javascript
const socket = io('http://localhost:5000', {
  reconnection: true,
});
```

### Emit Events
```javascript
// Join notification room
socket.emit('join-room', userId);
```

### Listen Events
```javascript
// Receive new notification
socket.on('new-notification', (notification) => {
  console.log('New notification:', notification);
});

// Receive itinerary update
socket.on('itinerary-updated', (update) => {
  console.log('Itinerary updated:', update);
});
```

---

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer {jwt_token}
```

Token obtained from:
- `/users/register` - Returns token on registration
- `/users/login` - Returns token on login

Token expires in 7 days.

---

## ✅ Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - No/invalid token |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 📝 Common Error Responses

```json
{
  "error": "Error message describing what went wrong"
}
```

Examples:
- `{ "error": "Invalid email or password" }`
- `{ "error": "Place not found" }`
- `{ "error": "placeId and dateTime are required" }`

---

## 🧪 Testing with Postman

1. Import endpoints into Postman
2. Set base URL: `http://localhost:5000/api`
3. Create environment variables for token
4. Test each endpoint
5. Verify responses

---

## 📚 API Usage Examples

### Example 1: Complete User Journey
```bash
# 1. Register
POST /users/register
Body: { name, email, password, preferences }

# 2. Get places by city
GET /places?city=Hyderabad

# 3. Predict crowd
POST /crowd/predict
Body: { placeId, dateTime }

# 4. Get alternatives
POST /places/alternatives
Body: { placeId, city }

# 5. Create itinerary
POST /itinerary
Body: { userId, date, placeIds }

# 6. Get notifications
GET /notifications/:userId
```

### Example 2: Auto-Replan Scenario
```bash
# 1. Get user itinerary
GET /itinerary/:itineraryId

# 2. Monitor crowd changes (via WebSocket)
socket.on('new-notification', ...)

# 3. Auto-replan
POST /itinerary/:itineraryId/replan

# 4. Receive updated itinerary
{ updated itinerary with new order }
```

---

**All endpoints documented! Ready to integrate with your application.** ✅
