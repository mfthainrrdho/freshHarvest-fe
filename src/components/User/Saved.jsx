import React, { useState } from 'react';

function SavedProducts({ addToCart }) {
  // Data dummy berdasarkan gambar mockup
  const [savedItems, setSavedItems] = useState([
    {
      id: 'sv1',
      name: 'Organic Hass Avocados',
      farm: 'VALLEY VIEW FARMS',
      price: 8.50,
      unit: '3 count',
      tag: 'NEW HARVEST',
      tagBg: '#7c5a12', // Cokelat kekuningan khas mockup
      img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'sv2',
      name: 'Artisanal Wildflower Honey',
      farm: 'THE APIARY RESERVE',
      price: 14.00,
      unit: '12oz Jar',
      tag: 'FRESH HARVEST',
      tagBg: '#063020', // Hijau tua khas Fresh Harvest
      img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'sv3',
      name: 'Ruby Red Strawberries',
      farm: 'BERRY HILL ORCHARDS',
      price: 6.75,
      unit: '1lb Pail',
      tag: 'ORGANIC',
      tagBg: '#7c5a12',
      img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600'
    }
  ]);

  const removeItem = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleMoveToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img
    });
    removeItem(item.id); // Otomatis hapus dari wishlist setelah dipindah
  };

  return (
    <div className="container-fluid p-0 animate__animated animate__fadeIn">
      {/* Breadcrumb */}
      <nav style={{ fontSize: '0.85rem' }} className="mb-2">
        <span className="text-muted">Account</span> <span className="text-muted mx-2">/</span> <span className="text-dark fw-medium">Saved Products</span>
      </nav>

      {/* Header Halaman (Tombol share sudah dihapus bersih) */}
      <div className="mb-4">
        <h1 className="fw-bold m-0" style={{ color: '#063020', fontSize: '2.5rem', letterSpacing: '-0.5px' }}>
          Saved Products
        </h1>
        <p className="text-muted m-0 mt-1">
          You have <span className="fw-bold" style={{ color: '#7c5a12' }}>{savedItems.length} items</span> waiting in your premium wishlist.
        </p>
      </div>

      {/* Grid Item Saved Products */}
      <div className="row g-4">
        {savedItems.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative" style={{ backgroundColor: '#fff' }}>
              
              {/* Tombol Hapus (Trash Icon) */}
              <button 
                onClick={() => removeItem(item.id)}
                className="btn position-absolute top-0 end-0 m-3 d-flex align-items-center justify-content-center bg-white border-0 shadow-sm"
                style={{ width: '36px', height: '36px', borderRadius: '50%', color: '#dc3545', zIndex: 5 }}
              >
                <i className="bi bi-trash"></i>
              </button>

              {/* Area Gambar & Tag */}
              <div className="position-relative overflow-hidden" style={{ height: '240px' }}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }} 
                />
                {item.tag && (
                  <span 
                    className="position-absolute bottom-0 start-0 m-3 px-3 py-1 text-white fw-bold rounded-pill"
                    style={{ backgroundColor: item.tagBg || '#7c5a12', fontSize: '0.68rem', letterSpacing: '0.5px' }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Detail Konten Kartu */}
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <span className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    {item.farm}
                  </span>
                  <h4 className="fw-bold text-dark mb-3" style={{ fontSize: '1.35rem', lineHeight: '1.2', minHeight: '50px' }}>
                    {item.name}
                  </h4>
                  <div className="mb-4">
                    <span className="fw-bold fs-4 text-dark">${item.price.toFixed(2)}</span>
                    <span className="text-muted bg-light px-2 py-1 rounded ms-2" style={{ fontSize: '0.8rem' }}>
                      / {item.unit}
                    </span>
                  </div>
                </div>

                {/* Tombol Move to Cart */}
                <button 
                  onClick={() => handleMoveToCart(item)}
                  className="btn text-white w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 border-0"
                  style={{ backgroundColor: '#063020', fontSize: '0.95rem' }}
                >
                  <i className="bi bi-cart-plus fs-5"></i> Move to Cart
                </button>
              </div>

            </div>
          </div>
        ))}

        {/* State Kosong */}
        {savedItems.length === 0 && (
          <div className="col-12 text-center py-5">
            <div className="text-muted mb-3"><i className="bi bi-heart-break fs-1"></i></div>
            <h5 className="text-dark fw-bold">Your wishlist is empty</h5>
            <p className="text-muted small">Explore the marketplace to add items back here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedProducts;