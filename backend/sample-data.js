// Sample data insertion script
// Run this in MongoDB to populate initial data

// Switch to database
db = db.getSiblingDB('tourist-crowd-predictor');

// Insert sample users
db.users.insertMany([
  {
    _id: ObjectId(),
    name: "Ajay Kumar",
    email: "ajay@example.com",
    passwordHash: "$2a$10$...", // bcrypted
    preferences: ["historical", "food", "museum"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Priya Singh",
    email: "priya@example.com",
    passwordHash: "$2a$10$...", // bcrypted
    preferences: ["beach", "park", "food"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Insert sample places for Hyderabad
db.places.insertMany([
  {
    _id: ObjectId(),
    name: "Charminar",
    city: "Hyderabad",
    category: "Monument",
    location: {
      lat: 17.3616,
      lng: 78.4747
    },
    description: "Iconic monument built in 1591, one of the most famous structures in Hyderabad",
    openTime: "09:00",
    closeTime: "21:00",
    avgVisitDuration: 60,
    rating: 4.5,
    entryFee: 20,
    imageUrl: "https://via.placeholder.com/400?text=Charminar",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Chowmahalla Palace",
    city: "Hyderabad",
    category: "Monument",
    location: {
      lat: 17.3678,
      lng: 78.4740
    },
    description: "Historic royal palace with magnificent architecture",
    openTime: "10:00",
    closeTime: "17:00",
    avgVisitDuration: 90,
    rating: 4.6,
    entryFee: 60,
    imageUrl: "https://via.placeholder.com/400?text=Chowmahalla+Palace",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Ramoji Film City",
    city: "Hyderabad",
    category: "Park",
    location: {
      lat: 17.2623,
      lng: 78.7193
    },
    description: "World's largest film studio with theme park attractions",
    openTime: "08:00",
    closeTime: "18:00",
    avgVisitDuration: 240,
    rating: 4.2,
    entryFee: 800,
    imageUrl: "https://via.placeholder.com/400?text=Ramoji+Film+City",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Salarjung Museum",
    city: "Hyderabad",
    category: "Museum",
    location: {
      lat: 17.3740,
      lng: 78.4789
    },
    description: "One of the largest museums in the world with rare collections",
    openTime: "09:30",
    closeTime: "17:00",
    avgVisitDuration: 120,
    rating: 4.4,
    entryFee: 40,
    imageUrl: "https://via.placeholder.com/400?text=Salarjung+Museum",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Birla Mandir",
    city: "Hyderabad",
    category: "Temple",
    location: {
      lat: 17.3868,
      lng: 78.4567
    },
    description: "Beautiful marble temple dedicated to Lord Venkateshwara",
    openTime: "06:00",
    closeTime: "20:00",
    avgVisitDuration: 45,
    rating: 4.7,
    entryFee: 0,
    imageUrl: "https://via.placeholder.com/400?text=Birla+Mandir",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Laad Bazaar",
    city: "Hyderabad",
    category: "Market",
    location: {
      lat: 17.3628,
      lng: 78.4735
    },
    description: "Traditional marketplace famous for bangles and handicrafts",
    openTime: "10:00",
    closeTime: "20:00",
    avgVisitDuration: 60,
    rating: 4.3,
    entryFee: 0,
    imageUrl: "https://via.placeholder.com/400?text=Laad+Bazaar",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Hyderabad Central Cafe",
    city: "Hyderabad",
    category: "Food",
    location: {
      lat: 17.3850,
      lng: 78.4700
    },
    description: "Traditional Hyderabadi biryani and haleem restaurant",
    openTime: "11:00",
    closeTime: "22:00",
    avgVisitDuration: 60,
    rating: 4.8,
    entryFee: 0,
    imageUrl: "https://via.placeholder.com/400?text=Hyderabad+Cafe",
    createdAt: new Date()
  }
]);

// Insert sample crowd history
db.crowd_history.insertMany([
  {
    _id: ObjectId(),
    placeId: db.places.findOne({ name: "Charminar" })._id,
    day: "Monday",
    timeSlot: "09:00",
    crowdScore: 45,
    crowdLevel: "Medium",
    isWeekend: false,
    isHoliday: false,
    weather: "Clear",
    season: "Summer",
    recordedAt: new Date()
  },
  {
    _id: ObjectId(),
    placeId: db.places.findOne({ name: "Charminar" })._id,
    day: "Monday",
    timeSlot: "18:00",
    crowdScore: 85,
    crowdLevel: "Very High",
    isWeekend: false,
    isHoliday: false,
    weather: "Clear",
    season: "Summer",
    recordedAt: new Date()
  },
  {
    _id: ObjectId(),
    placeId: db.places.findOne({ name: "Birla Mandir" })._id,
    day: "Sunday",
    timeSlot: "10:00",
    crowdScore: 70,
    crowdLevel: "High",
    isWeekend: true,
    isHoliday: false,
    weather: "Clear",
    season: "Summer",
    recordedAt: new Date()
  },
  {
    _id: ObjectId(),
    placeId: db.places.findOne({ name: "Laad Bazaar" })._id,
    day: "Saturday",
    timeSlot: "15:00",
    crowdScore: 90,
    crowdLevel: "Very High",
    isWeekend: true,
    isHoliday: false,
    weather: "Clear",
    season: "Summer",
    recordedAt: new Date()
  }
]);

// Sample places for Mumbai
db.places.insertMany([
  {
    _id: ObjectId(),
    name: "Gateway of India",
    city: "Mumbai",
    category: "Monument",
    location: {
      lat: 18.9220,
      lng: 72.8347
    },
    description: "Iconic 20-meter tall archway, entry point to Mumbai",
    openTime: "24:00",
    closeTime: "24:00",
    avgVisitDuration: 45,
    rating: 4.6,
    entryFee: 0,
    imageUrl: "https://via.placeholder.com/400?text=Gateway+of+India",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Marine Drive",
    city: "Mumbai",
    category: "Beach",
    location: {
      lat: 18.9432,
      lng: 72.8236
    },
    description: "Scenic beachfront promenade with stunning sea views",
    openTime: "24:00",
    closeTime: "24:00",
    avgVisitDuration: 60,
    rating: 4.5,
    entryFee: 0,
    imageUrl: "https://via.placeholder.com/400?text=Marine+Drive",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Taj Mahal Palace Hotel",
    city: "Mumbai",
    category: "Monument",
    location: {
      lat: 18.9432,
      lng: 72.8236
    },
    description: "Historic luxury hotel with iconic architecture",
    openTime: "10:00",
    closeTime: "18:00",
    avgVisitDuration: 90,
    rating: 4.7,
    entryFee: 50,
    imageUrl: "https://via.placeholder.com/400?text=Taj+Mahal+Palace",
    createdAt: new Date()
  }
]);

// Sample places for Delhi
db.places.insertMany([
  {
    _id: ObjectId(),
    name: "India Gate",
    city: "Delhi",
    category: "Monument",
    location: {
      lat: 28.6129,
      lng: 77.2295
    },
    description: "War memorial and iconic landmark of Delhi",
    openTime: "24:00",
    closeTime: "24:00",
    avgVisitDuration: 45,
    rating: 4.5,
    entryFee: 0,
    imageUrl: "https://via.placeholder.com/400?text=India+Gate",
    createdAt: new Date()
  },
  {
    _id: ObjectId(),
    name: "Red Fort",
    city: "Delhi",
    category: "Monument",
    location: {
      lat: 28.6567,
      lng: 77.2410
    },
    description: "Historic fortified palace built by the Mughal Emperor",
    openTime: "09:30",
    closeTime: "16:30",
    avgVisitDuration: 120,
    rating: 4.4,
    entryFee: 150,
    imageUrl: "https://via.placeholder.com/400?text=Red+Fort",
    createdAt: new Date()
  }
]);

// Create indexes for better query performance
db.users.createIndex({ email: 1 }, { unique: true });
db.places.createIndex({ city: 1 });
db.places.createIndex({ category: 1 });
db.crowd_history.createIndex({ placeId: 1, day: 1, timeSlot: 1 });
db.itineraries.createIndex({ userId: 1, date: -1 });
db.notifications.createIndex({ userId: 1, createdAt: -1 });

console.log("Sample data inserted successfully!");
console.log("Database setup complete!");
