import React, { useState } from 'react';

// 🛍️ TANGKAP PROP addToCart DARI PARENT (Dashboarduser)
function Marketplace({ addToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Dummy Data Produk Hasil Panen
  const products = [
    { id: 1, name: 'Heirloom Ruby Tomatoes', 
      category: 'Fruits', 
      price: 4.50, 
      unit: 'kg', 
      producer: 'Sukamaju Orchard', 
      rating: 4.9, 
      img: "https://i.pinimg.com/736x/07/10/e1/0710e1beba0a16e390efefa9bf74e35a.jpg", 
      color: '#fff0f0' 
    },
    { id: 2, name: 'Fresh Broccoli', category: 'Vegetables', price: 3.20, unit: 'bunch', producer: 'Lembang Fresh', rating: 4.8, emoji: '🥦', color: '#f0fff4' },
    { id: 3, name: 'Arabica Coffee Beans', category: 'Grains', price: 12.00, unit: 'pack', producer: 'Kintamani Farms', rating: 5.0, emoji: '☕', color: '#faf5ff' },
    { id: 4, name: 'Sweet Carrots', category: 'Vegetables', price: 2.10, unit: 'kg', producer: 'Cipanas Highlands', rating: 4.7, emoji: '🥕', color: '#fffaf0' },
    { id: 5, name: 'Fresh Strawberries', category: 'Fruits', price: 5.80, unit: 'pack', producer: 'Batu Berries', rating: 4.9, emoji: '🍓', color: '#fff0f5' },
    { id: 6, name: 'Organic Spinach', category: 'Vegetables', price: 1.80, unit: 'bunch', producer: 'Greenhouse Bogor', rating: 4.6, emoji: '🥬', color: '#f0fff4' },
  ];

  // Logic memfilter produk berdasarkan tab kategori yang diklik
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      {/* Header Halaman Marketplace */}
      <div className="mb-4">
        <span className="badge text-uppercase mb-2 px-3 py-1.5 fw-bold" style={{ backgroundColor: '#e2f0d9', color: '#0f5132', fontSize: '0.7rem' }}>
          🌾 Fresh & Local
        </span>
        <h1 className="fw-bold text-dark mb-1" style={{ fontSize: '2rem', letterSpacing: '-0.5px' }}>
          Fresh Harvest Marketplace
        </h1>
        <p className="text-muted small m-0">Beli hasil bumi segar langsung dari kebun para produsen lokal terbaik.</p>
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
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Daftar Produk */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <div 
              className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" 
              style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              
              {/* Box Gambar/Emoji Produk */}
              <div className="d-flex align-items-center justify-content-center py-5 position-relative" style={{ backgroundColor: product.color, height: '160px' }}>
                <span style={{ fontSize: '4.5rem' }}>{product.emoji}</span>
                <span className="position-absolute badge bg-white text-dark shadow-sm rounded-pill px-2.5 py-1.5 fw-bold" style={{ fontSize: '0.7rem', right: '15px', top: '15px' }}>
                  {product.rating}
                </span>
              </div>

              {/* Detail Konten Produk */}
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-muted small mb-1 d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-geo-alt"></i> {product.producer}
                  </div>
                  <h5 className="card-title fw-bold text-dark mb-2" style={{ fontSize: '1.1rem' }}>
                    {product.name}
                  </h5>
                </div>

                {/* Harga dan Tombol Beli */}
                <div className="d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                  <div>
                    <span className="fw-bold fs-5 text-dark">${product.price.toFixed(2)}</span>
                    <span className="text-muted small"> / {product.unit}</span>
                  </div>
                  
                  {/* 🟢 SEKARANG TOMBOL INI LANGSUNG MASUK KE STATE KERANJANG UTAMA */}
                  <button 
                    className="btn btn-sm d-flex align-items-center justify-content-center p-2 rounded-circle border-0 shadow-none" 
                    style={{ backgroundColor: '#063020', color: 'white', width: '38px', height: '38px' }}
                    onClick={() => addToCart(product)}
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
  );
}

export default Marketplace;