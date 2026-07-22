import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Import API service

// 🛍️ Tangkap prop registeredUser, onCheckout, dan addToCart jika ada
function Marketplace({ registeredUser, onCheckout, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // State Keranjang Lokal & Modal Checkout
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 📦 State untuk produk dari API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // 🌾 Dummy Data Produk (Fallback jika API gagal)
  const dummyProducts = [
    { 
      id: 1, 
      name: 'Heirloom Ruby Tomatoes', 
      category: 'Fruits', 
      price: 4.50, 
      unit: 'kg', 
      producer: 'Sukamaju Orchard', 
      rating: 4.9, 
      emoji: '🍅',
      color: '#fff0f0' 
    },
    { id: 2, name: 'Fresh Broccoli', category: 'Vegetables', price: 3.20, unit: 'bunch', producer: 'Lembang Fresh', rating: 4.8, emoji: '🥦', color: '#f0fff4' },
    { id: 3, name: 'Arabica Coffee Beans', category: 'Grains', price: 12.00, unit: 'pack', producer: 'Kintamani Farms', rating: 5.0, emoji: '☕', color: '#faf5ff' },
    { id: 4, name: 'Sweet Carrots', category: 'Vegetables', price: 2.10, unit: 'kg', producer: 'Cipanas Highlands', rating: 4.7, emoji: '🥕', color: '#fffaf0' },
    { id: 5, name: 'Fresh Strawberries', category: 'Fruits', price: 5.80, unit: 'pack', producer: 'Batu Berries', rating: 4.9, emoji: '🍓', color: '#fff0f5' },
    { id: 6, name: 'Organic Spinach', category: 'Vegetables', price: 1.80, unit: 'bunch', producer: 'Greenhouse Bogor', rating: 4.6, emoji: '🥬', color: '#f0fff4' },
  ];

  // 📥 Fetch produk dari API
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      
      // Map response API ke format yang sesuai dengan komponen
      const apiProducts = response.data.data.map((item, index) => ({
        id: item.id,
        name: item.name,
        category: item.category?.name || 'Uncategorized',
        price: parseFloat(item.price),
        unit: item.unit || 'kg',
        producer: item.producer || 'Local Farm',
        rating: item.rating || 4.5,
        // Gunakan emoji berdasarkan kategori atau default
        emoji: getCategoryEmoji(item.category?.name),
        color: getCategoryColor(item.category?.name),
        // Simpan data asli untuk keperluan lain
        original: item,
        images: item.images || [],
        stock: item.stock || 0,
      }));
      
      setProducts(apiProducts);
      setError(null);
    } catch (err) {
      console.error('Gagal fetch produk dari API:', err);
      setError('Gagal memuat produk. Menampilkan produk demo...');
      // Fallback ke dummy products
      setProducts(dummyProducts);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      const apiCategories = response.data.data.map(cat => cat.name);
      setCategories(apiCategories);
    } catch (err) {
      console.error('Gagal fetch kategori:', err);
      // Fallback kategori default
      setCategories(['Vegetables', 'Fruits', 'Grains']);
    }
  };

  // 🎨 Helper: Emoji berdasarkan kategori
  const getCategoryEmoji = (categoryName) => {
    const emojiMap = {
      'Fruits': '🍎',
      'Vegetables': '🥬',
      'Grains': '🌾',
      'Herbs': '🌿',
      'Spices': '🌶️',
      'Dairy': '🧀',
      'Meat': '🥩',
    };
    return emojiMap[categoryName] || '🌱';
  };

  // 🎨 Helper: Warna berdasarkan kategori
  const getCategoryColor = (categoryName) => {
    const colorMap = {
      'Fruits': '#fff0f0',
      'Vegetables': '#f0fff4',
      'Grains': '#faf5ff',
      'Herbs': '#f0fff0',
      'Spices': '#fff5f0',
      'Dairy': '#f0f5ff',
      'Meat': '#fff0f5',
    };
    return colorMap[categoryName] || '#f8f9fa';
  };

  // 📦 Get unique categories dari produk (API + Dummy)
  const getUniqueCategories = () => {
    const allCategories = [...categories];
    // Tambahkan kategori dari dummy products jika belum ada
    dummyProducts.forEach(p => {
      if (!allCategories.includes(p.category)) {
        allCategories.push(p.category);
      }
    });
    return ['All', ...allCategories];
  };

  // Fungsi Tambah Barang ke Keranjang Local
  const handleAddToCart = (product) => {
    // Cek stok
    if (product.stock !== undefined && product.stock <= 0) {
      alert('Maaf, stok produk ini habis!');
      return;
    }

    // Jika parent memberikan fungsi addToCart, jalankan juga
    if (addToCart) addToCart(product);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        // Cek stok sebelum nambah
        if (product.stock && existing.qty >= product.stock) {
          alert('Stok tidak mencukupi!');
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Hitung Total Belanja
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🚀 FUNGSI PROSES CHECKOUT (MENGIRIMKAN NOTIFIKASI KE ADMIN)
  const handleCheckoutProcess = async () => {
    if (cart.length === 0) {
      alert('Keranjang belanja kamu masih kosong!');
      return;
    }

    // Cek apakah user login
    if (!registeredUser || !registeredUser.email) {
      alert('Silakan login terlebih dahulu untuk checkout!');
      return;
    }

    try {
      // 🔥 Kirim ke API backend
      const checkoutData = {
        recipient_name: registeredUser.name || 'Pelanggan',
        phone: registeredUser.phone || '08123456789',
        street: registeredUser.street || 'Jl. Contoh No. 123',
        suite: registeredUser.suite || 'Blok A',
        city_state_zip: registeredUser.cityStateZip || 'Jakarta 12345',
        payment_method: 'cod', // atau 'qris'
      };

      // Kirim request checkout ke backend
      const response = await api.post('/checkout', checkoutData);
      
      // Konfirmasi pembayaran (jika COD, otomatis konfirmasi)
      if (response.data.success) {
        const orderId = response.data.data.order_id;
        // Konfirmasi pembayaran otomatis untuk COD
        await api.post(`/orders/${orderId}/confirm-payment`);
        
        alert('🎉 Pesanan berhasil dibuat! Silakan cek status pesanan di halaman Order History.');
      }

      // 1. Kirim data pesanan ke fungsi handler di App.jsx (notifikasi admin)
      if (onCheckout) {
        onCheckout({
          customerName: registeredUser?.name || 'Pelanggan FreshHarvest',
          items: cart.map((i) => `${i.name} (x${i.qty})`),
          amount: totalAmount,
        });
      }

      // Kosongkan keranjang & tutup modal
      setCart([]);
      setIsCartOpen(false);

    } catch (error) {
      console.error('Checkout error:', error);
      
      // Fallback: jika API gagal, tetap proses dengan cara lama
      if (onCheckout) {
        onCheckout({
          customerName: registeredUser?.name || 'Pelanggan FreshHarvest',
          items: cart.map((i) => `${i.name} (x${i.qty})`),
          amount: totalAmount,
        });
        alert('🎉 Pembelian Berhasil! Pesanan kamu sedang diproses oleh admin.');
        setCart([]);
        setIsCartOpen(false);
      } else {
        alert('Gagal melakukan checkout. Silakan coba lagi.');
      }
    }
  };

  // Filter produk berdasarkan tab kategori
  const displayProducts = products.length > 0 ? products : dummyProducts;
  const filteredProducts = selectedCategory === 'All' 
    ? displayProducts 
    : displayProducts.filter(p => p.category === selectedCategory);

  const categoryList = getUniqueCategories();

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Memuat produk segar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative">
      {/* CSS Animasi Transisi Smooth Per Halaman & Kategori */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeInSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .product-card {
          transition: all 0.25s ease-in-out;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }
        .badge-stock {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.7rem;
        }
      `}</style>

      {/* Kontainer Utama dengan Animasi Smooth Fade-In */}
      <div className="animate-fade-in">
        {/* Header Halaman Marketplace */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="badge text-uppercase mb-2 px-3 py-1.5 fw-bold" style={{ backgroundColor: '#e2f0d9', color: '#0f5132', fontSize: '0.7rem' }}>
              🌾 Fresh & Local
            </span>
            <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>
              Fresh Harvest Marketplace
            </h1>
            <p className="text-muted small m-0">Beli hasil bumi segar langsung dari kebun para produsen lokal terbaik.</p>
            {error && (
              <div className="alert alert-warning alert-sm mt-2 py-1 px-3" style={{ fontSize: '0.8rem' }}>
                <i className="bi bi-info-circle me-1"></i> {error}
              </div>
            )}
          </div>
          {/* Tombol Keranjang */}
          <button 
            className="btn btn-outline-dark position-relative rounded-pill px-4 py-2"
            onClick={() => setIsCartOpen(true)}
          >
            <i className="bi bi-cart3 me-2"></i>
            Keranjang
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                {cart.reduce((sum, item) => sum + item.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Filter Kategori Pill Buttons */}
        <div className="d-flex gap-2 overflow-auto pb-3 mb-4" style={{ whiteSpace: 'nowrap' }}>
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="btn btn-sm px-4 py-2 rounded-pill fw-semibold border-0"
              style={{
                fontSize: '0.85rem',
                backgroundColor: selectedCategory === category ? '#063020' : '#e9ecef',
                color: selectedCategory === category ? '#fff' : '#495057',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Daftar Produk (Di-animasikan Ulang Tiap Kategori Berubah via key) */}
        <div key={selectedCategory} className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 animate-fade-in">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <div 
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative product-card"
              >
                {/* Badge Stok */}
                {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                  <span className="badge badge-stock bg-warning text-dark">
                    Stok: {product.stock}
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="badge badge-stock bg-danger text-white">
                    Habis
                  </span>
                )}
                
                {/* Box Gambar/Emoji Produk */}
                <div className="d-flex align-items-center justify-content-center py-5 position-relative" style={{ backgroundColor: product.color || '#f8f9fa', height: '160px' }}>
                  <span style={{ fontSize: '4.5rem' }}>{product.emoji || '🌱'}</span>
                  {/* Tampilkan gambar pertama jika ada dari API */}
                  {product.images && product.images.length > 0 && (
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.name}
                      style={{ 
                        position: 'absolute', 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        opacity: 0.3
                      }}
                    />
                  )}
                </div>

                {/* Detail Konten Produk */}
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="text-muted small mb-1 d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                      <i className="bi bi-geo-alt"></i> {product.producer || 'Local Farm'}
                    </div>
                    
                    <h5 className="card-title fw-bold text-dark mb-1" style={{ fontSize: '1.1rem' }}>
                      {product.name}
                    </h5>

                    {/* 🌟 RATING BINTANG KUNING INLINE */}
                    <div className="d-flex align-items-center gap-1 my-2" style={{ fontSize: '0.85rem' }}>
                      <i className="bi bi-star-fill text-warning"></i>
                      <span className="fw-bold text-dark ms-1">{product.rating?.toFixed(1) || '4.5'}</span>
                      <span className="text-muted small">(45 reviews)</span>
                    </div>
                  </div>

                  {/* Harga dan Tombol Beli */}
                  <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                    <div>
                      <span className="fw-bold fs-5 text-dark">${product.price?.toFixed(2) || '0.00'}</span>
                      <span className="text-muted small"> / {product.unit || 'kg'}</span>
                    </div>
                    
                    <button 
                      className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-circle border-0 shadow-none" 
                      style={{ 
                        backgroundColor: product.stock === 0 ? '#6c757d' : '#063020', 
                        color: 'white', 
                        width: '38px', 
                        height: '38px',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleAddToCart(product)}
                      title={product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                      disabled={product.stock === 0}
                    >
                      <i className={`bi ${product.stock === 0 ? 'bi-x-circle' : 'bi-cart-plus'} fs-6`}></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Jika produk kosong */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">Tidak ada produk di kategori ini.</p>
          </div>
        )}
      </div>

      {/* 🛒 MODAL SIDEBAR / POPUP KERANJANG & CHECKOUT */}
      {isCartOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end animate-fade-in"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1060 }}
        >
          <div
            className="bg-white h-100 p-4 d-flex flex-column justify-content-between shadow-lg"
            style={{ width: '420px', maxWidth: '100%' }}
          >
            <div>
              <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                <h5 className="fw-bold m-0">
                  <i className="bi bi-cart3 me-2"></i>
                  Keranjang Belanja
                  {cart.length > 0 && (
                    <span className="badge bg-secondary ms-2">{cart.reduce((sum, item) => sum + item.qty, 0)} item</span>
                  )}
                </h5>
                <button
                  className="btn-close shadow-none"
                  onClick={() => setIsCartOpen(false)}
                ></button>
              </div>

              {/* Daftar Barang di Keranjang */}
              <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: '1.5rem' }}>{item.emoji || '🌱'}</span>
                          <div>
                            <p className="fw-bold mb-0 text-dark small">{item.name}</p>
                            <span className="text-muted small">
                              ${item.price?.toFixed(2) || '0.00'} x {item.qty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark small">
                          ${((item.price || 0) * item.qty).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-circle p-0"
                          style={{ width: '24px', height: '24px', fontSize: '0.7rem' }}
                          onClick={() => {
                            setCart(prev => prev.filter(i => i.id !== item.id));
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-cart3 text-muted" style={{ fontSize: '3rem' }}></i>
                    <p className="text-muted mt-2">Keranjang kamu kosong.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Total & Tombol Beli / Checkout */}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold text-muted">Total Pembayaran:</span>
                <span className="fw-bold fs-5 text-dark">${totalAmount.toFixed(2)}</span>
              </div>
              <button
                className="btn w-100 py-2.5 rounded-3 fw-bold text-white shadow-sm"
                style={{ backgroundColor: '#063020' }}
                onClick={handleCheckoutProcess}
                disabled={cart.length === 0}
              >
                <i className="bi bi-credit-card me-2"></i>
                Bayar & Checkout Sekarang
              </button>
              <button
                className="btn w-100 mt-2 py-2 rounded-3 fw-bold text-muted border"
                onClick={() => setIsCartOpen(false)}
              >
                Lanjutkan Belanja
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Marketplace;