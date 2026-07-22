// Logout.jsx
import React from 'react';

function Logout({ setPage }) {
  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userSession');
    setPage('login');
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="bg-white rounded-4 p-5 shadow-lg" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <div className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
            <i className="bi bi-box-arrow-right text-danger fs-1"></i>
          </div>
          <h4 className="fw-bold">Logout Confirmation</h4>
          <p className="text-muted">Are you sure you want to logout from Fresh Harvest?</p>
        </div>

        <div className="d-flex gap-3">
          <button className="btn btn-outline-secondary flex-grow-1 py-2" onClick={() => setPage('market')}>
            Cancel
          </button>
          <button className="btn btn-danger flex-grow-1 py-2" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>

        <div className="mt-3 text-center">
          <small className="text-muted">You'll need to sign in again to access your account</small>
        </div>
      </div>
    </div>
  );
}

export default Logout;