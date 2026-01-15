# 📚 Complete Project Index & Navigation Guide

## 🎯 Quick Navigation

### 📖 Documentation Files
| File | Purpose |
|------|---------|
| [README.md](./README.md) | **START HERE** - Main project overview |
| [SETUP.md](./SETUP.md) | Step-by-step setup instructions |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Comprehensive project summary |

### 🏗️ Backend Setup
| Location | File | Purpose |
|----------|------|---------|
| `backend/` | [README.md](./backend/README.md) | Backend documentation |
| `backend/` | package.json | Node.js dependencies |
| `backend/` | .env.example | Environment template |
| `backend/` | sample-data.js | Sample MongoDB data |
| `backend/src/` | server.js | Express server entry point |
| `backend/src/config/` | database.js | MongoDB connection |
| `backend/src/models/` | User.js, Place.js, etc. | Database schemas |
| `backend/src/routes/` | \*Routes.js | API endpoints |
| `backend/src/controllers/` | \*Controller.js | Business logic |

### 🎨 Frontend Setup
| Location | File | Purpose |
|----------|------|---------|
| `frontend/` | [README.md](./frontend/README.md) | Frontend documentation |
| `frontend/` | package.json | React dependencies |
| `frontend/public/` | index.html | Main HTML file |
| `frontend/src/` | App.js | Main App component |
| `frontend/src/pages/` | HomePage.js, ExplorePage.js, etc. | Page components |
| `frontend/src/components/` | PlaceCard.js, NotificationPanel.js, etc. | Reusable components |
| `frontend/src/utils/` | api.js, socket.js | API & WebSocket utilities |

### 🤖 ML/AI Setup
| Location | File | Purpose |
|----------|------|---------|
| `ml-models/` | [README.md](./ml-models/README.md) | ML documentation |
| `ml-models/` | app.py | FastAPI server |
| `ml-models/` | train_model.py | Model training script |
| `ml-models/` | requirements.txt | Python dependencies |

## 🚀 Getting Started (5 Minutes)

### Step 1: Read Documentation
```
1. Read README.md (overview)
2. Read SETUP.md (detailed setup)
3. Read project summary
```

### Step 2: Setup Project (3 Terminals)
```bash
# Terminal 1: ML Model
cd ml-models && python app.py

# Terminal 2: Backend
cd backend && npm run dev

# Terminal 3: Frontend
cd frontend && npm start
```

### Step 3: Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- ML API: http://localhost:8000

## 📊 Project Architecture Overview

```
User's Browser (http://localhost:3000)
        ↓
React Frontend (Tailwind CSS)
        ↓
Express Backend (http://localhost:5000)
        ↓
MongoDB Database
        ↓
Python ML API (http://localhost:8000)
        ↓
XGBoost Model (crowd_predictor_model.pkl)
```

## 🗂️ File Organization Guide

### Backend Structure
```
backend/
├── src/
│   ├── config/database.js          ← DB connection
│   ├── models/                      ← Mongoose schemas
│   │   ├── User.js
│   │   ├── Place.js
│   │   ├── CrowdHistory.js
│   │   ├── Itinerary.js
│   │   └── Notification.js
│   ├── controllers/                 ← Business logic
│   │   ├── placeController.js
│   │   ├── crowdController.js
│   │   ├── alternativeController.js
│   │   ├── itineraryController.js
│   │   ├── notificationController.js
│   │   └── userController.js
│   ├── routes/                      ← API endpoints
│   │   ├── placeRoutes.js
│   │   ├── crowdRoutes.js
│   │   ├── alternativeRoutes.js
│   │   ├── itineraryRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── userRoutes.js
│   ├── middleware/                  ← Custom middleware
│   ├── utils/                       ← Utility functions
│   └── server.js                    ← Main entry point
├── package.json                     ← Dependencies
├── .env.example                     ← Environment template
├── README.md                        ← Backend guide
└── sample-data.js                   ← Sample data
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/                  ← Reusable UI components
│   │   ├── NotificationPanel.js
│   │   ├── CrowdIndicator.js
│   │   ├── CrowdChart.js
│   │   ├── ItineraryCard.js
│   │   ├── PlaceCard.js
│   │   └── AlternativeCard.js
│   ├── pages/                       ← Full page components
│   │   ├── HomePage.js
│   │   ├── ExplorePage.js
│   │   ├── CrowdDashboard.js
│   │   └── ItineraryPage.js
│   ├── utils/                       ← Helper functions
│   │   ├── api.js                  ← API calls
│   │   └── socket.js               ← WebSocket
│   ├── App.js                       ← Main component
│   ├── index.js                     ← Entry point
│   ├── index.css                    ← Global styles
│   └── App.css                      ← App styles
├── public/
│   └── index.html                   ← Main HTML
├── package.json                     ← Dependencies
├── tailwind.config.js               ← Tailwind config
├── README.md                        ← Frontend guide
└── .gitignore
```

### ML Structure
```
ml-models/
├── app.py                           ← FastAPI server
├── train_model.py                   ← Model training
├── requirements.txt                 ← Python dependencies
├── crowd_predictor_model.pkl        ← Trained model (generated)
├── README.md                        ← ML guide
└── .gitignore
```

## 🎯 Module Functions

### User Module (Authentication)
- Register new users
- Login existing users
- Get user profiles
- Update preferences

### Place Module
- CRUD operations on places
- Filter by city/category
- Get nearby places
- Search functionality

### Crowd Prediction Module
- Predict crowd for specific place/time
- Get 24-hour forecasts
- Find best visiting times
- Historical crowd data

### Alternative Suggestions Module
- Find nearby alternatives
- Rank by crowd + distance
- Category matching
- Smart suggestions

