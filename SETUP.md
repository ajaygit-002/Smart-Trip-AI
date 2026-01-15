# Complete Setup Guide - Real-Time Tourist Crowd Predictor

This guide will walk you through setting up the entire project from scratch.

## 📋 Prerequisites

- **Node.js** 16 or higher: [Download](https://nodejs.org)
- **Python** 3.8 or higher: [Download](https://www.python.org)
- **MongoDB**: [Local](https://docs.mongodb.com/manual/installation/) or [Atlas Cloud](https://www.mongodb.com/cloud/atlas)
- **Git**: [Download](https://git-scm.com)

## 🚀 Step-by-Step Setup

### Step 1: Clone/Download Project

```bash
cd d:\
# Project is already here at:
# d:\Real-Time Tourist Crowd Predictor + Smart Itinerary Replanner
cd "Real-Time Tourist Crowd Predictor + Smart Itinerary Replanner"
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB

**Windows:**
1. Download [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Run installer
3. MongoDB runs as a service automatically

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud) - Recommended for Beginners

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)
5. Save this for later use

### Step 3: Setup ML Model

```bash
cd "ml-models"

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Train the model
python train_model.py

# This will create crowd_predictor_model.pkl
# Keep this terminal running, start ML API:
python app.py
```

**ML API should be running on:** `http://localhost:8000`

✅ **ML Setup Complete** - Keep this terminal open

### Step 4: Setup Backend

Open **NEW terminal** window:

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Windows:
copy .env.example .env
# Mac/Linux:
cp .env.example .env

# Edit .env with your MongoDB connection
# If local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/tourist-crowd-predictor
#
# If MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tourist-crowd-predictor

# Start backend server in development mode
npm run dev
```

**Backend should be running on:** `http://localhost:5000`

✅ **Backend Setup Complete** - Keep this terminal open

### Step 5: Setup Frontend

Open **THIRD terminal** window:

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local (optional - defaults work)
# For Windows:
# echo REACT_APP_API_URL=http://localhost:5000/api > .env.local
#
# For Mac/Linux:
# echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local

# Start React development server
npm start
```

**Frontend should open automatically at:** `http://localhost:3000`

✅ **Frontend Setup Complete**

## ✅ Verification Checklist

After following all steps, verify everything is working:

```
☐ ML API running on http://localhost:8000
  - Open browser and check http://localhost:8000/health
  
☐ Backend running on http://localhost:5000
  - Should see response at http://localhost:5000/api/health
  
☐ Frontend running on http://localhost:3000
  - Should see the home page with city selection
  
☐ MongoDB connected
  - Backend should connect without errors
  
☐ All three terminals are open and showing no errors
```

## 🎮 Testing the Application

### 1. Test Home Page
- Visit `http://localhost:3000`
- You should see the Tourist Crowd Predictor homepage
- Click on a popular city

### 2. Test Explore Page
- Click "Explore Hyderabad" (or any city)
- You should see places loading
- Select a place to see crowd details

### 3. Test Crowd Prediction
- The selected place should show current crowd status
- You should see a crowd indicator with percentage

### 4. Test Notifications
- Click the bell icon (if logged in)
- You should see notification panel

## 📁 File Locations Summary

```
d:\Real-Time Tourist Crowd Predictor + Smart Itinerary Replanner\
├── backend/           ← Terminal 2: npm run dev
├── frontend/          ← Terminal 3: npm start
├── ml-models/         ← Terminal 1: python app.py
└── README.md          ← Main project documentation
```

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
# In that folder:
npm install
# Then restart the server
```

### MongoDB connection failed
```
✓ Check MongoDB is running
✓ Verify connection string in .env
✓ If using Atlas, check IP whitelist (allow all for testing)
```

### Port already in use
```bash
# Find what's using the port
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -i :5000

# Kill the process
# Windows:
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
kill -9 <PID_NUMBER>
```

### Python virtual environment not activating
```bash
# Make sure you're in ml-models folder
cd ml-models

# Try explicitly running python from venv
# Windows:
venv\Scripts\python.exe app.py

# Mac/Linux:
./venv/bin/python app.py
```

### React app won't start
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try again
npm start
```

## 📊 Project Architecture

```
User (Browser)
    ↓
Frontend (React) ← http://localhost:3000
    ↓
Backend API (Express) ← http://localhost:5000
    ↓
MongoDB ← Local or Atlas
    ↓
ML API (FastAPI) ← http://localhost:8000
    ↓
ML Model (XGBoost) ← crowd_predictor_model.pkl
```

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tourist-crowd-predictor
JWT_SECRET=your_secret_key_change_this
ML_API_URL=http://localhost:8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local) - Optional
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 📚 Key Commands Reference

```bash
# Backend
cd backend && npm run dev        # Start backend with auto-reload
cd backend && npm start          # Production mode

# Frontend  
cd frontend && npm start         # Start development server
cd frontend && npm run build     # Create production build

# ML Models
cd ml-models
source venv/bin/activate        # Activate Python environment
python train_model.py           # Train XGBoost model
python app.py                   # Run FastAPI server
```

## 🎯 Next Steps

After successful setup:

1. **Create sample data**
   - Add some tourist places to MongoDB
   - Record some crowd history

2. **Test all features**
   - Create itineraries
   - Test crowd predictions
   - Try alternative suggestions

3. **Customize**
   - Add more cities
   - Modify UI colors/fonts
   - Add more features

4. **Deploy**
   - Frontend to Vercel/Netlify
   - Backend to Heroku/Railway
   - ML API to Heroku

## 📖 Documentation

- [Main README](./README.md) - Project overview
- [Backend README](./backend/README.md) - Backend documentation
- [Frontend README](./frontend/README.md) - Frontend documentation
- [ML Models README](./ml-models/README.md) - ML documentation

## 💡 Quick Tips

1. **Keep all 3 terminals open** during development
2. **Check console for errors** when something doesn't work
3. **Use Postman** to test API endpoints
4. **Use React DevTools** for debugging frontend
5. **Use MongoDB Compass** to inspect database

## 🎓 Learning Resources

- [React Tutorial](https://react.dev/learn)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Tutorial](https://docs.mongodb.com/manual/tutorial/)
- [XGBoost Documentation](https://xgboost.readthedocs.io)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)

## ✨ Common Issues & Solutions

### Issue: "Cannot GET /api/health"
**Solution:** Backend not running. Run `npm run dev` in backend folder

### Issue: "MongoDB connection refused"
**Solution:** MongoDB not running. Start MongoDB service or use Atlas

### Issue: "Port 5000 already in use"
**Solution:** Kill process using port 5000 (see Troubleshooting section)

### Issue: Frontend showing blank page
**Solution:** Check browser console for errors. Frontend might need backend running

## 🚀 Ready to Go!

Your complete Real-Time Tourist Crowd Predictor + Smart Itinerary Replanner is now set up!

**Enjoy building! 🎉**

---

For more help, check the individual README files in each folder.
