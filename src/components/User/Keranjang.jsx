import React, { useState } from 'react';
import api from '../../services/api'; // Import API service

// 🟢 TANGKAP PROPS DARI PUSAT (Dashboarduser)
function Keranjang({ cartItems, setCartItems, setActiveTab, registeredUser }) {
  
  // STATE: Hanya 2 opsi pembayaran ('qris' or 'cod')
  const [selectedPayment, setSelectedPayment] = useState('qris');
  // STATE: Untuk mengontrol pop-up modal QRIS simulasi
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handler Qty & Delete menggunakan State Pusat
  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const deleteItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Kalkulasi harga otomatis tersinkronisasi
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const shipping = 0.00;
  const taxRate = 0.08;
  const estimatedTax = subtotal * taxRate;
  const grandTotal = subtotal + shipping + estimatedTax;

  // 🚀 FUNGSI CHECKOUT KE API BACKEND
  const processCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Keranjang belanja kosong!');
      return;
    }

    // Cek apakah user login
    if (!registeredUser || !registeredUser.email) {
      alert('Silakan login terlebih dahulu!');
      return;
    }

    setLoading(true);

    try {
      // 1. Kirim data checkout ke backend
      const checkoutData = {
        recipient_name: registeredUser.name || 'Pelanggan',
        phone: registeredUser.phone || '08123456789',
        street: registeredUser.street || 'Jl. Contoh No. 123',
        suite: registeredUser.suite || 'Blok A',
        city_state_zip: registeredUser.cityStateZip || 'Jakarta 12345',
        payment_method: selectedPayment, // 'qris' atau 'cod'
      };

      const response = await api.post('/checkout', checkoutData);
      
      if (response.data.success) {
        const orderId = response.data.data.order_id;
        
        // 2. Untuk COD, konfirmasi pembayaran otomatis
        if (selectedPayment === 'cod') {
          await api.post(`/orders/${orderId}/confirm-payment`);
        }
        
        // 3. Tampilkan sukses
        alert(`✅ Pesanan berhasil dibuat!\nOrder ID: ${orderId}\nMetode: ${selectedPayment.toUpperCase()}\nTotal: $${grandTotal.toFixed(2)}`);
        
        // 4. Kosongkan keranjang
        setCartItems([]);
        
        // 5. Redirect ke Order History
        if (setActiveTab) {
          setActiveTab('Orders');
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      
      // 🔄 FALLBACK: Jika API gagal, proses dengan cara lama (dummy)
      alert(`⚠️ Gagal terhubung ke server. Transaksi dicatat secara lokal.\nMetode: ${selectedPayment.toUpperCase()}\nTotal: $${grandTotal.toFixed(2)}`);
      setCartItems([]);
      if (setActiveTab) {
        setActiveTab('Orders');
      }
    } finally {
      setLoading(false);
      setShowQrisModal(false);
    }
  };

  // Triger saat tombol checkout utama diklik
  const handleCheckoutTrigger = () => {
    if (selectedPayment === 'qris') {
      setShowQrisModal(true);
    } else {
      processCheckout();
    }
  };

  // Fungsi final ketika QRIS disimulasikan sukses
  const executeSuccessOrder = () => {
    processCheckout();
  };

  return (
    <div className="container py-4 animate__animated animate__fadeIn" style={{ maxWidth: '1200px', fontFamily: 'system-ui, sans-serif', paddingLeft: 0, paddingRight: 0 }}>
      
      {/* JUDUL PAGE */}
      <div className="mb-2">
        <h2 className="fw-bold" style={{ color: '#063020', fontSize: '2rem', letterSpacing: '-0.5px' }}>Your Basket</h2>
        <p className="text-muted small">Review your selection of artisanal harvest and premium pantry staples.</p>
      </div>

      <div className="row g-4 mt-2">
        {/* KOLOM KIRI: LIST PRODUK */}
        <div className="col-lg-8">
          {cartItems.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3 p-3 border shadow-sm">
                  <div className="row align-items-center g-3">
                    
                    {/* 1. SISI KIRI: FOTO & DETAIL PRODUK */}
                    <div className="col-12 col-md-7 d-flex align-items-center gap-3">
                      {item.emoji ? (
                        <div className="rounded flex-shrink-0 d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', fontSize: '2.5rem', backgroundColor: item.color || '#f8f9fa' }}>
                          {item.emoji}
                        </div>
                      ) : (
                        <img src={item.img} alt={item.name} className="rounded flex-shrink-0" style={{ width: '80px', height: '80px', objectFit: 'cover', backgroundColor: '#f8f9fa' }} />
                      )}
                      <div className="overflow-hidden">
                        <span className="fw-bold d-block mb-1 text-uppercase text-muted" style={{ fontSize: '0.65rem', color: '#855823', letterSpacing: '0.5px' }}>
                          {item.category || 'FRESH HARVEST'}
                        </span>
                        <h5 className="fw-bold text-dark text-truncate m-0 mb-1" style={{ fontSize: '1.1rem', letterSpacing: '-0.3px' }}>
                          {item.name}
                        </h5>
                        <span className="text-muted small text-truncate d-block">
                          {item.desc || `Freshly harvested from ${item.producer || 'Local Farm'}`}
                        </span>
                      </div>
                    </div>

                    {/* 2. SISI KANAN: TOMBOL QTY, HARGA, & TRASH */}
                    <div className="col-12 col-md-5 d-flex align-items-center justify-content-between justify-content-md-end gap-4">
                      
                      {/* Kontrol Qty */}
                      <div className="d-flex align-items-center justify-content-between border rounded-pill px-2 py-1 bg-light" style={{ width: '100px', minWidth: '100px' }}>
                        <button className="btn btn-sm p-0 border-0 bg-transparent shadow-none fw-bold" style={{ fontSize: '1.1rem', color: '#555' }} onClick={() => updateQuantity(item.id, -1)}>&minus;</button>
                        <span className="fw-semibold small" style={{ color: '#333' }}>{item.qty}</span>
                        <button className="btn btn-sm p-0 border-0 bg-transparent shadow-none fw-bold" style={{ fontSize: '1rem', color: '#555' }} onClick={() => updateQuantity(item.id, 1)}>&#43;</button>
                      </div>
                      
                      {/* Total Harga */}
                      <div style={{ minWidth: '90px', textAlign: 'right' }}>
                        <span className="fw-bold text-dark fs-5">${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                      
                      {/* Tombol Hapus */}
                      <button className="btn btn-link text-muted p-0 border-0 bg-transparent shadow-none text-danger-hover" onClick={() => deleteItem(item.id)}>
                        <i className="bi bi-trash3 fs-5"></i>
                      </button>

                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3 border p-5 text-center text-muted shadow-sm">
              <i className="bi bi-basket3 fs-1 d-block mb-2 text-opacity-25" style={{ color: '#063020' }}></i>
              Your basket is empty.
            </div>
          )}

          <div className="mt-4">
            <button 
              className="btn btn-link p-0 fw-bold text-decoration-none text-uppercase d-inline-flex align-items-center gap-2 border-0 bg-transparent shadow-none" 
              style={{ color: '#4a5d4e', fontSize: '0.75rem', letterSpacing: '0.5px' }} 
              onClick={() => setActiveTab('Marketplace')}
            >
              <i className="bi bi-arrow-left"></i> Continue Shopping
            </button>
          </div>
        </div>

        {/* KOLOM KANAN: ORDER SUMMARY */}
        <div className="col-lg-4">
          <div className="bg-white rounded-3 border shadow-sm p-4 h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#fcfcfc' }}>
            <div>
              <h4 className="fw-bold mb-3" style={{ color: '#063020', fontSize: '1.4rem' }}>Order Summary</h4>
              
              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold text-dark">${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 small">
                <span className="text-muted">Shipping</span>
                <span className="fw-bold" style={{ color: '#855823', fontSize: '0.8rem' }}>FREE</span>
              </div>
              <div className="d-flex justify-content-between pb-3 border-bottom mb-4 small">
                <span className="text-muted">Estimated Tax</span>
                <span className="fw-bold text-dark">${estimatedTax.toFixed(2)}</span>
              </div>

              {/* PILIHAN METODE PEMBAYARAN */}
              <div className="mb-4">
                <label className="text-muted text-uppercase fw-bold d-block mb-2.5" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>
                  Payment Method
                </label>
                <div className="d-flex flex-column gap-2">
                  {[
                    { id: 'qris', name: 'QRIS / Digital Wallet', desc: 'GoPay, OVO, Dana, LinkAja', icon: 'bi-qr-code-scan' },
                    { id: 'cod', name: 'Cash on Delivery (COD)', desc: 'Pay with cash upon delivery', icon: 'bi-truck' }
                  ].map((method) => {
                    const isSelected = selectedPayment === method.id;
                    return (
                      <label 
                        key={method.id}
                        className="border rounded-3 p-3 d-flex align-items-center justify-content-between position-relative user-select-none"
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          backgroundColor: isSelected ? '#e8f5e9' : '#ffffff',
                          borderColor: isSelected ? '#063020' : '#dee2e6',
                          borderWidth: isSelected ? '2px' : '1px'
                        }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: isSelected ? '#063020' : '#f1f5f9', color: isSelected ? '#ffffff' : '#495057' }}>
                            <i className={`bi ${method.icon} fs-5`}></i>
                          </div>
                          <div>
                            <p className="fw-bold m-0 small" style={{ color: isSelected ? '#063020' : '#495057', fontSize: '0.85rem' }}>{method.name}</p>
                            <p className="text-muted m-0" style={{ fontSize: '0.75rem' }}>{method.desc}</p>
                          </div>
                        </div>

                        <div className="position-relative d-flex align-items-center justify-content-center">
                          <input type="radio" name="paymentMethod" className="form-check-input m-0 position-absolute opacity-0" checked={isSelected} onChange={() => setSelectedPayment(method.id)} style={{ cursor: 'pointer', width: '20px', height: '20px', zIndex: 2 }} />
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: isSelected ? '5px solid #063020' : '2px solid #cbd5e1', backgroundColor: '#fff', zIndex: 1 }} />
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end mb-4">
                <span className="fw-bold text-dark" style={{ fontSize: '1.25rem' }}>Grand Total</span>
                <span className="fw-bold text-dark" style={{ fontSize: '1.5rem' }}>${grandTotal.toFixed(2)}</span>
              </div>

              <button 
                className="btn w-100 py-3 text-white fw-medium rounded-3 border-0" 
                style={{ backgroundColor: '#7a5c37', fontSize: '0.95rem' }}
                onClick={handleCheckoutTrigger}
                disabled={cartItems.length === 0 || loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Processing...
                  </>
                ) : (
                  selectedPayment === 'qris' ? 'Show QRIS Code' : 'Place Order (COD)'
                )}
                <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL BOX SIMULASI QRIS ================= */}
      {showQrisModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="bg-white rounded-4 p-4 text-center shadow border animate__animated animate__zoomIn animate__faster" style={{ maxWidth: '360px', width: '90%', zIndex: 1060 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0" style={{ color: '#063020' }}>QRIS Payment</h5>
              <button className="btn-close shadow-none" onClick={() => setShowQrisModal(false)} disabled={loading}></button>
            </div>
            
            <p className="text-muted small mb-3">Scan the QR code below using GoPay, OVO, Dana, or Bank App to pay <strong>${grandTotal.toFixed(2)}</strong></p>
            
            <div className="bg-light p-3 rounded-3 d-inline-block border mb-3">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FreshHarvestDummyPayment_${grandTotal}`} 
                alt="QRIS Code Dummy" 
                className="img-fluid" 
                style={{ width: '180px', height: '180px' }} 
              />
            </div>

            <div className="alert alert-warning py-2 small mb-4" style={{ fontSize: '0.75rem' }}>
              <i className="bi bi-info-circle me-1"></i> This is a development simulation.
            </div>

            <button 
              className="btn w-100 py-2.5 text-white fw-medium rounded-3 border-0" 
              style={{ backgroundColor: '#063020' }} 
              onClick={executeSuccessOrder}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Processing...
                </>
              ) : (
                'I Have Paid (Simulate Success)'
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Keranjang;