### Itinerary Module
- Create user itineraries
- Get user's itineraries
- Update itineraries
- **Auto-replan itinerary** (Smart algorithm)
- Delete itineraries

### Notification Module
- Create notifications
- Get user notifications
- Mark as read
- Get unread count

## 📡 API Endpoints by Category

### Authentication (User Routes)
```
POST   /api/users/register
POST   /api/users/login
GET    /api/users/:id
PUT    /api/users/:id
```

### Places
```
GET    /api/places?city=xxx
GET    /api/places/id/:id
GET    /api/places/category
POST   /api/places
PUT    /api/places/:id
DELETE /api/places/:id
GET    /api/places/nearby
```

### Crowd Prediction
```
POST   /api/crowd/predict
POST   /api/crowd/best-times
GET    /api/crowd/history
POST   /api/crowd/record
```

### Alternatives
```
POST   /api/places/alternatives
```

### Itinerary
```
POST   /api/itinerary
GET    /api/itinerary/user/:userId
GET    /api/itinerary/:id
POST   /api/itinerary/:id/replan
PUT    /api/itinerary/:id
DELETE /api/itinerary/:id
```

### Notifications
```
GET    /api/notifications/:userId
PUT    /api/notifications/:id/read
PUT    /api/notifications/:userId/read-all
POST   /api/notifications
DELETE /api/notifications/:id
GET    /api/notifications/:userId/unread-count
```

## 🧠 Algorithm Guide

### Crowd Prediction Algorithm
```
Input: place, time, day, weather
↓
XGBoost Model
↓
Output: crowdScore (0-100), crowdLevel (Low/Medium/High/Very High)
```

### Best Time Recommendation Algorithm
```
For each hour in next 24 hours:
  Predict crowd score
Sort predictions
Return: Best 3 times + Worst 3 times
```

### Alternative Suggestion Algorithm
```
Get all places in city
For each place:
  Calculate distance
  Predict crowd
  Calculate score = (crowd_score × 0.6) + (distance × 10)
Sort by score
Return: Top 5 alternatives
```

### Itinerary Replan Algorithm (Greedy)
```
For each place in itinerary:
  Get current crowd prediction
Sort places by:
  1. Crowd level (ascending)
  2. Distance (ascending)
  3. Opening hours
Assign new visiting times
Update database
Send notification
```

## 🔄 Data Flow Examples

### Flow 1: User Plans Itinerary
```
User selects places
↓
Create Itinerary (DB)
↓
Predict crowd for each place
↓
Display itinerary with crowd info
↓
User gets notification
```

### Flow 2: Real-Time Crowd Update
```
Backend monitors crowd
↓
Crowd exceeds threshold
↓
Trigger auto-replan
↓
New itinerary generated
↓
WebSocket notification sent
↓
Frontend updates in real-time
```

### Flow 3: Alternative Suggestions
```
User views high-crowd place
↓
Backend queries alternatives
↓
ML predicts crowd for each
↓
Rank by distance + crowd
↓
Display top suggestions
```

## 🛠️ Customization Guide

### Add New Feature
1. Create controller in `backend/src/controllers/`
2. Create route in `backend/src/routes/`
3. Create React component in `frontend/src/components/`
4. Add page if needed in `frontend/src/pages/`
5. Connect with API calls

### Add New Place Category
1. Update Place schema in `backend/src/models/Place.js`
2. Update database category enum
3. Update frontend category filter

### Modify ML Model
1. Edit `ml-models/train_model.py`
2. Train new model: `python train_model.py`
3. Restart ML API

### Change Database Schema
1. Edit MongoDB schema in `backend/src/models/`
2. Add Mongoose validation
3. Update API controllers
4. Test thoroughly

## 📋 Checklist for Setup

### Before Starting
- [ ] Node.js 16+ installed
- [ ] Python 3.8+ installed
- [ ] MongoDB installed or Atlas account
- [ ] All 3 README files read

### Setup Phase
- [ ] ML models environment created
- [ ] ML model trained successfully
- [ ] ML API running on port 8000
- [ ] Backend installed and running
- [ ] MongoDB connected
- [ ] Frontend installed and running
- [ ] Application accessible at localhost:3000

### Testing Phase
- [ ] Home page loads
- [ ] Can select city
- [ ] Places display with crowd indicators
- [ ] Notifications appear
- [ ] Itinerary creation works
- [ ] Auto-replan functions
- [ ] WebSocket updates work

## 🆘 Need Help?

### Quick Troubleshooting
1. Check individual README files
2. Check console for errors
3. Verify all services running
4. Restart services
5. Check .env files

### Common Issues
- Port already in use → Kill process
- MongoDB connection fail → Check MongoDB service
- API not responding → Check backend logs
- Frontend blank → Check browser console

## 📚 Learning Resources

### Frontend
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- React Router: https://reactrouter.com
- Chart.js: https://www.chartjs.org

### Backend
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Socket.io: https://socket.io
- Mongoose: https://mongoosejs.com

### ML/AI
- XGBoost: https://xgboost.readthedocs.io
- FastAPI: https://fastapi.tiangolo.com
- scikit-learn: https://scikit-learn.org

## 🎓 Key Concepts Covered

✅ Full-Stack Development
✅ Real-Time Communication (WebSocket)
✅ Machine Learning Integration
✅ Database Design & Optimization
✅ RESTful API Design
✅ Authentication & Security
✅ Responsive UI/UX
✅ Deployment Strategies

## 📞 Support

For issues:
1. Check SETUP.md
2. Check specific README for your component
3. Check browser/terminal console
4. Review error messages carefully

---

**You now have a complete, production-ready real-world solution!** 🚀

**Happy Coding! ✨**
