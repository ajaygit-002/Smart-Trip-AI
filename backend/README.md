# Backend Setup Guide

## Prerequisites
- Node.js 16 or higher
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Quick Start

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tourist-crowd-predictor
JWT_SECRET=your_super_secret_key_change_this
ML_API_URL=http://localhost:8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# On Windows
mongod

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start on `http://localhost:5000`

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── placeController.js    # Place operations
│   │   ├── crowdController.js    # Crowd predictions
│   │   ├── alternativeController.js
│   │   ├── itineraryController.js
│   │   ├── notificationController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Place.js             # Place schema
│   │   ├── CrowdHistory.js       # Crowd data
│   │   ├── Itinerary.js         # Itinerary schema
│   │   └── Notification.js      # Notification schema
│   ├── routes/
│   │   ├── placeRoutes.js
│   │   ├── crowdRoutes.js
│   │   ├── alternativeRoutes.js
│   │   ├── itineraryRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/              # Custom middleware
│   ├── utils/                   # Utilities
│   └── server.js                # Main entry point
├── .env.example
├── .gitignore
└── package.json
```

## Key Features

### Database Collections

**1. Users**
- Authentication and profiles
- Store user preferences

**2. Places**
- Tourist destinations
- Metadata (hours, ratings, fees)

**3. Crowd History**
- Historical crowd data for training
- Timestamp and weather info

**4. Itineraries**
- User schedules
- Auto-replan tracking

**5. Notifications**
- User alerts
- Real-time updates via WebSocket

### API Endpoints

#### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile

#### Places
- `GET /api/places?city=hyderabad` - Get all places in city
- `GET /api/places/id/:id` - Get single place
- `GET /api/places/category?category=Monument` - Filter by category
- `POST /api/places` - Create place (admin)
- `PUT /api/places/:id` - Update place
- `DELETE /api/places/:id` - Delete place

#### Crowd Prediction
- `POST /api/crowd/predict` - Predict crowd
- `POST /api/crowd/best-times` - Get best times
- `GET /api/crowd/history?placeId=xxx` - Historical data
- `POST /api/crowd/record` - Record crowd data

#### Alternatives
- `POST /api/places/alternatives` - Get alternatives
- `GET /api/places/nearby?lat=xxx&lng=xxx` - Nearby places

#### Itinerary
- `POST /api/itinerary` - Create itinerary
- `GET /api/itinerary/user/:userId` - Get user's itineraries
- `GET /api/itinerary/:id` - Get specific itinerary
- `POST /api/itinerary/:id/replan` - Replan itinerary
- `PUT /api/itinerary/:id` - Update itinerary
- `DELETE /api/itinerary/:id` - Delete itinerary

#### Notifications
- `GET /api/notifications/:userId` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `POST /api/notifications` - Create notification
- `DELETE /api/notifications/:id` - Delete notification

## WebSocket Events

### Server Events
```javascript
socket.on('join-room', (userId) => {
  // User joins notification room
});

socket.on('disconnect', () => {
  // Handle disconnection
});
```

### Emitted Events
```javascript
// Send notification to user
io.to(`user-${userId}`).emit('new-notification', {
  message, type, createdAt
});

// Notify about itinerary update
io.to(`user-${userId}`).emit('itinerary-updated', {
  itineraryId, message
});
```

## Testing

### Testing Endpoints

Use Postman or cURL:

```bash
# Register user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Get places in city
curl http://localhost:5000/api/places?city=Hyderabad

# Predict crowd
curl -X POST http://localhost:5000/api/crowd/predict \
  -H "Content-Type: application/json" \
  -d '{"placeId":"xxx","dateTime":"2026-01-16T18:00:00"}'
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access if using Atlas

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

### JWT Token Issues
- Clear browser localStorage
- Regenerate JWT_SECRET in `.env`
- Ensure token is sent in Authorization header

## Performance Tips

1. **Database Indexing**
   ```javascript
   // Indexes are auto-created by Mongoose
   // Add custom indexes as needed
   ```

2. **Connection Pooling**
   - Mongoose handles this automatically

3. **Caching**
   - Implement Redis for frequently accessed data

## Deployment

### Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_url
git push heroku main
```

### AWS/DigitalOcean
- Use PM2 for process management
- Set up reverse proxy with Nginx
- Configure SSL certificates

## Debug Mode

Set `NODE_ENV=development` for verbose logging:

```bash
NODE_ENV=development npm run dev
```

## Additional Resources

- [Express.js Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Socket.io Documentation](https://socket.io)

---

**Backend Setup Complete! ✅**
