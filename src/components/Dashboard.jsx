import React from 'react';

function Dashboard({ setPage, registeredUser }) {
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h1 className="fw-bold text-primary m-0">👨‍🌾 Producer Dashboard</h1>
          <p className="text-muted m-0">Login Terverifikasi: <strong>{registeredUser.email || 'petani@freshharvest.com'}</strong> (Producer)</p>
        </div>
        <button className="btn btn-outline-danger" onClick={() => setPage('login')}>Logout</button>
      </div>
      <div className="alert alert-success rounded-3 fw-medium">
        🎉 Selamat! Akun Anda telah berhasil di-upgrade menjadi <b>Producer Partner</b>.
      </div>
      <div className="row g-4">
        <div className="col-md-6"><div className="p-4 bg-white rounded-3 border text-center shadow-sm"><h3>0</h3><p className="text-muted m-0 fw-semibold">Produk Aktif Anda</p></div></div>
        <div className="col-md-6"><div className="p-4 bg-success text-white rounded-3 border text-center shadow-sm" style={{ cursor: 'pointer' }} onClick={() => alert('Fitur Tambah Produk')}><h3>+</h3><p className="m-0 fw-semibold">Tambah Hasil Panen Baru</p></div></div>
      </div>
    </div>
  );
}

export default Dashboard;