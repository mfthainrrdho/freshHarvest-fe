import React, { useState } from 'react';
import NotificationBell from '../shared/NotificationBell';
import ProfileEditModal from '../shared/ProfileEditModal';

const NAV_ITEMS = [
  { icon: 'bi-grid', label: 'Dashboard', page: 'admin-dashboard' },
  { icon: 'bi-box-seam', label: 'Product Management', page: 'admin-products' },
  { icon: 'bi-bag', label: 'Orders', page: 'admin-orders' },
];

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Hass Avocados', price: 45, stock: 85 },
  { id: 2, name: 'Kesar Mangoes', price: 32, stock: 8 },
  { id: 3, name: 'Artisanal Turmeric Powder', price: 18, stock: 0 },
  { id: 4, name: 'Wild Honey 500g', price: 65, stock: 22 },
];

const formatCurrency = (value) => `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const getStockStatus = (stock) => {
  if (stock <= 0) return { label: 'Out of Stock', cls: 'pill-cancelled' };
  if (stock < 10) return { label: 'Low Stock', cls: 'pill-processing' };
  return { label: 'In Stock', cls: 'pill-delivered' };
};

const emptyForm = { name: '', price: '', stock: '' };

function ProductManagement({ 
  setPage, 
  adminUser, 
  setAdminUser, 
  registeredUser, 
  setRegisteredUser, 
  notifications, 
  onMarkNotifsAsRead,
  products: parentProducts,
  setProducts: setParentProducts
}) {
  // Gunakan state lokal jika parent tidak mengoper props products
  const [localProducts, setLocalProducts] = useState(INITIAL_PRODUCTS);

  const products = parentProducts || localProducts;
  const setProducts = setParentProducts || setLocalProducts;

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleSaveProfile = (profileForm) => {
    if (setRegisteredUser) {
      setRegisteredUser((prev) => ({ ...prev, profile: { ...prev?.profile, ...profileForm } }));
    }
    if (setAdminUser) {
      setAdminUser((prev) => ({ ...prev, name: profileForm.fullName || prev?.name }));
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setForm({ name: product.name, price: product.price, stock: product.stock });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || form.price === '' || form.stock === '') return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, name: form.name, price: Number(form.price), stock: Number(form.stock) }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus produk ini?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--bg-app)' }}>
      {/* Sidebar - Mengunci diam tanpa re-render animasi */}
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
              className={`side-nav-btn d-flex align-items-center gap-3 py-2.5 px-3 border-0 ${item.page === 'admin-products' ? 'active' : ''}`}
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

      {/* Main content - Menggunakan admin-fade-in untuk transisi halus */}
      <main className="flex-grow-1 p-4 p-lg-5 admin-fade-in">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold mb-1" style={{ fontSize: '1.75rem', letterSpacing: '-0.02em' }}>Product Management</h2>
            <p className="mb-0 small" style={{ color: 'var(--text-muted)' }}>Catalog control and inventory oversight for global distribution.</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <NotificationBell 
              notifications={notifications || []} 
              onMarkAsRead={onMarkNotifsAsRead}
            />
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

        <ProfileEditModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          profile={registeredUser?.profile || { fullName: adminUser?.name || '' }}
          onSave={handleSaveProfile}
        />

        {/* Form Add / Edit Product */}
        {showForm && (
          <div className="bg-white p-4 rounded-3 border shadow-sm mb-4" style={{ borderColor: '#e2e8f0' }}>
            <h5 className="fw-bold mb-3" style={{ fontSize: '1.05rem' }}>
              {editingId ? 'Edit Produk' : 'Tambah Produk Baru'}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-5">
                  <label className="form-label small fw-semibold text-uppercase text-muted" style={{ fontSize: '.7rem' }}>Nama Barang</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="cth. Kesar Mangoes"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold text-uppercase text-muted" style={{ fontSize: '.7rem' }}>Harga ($)</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    className="form-control"
                    placeholder="32"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-semibold text-uppercase text-muted" style={{ fontSize: '.7rem' }}>Stok</label>
                  <input
                    type="number"
                    name="stock"
                    min="0"
                    className="form-control"
                    placeholder="8"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-2 d-flex align-items-end gap-2">
                  <button type="submit" className="btn text-white w-100 fw-semibold" style={{ backgroundColor: 'var(--sidebar-bg)' }}>
                    {editingId ? 'Simpan' : 'Tambah'}
                  </button>
                </div>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={closeForm}>
                Batal
              </button>
            </form>
          </div>
        )}

        {/* Tabel Produk */}
        <div className="bg-white p-4 rounded-3 border shadow-sm" style={{ borderColor: '#e2e8f0' }}>
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>Live Inventory</h5>
            <div className="d-flex align-items-center gap-3">
              <input
                className="form-control py-1.5 px-3 rounded-pill"
                placeholder="Search catalog..."
                style={{ width: 220, fontSize: '0.85rem' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {!showForm && (
                <button
                  className="btn text-white fw-semibold rounded-3 d-flex align-items-center gap-2"
                  style={{ backgroundColor: 'var(--sidebar-bg)', fontSize: '0.875rem' }}
                  onClick={openAddForm}
                >
                  <i className="bi bi-plus-lg"></i> Add Product
                </button>
              )}
            </div>
          </div>

          <div className="table-responsive">
            <table className="fh-table w-100">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const status = getStockStatus(p.stock);
                  return (
                    <tr key={p.id}>
                      <td className="fw-semibold">{p.name}</td>
                      <td className="fw-bold">{formatCurrency(p.price)}</td>
                      <td>{p.stock}</td>
                      <td><span className={`pill ${status.cls}`}>{status.label}</span></td>
                      <td className="text-end">
                        <button className="btn btn-sm text-secondary me-1" title="Edit" onClick={() => openEditForm(p)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm text-danger" title="Hapus" onClick={() => handleDelete(p.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
                      Tidak ada produk yang cocok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="mb-0 mt-3 small" style={{ color: 'var(--text-muted)' }}>
            Displaying {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </main>
    </div>
  );
}

export default ProductManagement;