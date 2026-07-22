import React, { useState } from 'react';

// 🛍️ Tangkap prop registeredUser, onCheckout, dan addToCart jika ada
function Marketplace({ registeredUser, onCheckout, addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // State Keranjang Lokal & Modal Checkout
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Dummy Data Produk Hasil Panen
  const products = [
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

  // Fungsi Tambah Barang ke Keranjang Local
  const handleAddToCart = (product) => {
    // Jika parent memberikan fungsi addToCart, jalankan juga
    if (addToCart) addToCart(product);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
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
  const handleCheckoutProcess = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja kamu masih kosong!');
      return;
    }

    // 1. Kirim data pesanan ke fungsi handler di App.jsx
    if (onCheckout) {
      onCheckout({
        customerName: registeredUser?.name || 'Pelanggan FreshHarvest',
        items: cart.map((i) => `${i.name} (x${i.qty})`),
        amount: totalAmount,
      });
    }

    // 2. Beri notifikasi ke user & kosongkan keranjang
    alert('🎉 Pembelian Berhasil! Pesanan kamu sedang diproses oleh admin.');
    setCart([]);
    setIsCartOpen(false);
  };

  // Filter produk berdasarkan tab kategori
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
          </div>
        </div>

        {/* Filter Kategori Pill Buttons */}
        <div className="d-flex gap-2 overflow-auto pb-3 mb-4" style={{ whiteSpace: 'nowrap' }}>
          {['All', 'Vegetables', 'Fruits', 'Grains'].map((category) => (
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
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" 
                style={{ transition: 'all 0.25s ease-in-out', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                
                {/* Box Gambar/Emoji Produk */}
                <div className="d-flex align-items-center justify-content-center py-5 position-relative" style={{ backgroundColor: product.color, height: '160px' }}>
                  <span style={{ fontSize: '4.5rem' }}>{product.emoji}</span>
                </div>

                {/* Detail Konten Produk */}
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="text-muted small mb-1 d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                      <i className="bi bi-geo-alt"></i> {product.producer}
                    </div>
                    
                    <h5 className="card-title fw-bold text-dark mb-1" style={{ fontSize: '1.1rem' }}>
                      {product.name}
                    </h5>

                    {/* 🌟 RATING BINTANG KUNING INLINE (TAMPILAN RAPI & TIDAK BULAT LONJONG) */}
                    <div className="d-flex align-items-center gap-1 my-2" style={{ fontSize: '0.85rem' }}>
                      <i className="bi bi-star-fill text-warning"></i>
                      <span className="fw-bold text-dark ms-1">{product.rating.toFixed(1)}</span>
                      <span className="text-muted small">(45 reviews)</span>
                    </div>
                  </div>

                  {/* Harga dan Tombol Beli */}
                  <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                    <div>
                      <span className="fw-bold fs-5 text-dark">${product.price.toFixed(2)}</span>
                      <span className="text-muted small"> / {product.unit}</span>
                    </div>
                    
                    <button 
                      className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-circle border-0 shadow-none" 
                      style={{ 
                        backgroundColor: '#063020', 
                        color: 'white', 
                        width: '38px', 
                        height: '38px',
                        transition: 'transform 0.15s ease'
                      }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onClick={() => handleAddToCart(product)}
                      title="Tambah ke Keranjang"
                    >
                      <i className="bi bi-cart-plus fs-6"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🛒 MODAL SIDEBAR / POPUP KERANJANG & CHECKOUT */}
      {isCartOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-end animate-fade-in"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1060 }}
        >
          <div
            className="bg-white h-100 p-4 d-flex flex-column justify-content-between shadow-lg"
            style={{ width: '360px', maxWidth: '100%' }}
          >
            <div>
              <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                <h5 className="fw-bold m-0">Keranjang Belanja</h5>
                <button
                  className="btn-close shadow-none"
                  onClick={() => setIsCartOpen(false)}
                ></button>
              </div>

              {/* Daftar Barang di Keranjang */}
              <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                      <div>
                        <p className="fw-bold mb-0 text-dark small">{item.name}</p>
                        <span className="text-muted small">
                          ${item.price.toFixed(2)} x {item.qty}
                        </span>
                      </div>
                      <span className="fw-bold text-dark small">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted py-4 small">Keranjang kamu kosong.</p>
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
                Bayar & Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Marketplace;