const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');

router.post('/', itineraryController.createItinerary);
router.get('/user/:userId', itineraryController.getUserItinerary);
router.get('/:id', itineraryController.getItinerary);
router.post('/:itineraryId/replan', itineraryController.replanItinerary);
router.put('/:id', itineraryController.updateItinerary);
router.delete('/:id', itineraryController.deleteItinerary);

module.exports = router;
