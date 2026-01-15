const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:userId', notificationController.getUserNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.put('/:userId/read-all', notificationController.markAllAsRead);
router.post('/', notificationController.createNotification);
router.delete('/:id', notificationController.deleteNotification);
router.get('/:userId/unread-count', notificationController.getUnreadCount);

module.exports = router;
