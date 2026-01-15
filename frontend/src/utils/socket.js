import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const initializeSocket = () => {
  socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const joinRoom = (userId) => {
  if (socket) {
    socket.emit('join-room', userId);
  }
};

export const onNotification = (callback) => {
  if (socket) {
    socket.on('new-notification', callback);
  }
};

export const onItineraryUpdate = (callback) => {
  if (socket) {
    socket.on('itinerary-updated', callback);
  }
};

export const offNotification = () => {
  if (socket) {
    socket.off('new-notification');
  }
};

export const getSocket = () => socket;
