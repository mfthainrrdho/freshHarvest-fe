import React, { useState } from 'react';

function Login({ setPage, handleSignIn, kebunImg }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container-fluid vh-100 p-0 m-0 overflow-hidden" style={{ backgroundColor: '#fdfdfd' }}>
      <div className="row h-100 g-0">
        {/* Sisi Kiri: Gambar */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white position-relative" 
             style={{ 
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${kebunImg || 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=1200'})`,
               backgroundSize: 'cover', backgroundPosition: 'center'
             }}>
          <div>
            <h1 className="fw-bold m-0" style={{ letterSpacing: '0.5px', fontSize: '2.5rem' }}>Fresh Harvest</h1>
            <p className="small text-uppercase fw-semibold tracking-wider opacity-75 m-0" style={{ fontSize: '0.75rem', letterSpacing: '1.5px' }}>Premium Partner Portal</p>
          </div>
          <div className="mb-4" style={{ maxWidth: '480px' }}>
            <p className="fst-italic fw-medium lh-sm m-0" style={{ fontSize: '1.85rem', fontFamily: 'Georgia, serif' }}>"From our soil to your doorstep, with integrity and grace."</p>
          </div>
        </div>

        {/* Sisi Kanan: Form */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white px-4 px-md-5 position-relative">
          
          {/* ↩️ TOMBOL BACK TO LANDING PAGE */}
          <div className="position-absolute top-0 start-0 m-4 ms-md-5">
            <button 
              onClick={() => setPage('landing')} 
              className="btn d-flex align-items-center gap-2 p-0 text-muted fw-semibold border-0 bg-transparent shadow-none"
              style={{ fontSize: '0.95rem', transition: '0.2s' }}
              onMouseEnter={(e) => e.target.style.color = '#063020'}
              onMouseLeave={(e) => e.target.style.color = '#6c757d'}
            >
              <i className="bi bi-arrow-left"></i> Back to Home
            </button>
          </div>

          <div className="w-100" style={{ maxWidth: '440px' }}>
            <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Sign in to your account</h2>
            <p className="text-muted mb-4 small">Access your dashboard to manage harvests and orders.</p>

            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="form-label text-uppercase fw-bold text-dark" style={{ fontSize: '0.7rem' }}>Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary opacity-75"><i className="bi bi-envelope"></i></span>
                  <input type="email" name="loginEmail" className="form-control border-start-0 py-2-5" placeholder="name@freshharvest.com" required />
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label className="form-label text-uppercase fw-bold text-dark m-0" style={{ fontSize: '0.7rem' }}>Password</label>
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary opacity-75"><i className="bi bi-lock"></i></span>
                  <input type={showPassword ? "text" : "password"} name="loginPassword" className="form-control border-start-0 border-end-0 py-2-5" placeholder="••••••••" required />
                  <span className="input-group-text bg-white border-start-0 text-secondary opacity-75" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                    <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                  </span>
                </div>
              </div>

              <div className="form-check mb-4 gap-2 d-flex align-items-center">
                <input type="checkbox" className="form-check-input m-0" id="rememberDevice" style={{ width: '1.1rem', height: '1.1rem' }} />
                <label className="form-check-label text-muted small" htmlFor="rememberDevice">Remember this device</label>
              </div>

              <button type="submit" className="btn w-100 py-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm mb-4" style={{ backgroundColor: '#063020', fontSize: '1.1rem' }}>
                Sign In <span>➔</span>
              </button>
            </form>

            <hr className="text-muted my-4 opacity-25" />
            <p className="text-center small text-muted">
              Don't have an account? <a href="#" className="fw-semibold text-decoration-none" style={{ color: '#b45309' }} onClick={() => setPage('register')}>Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;