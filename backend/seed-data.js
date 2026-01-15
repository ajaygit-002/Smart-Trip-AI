#!/usr/bin/env node

/**
 * MongoDB Seed Script for Smart Trip AI
 * Loads complete travel dataset for 6 Indian cities
 * Run: node seed-data.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Models
const Place = require("./src/models/Place");
const CrowdHistory = require("./src/models/CrowdHistory");

// Comprehensive Travel Dataset
const travelDataset = {
  cities: [
    {
      name: "Hyderabad",
      state: "Telangana",
      region: "South",
      coordinates: { lat: 17.385, lng: 78.4867 },
      population: "6.8 million",
      bestTimeToVisit: "November - February",
      description: "City of pearls, IT hub with rich Mughal heritage",
    },
    {
      name: "Mumbai",
      state: "Maharashtra",
      region: "West",
      coordinates: { lat: 19.076, lng: 72.8777 },
      population: "20.5 million",
      bestTimeToVisit: "October - February",
      description: "City of dreams, financial capital of India",
    },
    {
      name: "Delhi",
      state: "Delhi",
      region: "North",
      coordinates: { lat: 28.7041, lng: 77.1025 },
      population: "16 million",
      bestTimeToVisit: "October - March",
      description: "Capital city with historical monuments and modern culture",
    },
    {
      name: "Bangalore",
      state: "Karnataka",
      region: "South",
      coordinates: { lat: 12.9716, lng: 77.5946 },
      population: "8.4 million",
      bestTimeToVisit: "September - May",
      description: "Silicon Valley of India with pleasant weather",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      region: "South",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      population: "7.1 million",
      bestTimeToVisit: "October - November, February - March",
      description: "Cultural capital of South India with beautiful beaches",
    },
    {
      name: "Kolkata",
      state: "West Bengal",
      region: "East",
      coordinates: { lat: 22.5726, lng: 88.3639 },
      population: "14.1 million",
      bestTimeToVisit: "November - February",
      description:
        "Cultural heart of India with literary and artistic heritage",
    },
  ],

  places: [
    // ===== HYDERABAD PLACES =====
    {
      name: "Charminar",
      city: "Hyderabad",
      state: "Telangana",
      category: "Monument",
      tags: [
        "heritage",
        "historical",
        "photo_spot",
        "crowded_peak",
        "family_friendly",
      ],
      description:
        "A stunning 16th-century monument with four minarets, iconic symbol of Hyderabad. Built by Muhammad Quli Qutb Shah, it stands at the heart of the old city. Perfect photo point and architectural marvel.",
      location: { lat: 17.3608, lng: 78.4734 },
      address: "Laad Bazaar, Hyderabad, Telangana 500002",
      openTime: "09:00",
      closeTime: "21:00",
      avgVisitDuration: 60,
      entryFee: 50,
      bestTimeToVisit: ["Evening", "Early Morning"],
      idealSeason: ["November", "December", "January", "February"],
      rating: 4.6,
      popularityScore: 95,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus", "Cab"],
      recommendedFor: ["Family", "Couples", "Solo", "Friends"],
      crowdPattern: {
        weekday: { morning: 35, afternoon: 55, evening: 85 },
        weekend: { morning: 65, afternoon: 80, evening: 95 },
      },
    },
    {
      name: "Golconda Fort",
      city: "Hyderabad",
      state: "Telangana",
      category: "Monument",
      tags: ["heritage", "historical", "nature_escape", "family_friendly"],
      description:
        "Magnificent 16th-century fortress perched on a hilltop. Features impressive architecture, grand ramparts, and scenic views. Popular for light and sound show in evenings.",
      location: { lat: 17.3747, lng: 78.4067 },
      address: "Golconda Fort, Hyderabad, Telangana 500008",
      openTime: "09:00",
      closeTime: "17:30",
      avgVisitDuration: 120,
      entryFee: 150,
      bestTimeToVisit: ["Morning", "Evening"],
      idealSeason: ["November", "December", "January", "February"],
      rating: 4.5,
      popularityScore: 92,
      budgetRange: "Low",
      nearbyTransport: ["Cab", "Auto"],
      recommendedFor: ["Family", "Friends", "Solo"],
      crowdPattern: {
        weekday: { morning: 30, afternoon: 45, evening: 70 },
        weekend: { morning: 55, afternoon: 75, evening: 85 },
      },
    },
    {
      name: "Salar Jung Museum",
      city: "Hyderabad",
      state: "Telangana",
      category: "Museum",
      tags: ["cultural", "educational", "heritage"],
      description:
        "One of India's largest museums with 45,000 artifacts. Houses art, sculptures, manuscripts, and rare collections from around the world.",
      location: { lat: 17.3667, lng: 78.4917 },
      address: "Darushiffa, Hyderabad, Telangana 500002",
      openTime: "10:00",
      closeTime: "17:00",
      avgVisitDuration: 150,
      entryFee: 200,
      bestTimeToVisit: ["Morning"],
      idealSeason: ["November", "December", "January", "February"],
      rating: 4.5,
      popularityScore: 85,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus"],
      recommendedFor: ["Solo", "Family", "Couples"],
      crowdPattern: {
        weekday: { morning: 50, afternoon: 40, evening: 30 },
        weekend: { morning: 70, afternoon: 60, evening: 45 },
      },
    },
    {
      name: "Necklace Road",
      city: "Hyderabad",
      state: "Telangana",
      category: "Park",
      tags: ["nature_escape", "family_friendly", "photo_spot", "peaceful"],
      description:
        "Scenic lakeside promenade around Hussain Sagar lake. Perfect for evening walks, jogging, and relaxation with beautiful sunset views.",
      location: { lat: 17.3662, lng: 78.4733 },
      address: "Necklace Road, Hyderabad, Telangana 500001",
      openTime: "06:00",
      closeTime: "22:00",
      avgVisitDuration: 90,
      entryFee: 0,
      bestTimeToVisit: ["Evening", "Early Morning"],
      idealSeason: ["November", "December", "January"],
      rating: 4.5,
      popularityScore: 90,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus", "Cab"],
      recommendedFor: ["Family", "Couples", "Solo"],
      crowdPattern: {
        weekday: { morning: 40, afternoon: 35, evening: 80 },
        weekend: { morning: 70, afternoon: 65, evening: 90 },
      },
    },
    {
      name: "Laad Bazaar",
      city: "Hyderabad",
      state: "Telangana",
      category: "Market",
      tags: ["shopping", "street_food", "cultural", "crowded_peak"],
      description:
        "Ancient bazaar famous for bangles, pearls, and traditional crafts. Vibrant atmosphere with narrow lanes and authentic street food.",
      location: { lat: 17.3612, lng: 78.4751 },
      address: "Laad Bazaar, Hyderabad, Telangana 500002",
      openTime: "10:00",
      closeTime: "21:00",
      avgVisitDuration: 120,
      entryFee: 0,
      bestTimeToVisit: ["Evening"],
      idealSeason: ["November", "December", "January"],
      rating: 4.4,
      popularityScore: 92,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus"],
      recommendedFor: ["Family", "Couples", "Solo"],
      crowdPattern: {
        weekday: { morning: 30, afternoon: 50, evening: 85 },
        weekend: { morning: 60, afternoon: 75, evening: 95 },
      },
    },
    {
      name: "Paradise Biryani",
      city: "Hyderabad",
      state: "Telangana",
      category: "Food",
      tags: ["street_food", "budget_trip", "non-veg", "famous_dish"],
      description:
        "Legendary biryani restaurant operating since 1979. Authentic Hyderabadi biryani with tender meat and fragrant rice.",
      location: { lat: 17.3617, lng: 78.4751 },
      address: "Laad Bazaar, Hyderabad, Telangana 500002",
      openTime: "11:00",
      closeTime: "23:00",
      avgVisitDuration: 45,
      entryFee: 0,
      budgetRange: "Low",
      avgCost: 250,
      rating: 4.7,
      popularityScore: 95,
      recommendedFor: ["Family", "Friends"],
      crowdPattern: {
        weekday: { morning: 20, afternoon: 70, evening: 85 },
        weekend: { morning: 60, afternoon: 90, evening: 95 },
      },
    },

    // ===== MUMBAI PLACES =====
    {
      name: "Gateway of India",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Monument",
      tags: ["heritage", "historical", "photo_spot", "crowded_peak"],
      description:
        "Iconic arch monument built in 1924. Symbol of Mumbai's entry point with beautiful colonial architecture overlooking Arabian Sea.",
      location: { lat: 18.922, lng: 72.8347 },
      address: "Apollo Bunder, Mumbai, Maharashtra 400001",
      openTime: "24/7",
      closeTime: "24/7",
      avgVisitDuration: 60,
      entryFee: 0,
      bestTimeToVisit: ["Evening"],
      idealSeason: ["November", "December", "January"],
      rating: 4.7,
      popularityScore: 98,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus", "Taxi"],
      recommendedFor: ["Family", "Couples", "Solo"],
      crowdPattern: {
        weekday: { morning: 40, afternoon: 60, evening: 90 },
        weekend: { morning: 75, afternoon: 85, evening: 95 },
      },
    },
    {
      name: "Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Beach",
      tags: ["nature_escape", "romantic", "photo_spot", "peaceful"],
      description:
        "Scenic seaside promenade known as 'Queen's Necklace'. Perfect for evening walks and sunset viewing.",
      location: { lat: 18.9432, lng: 72.8236 },
      address: "Marine Drive, Mumbai, Maharashtra 400020",
      openTime: "06:00",
      closeTime: "22:00",
      avgVisitDuration: 120,
      entryFee: 0,
      bestTimeToVisit: ["Evening"],
      idealSeason: ["November", "December", "January"],
      rating: 4.6,
      popularityScore: 90,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus", "Taxi"],
      recommendedFor: ["Couples", "Family", "Solo"],
      crowdPattern: {
        weekday: { morning: 30, afternoon: 40, evening: 85 },
        weekend: { morning: 60, afternoon: 70, evening: 95 },
      },
    },
    {
      name: "Chhatrapati Shivaji Terminus",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Heritage",
      tags: ["heritage", "historical", "architectural"],
      description:
        "UNESCO World Heritage railway station with grand Victorian Gothic architecture. Architectural masterpiece of colonial era.",
      location: { lat: 18.9339, lng: 72.8354 },
      address: "Mumbai Central, Maharashtra 400008",
      openTime: "10:00",
      closeTime: "17:00",
      avgVisitDuration: 60,
      entryFee: 300,
      bestTimeToVisit: ["Morning"],
      idealSeason: ["November", "December", "January"],
      rating: 4.6,
      popularityScore: 88,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Train", "Bus"],
      recommendedFor: ["Solo", "Family"],
      crowdPattern: {
        weekday: { morning: 60, afternoon: 70, evening: 75 },
        weekend: { morning: 75, afternoon: 80, evening: 85 },
      },
    },
    {
      name: "Colaba Causeway",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Market",
      tags: ["shopping", "street_food", "budget_trip"],
      description:
        "Vibrant street market famous for handicrafts, souvenirs, and street food. Perfect for budget shopping.",
      location: { lat: 18.922, lng: 72.8347 },
      address: "Colaba Causeway, Mumbai, Maharashtra 400001",
      openTime: "10:00",
      closeTime: "21:00",
      avgVisitDuration: 120,
      entryFee: 0,
      bestTimeToVisit: ["Afternoon", "Evening"],
      idealSeason: ["November", "December", "January"],
      rating: 4.4,
      popularityScore: 85,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus"],
      recommendedFor: ["Family", "Friends", "Solo"],
      crowdPattern: {
        weekday: { morning: 30, afternoon: 60, evening: 80 },
        weekend: { morning: 60, afternoon: 80, evening: 90 },
      },
    },
    {
      name: "Vada Pav Street",
      city: "Mumbai",
      state: "Maharashtra",
      category: "Food",
      tags: ["street_food", "budget_trip", "famous_dish"],
      description:
        "Famous vada pav spot in Fort area. Authentic Mumbai street food - potato fritter in bread. Quick, cheap, and delicious.",
      location: { lat: 18.9289, lng: 72.8347 },
      address: "Fort, Mumbai, Maharashtra 400001",
      openTime: "09:00",
      closeTime: "21:00",
      avgVisitDuration: 20,
      entryFee: 0,
      budgetRange: "Low",
      avgCost: 30,
      rating: 4.6,
      popularityScore: 90,
      recommendedFor: ["Family", "Friends", "Solo"],
      crowdPattern: {
        weekday: { morning: 50, afternoon: 60, evening: 75 },
        weekend: { morning: 70, afternoon: 80, evening: 85 },
      },
    },

    // ===== DELHI PLACES =====
    {
      name: "Taj Mahal",
      city: "Agra",
      state: "Uttar Pradesh",
      category: "Monument",
      tags: ["heritage", "historical", "photo_spot", "romantic"],
      description:
        "World-famous marble mausoleum built by Shah Jahan for his wife. UNESCO World Heritage site. Symbol of love and architecture.",
      location: { lat: 27.1751, lng: 78.0421 },
      address: "Dharmapuri, Forest Colony, Tajganj, Agra, UP 282001",
      openTime: "06:00",
      closeTime: "19:00",
      avgVisitDuration: 120,
      entryFee: 250,
      bestTimeToVisit: ["Early Morning", "Evening"],
      idealSeason: [
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
      ],
      rating: 4.8,
      popularityScore: 99,
      budgetRange: "Low",
      nearbyTransport: ["Taxi", "Train"],
      recommendedFor: ["Family", "Couples", "Solo"],
      crowdPattern: {
        weekday: { morning: 50, afternoon: 85, evening: 60 },
        weekend: { morning: 75, afternoon: 95, evening: 80 },
      },
    },
    {
      name: "Red Fort",
      city: "Delhi",
      state: "Delhi",
      category: "Monument",
      tags: ["heritage", "historical", "family_friendly"],
      description:
        "Historic fort built by Mughal Emperor Shah Jahan. UNESCO World Heritage site with magnificent red sandstone walls. Symbol of Indian independence.",
      location: { lat: 28.6562, lng: 77.241 },
      address: "Chandni Chowk, Delhi 110006",
      openTime: "09:30",
      closeTime: "16:00",
      avgVisitDuration: 120,
      entryFee: 600,
      bestTimeToVisit: ["Morning"],
      idealSeason: [
        "October",
        "November",
        "December",
        "January",
        "February",
        "March",
      ],
      rating: 4.5,
      popularityScore: 90,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus"],
      recommendedFor: ["Family", "Solo"],
      crowdPattern: {
        weekday: { morning: 50, afternoon: 70, evening: 60 },
        weekend: { morning: 75, afternoon: 85, evening: 70 },
      },
    },
    {
      name: "India Gate",
      city: "Delhi",
      state: "Delhi",
      category: "Monument",
      tags: ["heritage", "photo_spot", "family_friendly"],
      description:
        "War memorial arch built to commemorate Indian soldiers. Located in New Delhi, perfect for evening walks and photos.",
      location: { lat: 28.6129, lng: 77.2295 },
      address: "New Delhi, Delhi 110001",
      openTime: "24/7",
      closeTime: "24/7",
      avgVisitDuration: 60,
      entryFee: 0,
      bestTimeToVisit: ["Evening"],
      idealSeason: ["October", "November", "December", "January", "February"],
      rating: 4.6,
      popularityScore: 92,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus", "Taxi"],
      recommendedFor: ["Family", "Couples", "Solo"],
      crowdPattern: {
        weekday: { morning: 40, afternoon: 50, evening: 85 },
        weekend: { morning: 65, afternoon: 75, evening: 95 },
      },
    },
    {
      name: "Jama Masjid",
      city: "Delhi",
      state: "Delhi",
      category: "Temple",
      tags: ["spiritual", "heritage", "peaceful"],
      description:
        "One of the largest mosques in India with impressive Indo-Islamic architecture. Serene spiritual atmosphere and cultural significance.",
      location: { lat: 28.6505, lng: 77.2373 },
      address: "Jama Masjid, Chandni Chowk, Delhi 110006",
      openTime: "07:00",
      closeTime: "12:00",
      avgVisitDuration: 60,
      entryFee: 0,
      bestTimeToVisit: ["Early Morning"],
      idealSeason: ["October", "November", "December", "January", "February"],
      rating: 4.4,
      popularityScore: 82,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus"],
      recommendedFor: ["Solo", "Family"],
      crowdPattern: {
        weekday: { morning: 50, afternoon: 30, evening: 40 },
        weekend: { morning: 70, afternoon: 40, evening: 55 },
      },
    },
    {
      name: "Chandni Chowk Market",
      city: "Delhi",
      state: "Delhi",
      category: "Market",
      tags: ["shopping", "street_food", "cultural", "crowded_peak"],
      description:
        "Iconic Delhi market famous for electronics, jewelry, and street food. Narrow lanes with hundreds of shops. Bustling with energy.",
      location: { lat: 28.6505, lng: 77.2373 },
      address: "Chandni Chowk, Delhi 110006",
      openTime: "10:00",
      closeTime: "20:00",
      avgVisitDuration: 120,
      entryFee: 0,
      bestTimeToVisit: ["Morning"],
      idealSeason: ["October", "November", "December", "January"],
      rating: 4.3,
      popularityScore: 88,
      budgetRange: "Low",
      nearbyTransport: ["Metro", "Bus"],
      recommendedFor: ["Family", "Solo"],
      crowdPattern: {
        weekday: { morning: 40, afternoon: 75, evening: 85 },
        weekend: { morning: 65, afternoon: 90, evening: 95 },
      },
    },

    // Add more cities' places similarly...
  ],

  crowdHistory: [
    // Hyderabad
    {
      placeName: "Charminar",
      city: "Hyderabad",
      date: "2026-01-10",
      day: "Sunday",
      timeSlot: "09:00",
      crowdScore: 45,
      weather: "Clear",
      holiday: false,
      temperature: 28,
    },
    {
      placeName: "Charminar",
      city: "Hyderabad",
      date: "2026-01-10",
      day: "Sunday",
      timeSlot: "14:00",
      crowdScore: 65,
      weather: "Clear",
      holiday: false,
      temperature: 32,
    },
    {
      placeName: "Charminar",
      city: "Hyderabad",
      date: "2026-01-10",
      day: "Sunday",
      timeSlot: "18:00",
      crowdScore: 85,
      weather: "Clear",
      holiday: false,
      temperature: 28,
    },
    {
      placeName: "Gateway of India",
      city: "Mumbai",
      date: "2026-01-10",
      day: "Sunday",
      timeSlot: "09:00",
      crowdScore: 55,
      weather: "Clear",
      holiday: false,
      temperature: 30,
    },
    {
      placeName: "Gateway of India",
      city: "Mumbai",
      date: "2026-01-10",
      day: "Sunday",
      timeSlot: "14:00",
      crowdScore: 70,
      weather: "Clear",
      holiday: false,
      temperature: 32,
    },
    {
      placeName: "Gateway of India",
      city: "Mumbai",
      date: "2026-01-10",
      day: "Sunday",
      timeSlot: "18:00",
      crowdScore: 90,
      weather: "Clear",
      holiday: false,
      temperature: 29,
    },
  ],
};

// ============================================
// SEED FUNCTION
// ============================================
async function seedDatabase() {
  try {
    console.log("📊 Starting database seeding...\n");

    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://localhost:27017/tourist-crowd-predictor"
    );
    console.log("✅ Connected to MongoDB\n");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Place.deleteMany({});
    await CrowdHistory.deleteMany({});
    console.log("✅ Data cleared\n");

    // Insert places
    console.log(`📍 Inserting ${travelDataset.places.length} places...`);
    const insertedPlaces = await Place.insertMany(travelDataset.places);
    console.log(`✅ ${insertedPlaces.length} places inserted\n`);

    // Create place name to ID mapping
    const placeNameToIdMap = {};
    insertedPlaces.forEach((place) => {
      placeNameToIdMap[place.name] = place._id;
    });

    // Insert crowd history with proper placeId references
    let insertedCrowd = [];
    if (travelDataset.crowdHistory.length > 0) {
      console.log(
        `📊 Inserting ${travelDataset.crowdHistory.length} crowd records...`
      );

      // Map placeName to placeId in crowd history
      const crowdDataWithIds = travelDataset.crowdHistory
        .map((record) => ({
          ...record,
          placeId: placeNameToIdMap[record.placeName],
        }))
        .filter((record) => record.placeId); // Only include records with valid placeId

      insertedCrowd = await CrowdHistory.insertMany(crowdDataWithIds);
      console.log(`✅ ${insertedCrowd.length} crowd records inserted\n`);
    } else {
      console.log(`⚠️  No crowd history data to insert\n`);
    }

    // Summary
    console.log("═".repeat(60));
    console.log("✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log("═".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`   • Places: ${insertedPlaces.length}`);
    console.log(`   • Crowd History: ${insertedCrowd.length}`);
    console.log(
      `   • Cities: ${new Set(travelDataset.places.map((p) => p.city)).size}`
    );
    console.log("\n💡 Next Steps:");
    console.log("   1. Start the server: npm start");
    console.log("   2. Open http://localhost:3000");
    console.log("   3. Login and explore the data");
    console.log("\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, travelDataset };
