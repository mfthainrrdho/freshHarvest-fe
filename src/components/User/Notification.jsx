import React, { useState } from 'react';

function Notification() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'ORDER UPDATE',
      time: '2 hours ago',
      title: 'Your harvest is arriving tomorrow',
      description: "Farmer John's heirloom tomatoes and seasonal greens are packed and ready for transit. Delivery expected between 9:00 AM - 12:00 PM.",
      icon: 'bi-truck',
      isUnread: true,
    },
    {
      id: 2,
      type: 'ORDER UPDATE',
      time: '3 days ago',
      title: 'Your feedback matters',
      description: 'How were the strawberries from Valley Brook? Leave a review and earn 50 harvest points.',
      icon: 'bi-star',
      isUnread: false,
    }
  ]);

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <div className="container-fluid p-0">
      {/* Header Halaman */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1" style={{ fontSize: '2rem', color: '#063020', letterSpacing: '-0.5px' }}>
            Notifications
          </h1>
          <p className="text-muted small m-0">
            Stay updated with your harvest deliveries and order status.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={markAllAsRead}>
              Mark all as read
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={clearAllNotifications}>
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* List Notifikasi */}
      <div className="d-flex flex-column gap-3">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`bg-white rounded-3 p-4 border shadow-sm d-flex gap-4 align-items-start position-relative ${notif.isUnread ? 'border-start border-4 border-success' : ''}`}
            >
              {/* Icon Circle */}
              <div 
                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: '#e8f5e9', 
                  color: '#2e7d32' 
                }}
              >
                <i className={`bi ${notif.icon} fs-5`}></i>
              </div>

              {/* Teks Content */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="fw-bold text-uppercase" style={{ fontSize: '0.7rem', color: '#855823', letterSpacing: '0.5px' }}>
                    {notif.type}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                    • {notif.time}
                  </span>
                </div>
                <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '1.05rem', letterSpacing: '-0.3px' }}>
                  {notif.title}
                </h5>
                <p className="text-muted m-0 small" style={{ lineHeight: '1.5' }}>
                  {notif.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5 bg-white rounded-3 border">
            <i className="bi bi-bell-slash text-muted fs-1 mb-2 d-block opacity-50"></i>
            <p className="text-muted m-0 fw-medium">No order updates available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;