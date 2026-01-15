# Real-Time Tourist Crowd Predictor + Smart Itinerary Replanner

A comprehensive full-stack solution for predicting tourist crowd levels and automatically replanning itineraries based on real-time crowd data.

## 🎯 Project Overview

This final-year project addresses the problem of overcrowded tourist destinations by:
- **Real-time Crowd Prediction**: Using XGBoost ML model to forecast crowd levels
- **Smart Alternatives**: Suggesting nearby places when your first choice is crowded
- **Auto Itinerary Replanner**: Automatically adjusting your schedule based on crowd data
- **Real-time Notifications**: WebSocket-based alerts about crowd changes

## 📚 Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Socket.io Client** - Real-time updates
- **Chart.js** - Crowd visualization
- **React Router** - Navigation

### Backend
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - Database
- **Socket.io** - Real-time notifications
- **JWT** - Authentication

### ML/AI
- **Python FastAPI** - ML API server
- **XGBoost** - Crowd prediction model
- **scikit-learn** - Machine learning utilities

## 🚀 Project Structure

```
Real-Time Tourist Crowd Predictor + Smart Itinerary Replanner/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # API and socket utilities
│   │   └── App.js           # Main app component
│   ├── public/              # Static files
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Node.js/Express server
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Business logic
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Entry point
│   └── package.json         # Backend dependencies
│
└── ml-models/               # Python ML models
    ├── app.py               # FastAPI server
    ├── train_model.py       # Model training script
    └── requirements.txt     # Python dependencies
```

## 📋 Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "passwordHash": "String",
  "preferences": ["String"]
}
```

### Places Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "city": "String",
  "category": "String",
  "location": {
    "lat": "Number",
    "lng": "Number"
  },
  "openTime": "String",
  "closeTime": "String",
  "avgVisitDuration": "Number",
  "rating": "Number"
}
```

### Crowd History Collection
```json
{
  "_id": "ObjectId",
  "placeId": "ObjectId",
  "day": "String",
  "timeSlot": "String",
  "crowdScore": "Number",
  "crowdLevel": "String",
  "recordedAt": "Date"
}
```

### Itineraries Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "date": "Date",
  "places": [{
    "placeId": "ObjectId",
    "plannedTime": "String",
    "predictedCrowd": "String",
    "order": "Number"
  }],
  "autoReplanCount": "Number"
}
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
# MONGODB_URI=mongodb://localhost:27017/tourist-crowd-predictor
# JWT_SECRET=your_secret_key
# ML_API_URL=http://localhost:8000
# PORT=5000

# Start the server
npm run dev
```

### 2. ML Model Setup

```bash
cd ml-models

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model
python train_model.py

# Start the API server
python app.py
```

The ML API will run on `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
# REACT_APP_API_URL=http://localhost:5000/api
# REACT_APP_SOCKET_URL=http://localhost:5000

# Start development server
npm start
```

The frontend will run on `http://localhost:3000`

## 🎮 Key Features

### 1. Crowd Level Prediction
- **Input**: Place, time, day, weather
- **Output**: Crowd score (0-100) and level (Low/Medium/High/Very High)
- **Model**: XGBoost trained on historical data

### 2. Best Visiting Times
- Generates 24-hour forecast
- Identifies best and worst time slots
- Accounts for peak hours and weekends

### 3. Smart Alternatives
- Finds nearby places within specified radius
- Ranks by crowd level + distance
- Provides relevant suggestions

### 4. Itinerary Auto-Replanner
- **Algorithm**: Greedy scheduling
- Sorts places by: crowd level → distance → opening hours
- Automatically updates when crowd levels change

### 5. Real-time Notifications
- WebSocket-based instant alerts
- Crowd change notifications
- Itinerary update alerts
- Best time recommendations

## 📊 API Endpoints

### Places
- `GET /api/places?city={city}` - Get places by city
- `GET /api/places/id/{id}` - Get place details
- `GET /api/places/category?category={category}&city={city}` - Filter by category
- `GET /api/places/nearby?lat={lat}&lng={lng}&city={city}&radius={radius}` - Nearby places

