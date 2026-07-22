import React, { useState, useEffect } from 'react';

function ProfileEditModal({ isOpen, onClose, profile, onSave }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
  });

  // Ambil data profile terbaru saat modal dibuka
  useEffect(() => {
    if (profile && isOpen) {
      setFormData({
        fullName: profile.fullName || profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        bio: profile.bio || '',
      });
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 🟢 Cegah reload halaman
    if (onSave) {
      onSave(formData); // 🟢 Jalankan fungsi simpan
    }
    onClose(); // 🟢 Tutup modal setelah disimpan
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(4px)',
        zIndex: 1060,
      }}
    >
      <div
        className="bg-white rounded-4 shadow-lg p-4 p-md-5 position-relative"
        style={{
          width: '100%',
          maxWidth: '460px',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0" style={{ color: '#063020', fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
            Edit Profil
          </h4>
          <button type="button" className="btn-close shadow-none" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* NAMA LENGKAP */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase mb-1" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control px-3 py-2.5 rounded-3 shadow-none"
              style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
              placeholder="Masukkan nama lengkap"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase mb-1" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control px-3 py-2.5 rounded-3 shadow-none"
              style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* NOMOR TELEPON */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase mb-1" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              Nomor Telepon
            </label>
            <input
              type="text"
              name="phone"
              className="form-control px-3 py-2.5 rounded-3 shadow-none"
              style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#0f172a', fontSize: '0.9rem' }}
              placeholder="08xxxxxxxxxx"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* BIO SINGKAT */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-uppercase mb-1" style={{ color: '#64748b', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
              Bio Singkat
            </label>
            <textarea
              name="bio"
              rows="3"
              className="form-control px-3 py-2.5 rounded-3 shadow-none"
              style={{ backgroundColor: '#f8fafc', borderColor: '#cbd5e1', color: '#0f172a', fontSize: '0.9rem', resize: 'none' }}
              placeholder="Tuliskan sedikit tentang diri kamu..."
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* BUTTONS */}
          <div className="d-flex align-items-center gap-2 pt-2">
            <button
              type="submit"
              className="btn flex-grow-1 py-2.5 fw-semibold text-white rounded-3 shadow-sm"
              style={{ backgroundColor: '#063020', borderColor: '#063020', fontSize: '0.95rem' }}
            >
              Simpan
            </button>
            <button
              type="button"
              className="btn flex-grow-1 py-2.5 fw-semibold rounded-3"
              style={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#475569', fontSize: '0.95rem' }}
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEditModal;