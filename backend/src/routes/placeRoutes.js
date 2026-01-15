const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

// City and listing endpoints
router.get("/cities/all", placeController.getAllCities);
router.get("/city/:city", placeController.getPlacesByCity);
router.get("/city/:city/categories", placeController.getCategoriesByCity);
router.get("/city/:city/popular", placeController.getPopularPlaces);

// Category-based filtering
router.get(
  "/city/:city/category/:category",
  placeController.getPlacesByCityAndCategory
);

// Budget filtering
router.get("/city/:city/budget/:budget", placeController.getPlacesByBudget);

// Crowd level filtering
router.get("/city/:city/crowd/:level", placeController.getPlacesByCrowdLevel);

// Tag-based filtering
router.get("/city/:city/tags", placeController.getPlacesByTags);

// Search and advanced filters
router.get("/search", placeController.searchPlaces);
router.get("/filter/advanced", placeController.advancedSearch);

// Single place details
router.get("/:id", placeController.getPlaceById);

// Create, update, delete
router.post("/", placeController.createPlace);
router.put("/:id", placeController.updatePlace);
router.delete("/:id", placeController.deletePlace);

module.exports = router;
