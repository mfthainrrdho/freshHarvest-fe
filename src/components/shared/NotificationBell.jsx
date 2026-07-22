import React, { useState, useRef, useEffect } from 'react';

// Sample data default dengan properti isRead
const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Pesanan baru masuk',
    message: 'murad baru saja membuat pesanan.',
    time: '15.09',
    isRead: false,
  },
  {
    id: 2,
    title: 'Pesanan baru masuk',
    message: 'murad baru saja membuat pesanan.',
    time: '15.08',
    isRead: false,
  },
  {
    id: 3,
    title: 'Pesanan baru masuk',
    message: 'murad baru saja membuat pesanan.',
    time: '14.53',
    isRead: false,
  },
];

// 🟢 TANGKAP PROP onMarkAsRead DARI PARENT
function NotificationBell({ notifications = DEFAULT_NOTIFICATIONS, onMarkAsRead }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik di luar area lonceng
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 🟢 1. HITUNG HANYA NOTIFIKASI YANG BELUM DIBACA (isRead === false)
  const unreadCount = notifications.filter((item) => !item.isRead).length;

  // 🟢 2. FUNGSI HANDLE KLIK LONCENG
  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    // Jika lonceng BUKA dan ada notifikasi belum dibaca, jalankan callback pemicu hilang merah
    if (nextState && unreadCount > 0 && onMarkAsRead) {
      onMarkAsRead();
    }
  };

  return (
    <div className="position-relative d-inline-block" ref={dropdownRef}>
      {/* Tombol Lonceng */}
      <button
        type="button"
        className="btn p-1 border-0 bg-transparent position-relative d-flex align-items-center justify-content-center"
        style={{ cursor: 'pointer', outline: 'none' }}
        onClick={handleToggle}
        title="Notifikasi"
      >
        <i className="bi bi-bell" style={{ fontSize: '1.6rem', color: '#1E2A1F' }}></i>

        {/* Badge Angka Merah/Clay - HANYA MUNCUL JIKA unreadCount > 0 */}
        {unreadCount > 0 && (
          <span
            className="position-absolute d-flex align-items-center justify-content-center text-white fw-bold"
            style={{
              top: '-2px',
              right: '-6px',
              backgroundColor: '#8C3B2A', // Warna clay/merah khas tema Fresh Harvest
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '0.68rem',
              lineHeight: 1,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel Notifikasi */}
      {isOpen && (
        <div
          className="position-absolute end-0 mt-2 rounded-3 shadow-lg border overflow-hidden"
          style={{
            width: '320px',
            backgroundColor: '#FFFDF8', // Off-white canvas/cream
            borderColor: 'rgba(20, 38, 27, 0.12)',
            zIndex: 1050,
          }}
        >
          {/* Header */}
          <div className="px-3 py-3 border-bottom" style={{ borderColor: 'rgba(20, 38, 27, 0.08)' }}>
            <h5 className="m-0 fw-bold" style={{ fontFamily: "'Fraunces', serif", color: '#1E2A1F', fontSize: '1.1rem' }}>
              Notifikasi
            </h5>
          </div>

          {/* List Item Notifikasi */}
          <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
            {notifications.length > 0 ? (
              notifications.map((item, index) => (
                <div
                  key={item.id || index}
                  className="px-3 py-3 border-bottom"
                  style={{
                    borderColor: 'rgba(20, 38, 27, 0.08)',
                    // Memberikan background tipis jika notifikasi belum dibaca sebelumnya
                    backgroundColor: item.isRead ? 'transparent' : 'rgba(140, 59, 42, 0.04)',
                  }}
                >
                  <p className="fw-bold mb-1" style={{ color: '#1E2A1F', fontSize: '0.9rem' }}>
                    {item.title}
                  </p>
                  <p className="mb-2" style={{ color: '#5B6459', fontSize: '0.85rem' }}>
                    {item.message}
                  </p>
                  <span className="mono" style={{ color: '#5B6459', fontSize: '0.75rem' }}>
                    {item.time}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center" style={{ color: '#5B6459', fontSize: '0.85rem' }}>
                Tidak ada notifikasi.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;