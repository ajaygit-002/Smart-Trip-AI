const express = require('express');
const router = express.Router();
const crowdController = require('../controllers/crowdController');

router.post('/predict', crowdController.predictCrowd);
router.post('/best-times', crowdController.getBestTimes);
router.get('/history', crowdController.getCrowdHistory);
router.post('/record', crowdController.recordCrowdData);

module.exports = router;
