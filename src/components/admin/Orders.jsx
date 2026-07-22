import React, { useState } from 'react';
import NotificationBell from '../shared/NotificationBell';
import ProfileEditModal from '../shared/ProfileEditModal';

const NAV_ITEMS = [
  { icon: 'bi-grid', label: 'Dashboard', page: 'admin-dashboard' },
  { icon: 'bi-box-seam', label: 'Product Management', page: 'admin-products' },
  { icon: 'bi-bag', label: 'Orders', page: 'admin-orders' },
];

const DEFAULT_ORDERS = [
  { id: 'FH-9821', customer: 'Eleanor Shelistrop', items: ['Kesar Mangoes', 'Wild Honey 500g'], date: 'Oct 24, 2023', amount: 124.50, status: 'Processing' },
  { id: 'FH-9820', customer: 'Tahani Al-Jamil', items: ['Premium Hass Avocados'], date: 'Oct 23, 2023', amount: 89.20, status: 'Shipped' },
  { id: 'FH-9819', customer: 'Chidi Anagonye', items: ['Artisanal Turmeric Powder', 'Kesar Mangoes', 'Wild Honey 500g'], date: 'Oct 23, 2023', amount: 215.00, status: 'Delivered' },
  { id: 'FH-9818', customer: 'Jason Mendoza', items: ['Premium Hass Avocados'], date: 'Oct 22, 2023', amount: 45.10, status: 'Delivered' },
  { id: 'FH-9817', customer: 'Simone Nguyen', items: ['Wild Honey 500g'], date: 'Oct 21, 2023', amount: 67.80, status: 'Cancelled' },
  { id: 'FH-9816', customer: 'Marco Reyes', items: ['Kesar Mangoes', 'Premium Hass Avocados'], date: 'Oct 20, 2023', amount: 132.00, status: 'Shipped' },
];

const statusPillClass = {
  Processing: 'pill-processing',
  Shipped: 'pill-shipped',
  Delivered: 'pill-delivered',
  Cancelled: 'pill-cancelled',
};

const formatCurrency = (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function Orders({ setPage, adminUser, setAdminUser, registeredUser, setRegisteredUser, notifications, onMarkNotifsAsRead, orders }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Menggunakan orders prop dari parent jika ada, atau fallback ke data default
  const activeOrders = orders && orders.length > 0 ? orders : DEFAULT_ORDERS;

  const handleSaveProfile = (form) => {
    if (setRegisteredUser) {
      setRegisteredUser((prev) => ({ ...prev, profile: { ...prev?.profile, ...form } }));
    }
    if (setAdminUser) {
      setAdminUser((prev) => ({ ...prev, name: form.fullName || prev?.name }));
    }
  };

  const filteredOrders = activeOrders.filter((o) => {
    const matchesSearch =
      (o.customer && o.customer.toLowerCase().includes(search.toLowerCase())) ||
      (o.id && o.id.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar - Tetap mengunci diam (tidak terkena fade-in) */}
      <aside className="d-flex flex-column p-4" style={{ width: '260px', backgroundColor: 'var(--sidebar-bg)', flexShrink: 0 }}>
        <div className="mb-4">
          <h1 className="fw-bold m-0 text-white" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em' }}>Admin Panel</h1>
          <p className="m-0 mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>Global Operations</p>
        </div>

        <nav className="d-flex flex-column gap-2 flex-grow-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`side-nav-btn d-flex align-items-center gap-3 py-2.5 px-3 border-0 ${item.page === 'admin-orders' ? 'active' : ''}`}
              style={{ borderRadius: '12px', width: '100%', textAlign: 'left' }}
              onClick={(e) => {
                e.preventDefault();
                if (setPage) setPage(item.page);
              }}
            >
              <i className={`bi ${item.icon}`} style={{ fontSize: '1.1rem' }}></i> 
              <span className="fw-semibold" style={{ fontSize: '.9rem' }}>{item.label}</span>
            </button>
          ))}
        </nav>

        <hr className="my-3" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

        <button
          type="button"
          className="side-nav-btn logout-btn d-flex align-items-center gap-3 py-2.5 px-3 border-0"
          style={{ borderRadius: '12px' }}
          onClick={(e) => {
            e.preventDefault();
            if (setPage) setPage('login');
          }}
        >
          <i className="bi bi-box-arrow-right" style={{ fontSize: '1.1rem' }}></i> Logout
        </button>
      </aside>

      {/* Main content - Transisi Halus Masuk */}
      <main className="flex-grow-1 p-4 p-lg-5 admin-fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>Orders</h2>
            <p className="mb-0 small" style={{ color: 'var(--text-muted)' }}>Seluruh pesanan dari pelanggan, lengkap dengan barang yang dipesan.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NotificationBell 
              notifications={notifications || []} 
              onMarkAsRead={onMarkNotifsAsRead}
            />
            <div
              className="d-flex align-items-center gap-3 bg-white p-2 px-3 border rounded-3 shadow-sm"
              style={{ cursor: 'pointer', borderColor: '#e2e8f0' }}
              onClick={() => setShowProfileModal(true)}
              title="Edit profil"
            >
              <div className="avatar-icon">
                <i className="bi bi-person-fill"></i>
              </div>
              <div>
                <p className="fw-semibold m-0" style={{ fontSize: '.85rem' }}>
                  {adminUser?.name || registeredUser?.profile?.fullName || 'Admin FreshHarvest'}
                </p>
                <p className="m-0" style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{adminUser?.role || 'admin'}</p>
              </div>
            </div>
          </div>
        </div>

        <ProfileEditModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          profile={registeredUser?.profile || { fullName: adminUser?.name || '' }}
          onSave={handleSaveProfile}
        />

        {/* Tabel Orders */}
        <div className="bg-white p-4 rounded-3 border shadow-sm" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>All Orders</h5>
            <div className="d-flex align-items-center gap-2">
              <input
                className="form-control py-1.5 px-3 rounded-pill"
                placeholder="Search customer or order ID..."
                style={{ width: 220, fontSize: '0.85rem' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="form-select py-1.5 px-3 rounded-pill"
                style={{ width: 160, fontSize: '0.85rem' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <table className="fh-table w-100">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items Ordered</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="fw-semibold">#{o.id}</td>
                    <td className="fw-semibold">{o.customer}</td>
                    <td>
                      {Array.isArray(o.items) && o.items.map((item) => (
                        <span key={item} className="badge bg-light text-dark border me-1 mb-1 font-weight-normal" style={{ fontSize: '0.72rem' }}>
                          {item}
                        </span>
                      ))}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{o.date}</td>
                    <td className="fw-bold">{formatCurrency(o.amount)}</td>
                    <td><span className={`pill ${statusPillClass[o.status] || ''}`}>{o.status}</span></td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                      Tidak ada pesanan yang cocok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mb-0 mt-3 small" style={{ color: 'var(--text-muted)' }}>
            Displaying {filteredOrders.length} of {activeOrders.length} orders
          </p>
        </div>
      </main>
    </div>
  );
}

export default Orders;