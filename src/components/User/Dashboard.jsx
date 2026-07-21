import React, { useState } from 'react';
import Marketplace from './Marketplace';
import OrderHistory from './OrderHistory';
import Keranjang from './Keranjang';
import Profile from './Profile.jsx'; 
import SavedProducts from './Saved.jsx';
import Notification from './Notification.jsx';


function Dashboarduser({ setPage, registeredUser, setRegisteredUser }) {
  const displayName = registeredUser?.name?.trim() || registeredUser?.email?.split('@')[0] || 'there';
  
  // State navigasi tab utama
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State penanda notifikasi baru (dot merah polos)
  const [hasUnreadNotif, setHasUnreadNotif] = useState(true);

  // =========================================================================
  // STATE PUSAT & FUNGSI UNTUK SINKRONISASI KERANJANG
  // =========================================================================
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const topProducts = [
    { id: 'p1', name: 'Arabica Coffee Beans', price: 24.5, sold: 420, img: '/src/assets/coffee.jpg' },
    { id: 'p2', name: 'Organic Apples', price: 12.0, sold: 310, img: '/src/assets/apples.jpg' },
    { id: 'p3', name: 'Premium Tea Leaves', price: 18.75, sold: 275, img: '/src/assets/tea.jpg' },
  ];

  // =========================================================================
  // 1. KONDISI FULL PAGE: JIKA USER MEMBUKA KERANJANG
  // =========================================================================
  if (activeTab === 'Keranjang') {
    return (
      <div className="vh-100 bg-light overflow-auto p-4 p-md-5">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
            <button 
              className="btn p-0 text-success fw-semibold d-flex align-items-center gap-2 border-0 bg-transparent shadow-none"
              onClick={() => setActiveTab('Marketplace')}
            >
              <i className="bi bi-arrow-left fs-5"></i>
              <span>Continue Shopping</span>
            </button>
            <span className="fw-bold text-dark fs-5">Fresh Harvest</span>
          </div>

          <Keranjang 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
            setActiveTab={setActiveTab} 
          />
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. LAYOUT NORMAL: SIDEBAR & KONTEN UTAMA
  // =========================================================================
  return (
    <div className="vh-100 bg-light d-flex flex-column overflow-hidden">
      {/* Navbar Atas */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 py-3 sticky-top z-3">
        <div className="container-fluid p-0">
          <div className="row w-100 align-items-center g-0">
            <div className="col-lg-3 d-flex align-items-center gap-2" style={{ paddingLeft: '0' }}>
              <button className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-2 border-0" style={{ backgroundColor: '#f3f4f6', color: '#0f172a' }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <i className="bi bi-list fs-5"></i>
              </button>
              <a className="navbar-brand fw-bold text-dark fs-4 m-0 d-flex align-items-center" href="#" style={{ letterSpacing: '-0.5px', marginBottom: '0' }}>Fresh Harvest</a>
            </div>

            <div className="col-lg-6 d-flex justify-content-center">
              <div className="position-relative d-none d-md-block" style={{ width: '100%', maxWidth: '620px' }}>
                <i className="bi bi-search position-absolute top-50 translate-middle-y ms-3 text-muted"></i>
                <input type="text" className="form-control form-control-sm ps-5 bg-light border-0 rounded-pill py-2" placeholder="Search harvest..." style={{ width: '100%', fontSize: '0.85rem' }} />
              </div>
            </div>

            <div className="col-lg-3 d-flex justify-content-end align-items-center gap-3">
              {/* Tombol Keranjang */}
              <button 
                type="button"
                className="btn p-1 text-secondary d-flex align-items-center position-relative border-0 shadow-none" 
                style={{ borderRadius: '50%', padding: '6px', cursor: 'pointer' }}
                onClick={() => setActiveTab('Keranjang')}
              >
                <i className="bi bi-cart3 fs-5" style={{ pointerEvents: 'none' }}></i>
                {totalCartCount > 0 && (
                  <span 
                    className="position-absolute translate-middle badge rounded-pill bg-danger border border-light"
                    style={{ top: '6px', left: '85%', fontSize: '0.65rem', padding: '0.25em 0.45em' }}
                  >
                    {totalCartCount}
                  </span>
                )}
              </button>
              
              {/* Tombol Lonceng Notifikasi dengan Garis Aktif Hijau + Dot Merah Polos */}
              <button 
                className="btn p-1 text-secondary d-flex align-items-center border-0 shadow-none position-relative"
                onClick={() => {
                  setActiveTab('Notification');
                  setHasUnreadNotif(false); // Hilangkan bulatan merah saat tab dibuka
                }}
                style={{ paddingBottom: '4px' }}
              >
                <i className="bi bi-bell fs-5" style={{ color: activeTab === 'Notification' ? '#0f172a' : 'inherit' }}></i>
                
                {/* Penanda Dot Merah Polos */}
                {hasUnreadNotif && (
                  <span 
                    className="position-absolute rounded-circle bg-danger border border-light"
                    style={{ top: '6px', right: '6px', width: '8px', height: '8px' }}
                  />
                )}

                {/* Garis hijau penanda tab aktif */}
                {activeTab === 'Notification' && (
                  <span 
                    className="position-absolute start-50 translate-middle-x bg-success" 
                    style={{ 
                      bottom: '-6px', 
                      width: '20px', 
                      height: '3px', 
                      borderRadius: '2px',
                      transition: 'all 0.3s ease'
                    }}
                  />
                )}
              </button>
              
              {/* Avatar Kanan Atas dengan Penanda Garis Aktif */}
              <button 
                className="btn p-1 text-dark d-flex align-items-center border-0 shadow-none position-relative" 
                onClick={() => setActiveTab('Profile')}
                style={{ paddingBottom: '4px' }}
              >
                <i className="bi bi-person-circle fs-5"></i>
                {/* Garis hijau penanda tab aktif */}
                {activeTab === 'Profile' && (
                  <span 
                    className="position-absolute start-50 translate-middle-x bg-success" 
                    style={{ 
                      bottom: '-6px', 
                      width: '20px', 
                      height: '3px', 
                      borderRadius: '2px',
                      transition: 'all 0.3s ease'
                    }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Wrapper Konten Utama */}
      <div className="d-flex flex-row flex-grow-1 overflow-hidden">
        
        {/* KIRI: Sidebar Navigation */}
        {isSidebarOpen && (
          <div className="d-flex flex-column justify-content-between h-100 z-2" style={{ 
            width: '280px', 
            minWidth: '280px', 
            backgroundColor: '#063020', 
            color: 'white', 
            padding: '1.5rem' 
          }} >
            <div className="nav flex-column nav-pills gap-1">
              {[
                { key: 'Dashboard', icon: 'bi-grid', label: 'Dashboard' },
                { key: 'Marketplace', icon: 'bi-shop', label: 'Marketplace' },
                { key: 'Orders', icon: 'bi-bag', label: 'Order History' },
                { key: 'Saved', icon: 'bi-heart', label: 'Saved Products' },
                { key: 'Profile', icon: 'bi-gear', label: 'Account Settings' },
              ].map((item) => (
                <button
                  key={item.key}
                  className="nav-link text-start d-flex align-items-center gap-3 py-2.5 rounded-3 fw-medium border-0"
                  style={{
                    fontSize: '0.9rem',
                    backgroundColor: activeTab === item.key ? '#d1e7dd' : 'transparent',
                    color: activeTab === item.key ? '#0f5132' : '#f8f9fa',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setActiveTab(item.key)}
                >
                  <i className={`bi ${item.icon}`}></i> {item.label}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-top border-light border-opacity-25">
              <button className="nav-link text-start d-flex align-items-center gap-3 py-2.5 rounded-3 fw-medium w-100 border-0 bg-transparent" style={{ fontSize: '0.9rem', color: '#fecaca' }} onClick={() => setPage('login')}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          </div>
        )}

        {/* KANAN: Panel Isi Konten Dinamis */}
        <div className="flex-grow-1 overflow-auto p-4 p-md-5">
          <div style={{ maxWidth: '1100px' }}>
            
            {/* JIKA TAB YANG AKTIF ADALAH 'Dashboard' */}
            {activeTab === 'Dashboard' && (
              <>
                <div className="mb-4">
                  <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>Good morning, {displayName}</h1>
                  <p className="text-muted small m-0">Manage your account, track orders, and join our producer network.</p>
                </div>

                <div className="row g-4 mb-4">
                  {/* Recent Orders */}
                  <div className="col-md-6">
                    <div className="bg-white rounded-3 p-4 border shadow-sm h-100">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>Recent Orders</h5>
                        <button className="btn btn-link p-0 text-decoration-none fw-semibold small text-success border-0 bg-transparent" onClick={() => setActiveTab('Orders')}>View All</button>
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

                  {/* Personal Info Card */}
                  <div className="col-md-6">
                    <div className="bg-white rounded-3 p-4 border shadow-sm h-100 d-flex flex-column justify-content-between">
                      <h5 className="fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Personal Information</h5>
                      <div className="row g-3 mb-3">
                        <div className="col-6">
                          <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem' }}>Full Name</label>
                          <span className="fw-semibold text-dark small">{displayName}</span>
                        </div>
                        <div className="col-6">
                          <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem' }}>Location</label>
                          <span className="fw-semibold text-dark small">
                            {registeredUser?.address?.cityStateZip?.split(',')[0] || 'London, UK'}
                          </span>
                        </div>
                        <div className="col-12 border-top pt-2">
                          <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem' }}>Email Address</label>
                          <span className="fw-semibold text-dark small">{registeredUser?.email || 'sarah.j@example.com'}</span>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline-dark w-100 py-2 fw-semibold small rounded-3"
                        onClick={() => setActiveTab('Profile')}
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>

                {/* TOP SELLING PRODUCTS */}
                <div className="row g-4">
                  <div className="col-12">
                    <h5 className="fw-bold mb-3">Top Selling Products</h5>
                    <div className="d-flex gap-3 flex-wrap">
                      {topProducts.map((p) => (
                        <div key={p.id} className="bg-white rounded-3 p-3 shadow-sm" style={{ width: '220px', cursor: 'pointer' }} onClick={() => setSelectedProduct(p)}>
                          <div style={{ width: '100%', height: '120px', overflow: 'hidden', borderRadius: '8px' }}>
                            <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div className="mt-2">
                            <p className="fw-bold m-0" style={{ fontSize: '0.95rem' }}>{p.name}</p>
                            <p className="text-muted small m-0">${p.price.toFixed(2)} • {p.sold} sold</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ROUTING KONDISIONAL TAB UTAMA */}
            {activeTab === 'Marketplace' && <Marketplace addToCart={addToCart} />}
            {activeTab === 'Orders' && <OrderHistory />}
            {activeTab === 'Saved' && <SavedProducts addToCart={addToCart} />}
            {activeTab === 'Notification' && <Notification />}
            
            {/* RENDER PROFILE */}
            {activeTab === 'Profile' && (
              <Profile
                currentUser={registeredUser} 
                setCurrentUser={setRegisteredUser}
              />
            )}

            {/* PRODUCT DETAIL MODAL */}
            {selectedProduct && (
              <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifycontent: 'center', zIndex: 1100 }} onClick={() => setSelectedProduct(null)}>
                <div className="bg-white rounded-3 p-4" style={{ width: 'min(720px, 96%)' }} onClick={(e) => e.stopPropagation()}>
                  <div className="d-flex gap-3">
                    <div style={{ width: '240px', height: '180px', overflow: 'hidden', borderRadius: '8px' }}>
                      <img src={selectedProduct.img} alt={selectedProduct.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 className="m-0">{selectedProduct.name}</h4>
                      <p className="text-muted">${selectedProduct.price.toFixed(2)}</p>
                      <p className="small">Sold: {selectedProduct.sold}</p>
                      <p>Here you can show more product details, description, and actions like "Add to cart" or "View full page".</p>
                      <div className="d-flex gap-2 mt-3">
                        <button 
                          className="btn btn-outline-dark" 
                          onClick={() => { 
                            addToCart(selectedProduct); 
                            setSelectedProduct(null); 
                          }}
                        >
                          Add to cart
                        </button>
                        <button className="btn btn-dark" onClick={() => setSelectedProduct(null)}>Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboarduser;