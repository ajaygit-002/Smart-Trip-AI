const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

const connectDB = require('./config/database');
const placeRoutes = require('./routes/placeRoutes');
const crowdRoutes = require('./routes/crowdRoutes');
const itineraryRoutes = require('./routes/itineraryRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Connect Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store io instance for routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/places', placeRoutes);
app.use('/api/crowd', crowdRoutes);
app.use('/api/itinerary', itineraryRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on('join-room', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined notification room`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
