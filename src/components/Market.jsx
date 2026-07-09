import React from 'react';

function Market({ setPage, registeredUser, setRegisteredUser }) {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Navbar Atas */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 sticky-top">
        <div className="container-fluid p-0">
          <a className="navbar-brand fw-bold text-dark fs-4 m-0" href="#" style={{ letterSpacing: '-0.5px' }}>Fresh Harvest</a>
          
          <div className="d-flex align-items-center gap-4 mx-auto d-none d-lg-flex">
            <a href="#" className="text-decoration-none fw-semibold text-muted small">Marketplace</a>
            <a href="#" className="text-decoration-none fw-semibold text-muted small">Producers</a>
            <a href="#" className="text-decoration-none fw-semibold text-muted small">About Us</a>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="position-relative d-none d-md-block">
              <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"></i>
              <input type="text" className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill py-2" placeholder="Search harvest..." style={{ width: '220px', fontSize: '0.85rem' }} />
            </div>
            <button className="btn p-1 text-secondary"><i className="bi bi-cart3 fs-5"></i></button>
            <button className="btn p-1 text-secondary"><i className="bi bi-bell fs-5"></i></button>
            <button className="btn p-1 text-dark border-bottom border-2 border-dark"><i className="bi bi-person-circle fs-5"></i></button>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <div className="container-fluid flex-grow-1 px-4 py-5" style={{ maxWidth: '1400px' }}>
        <div className="row g-4">
          {/* KIRI: Sidebar Navigation */}
          <div className="col-lg-3">
            <div className="bg-white rounded-3 p-3 border shadow-sm">
              <div className="nav flex-column nav-pills gap-1">
                <button className="nav-link active text-start d-flex align-items-center gap-3 py-2-5 rounded-3 fw-medium" style={{ backgroundColor: '#d1e7dd', color: '#0f5132', fontSize: '0.9rem' }}>
                  <i className="bi bi-grid"></i> Overview
                </button>
                <button className="nav-link text-start text-secondary d-flex align-items-center gap-3 py-2-5 rounded-3 fw-medium" style={{ fontSize: '0.9rem' }}>
                  <i className="bi bi-bag"></i> Order History
                </button>
                <button className="nav-link text-start text-secondary d-flex align-items-center gap-3 py-2-5 rounded-3 fw-medium" style={{ fontSize: '0.9rem' }}>
                  <i className="bi bi-heart"></i> Saved Producers
                </button>
                <hr className="my-2 opacity-25" />
                <button className="nav-link text-start text-secondary d-flex align-items-center gap-3 py-2-5 rounded-3 fw-medium" style={{ fontSize: '0.9rem' }}>
                  <i className="bi bi-gear"></i> Profile Settings
                </button>
                <button className="nav-link text-start text-danger d-flex align-items-center gap-3 py-2-5 rounded-3 fw-medium mt-2" style={{ fontSize: '0.9rem' }} onClick={() => setPage('login')}>
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </div>
            </div>
          </div>

          {/* KANAN: Isi Dashboard Pembeli */}
          <div className="col-lg-9">
            <div className="mb-4">
              <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>Good morning, Sarah</h1>
              <p className="text-muted small m-0">Manage your account, track orders, and join our producer network.</p>
            </div>

            <div className="row g-4 mb-4">
              {/* Recent Orders */}
              <div className="col-md-6">
                <div className="bg-white rounded-3 p-4 border shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>Recent Orders</h5>
                    <a href="#" className="text-decoration-none fw-semibold small text-success">View All</a>
                  </div>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center justify-content-between p-2 border rounded-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light rounded p-2 text-center" style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}>🍎</div>
                        <div>
                          <p className="fw-bold m-0 small">Order #FH-8821</p>
                          <p className="text-muted m-0" style={{ fontSize: '0.75rem' }}>● Delivered • 2 items</p>
                        </div>
                      </div>
                      <span className="fw-bold text-dark small">$42.50</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-2 border rounded-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light rounded p-2 text-center" style={{ width: '45px', height: '45px', fontSize: '1.2rem' }}>☕</div>
                        <div>
                          <p className="fw-bold m-0 small">Order #FH-7930</p>
                          <p className="text-warning m-0" style={{ fontSize: '0.75rem' }}>● Processing • 1 item</p>
                        </div>
                      </div>
                      <span className="fw-bold text-dark small">$18.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="col-md-6">
                <div className="bg-white rounded-3 p-4 border shadow-sm h-100 d-flex flex-column justify-content-between">
                  <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Personal Information</h5>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem' }}>Full Name</label>
                      <span className="fw-semibold text-dark small">Sarah Jenkins</span>
                    </div>
                    <div className="col-6">
                      <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem' }}>Location</label>
                      <span className="fw-semibold text-dark small">London, UK</span>
                    </div>
                    <div className="col-12 border-top pt-2">
                      <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem' }}>Email Address</label>
                      <span className="fw-semibold text-dark small">{registeredUser?.email || 'sarah.j@example.com'}</span>
                    </div>
                  </div>
                  <button className="btn btn-outline-dark w-100 py-2 fw-semibold small rounded-3">Edit Profile</button>
                </div>
              </div>
            </div>

            {/* BANNER BAWAH: FORMULIR BECOME A PRODUCER */}
            <div className="rounded-3 p-4 p-md-5 text-white shadow-sm" style={{ backgroundColor: '#032216' }}>
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <span className="badge text-uppercase mb-3 px-3 py-2 fw-bold" style={{ backgroundColor: '#f59e0b', color: '#032216', fontSize: '0.65rem' }}>⚙️ New Opportunity</span>
                  <h2 className="fw-bold mb-3" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Become a Producer</h2>
                  <p className="opacity-75 small mb-4">Take your village's heritage to the world stage. We provide the infrastructure for small-scale farmers to compete globally.</p>
                  <div className="d-flex flex-column gap-2 small">
                    <div><i className="bi bi-check-circle-fill text-warning"></i> Direct access to 150+ international markets</div>
                    <div><i className="bi bi-check-circle-fill text-warning"></i> Export-quality certification & logistics support</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-white rounded-3 p-4 text-dark shadow">
                    <h5 className="fw-bold mb-1" style={{ fontSize: '1rem' }}>Partner Application</h5>
                    <p className="text-muted mb-4" style={{ fontSize: '0.75rem' }}>Our certification team reviews applications within 72 hours.</p>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      alert('Pengajuan Berhasil dikirim! Admin Fresh Harvest akan meninjau lahan Anda dalam 72 jam.');
                      setRegisteredUser(prev => ({ ...prev, role: 'producer' }));
                      setPage('dashboard');
                    }}>
                      <div className="mb-3">
                        <label className="form-label text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Primary Crop</label>
                        <input type="text" className="form-control bg-light py-2" placeholder="e.g. Arabica Coffee" required style={{ fontSize: '0.85rem' }} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Production Region</label>
                        <input type="text" className="form-control bg-light py-2" placeholder="Village or District" required style={{ fontSize: '0.85rem' }} />
                      </div>
                      <button type="submit" className="btn w-100 py-2-5 text-white fw-semibold" style={{ backgroundColor: '#063020', fontSize: '0.9rem' }}>Submit Request ➔</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;