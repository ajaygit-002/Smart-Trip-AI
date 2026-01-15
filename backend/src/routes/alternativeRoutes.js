const express = require('express');
const router = express.Router();
const alternativeController = require('../controllers/alternativeController');

router.post('/alternatives', alternativeController.getAlternatives);
router.get('/nearby', alternativeController.getNearbyPlaces);

module.exports = router;
