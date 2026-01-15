# 📍 Place API Endpoints - Quick Reference

## Base URL

```
http://localhost:5000/api/places
```

## Endpoints

### 1. Get All Cities

**GET** `/cities/all`

Returns list of all cities with place counts and statistics.

**Response:**

```json
{
  "totalCities": 2,
  "cities": [
    {
      "name": "Hyderabad",
      "placeCount": 20,
      "categories": [
        "Monument",
        "Museum",
        "Temple",
        "Park",
        "Market",
        "Mall",
        "Food",
        "Hotel"
      ],
      "avgRating": 4.5
    }
  ]
}
```

---

### 2. Get Places by City

**GET** `/city/:city`

**Example:** `/city/Hyderabad`

**Response:**

```json
{
  "city": "Hyderabad",
  "count": 20,
  "places": [
    /* array of place objects */
  ]
}
```

---

### 3. Get Categories in City

**GET** `/city/:city/categories`

**Example:** `/city/Mumbai/categories`

**Response:**

```json
{
  "city": "Mumbai",
  "categories": [
    { "name": "Monument", "count": 3 },
    { "name": "Museum", "count": 1 },
    { "name": "Food", "count": 3 }
  ]
}
```

---

### 4. Get Popular Places

**GET** `/city/:city/popular?limit=10`

**Query Params:**

- `limit` (optional): Number of results (default: 10)

**Example:** `/city/Hyderabad/popular?limit=5`

**Response:**

```json
{
  "city": "Hyderabad",
  "limit": 5,
  "count": 5,
  "places": [
    /* sorted by popularityScore DESC */
  ]
}
```

---

### 5. Filter by Category

**GET** `/city/:city/category/:category`

**Example:** `/city/Mumbai/category/Monument`

**Valid Categories:**

- Monument
- Museum
- Temple
- Park
- Beach
- Market
- Mall
- Food
- Hotel
- Entertainment
- Heritage

**Response:**

```json
{
  "city": "Mumbai",
  "category": "Monument",
  "count": 3,
  "places": [
    /* filtered results */
  ]
}
```

---

### 6. Filter by Budget

**GET** `/city/:city/budget/:budget`

**Example:** `/city/Hyderabad/budget/Low`

**Valid Budget Values:**

- Low
- Medium
- High

**Response:**

```json
{
  "city": "Hyderabad",
  "budget": "Low",
  "count": 15,
  "places": [
    /* places with matching budgetRange */
  ]
}
```

---

### 7. Filter by Crowd Level

**GET** `/city/:city/crowd/:level?timeSlot=morning`

**Example:** `/city/Mumbai/crowd/low?timeSlot=morning`

**Valid Levels:**

- low (crowdScore < 40)
- medium (crowdScore 40-70)
- high (crowdScore > 70)

**Valid Time Slots:**

- morning
- afternoon
- evening

**Response:**

```json
{
  "city": "Mumbai",
  "crowdLevel": "low",
  "timeSlot": "morning",
  "count": 8,
  "places": [
    /* places with low crowd in morning */
  ]
}
```

---

### 8. Filter by Tags

**GET** `/city/:city/tags?tags=tag1,tag2,tag3`

**Example:** `/city/Hyderabad/tags?tags=family_friendly,budget_trip`

**Query Params:**

- `tags`: Comma-separated list of tags

**Common Tags:**

- `family_friendly`
- `romantic`
- `budget_trip`
- `luxury`
- `photo_spot`
- `historical`
- `spiritual`
- `nature`
- `street_food`
- `shopping`
- `adventure`
- `peaceful`
- `crowded_peak`
- `less_crowded`

**Response:**

```json
{
  "city": "Hyderabad",
  "tags": ["family_friendly", "budget_trip"],
  "count": 12,
  "places": [
    /* places matching any of the tags */
  ]
}
```

---

### 9. Keyword Search

**GET** `/search?keyword=...&city=...`

**Query Params:**

- `keyword` (required): Search term
- `city` (optional): Filter by city

**Example:** `/search?keyword=biryani&city=Hyderabad`

**Response:**

```json
{
  "keyword": "biryani",
  "city": "Hyderabad",
  "count": 2,
  "places": [
    /* places matching keyword in name/description/tags */
  ]
}
```

---

### 10. Advanced Search

**GET** `/filter/advanced?city=...&category=...&tags=...&budget=...&minRating=...&maxPrice=...`

**Query Params:**

- `city` (required): City name
- `category` (optional): Category filter
- `tags` (optional): Comma-separated tags
- `budget` (optional): Budget range
- `minRating` (optional): Minimum rating (e.g., 4.5)
- `maxPrice` (optional): Maximum average cost

**Example:** `/filter/advanced?city=Mumbai&category=Food&minRating=4.5&budget=Low`

**Response:**

```json
{
  "appliedFilters": {
    "city": "Mumbai",
    "category": "Food",
    "budgetRange": "Low",
    "rating": { "$gte": 4.5 }
  },
  "count": 2,
  "places": [
    /* filtered results */
  ]
}
```

---

### 11. Get Place by ID

