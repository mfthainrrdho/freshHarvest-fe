import React, { useState } from 'react';
import NotificationBell from '../shared/NotificationBell';
import ProfileEditModal from '../shared/ProfileEditModal';

const NAV_ITEMS = [
  { icon: 'bi-grid', label: 'Dashboard', page: 'admin-dashboard' },
  { icon: 'bi-box-seam', label: 'Product Management', page: 'admin-products' },
  { icon: 'bi-bag', label: 'Orders', page: 'admin-orders' },
];

const ORDERS = [
  { id: 'FH-9821', customer: 'Eleanor Shelistrop', date: 'Oct 24, 2023', amount: 124.50, status: 'Processing' },
  { id: 'FH-9820', customer: 'Tahani Al-Jamil', date: 'Oct 23, 2023', amount: 89.20, status: 'Shipped' },
  { id: 'FH-9819', customer: 'Chidi Anagonye', date: 'Oct 23, 2023', amount: 215.00, status: 'Delivered' },
  { id: 'FH-9818', customer: 'Jason Mendoza', date: 'Oct 22, 2023', amount: 45.10, status: 'Delivered' },
  { id: 'FH-9817', customer: 'Simone Nguyen', date: 'Oct 21, 2023', amount: 67.80, status: 'Cancelled' },
  { id: 'FH-9816', customer: 'Marco Reyes', date: 'Oct 20, 2023', amount: 132.00, status: 'Shipped' },
];

const WIDGETS = [
  { key: 'shipping', label: 'Pengiriman', value: '482', delta: '+4.2%', trend: 'up', icon: 'bi-truck', tone: '#f1f5f9' },
  { key: 'cancelled', label: 'Pembatalan', value: '34', delta: '-1.8%', trend: 'down', icon: 'bi-x-circle', tone: '#ffe4e6' },
  { key: 'refund', label: 'Pengembalian', value: '12', delta: 'Stable', trend: 'flat', icon: 'bi-arrow-counterclockwise', tone: '#fef3c7' },
  { key: 'completed', label: 'Selesai', value: '1,896', delta: '+6.7%', trend: 'up', icon: 'bi-check-circle', tone: '#dcfce7' },
];

const statusPillClass = {
  Processing: 'pill-processing',
  Shipped: 'pill-shipped',
  Delivered: 'pill-delivered',
  Cancelled: 'pill-cancelled',
};

const formatCurrency = (value) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function AdminDashboard({ setPage, adminUser, setAdminUser, registeredUser, setRegisteredUser, notifications, onMarkNotifsAsRead }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const topOrders = ORDERS.slice(0, 5);

  const handleSaveProfile = (form) => {
    if (setRegisteredUser) {
      setRegisteredUser((prev) => ({
        ...prev,
        profile: { ...prev?.profile, ...form },
      }));
    }

    if (setAdminUser) {
      setAdminUser((prev) => ({
        ...prev,
        name: form.fullName || prev?.name,
      }));
    }
  };

  const totalIncome = ORDERS.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar - Tetap diam dan kokoh tanpa kena efek fade-in */}
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
              className={`side-nav-btn d-flex align-items-center gap-3 py-2.5 px-3 border-0 ${item.page === 'admin-dashboard' ? 'active' : ''}`}
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

      {/* Main Content - Cuma area ini saja yang di-animasikan dengan 'admin-fade-in' */}
      <main className="flex-grow-1 p-4 p-lg-5 admin-fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>Dashboard</h2>
            <p className="mb-0 small" style={{ color: 'var(--text-muted)' }}>Catalog control and inventory oversight for global distribution.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            
            {/* Lonceng Notifikasi */}
            <NotificationBell 
              notifications={notifications || []} 
              onMarkAsRead={onMarkNotifsAsRead} 
            />

            {/* Profile Bar */}
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

        {/* Modal Edit Profile */}
        <ProfileEditModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          profile={registeredUser?.profile || { fullName: adminUser?.name || '' }}
          onSave={handleSaveProfile}
        />

        {/* Widgets */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-lg-5">
            <div className="bg-white p-4 h-100 d-flex flex-column justify-content-between rounded-3 border shadow-sm" style={{ borderColor: '#e2e8f0', minHeight: '170px' }}>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '44px', height: '44px', background: '#f1f5f9', color: '#063020', fontSize: '1.2rem' }}>
                  <i className="bi bi-cash-coin"></i>
                </div>
                <span className="delta-up px-2.5 py-1">+11.5%</span>
              </div>
              <div>
                <p className="fw-bold mb-1" style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>{formatCurrency(totalIncome)}</p>
                <p className="m-0 small fw-bold text-uppercase" style={{ color: 'var(--text-muted)', fontSize: '.68rem', letterSpacing: '.05em' }}>Total Income</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="row g-3">
              {WIDGETS.map((w) => (
                <div key={w.key} className="col-6">
                  <div className="bg-white p-3 p-lg-3.5 h-100 d-flex flex-column justify-content-between rounded-3 border shadow-sm" style={{ borderColor: '#e2e8f0', minHeight: '125px' }}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center rounded-2" style={{ width: '36px', height: '36px', background: w.tone, color: '#063020', fontSize: '1rem' }}>
                        <i className={`bi ${w.icon}`}></i>
                      </div>
                      <span className={`delta-${w.trend} px-2 py-0.5`}>{w.delta}</span>
                    </div>
                    <div>
                      <p className="fw-bold mb-0" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{w.value}</p>
                      <p className="m-0 mt-1 small fw-bold text-uppercase" style={{ color: 'var(--text-muted)', fontSize: '.65rem', letterSpacing: '.05em' }}>{w.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-4 rounded-3 border shadow-sm" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>Recent Orders</h5>
            <a
              href="#"
              className="small fw-semibold text-decoration-none"
              style={{ color: 'var(--sidebar-bg)' }}
              onClick={(e) => { e.preventDefault(); setPage && setPage('admin-orders'); }}
            >
              View All
            </a>
          </div>
          <div className="table-responsive">
            <table className="fh-table w-100">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {topOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="fw-semibold">#{o.id}</td>
                    <td>{o.customer}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{o.date}</td>
                    <td className="fw-bold">{formatCurrency(o.amount)}</td>
                    <td><span className={`pill ${statusPillClass[o.status] || ''}`}>{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;