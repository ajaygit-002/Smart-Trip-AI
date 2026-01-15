# Frontend Setup Guide

## Prerequisites
- Node.js 16 or higher
- npm or yarn
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Quick Start

### 1. Installation

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `.env.local` file (optional, for custom API URLs):

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### 3. Running the Development Server

```bash
npm start
```

The app will open automatically at `http://localhost:3000`

### 4. Building for Production

```bash
npm run build
```

Build files will be in the `build/` directory

## Project Structure

```
frontend/
├── public/
│   └── index.html               # Main HTML file
├── src/
│   ├── components/
│   │   ├── NotificationPanel.js    # Real-time notifications
│   │   ├── CrowdIndicator.js       # Crowd visualization
│   │   ├── CrowdChart.js           # 24-hour chart
│   │   ├── ItineraryCard.js        # Itinerary display
│   │   ├── PlaceCard.js            # Place card component
│   │   └── AlternativeCard.js      # Alternative suggestions
│   ├── pages/
│   │   ├── HomePage.js             # Landing page
│   │   ├── ExplorePage.js          # City exploration
│   │   ├── CrowdDashboard.js       # Crowd analysis
│   │   └── ItineraryPage.js        # User itineraries
│   ├── utils/
│   │   ├── api.js                  # API calls
│   │   └── socket.js               # WebSocket setup
│   ├── App.js                      # Main component
│   ├── App.css
│   ├── index.js                    # Entry point
│   └── index.css
├── .gitignore
├── package.json
└── tailwind.config.js
```

## Key Features

### Pages Overview

#### 1. **Home Page**
- City selection
- Popular destinations quick access
- Feature highlights
- Responsive design

#### 2. **Explore Page**
- Browse places by city
- Category filtering
- Search functionality
- Real-time crowd indicators

#### 3. **Crowd Dashboard**
- Current crowd status
- 24-hour prediction chart
- Best/worst time recommendations
- Alternative suggestions

#### 4. **Itinerary Page**
- View all itineraries
- Create new plans
- Auto-replan functionality
- Timeline view

### Components

#### NotificationPanel
Real-time notification system with WebSocket integration

#### CrowdIndicator
Visual crowd level display with progress indicator

#### CrowdChart
Chart.js integration for 24-hour forecasts

#### PlaceCard
Reusable place information card

#### AlternativeCard
Suggestion cards with crowd and distance info

## Development Workflow

### 1. Development Mode
```bash
npm start
```
- Auto-reload on file changes
- Fast refresh enabled
- Source maps for debugging

### 2. Linting
```bash
npm run lint
```

### 3. Testing
```bash
npm test
```

### 4. Production Build
```bash
npm run build
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run dev server |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject from Create React App |

## Features Implementation

### Real-time Notifications
```javascript
import { initializeSocket, onNotification } from './utils/socket';

useEffect(() => {
  const socket = initializeSocket();
  onNotification((notification) => {
    console.log('New notification:', notification);
  });
}, []);
```

### API Calls
```javascript
import { api } from './utils/api';

// Get places
const places = await api.getPlacesByCity('Hyderabad');

// Predict crowd
const prediction = await api.predictCrowd(placeId, dateTime);

// Create itinerary
const itinerary = await api.createItinerary(data);
```

### State Management
Uses React Hooks (useState, useEffect, useContext)

### Routing
Uses React Router v6 for navigation

### Styling
Tailwind CSS for utility-first styling

## Customization

### Change API URL
Edit `src/utils/api.js`:
```javascript
const API_URL = 'YOUR_API_URL/api';
```

### Modify Theme
Edit Tailwind config or `src/index.css`:
```css
/* Add custom colors, fonts, etc. */
```

### Add New Pages
1. Create component in `src/pages/`
2. Import in `App.js`
3. Add route in Routes

## Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### API Connection Issues
- Ensure backend is running on http://localhost:5000
- Check CORS settings in backend
- Verify API_URL in `src/utils/api.js`

### WebSocket Connection Failed
- Ensure backend Socket.io server is running
- Check firewall settings
- Verify Socket URL in `src/utils/socket.js`

## Performance Optimization

### Code Splitting
Components are automatically code-split by React Router

### Image Optimization
Use Next.js Image or similar for image optimization

### Lazy Loading
```javascript
import { Suspense, lazy } from 'react';

const ExplorePage = lazy(() => import('./pages/ExplorePage'));
```

### Memoization
```javascript
import { memo, useMemo } from 'react';

export default memo(PlaceCard);
```

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'build' folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json:
"homepage": "https://yourusername.github.io/repo-name",
# Add scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
npm run deploy
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI framework |
| react-router-dom | 6.16.0 | Routing |
| axios | 1.5.0 | HTTP client |
| socket.io-client | 4.7.2 | Real-time |
| chart.js | 4.4.0 | Charts |
| tailwindcss | 3.3.0 | Styling |
| react-icons | 4.12.0 | Icons |

## Environment Variables

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# WebSocket Configuration
REACT_APP_SOCKET_URL=http://localhost:5000

# Optional: Analytics, etc.
REACT_APP_GA_ID=your_google_analytics_id
```

## Tips for Developers

1. **Use React DevTools Extension** for debugging
2. **Keep components small** and focused
3. **Extract reusable components** early
4. **Use custom hooks** for logic sharing
5. **Optimize re-renders** with React.memo

## Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Chart.js](https://www.chartjs.org)
- [Socket.io Client](https://socket.io/docs/v4/client-api)

---

**Frontend Setup Complete! ✅**
