import React, { useState, useEffect } from 'react';

// 🟢 Menerima currentUser dan setCurrentUser dari Dashboard
function Profile({ currentUser, setCurrentUser }) {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    suite: '',
    cityStateZip: ''
  });

  // Sinkronisasi data awal dari props ke state form lokal
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        street: currentUser.address?.street || '',
        suite: currentUser.address?.suite || '',
        cityStateZip: currentUser.address?.cityStateZip || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🟢 FUNGSI SIMPAN: Sekarang data akan langsung ter-update ke Dashboard secara otomatis
  const handleSave = (e) => {
    e.preventDefault();
    
    if (typeof setCurrentUser === 'function') {
      setCurrentUser({
        ...currentUser,
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          suite: formData.suite,
          cityStateZip: formData.cityStateZip
        }
      });
      alert('Profile updated successfully and synced with Dashboard!');
    } else {
      console.error("setCurrentUser is not defined as a prop.");
    }
  };

  const profileName = formData.name.trim() || formData.email.split('@')[0] || 'User';

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      
      {/* HEADER SECTION */}
      <div className="d-flex align-items-center gap-4 mb-5 bg-white p-4 rounded-3 border shadow-sm flex-wrap">
        <div className="position-relative">
          <img 
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'} 
            alt={profileName} 
            className="rounded-3 border shadow-sm"
            style={{ width: '130px', height: '130px', objectFit: 'cover', backgroundColor: '#f8f9fa' }}
          />
          <span 
            className="position-absolute bottom-0 start-50 translate-middle-x badge bg-warning text-dark fw-bold px-3 py-1.5 shadow-sm"
            style={{ marginBottom: '-10px', fontSize: '0.7rem', borderRadius: '20px', border: '2px solid #fff' }}
          >
            ★ {currentUser?.tier || 'MEMBER'}
          </span>
        </div>
        <div>
          <h1 className="fw-bold m-0" style={{ color: '#063020', fontSize: '2.3rem', letterSpacing: '-0.5px' }}>
            {profileName}
          </h1>
          <p className="text-muted m-0 fs-6 mt-1">
            Valued Member since {currentUser?.joinYear || '2026'}
          </p>
        </div>
      </div>

      {/* FORM INPUT */}
      <form onSubmit={handleSave}>
        <div className="row g-4">
          
          {/* CONTACT DETAILS */}
          <div className="col-12 col-lg-6">
            <div className="bg-white border rounded-3 p-4 shadow-sm h-100">
              <h5 className="text-uppercase fw-bold text-secondary mb-4 pb-2 border-bottom" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                Contact Details
              </h5>
              
              <div className="d-flex flex-column gap-3">
                <div>
                  <label className="form-label text-muted fw-semibold small mb-1">FULL NAME</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary"><i className="bi bi-person"></i></span>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label text-muted fw-semibold small mb-1">EMAIL ADDRESS</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary"><i className="bi bi-envelope"></i></span>
                    <input 
                      type="email" 
                      className="form-control bg-light" 
                      name="email"
                      value={formData.email} 
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label text-muted fw-semibold small mb-1">PHONE NUMBER</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light text-secondary"><i className="bi bi-telephone"></i></span>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHIPPING ADDRESS */}
          <div className="col-12 col-lg-6">
            <div className="bg-white border rounded-3 p-4 shadow-sm h-100 d-flex flex-column justify-content-between gap-4">
              <div>
                <h5 className="text-uppercase fw-bold text-secondary mb-4 pb-2 border-bottom" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                  Primary Shipping Address
                </h5>

                <div className="d-flex flex-column gap-3">
                  <div>
                    <label className="form-label text-muted fw-semibold small mb-1">STREET ADDRESS</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light text-secondary"><i className="bi bi-geo-alt"></i></span>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="e.g. 1242 Highland Avenue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label text-muted fw-semibold small mb-1">SUITE / APT (OPTIONAL)</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="suite"
                      value={formData.suite}
                      onChange={handleChange}
                      placeholder="e.g. Suite 402, North Hills"
                    />
                  </div>

                  <div>
                    <label className="form-label text-muted fw-semibold small mb-1">CITY, STATE, ZIP CODE</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="cityStateZip"
                      value={formData.cityStateZip}
                      onChange={handleChange}
                      placeholder="e.g. San Francisco, CA 94109"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 p-2.5 rounded-3 bg-light text-success border border-success-subtle">
                <i className="bi bi-check-circle-fill text-success fs-5"></i>
                <span className="small text-muted fst-italic">Address ready for premium cold-chain delivery.</span>
              </div>
            </div>
          </div>

        </div>

        {/* TOMBOL ACTION SAVE */}
        <div className="d-flex justify-content-end mt-4">
          <button type="submit" className="btn btn-success px-4 py-2 fw-semibold shadow-sm" style={{ backgroundColor: '#063020', borderColor: '#063020' }}>
            Save Changes
          </button>
        </div>
      </form>

    </div>
  );
}

export default Profile;