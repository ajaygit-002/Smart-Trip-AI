const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

router.get('/', placeController.getPlacesByCity);
router.get('/id/:id', placeController.getPlaceById);
router.get('/category', placeController.getPlacesByCategory);
router.post('/', placeController.createPlace);
router.put('/:id', placeController.updatePlace);
router.delete('/:id', placeController.deletePlace);

module.exports = router;
