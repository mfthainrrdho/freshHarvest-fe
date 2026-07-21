import React from 'react';

function Notification() {
  // Hanya menyimpan data notifikasi berjenis Order Update
  const notifications = [
    {
      id: 1,
      type: 'ORDER UPDATE',
      time: '2 hours ago',
      title: 'Your harvest is arriving tomorrow',
      description: "Farmer John's heirloom tomatoes and seasonal greens are packed and ready for transit. Delivery expected between 9:00 AM - 12:00 PM.",
      icon: 'bi-truck',
      iconBg: '#e8f5e9',
      iconColor: '#2e7d32'
    },
    {
      id: 2,
      type: 'ORDER UPDATE',
      time: '3 days ago',
      title: 'Your feedback matters',
      description: 'How were the strawberries from Valley Brook? Leave a review and earn 50 harvest points.',
      icon: 'bi-check2-circle',
      iconBg: '#e8f5e9',
      iconColor: '#2e7d32'
    }
  ];

  return (
    <div className="container-fluid p-0">
      {/* Header Halaman */}
      <div className="mb-4">
        <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '2rem', color: '#063020', letterSpacing: '-0.5px' }}>
          Notifications
        </h1>
        <p className="text-muted small m-0">
          Stay updated with your harvest deliveries and order status.
        </p>
      </div>

      {/* List Notifikasi */}
      <div className="d-flex flex-column gap-3">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className="bg-white rounded-3 p-4 border shadow-sm d-flex gap-4 align-items-start"
            style={{ transition: 'transform 0.2s ease' }}
          >
            {/* Lingkaran Icon Kiri */}
            <div 
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
              style={{ 
                width: '48px', 
                height: '48px', 
                backgroundColor: notif.iconBg, 
                color: notif.iconColor 
              }}
            >
              <i className={`bi ${notif.icon} fs-5`}></i>
            </div>

            {/* Konten Teks Kanan */}
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="fw-bold text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  {notif.type}
                </span>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                  • {notif.time}
                </span>
              </div>
              <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '1.1rem', letterSpacing: '-0.3px' }}>
                {notif.title}
              </h5>
              <p className="text-muted m-0 small" style={{ lineHeight: '1.5' }}>
                {notif.description}
              </p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center py-5 bg-white rounded-3 border">
            <i className="bi bi-bell-slash text-muted fs-1 mb-2"></i>
            <p className="text-muted m-0">No order updates available right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notification;