**GET** `/:id`

**Example:** `/6796e123abc456def7890123`

**Response:**

```json
{
  "_id": "6796e123abc456def7890123",
  "name": "Charminar",
  "city": "Hyderabad",
  "category": "Monument",
  "description": "400-year-old iconic monument...",
  "location": { "type": "Point", "coordinates": [78.4747, 17.3616] },
  "rating": 4.6,
  "popularityScore": 95,
  "budgetRange": "Low",
  "avgCost": 100,
  "crowdPattern": {
    "weekday": { "morning": 45, "afternoon": 65, "evening": 80 },
    "weekend": { "morning": 70, "afternoon": 85, "evening": 95 }
  }
  /* ... full place object ... */
}
```

---

### 12. Create Place (Admin)

**POST** `/`

**Body:**

```json
{
  "name": "New Place",
  "city": "Delhi",
  "category": "Monument"
  /* ... all required fields ... */
}
```

**Response:** Created place object with `_id`

---

### 13. Update Place (Admin)

**PUT** `/:id`

**Body:** Partial or full place object

**Response:** Updated place object

---

### 14. Delete Place (Admin)

**DELETE** `/:id`

**Response:**

```json
{ "message": "Place deleted successfully" }
```

---

## Place Object Structure

```javascript
{
  "_id": "ObjectId",
  "name": "Place Name",
  "city": "City Name",
  "state": "State",
  "category": "Category",
  "tags": ["tag1", "tag2"],
  "description": "Description",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "address": "Full Address",
  "timing": {
    "open": "HH:MM",
    "close": "HH:MM"
  },
  "duration": "1-2 hours",
  "entryFee": {
    "indian": 100,
    "foreigner": 300
  },
  "bestTimeToVisit": "October to March",
  "idealSeason": "Winter",
  "rating": 4.5,
  "popularityScore": 85,
  "budgetRange": "Low|Medium|High",
  "avgCost": 500,
  "nearbyTransport": ["Bus", "Metro"],
  "recommendedFor": ["families", "couples"],
  "crowdPattern": {
    "weekday": {
      "morning": 30,
      "afternoon": 50,
      "evening": 70
    },
    "weekend": {
      "morning": 60,
      "afternoon": 80,
      "evening": 90
    }
  },
  "images": [],
  "facilities": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Error Responses

### 400 Bad Request

```json
{ "error": "City is required" }
{ "error": "Invalid budget. Use: Low, Medium, or High" }
```

### 404 Not Found

```json
{ "error": "No Monument places found in Mumbai" }
{ "error": "Place not found" }
```

### 500 Internal Server Error

```json
{ "error": "Error message details" }
```

---

## Usage Examples

### Frontend (React with Axios)

```javascript
import axios from "axios";

const API_BASE = "http://localhost:5000/api/places";

// Get all cities
const cities = await axios.get(`${API_BASE}/cities/all`);

// Get places in a city
const places = await axios.get(`${API_BASE}/city/${selectedCity}`);

// Filter by category
const monuments = await axios.get(`${API_BASE}/city/${city}/category/Monument`);

// Filter by budget
const budgetPlaces = await axios.get(`${API_BASE}/city/${city}/budget/Low`);

// Advanced search
const results = await axios.get(`${API_BASE}/filter/advanced`, {
  params: {
    city: "Mumbai",
    category: "Food",
    minRating: 4.5,
    budget: "Low",
  },
});

// Search by keyword
const searchResults = await axios.get(`${API_BASE}/search`, {
  params: { keyword: "biryani", city: "Hyderabad" },
});
```

### cURL

```bash
# Get all cities
curl http://localhost:5000/api/places/cities/all

# Get places in Hyderabad
curl http://localhost:5000/api/places/city/Hyderabad

# Filter by category
curl http://localhost:5000/api/places/city/Mumbai/category/Monument

# Advanced search
curl "http://localhost:5000/api/places/filter/advanced?city=Mumbai&category=Food&minRating=4.5"
```

---

## Testing Checklist

- ✅ GET `/cities/all` - Returns 2 cities (Hyderabad, Mumbai)
- ✅ GET `/city/Hyderabad` - Returns 20 places
- ✅ GET `/city/Mumbai` - Returns 20 places
- ✅ GET `/city/Hyderabad/category/Monument` - Returns 4 monuments
- ✅ GET `/city/Hyderabad/budget/Low` - Returns budget-friendly places
- ✅ GET `/city/Hyderabad/tags?tags=family_friendly` - Returns family places
- ✅ GET `/search?keyword=biryani` - Returns food places
- ✅ GET `/filter/advanced?city=Mumbai&category=Food&minRating=4.5` - Returns filtered results
- ✅ GET `/:id` - Returns single place details

---

## Notes

- All GET endpoints return data sorted by rating or popularity
- Crowd level filtering requires `timeSlot` query parameter
- Tags are case-insensitive in search
- Location coordinates are in [longitude, latitude] format (GeoJSON standard)
- Crowd pattern scores range from 0-100 (0 = empty, 100 = extremely crowded)
