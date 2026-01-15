import React, { useState, useEffect } from "react";
import { FiBell, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { api } from "../utils/api";

const NotificationPanel = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
      fetchUnreadCount();

      const interval = setInterval(() => {
        fetchUnreadCount();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const data = await api.getUserNotifications(userId, 10);
      setNotifications(data?.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const data = await api.getUnreadCount(userId);
      setUnreadCount(data?.unreadCount || 0);
    } catch (error) {
      console.error("Error fetching unread count:", error);
      setUnreadCount(0);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.markNotificationAsRead(notificationId);
      fetchNotifications();
      fetchUnreadCount();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "crowd-alert":
        return <FiAlertCircle className="text-red-500" />;
      case "best-time":
        return <FiCheckCircle className="text-green-500" />;
      case "itinerary-update":
        return <FiCheckCircle className="text-blue-500" />;
      default:
        return <FiBell />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <FiBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No notifications</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif._id}
                  className={`p-3 mb-2 rounded-lg border-l-4 cursor-pointer ${
                    notif.read
                      ? "bg-gray-50 border-gray-200"
                      : "bg-blue-50 border-blue-400"
                  }`}
                  onClick={() => !notif.read && handleMarkAsRead(notif._id)}
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-1">
                      {getNotificationIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notif.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
