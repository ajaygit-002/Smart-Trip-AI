const Notification = require('../models/Notification');

// Get user notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20, skip = 0 } = req.query;

    const notifications = await Notification.find({ userId })
      .populate('relatedPlace')
      .populate('relatedItinerary')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Notification.countDocuments({ userId });

    res.json({
      notifications,
      total,
      hasMore: skip + limit < total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark all notifications as read
exports.markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany(
      { userId, read: false },
      { read: true }
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();

    // Send WebSocket notification
    if (req.io) {
      req.io.to(`user-${notification.userId}`).emit('new-notification', notification);
    }

    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.params;

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false
    });

    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