### Crowd Prediction
- `POST /api/crowd/predict` - Predict crowd for a place
- `POST /api/crowd/best-times` - Get best visiting times
- `GET /api/crowd/history?placeId={id}&days=7` - Historical crowd data

### Alternatives
- `POST /api/places/alternatives` - Get alternative suggestions

### Itinerary
- `POST /api/itinerary` - Create itinerary
- `GET /api/itinerary/user/{userId}` - Get user itineraries
- `GET /api/itinerary/{id}` - Get specific itinerary
- `POST /api/itinerary/{id}/replan` - Replan itinerary

### Notifications
- `GET /api/notifications/{userId}` - Get notifications
- `PUT /api/notifications/{id}/read` - Mark as read
- `GET /api/notifications/{userId}/unread-count` - Unread count

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/{id}` - Get profile

## 🧠 Machine Learning Model

### Features
1. **Hour** (0-23) - Time of day
2. **Weekday** (0-6) - Day of week
3. **Weekend** (bool) - Weekend flag
4. **Holiday** (bool) - Holiday flag
5. **Season** (0-3) - Spring, Summer, Fall, Winter
6. **Weather** (0-3) - Clear, Rainy, Cloudy, Hot

### Training
```bash
cd ml-models
python train_model.py
```

This generates `crowd_predictor_model.pkl`

### Performance
- Model Type: XGBoost Regressor
- R² Score: ~0.85
- RMSE: ~12% crowd score

## 🎯 Core Algorithms

### 1. Crowd Prediction
Uses XGBoost with temporal features to forecast crowd levels

### 2. Best Time Recommendation
```
For each hour in next 24 hours:
  Predict crowd level
  Rank by lowest crowd
  Return top 3 + bottom 3
```

### 3. Alternative Suggestions
```
Get all places in city:
  Calculate distance from current place
  Filter by radius
  Predict crowd for each
  Score = (0.6 * crowd_score) + (0.4 * distance)
  Sort by score
  Return top 5
```

### 4. Itinerary Replanning (Greedy Algorithm)
```
For each place in itinerary:
  Get current crowd prediction
  Sort by: crowd_level → distance → opening_hours
  Assign new times based on optimized order
  Update database
  Send notification
```

## 🔐 Authentication

- Uses JWT tokens for API authentication
- Tokens expire in 7 days
- Passwords hashed with bcryptjs

## 📱 Frontend Pages

### 1. **Home Page**
- City selection
- Featured destinations
- Quick start button

### 2. **Explore Page**
- Place listings for selected city
- Category filters
- Real-time crowd indicators
- Place details panel

### 3. **Crowd Dashboard**
- Current crowd status
- 24-hour forecast chart
- Best/worst times
- Alternative suggestions

### 4. **Itinerary Page**
- View all user itineraries
- Replan button
- Timeline view
- Auto-replan count

### 5. **Notification Panel**
- Real-time notifications
- Mark as read
- Notification history

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# For Vercel
npm install -g vercel
vercel

# For Netlify
npm run build
# Upload 'build' folder to Netlify
```

### ML Model Deployment (Heroku)
```bash
# Deploy ML API similarly to backend
heroku create your-ml-api-name
git push heroku main
```

## 📈 Performance Optimization

- **Frontend**: Code splitting, lazy loading, memoization
- **Backend**: Database indexing, connection pooling, caching
- **ML**: Model quantization, batch predictions

## 🧪 Testing

### Backend Tests
```bash
npm test
```

### Frontend Tests
```bash
npm test
```

## 📝 Configuration Files

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tourist-crowd-predictor
JWT_SECRET=your_jwt_secret_key_here
ML_API_URL=http://localhost:8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - feel free to use this project

## 👨‍💻 Author

Final Year Project - Real-World Tourism Solution

## 📞 Support

For issues and questions, please create an issue in the repository.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [FastAPI Tutorial](https://fastapi.tiangolo.com)
- [XGBoost Documentation](https://xgboost.readthedocs.io)

---

**Happy Coding! 🚀**
