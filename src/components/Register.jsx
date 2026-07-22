import React, { useState } from 'react';
import { authService } from '../services/auth';

function Register({ setPage, handleRegister, kebunImg }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.regName.value.trim();
    const email = e.target.regEmail.value.trim().toLowerCase();
    const password = e.target.regPassword.value;
    const passwordConfirmation = e.target.regConfirmPassword.value;

    try {
      // 🔥 Coba register ke API backend
      const result = await authService.register({
        name,
        email,
        password,
        passwordConfirmation,
      });

      // Simpan token dan user dari API
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));

      alert('Registrasi berhasil! Selamat datang di FreshHarvest.');
      setPage('Marketplace');
    } catch (apiError) {
      console.log('API Register gagal, fallback ke dummy register:', apiError.message);
      
      // 🔄 FALLBACK: Jika API gagal, pakai register dummy yang lama
      if (handleRegister) {
        handleRegister(e);
      }
    } finally {
      setLoading(false);
    }
  };

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
            <p className="small text-uppercase fw-semibold tracking-wider opacity-75 m-0" style={{ fontSize: '0.75rem', letterSpacing: '1.5px' }}>Join the Green Revolution</p>
          </div>
          <div className="mb-4" style={{ maxWidth: '480px' }}>
            <p className="fst-italic fw-medium lh-sm m-0" style={{ fontSize: '1.85rem', fontFamily: 'Georgia, serif' }}>"Empowering local farmers, nourishing global families."</p>
          </div>
        </div>

        {/* Sisi Kanan: Form Register */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white px-4 px-md-5">
          <div className="w-100" style={{ maxWidth: '440px' }}>
            <h2 className="fw-bold mb-2 text-dark" style={{ fontSize: '2.2rem', letterSpacing: '-0.5px' }}>Create an account</h2>
            <p className="text-muted mb-4 small">Register now to start choosing fresh products or selling your harvest.</p>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="form-label text-uppercase fw-bold text-dark" style={{ fontSize: '0.7rem' }}>Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary opacity-75"><i className="bi bi-person"></i></span>
                  <input type="text" name="regName" className="form-control border-start-0 py-2-5" placeholder="Enter your full name" required disabled={loading} />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-uppercase fw-bold text-dark" style={{ fontSize: '0.7rem' }}>Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary opacity-75"><i className="bi bi-envelope"></i></span>
                  <input type="email" name="regEmail" className="form-control border-start-0 py-2-5" placeholder="yourname@freshharvest.com" required disabled={loading} />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-uppercase fw-bold text-dark" style={{ fontSize: '0.7rem' }}>Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary opacity-75"><i className="bi bi-lock"></i></span>
                  <input type="password" name="regPassword" className="form-control border-start-0 py-2-5" placeholder="Create complex password" required disabled={loading} />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label text-uppercase fw-bold text-dark" style={{ fontSize: '0.7rem' }}>Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0 text-secondary opacity-75"><i className="bi bi-lock-fill"></i></span>
                  <input type="password" name="regConfirmPassword" className="form-control border-start-0 py-2-5" placeholder="Re-enter password" required disabled={loading} />
                </div>
              </div>

              <button type="submit" className="btn w-100 py-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2 rounded-3 shadow-sm mb-4" style={{ backgroundColor: '#063020', fontSize: '1.1rem' }} disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  <>Register Account <span>➔</span></>
                )}
              </button>
            </form>

            <hr className="text-muted my-4 opacity-25" />
            <p className="text-center small text-muted">
              Already have an account?{' '}
              <button 
                type="button" 
                className="btn btn-link p-0 fw-semibold text-decoration-none align-baseline shadow-none" 
                style={{ color: '#b45309', fontSize: 'inherit' }} 
                onClick={() => setPage('login')}
              >
                Sign In here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;