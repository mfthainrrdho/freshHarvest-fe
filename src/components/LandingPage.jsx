import React, { useRef, useState } from 'react';

// Menerima prop setPage untuk mengatur navigasi halaman
function LandingPage({ setPage }) {
  // State untuk melacak nav item mana yang sedang aktif (bergaris bawah)
  const [activeNav, setActiveNav] = useState('marketplace');
  
  // Ref untuk fitur smooth scroll ke section About Us
  const aboutUsRef = useRef(null);

  const scrollToAboutUs = (e) => {
    e.preventDefault();
    setActiveNav('aboutus'); // Set garis bawah ke About Us
    aboutUsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMarketplaceClick = (e) => {
    e.preventDefault();
    setActiveNav('marketplace'); // Set garis bawah balik ke Marketplace
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll kembali ke atas
  };

  // Dummy Data untuk Bagian "Today's Fresh Harvest"
  const publicProducts = [
    {
      id: 'p1',
      name: 'Cavendish Bananas',
      category: 'EXPORT QUALITY',
      tag: 'BESTSELLER',
      price: 2.40,
      unit: 'kg',
      rating: 4.9,
      reviews: '1.2k Reviews',
      desc: 'Hand-picked at peak ripeness, our export-grade Cavendish bananas are selected for their uniform size, flawless skin, and rich sweetness.',
      img: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'p2',
      name: 'Fresh Young Coconut',
      category: 'NATIONAL QUALITY',
      price: 1.80,
      unit: '',
      rating: 4.7,
      img: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'p3',
      name: 'Roma Tomatoes',
      category: 'EXPORT QUALITY',
      price: 3.20,
      unit: '',
      rating: 4.8,
      img: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'p4',
      name: 'Mixed Bell Peppers',
      category: 'NATIONAL QUALITY',
      price: 4.50,
      unit: '',
      rating: 4.6,
      img: 'https://images.unsplash.com/photo-1563565312874-84e2283bd19d?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'p5',
      name: 'Sunrise Papaya',
      category: 'EXPORT QUALITY',
      price: 5.00,
      unit: '',
      rating: 4.9,
      img: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=500&auto=format&fit=crop&q=60'
    }
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* ================= 1. PUBLIC NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top py-3">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="#" style={{ color: '#063020', letterSpacing: '-0.5px' }}>Fresh Harvest</a>
          
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <a 
                  className={`nav-link fw-semibold ${activeNav === 'marketplace' ? 'active text-decoration-underline' : 'text-muted'}`} 
                  href="#" 
                  onClick={handleMarketplaceClick}
                  style={{ color: activeNav === 'marketplace' ? '#063020' : undefined }}
                >
                  Marketplace
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link fw-semibold ${activeNav === 'aboutus' ? 'active text-decoration-underline' : 'text-muted'}`} 
                  href="#about-us" 
                  onClick={scrollToAboutUs}
                  style={{ color: activeNav === 'aboutus' ? '#063020' : undefined }}
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <button 
              onClick={() => setPage('login')}
              className="btn text-white px-4 py-2 fw-medium rounded-3 border-0 shadow-sm" 
              style={{ backgroundColor: '#063020', fontSize: '0.9rem' }}
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* ================= 2. HERO SECTION ================= */}
      <header className="position-relative d-flex align-items-center justify-content-start" style={{ 
        minHeight: '520px', 
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url('https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1600&auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}>
        <div className="container text-start">
          <div className="max-width-md" style={{ maxWidth: '600px' }}>
            <span className="badge px-3 py-2 mb-3 rounded-pill text-white fw-bold" style={{ backgroundColor: '#2d5a27', fontSize: '0.75rem', letterSpacing: '0.5px' }}>DIRECT FROM ORIGIN</span>
            <h1 className="fw-bold display-4 text-dark mb-3" style={{ letterSpacing: '-1.5px', lineHeight: '1.15' }}>Freshness That Bridges Global Borders</h1>
            <p className="text-secondary mb-4 fs-6" style={{ lineHeight: '1.6' }}>Experience the finest agricultural produce, sourced directly from verified farmers. We ensure both National and Export Quality standards for every harvest.</p>
            <div className="d-flex gap-3">
              <button onClick={() => setPage('login')} className="btn text-white px-4 py-2.5 fw-medium rounded-3 border-0 shadow-sm" style={{ backgroundColor: '#063020' }}>Explore Marketplace</button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 3. TRIPLE FEATURES VALUES ================= */}
      <section className="bg-white border-bottom py-4">
        <div className="container">
          <div className="row g-4 justify-content-between text-start">
            <div className="col-md-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-light" style={{ width: '48px', height: '48px', color: '#855823' }}><i className="bi bi-patch-check fs-4"></i></div>
              <div>
                <h6 className="fw-bold m-0 text-dark" style={{ fontSize: '0.9rem' }}>Export Quality Verified</h6>
                <small className="text-muted">Global standard certification</small>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-light" style={{ width: '48px', height: '48px', color: '#855823' }}><i className="bi bi-truck fs-4"></i></div>
              <div>
                <h6 className="fw-bold m-0 text-dark" style={{ fontSize: '0.9rem' }}>Farm-to-Gate Logistics</h6>
                <small className="text-muted">Minimized handling time</small>
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-center gap-3">
              <div className="rounded-circle d-flex align-items-center justify-content-center bg-light" style={{ width: '48px', height: '48px', color: '#855823' }}><i className="bi bi-globe fs-4"></i></div>
              <div>
                <h6 className="fw-bold m-0 text-dark" style={{ fontSize: '0.9rem' }}>Sustainable Sourcing</h6>
                <small className="text-muted">Supporting local biodiversity</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. PRODUCT SECTION ("Today's Fresh Harvest") ================= */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div className="text-start">
              <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: '-0.5px' }}>Today's Fresh Harvest</h2>
              <p className="text-muted small m-0 mt-1">Explore premium products ready for national and export delivery.</p>
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('login'); }} className="fw-semibold small text-decoration-none text-dark d-flex align-items-center gap-1">View All Marketplace <i className="bi bi-arrow-right"></i></a>
          </div>

          {/* GRID LAYOUT */}
          <div className="row g-4 text-start">
            {/* 🍌 Cavendish Bananas */}
            <div className="col-lg-7 col-md-12">
              <div className="card h-100 border rounded-4 overflow-hidden shadow-sm flex-md-row">
                <div className="position-relative col-md-6" style={{ minHeight: '300px' }}>
                  <img src={publicProducts[0].img} alt={publicProducts[0].name} className="w-100 h-100 position-absolute start-0 top-0" style={{ objectFit: 'cover' }} />
                  <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1.5">
                    <span className="badge text-white rounded-pill px-2.5 py-1" style={{ backgroundColor: '#000000' }}>{publicProducts[0].category}</span>
                    <span className="badge text-dark rounded-pill px-2.5 py-1" style={{ backgroundColor: '#fcd34d', fontSize: '0.65rem', width: 'fit-content' }}>{publicProducts[0].tag}</span>
                  </div>
                </div>
                <div className="card-body p-4 col-md-6 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h4 className="fw-bold text-dark m-0">{publicProducts[0].name}</h4>
                      <span className="fw-bold text-dark fs-5">${publicProducts[0].price.toFixed(2)}<span className="text-muted small fw-normal" style={{ fontSize: '0.75rem' }}>/{publicProducts[0].unit}</span></span>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-warning mb-3" style={{ fontSize: '0.85rem' }}>
                      <i className="bi bi-star-fill"></i> <span className="fw-bold text-dark">{publicProducts[0].rating}</span> <span className="text-muted">({publicProducts[0].reviews})</span>
                    </div>
                    <p className="card-text text-muted small" style={{ lineHeight: '1.6' }}>{publicProducts[0].desc}</p>
                  </div>
                  <button onClick={() => setPage('login')} className="btn text-white w-100 py-2.5 fw-medium border-0 rounded-3 mt-3 d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#063020' }}>
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* 🥥 Young Coconut */}
            <div className="col-lg-5 col-md-6">
              <div className="card h-100 border rounded-4 overflow-hidden shadow-sm d-flex flex-column justify-content-between">
                <div className="position-relative" style={{ height: '260px' }}>
                  <img src={publicProducts[1].img} alt={publicProducts[1].name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  <span className="badge text-dark position-absolute top-0 start-0 m-3 rounded-pill px-2.5 py-1" style={{ backgroundColor: '#fcd34d', fontSize: '0.65rem' }}>{publicProducts[1].category}</span>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark m-0">{publicProducts[1].name}</h5>
                    <span className="fw-bold text-dark fs-5">${publicProducts[1].price.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-warning mb-4" style={{ fontSize: '0.85rem' }}>
                    <i className="bi bi-star-fill"></i> <span className="fw-bold text-dark">{publicProducts[1].rating}</span>
                  </div>
                  <button onClick={() => setPage('login')} className="btn text-white w-100 py-2.5 fw-medium border-0 rounded-3 d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#063020' }}>
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* 🍅 Roma Tomatoes */}
            <div className="col-lg-4 col-md-6">
              <div className="card border rounded-4 overflow-hidden shadow-sm">
                <div className="position-relative" style={{ height: '220px' }}>
                  <img src={publicProducts[2].img} alt={publicProducts[2].name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  <span className="badge text-white position-absolute top-0 start-0 m-3 rounded-pill px-2.5 py-1" style={{ backgroundColor: '#000000', fontSize: '0.65rem' }}>{publicProducts[2].category}</span>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark m-0">{publicProducts[2].name}</h5>
                    <span className="fw-bold text-dark fs-5">${publicProducts[2].price.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-warning mb-4" style={{ fontSize: '0.85rem' }}>
                    <i className="bi bi-star-fill"></i> <span className="fw-bold text-dark">{publicProducts[2].rating}</span>
                  </div>
                  <button onClick={() => setPage('login')} className="btn text-white w-100 py-2.5 fw-medium border-0 rounded-3 d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#063020' }}>
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* 🫑 Mixed Bell Peppers */}
            <div className="col-lg-4 col-md-6">
              <div className="card border rounded-4 overflow-hidden shadow-sm">
                <div className="position-relative" style={{ height: '220px' }}>
                  <img src="https://images.unsplash.com/photo-1563565312874-84e2283bd19d?w=500&auto=format&fit=crop&q=60" alt={publicProducts[3].name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  <span className="badge text-dark position-absolute top-0 start-0 m-3 rounded-pill px-2.5 py-1" style={{ backgroundColor: '#fcd34d', fontSize: '0.65rem' }}>{publicProducts[3].category}</span>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark m-0">{publicProducts[3].name}</h5>
                    <span className="fw-bold text-dark fs-5">${publicProducts[3].price.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-warning mb-4" style={{ fontSize: '0.85rem' }}>
                    <i className="bi bi-star-fill"></i> <span className="fw-bold text-dark">{publicProducts[3].rating}</span>
                  </div>
                  <button onClick={() => setPage('login')} className="btn text-white w-100 py-2.5 fw-medium border-0 rounded-3 d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#063020' }}>
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* 🥭 Sunrise Papaya */}
            <div className="col-lg-4 col-md-6">
              <div className="card border rounded-4 overflow-hidden shadow-sm">
                <div className="position-relative" style={{ height: '220px' }}>
                  <img src={publicProducts[4].img} alt={publicProducts[4].name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                  <span className="badge text-white position-absolute top-0 start-0 m-3 rounded-pill px-2.5 py-1" style={{ backgroundColor: '#000000', fontSize: '0.65rem' }}>{publicProducts[4].category}</span>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark m-0">{publicProducts[4].name}</h5>
                    <span className="fw-bold text-dark fs-5">${publicProducts[4].price.toFixed(2)}</span>
                  </div>
                  <div className="d-flex align-items-center gap-1 text-warning mb-4" style={{ fontSize: '0.85rem' }}>
                    <i className="bi bi-star-fill"></i> <span className="fw-bold text-dark">{publicProducts[4].rating}</span>
                  </div>
                  <button onClick={() => setPage('login')} className="btn text-white w-100 py-2.5 fw-medium border-0 rounded-3 d-flex align-items-center justify-content-center gap-2" style={{ backgroundColor: '#063020' }}>
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. ABOUT US SECTION ================= */}
      <section id="about-us" ref={aboutUsRef} className="py-5 bg-light">
        <div className="container text-start">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="text-uppercase fw-bold tracking-wider" style={{ color: '#2d5a27', fontSize: '0.8rem' }}>Who We Are</span>
              <h2 className="fw-bold text-dark mt-2 mb-4" style={{ letterSpacing: '-0.5px' }}>About Fresh Harvest</h2>
              <p className="text-secondary" style={{ lineHeight: '1.7' }}>
                Fresh Harvest is a premier marketplace dedicated to bridging the gap between local, verified agricultural producers and global quality markets. We believe that everyone deserves access to the freshest produce, cultivated through sustainable farming practices.
              </p>
              <p className="text-secondary mb-4" style={{ lineHeight: '1.7' }}>
                By establishing optimized farm-to-gate logistics networks, we minimize handling time, reduce waste, and maximize earnings for local farming communities while keeping quality pristine for consumers worldwide.
              </p>
              <div className="row g-3">
                <div className="col-6">
                  <h4 className="fw-bold" style={{ color: '#063020' }}>100%</h4>
                  <small className="text-muted">Verified Producers</small>
                </div>
                <div className="col-6">
                  <h4 className="fw-bold" style={{ color: '#063020' }}>25+</h4>
                  <small className="text-muted">Harvest Varieties</small>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://i.pinimg.com/736x/25/0b/d1/250bd17a53269fe131c07204c09aeb21.jpg" 
                alt="Our Fresh Farm Sourcing Greenhouse" 
                className="w-100 rounded-4 shadow-sm"
                style={{ height: '420px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. PUBLIC FOOTER ================= */}
      <footer className="py-5 text-white border-top border-opacity-10" style={{ backgroundColor: '#031a12' }}>
        <div className="container text-start">
          <div className="row g-4 mb-5">
            <div className="col-lg-6 col-md-12">
              <h4 className="fw-bold text-white mb-3">Fresh Harvest</h4>
              <p className="opacity-50 small mb-0" style={{ maxWidth: '340px', lineHeight: '1.6' }}>Connecting rural vitality to modern convenience, ensuring quality harvests for every home.</p>
            </div>
            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold text-uppercase tracking-wider opacity-50 mb-3" style={{ fontSize: '0.7rem' }}>Company</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><a href="#" onClick={handleMarketplaceClick} className="text-white text-decoration-none opacity-75">Marketplace</a></li>
                <li><a href="#about-us" onClick={scrollToAboutUs} className="text-white text-decoration-none opacity-75">About Us</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75">Partner with Us</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h6 className="fw-bold text-uppercase tracking-wider opacity-50 mb-3" style={{ fontSize: '0.7rem' }}>Support</h6>
              <ul className="list-unstyled d-flex flex-column gap-2 small">
                <li><a href="#" className="text-white text-decoration-none opacity-75">Shipping Info</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75">Privacy Policy</a></li>
                <li><a href="#" className="text-white text-decoration-none opacity-75">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <hr className="opacity-10 my-4" />

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 small opacity-50">
            <p className="m-0">&copy; 2026 Fresh Harvest. Global Standards, Local Origins.</p>
            <div className="d-flex gap-3">
              <button className="btn btn-sm btn-link text-white p-0 opacity-75 shadow-none"><i className="bi bi-globe"></i></button>
              <button className="btn btn-sm btn-link text-white p-0 opacity-75 shadow-none"><i className="bi bi-share"></i></button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;