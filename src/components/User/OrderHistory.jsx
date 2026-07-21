import React, { useState } from 'react';

// ==========================================
// 1. KOMPONEN DETAIL PESANAN (SUDAH DINAMIS)
// ==========================================
function OrderDetailView({ order, onBack }) {
  // Dummy data item belanjaan yang otomatis disesuaikan dengan total amount ordernya
  // Biar hitungannya masuk akal secara matematika dengan total di tabel lo
  const getOrderItemsAndSummary = (orderId, amount) => {
    switch(orderId) {
      case '#FH-2024-9182':
        return {
          subtotal: 315.50, shipping: 15.00, tax: 11.65,
          items: [
            { id: '1', name: 'Heirloom Ruby Tomatoes', desc: 'Organic / 1.5lb Pack', sku: 'TOM-RUB-01', qty: 2, price: 24.00, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=60' },
            { id: '2', name: 'Wildflower Raw Honey', desc: 'Pure Harvest / 500g', sku: 'HON-WLD-99', qty: 1, price: 32.50, img: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&auto=format&fit=crop&q=60' },
            { id: '3', name: 'Organic Swiss Chard', desc: 'Seasonal / Large Bundle', sku: 'GRN-CHR-22', qty: 3, price: 12.00, img: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=150&auto=format&fit=crop&q=60' },
            { id: '4', name: 'Artisan Sourdough Loaf', desc: 'Handmade / 800g', sku: 'BRD-SRD-45', qty: 2, price: 18.50, img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&auto=format&fit=crop&q=60' },
          ]
        };
      case '#FH-2024-8843':
        return {
          subtotal: 1080.00, shipping: 0.00, tax: 40.00,
          items: [
            { id: '1', name: 'Premium Wagyu Ribeye', desc: 'A5 Grade / 500g', sku: 'MEAT-WAG-05', qty: 4, price: 250.00, img: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=150&auto=format&fit=crop&q=60' },
            { id: '2', name: 'Organic Cold-Pressed Olive Oil', desc: 'Extra Virgin / 750ml', sku: 'OIL-OLV-12', qty: 2, price: 40.00, img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=150&auto=format&fit=crop&q=60' }
          ]
        };
      default: // Fallback untuk orderan lainnya supaya nilainya tetep pas dengan tabel lo
        return {
          subtotal: amount - 15.00, shipping: 10.00, tax: 5.00,
          items: [
            { id: '1', name: 'Fresh Organic Grocery Bundle', desc: 'Mixed Seasonal Items', sku: 'GCR-MIX-00', qty: 1, price: amount - 15.00, img: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=150&auto=format&fit=crop&q=60' }
          ]
        };
    }
  };

  const { items, subtotal, shipping, tax } = getOrderItemsAndSummary(order.id, order.amount);

  return (
    <div className="w-100 animate__animated animate__fadeIn">
      {/* Breadcrumb */}
      <div className="d-flex align-items-center gap-2 mb-3 text-muted small">
        <span style={{ cursor: 'pointer' }} className="text-success fw-medium" onClick={onBack}>Order History</span>
        <span>&rsaquo;</span>
        <span className="fw-semibold text-dark">Order {order.id}</span>
      </div>

      {/* Tombol Back + Judul Dinamis */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <button className="btn btn-sm btn-light border rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }} onClick={onBack}>
          <i className="bi bi-arrow-left fs-5"></i>
        </button>
        <h2 className="fw-bold m-0 text-dark" style={{ fontSize: '1.75rem', letterSpacing: '-0.5px' }}>Order {order.id}</h2>
        <span className="badge fw-bold px-3 py-2 rounded-pill" style={{ 
          backgroundColor: order.status === 'PROCESSING' ? '#fde68a' : order.status === 'DELIVERED' ? '#d1e7dd' : '#fef3c7', 
          color: order.status === 'PROCESSING' ? '#9a3412' : order.status === 'DELIVERED' ? '#0f5132' : '#b45309', 
          fontSize: '0.75rem' 
        }}>
          ● {order.status}
        </span>
      </div>

      {/* 3 Kotak Informasi Atas Dinamis */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="bg-white rounded-3 p-4 border shadow-sm h-100">
            <h6 className="fw-bold text-uppercase mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: '#855823' }}>
              <i className="bi bi-calendar3"></i> Order Overview
            </h6>
            <div className="mb-2">
              <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Order Date</label>
              <span className="fw-bold text-dark small">{order.date}</span>
            </div>
            <div className="mb-2">
              <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Payment Method</label>
              <span className="fw-bold text-dark small d-flex align-items-center gap-2">
                <i className="bi bi-credit-card-2-back"></i> Visa ending in 4242
              </span>
            </div>
            <div>
              <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Shipping Method</label>
              <span className="fw-bold text-dark small">Standard Delivery</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="bg-white rounded-3 p-4 border shadow-sm h-100">
            <h6 className="fw-bold text-uppercase mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: '#855823' }}>
              <i className="bi bi-person"></i> Customer Details
            </h6>
            <div className="d-flex align-items-center gap-3 mb-2">
              <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark small" style={{ width: '38px', height: '38px', backgroundColor: '#d1e7dd' }}>JM</div>
              <div>
                <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Full Name</label>
                <span className="fw-bold text-dark small">Julianna S. Moore</span>
              </div>
            </div>
            <div className="mb-2">
              <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Email Address</label>
              <span className="fw-bold text-dark small">j.moore@example.com</span>
            </div>
            <div>
              <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Phone Number</label>
              <span className="fw-bold text-dark small">+1 (555) 928-4012</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="bg-white rounded-3 p-4 border shadow-sm h-100">
            <h6 className="fw-bold text-uppercase mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: '#855823' }}>
              <i className="bi bi-truck"></i> Shipping Address
            </h6>
            <label className="text-muted text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>Delivery Location</label>
            <p className="fw-bold text-dark small m-0 lh-base">
              1248 Oakwood Drive, Suite 400<br />San Francisco, CA 94107<br />United States
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Item Belanjaan & Ringkasan Biaya Dinamis */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="bg-white rounded-3 border shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0" style={{ fontSize: '1.1rem' }}>Order Items</h5>
              <span className="text-muted small fw-medium">{items.length} Items Total</span>
            </div>
            <div className="table-responsive">
              <table className="table align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr className="text-muted" style={{ fontSize: '0.75rem' }}>
                    <th className="ps-0 py-2">PRODUCT</th>
                    <th className="py-2">SKU</th>
                    <th className="py-2 text-center">QTY</th>
                    <th className="py-2">UNIT PRICE</th>
                    <th className="py-2 text-end pe-0">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-0 py-3">
                        <div className="d-flex align-items-center gap-3">
                          <img src={item.img} alt={item.name} className="rounded border" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                          <div>
                            <p className="fw-bold text-dark m-0">{item.name}</p>
                            <span className="text-muted" style={{ fontSize: '0.75rem' }}>{item.desc}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted">{item.sku}</td>
                      <td className="text-center fw-semibold">{item.qty}</td>
                      <td className="text-dark">${item.price.toFixed(2)}</td>
                      <td className="text-end pe-0 fw-bold text-dark">${(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ringkasan Pembayaran Dinamis */}
        <div className="col-lg-4">
          <div className="bg-white rounded-3 p-4 border shadow-sm mb-4">
            <h6 className="fw-bold text-uppercase mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: '#855823' }}>
              <i className="bi bi-receipt"></i> Order Summary
            </h6>
            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold text-dark">${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-muted">Shipping Fee</span>
              <span className="fw-semibold text-dark">${shipping.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between pb-2 mb-2 border-bottom small">
              <span className="text-muted">Estimated Tax</span>
              <span className="fw-semibold text-dark">${tax.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center pt-1 mb-3">
              <span className="fw-bold text-dark">Grand Total</span>
              <span className="fw-bold text-dark fs-5">${order.amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="rounded-3 p-4 border text-white" style={{ backgroundColor: '#1e382b' }}>
            <h6 className="fw-bold text-uppercase mb-4" style={{ fontSize: '0.8rem' }}>Order Timeline</h6>
            <div className="position-relative ps-4 border-start border-light border-opacity-25 d-flex flex-column gap-4" style={{ fontSize: '0.8rem' }}>
              <div className="position-relative">
                <div className="position-absolute rounded-circle bg-success border border-light" style={{ width: '12px', height: '12px', left: '-22px', top: '4px' }}></div>
                <p className="fw-bold m-0 text-white">Status: {order.status}</p>
                <span className="text-white text-opacity-70 small" style={{ fontSize: '0.7rem' }}>{order.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN UTAMA ORDER HISTORY (TABEL UTAMA)
// ==========================================
function OrderHistory() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [timeframe, setTimeframe] = useState('Last 30 Days');

  const initialOrders = [
    { id: '#FH-2024-9182', date: 'Oct 24, 2024', amount: 342.15, status: 'PROCESSING' },
    { id: '#FH-2024-8843', date: 'Oct 18, 2024', amount: 1120.00, status: 'DELIVERED' },
    { id: '#FH-2024-8551', date: 'Oct 05, 2024', amount: 89.50, status: 'SHIPPED' },
    { id: '#FH-2024-8219', date: 'Sep 28, 2024', amount: 540.00, status: 'DELIVERED' },
    { id: '#FH-2024-7721', date: 'Sep 15, 2024', amount: 1204.30, status: 'DELIVERED' },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PROCESSING':
        return { backgroundColor: '#fde68a', color: '#9a3412' };
      case 'DELIVERED':
        return { backgroundColor: '#d1e7dd', color: '#0f5132' };
      case 'SHIPPED':
        return { backgroundColor: '#fef3c7', color: '#b45309' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  // --- LOGIKA AUTO-FILTER ---
  let filteredOrders = [...initialOrders];

  // 1. Filter Berdasarkan Status (Otomatis)
  if (statusFilter !== 'All Orders') {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === statusFilter.toUpperCase()
    );
  }

  // 2. Filter Berdasarkan Waktu / Timeframe (Otomatis)
  if (timeframe === 'Last 30 Days') {
    // Memfilter data yang hanya di bulan Oktober
    filteredOrders = filteredOrders.filter((order) => order.date.includes('Oct'));
  }

  // SAKLAR: Jika ada order yang dipilih, oper datanya ke DetailView
  if (selectedOrder) {
    return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  return (
    <div className="w-100 animate__animated animate__fadeIn">
      
      <div className="mb-4">
        <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: '-0.5px', color: '#063020' }}>Order History</h2>
      </div>

      {/* FILTER ROWS (Tanpa Tombol Apply) */}
      <div className="row g-3 mb-4 align-items-stretch">
        <div className="col-lg-8 col-md-7">
          <div className="bg-white rounded-3 p-3 border shadow-sm h-100 d-flex flex-wrap align-items-center gap-3">
            <div style={{ minWidth: '150px' }}>
              <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Status Filter</label>
              <select className="form-select form-select-sm border rounded-2" style={{ fontSize: '0.85rem', color: '#334155' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All Orders</option>
                <option>Processing</option>
                <option>Delivered</option>
                <option>Shipped</option>
              </select>
            </div>

            <div style={{ minWidth: '150px' }}>
              <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Timeframe</label>
              <select className="form-select form-select-sm border rounded-2" style={{ fontSize: '0.85rem', color: '#334155' }} value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Past Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-5">
          <div className="rounded-3 p-3 border text-white h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#063020' }}>
            <span className="text-uppercase fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.8 }}>Total Lifetime Spend</span>
            <h2 className="fw-bold m-0 mt-1" style={{ fontSize: '2rem' }}>$12,482.50</h2>
          </div>
        </div>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded-3 border shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th className="py-3 px-4 text-muted fw-bold border-bottom" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ORDER ID</th>
                <th className="py-3 text-muted fw-bold border-bottom" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>DATE</th>
                <th className="py-3 text-muted fw-bold border-bottom" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>TOTAL AMOUNT</th>
                <th className="py-3 text-muted fw-bold border-bottom" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>STATUS</th>
                <th className="py-3 px-4 text-end text-muted fw-bold border-bottom" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 px-4 fw-bold" style={{ color: '#0f4c3a' }}>{order.id}</td>
                    <td className="py-3 text-secondary">{order.date}</td>
                    <td className="py-3 fw-bold text-dark">${order.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className="badge fw-bold px-2.5 py-1.5 rounded-pill" style={{ fontSize: '0.7rem', letterSpacing: '0.5px', ...getStatusBadgeClass(order.status) }}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button 
                        className="btn btn-link p-0 fw-semibold text-decoration-none d-inline-flex align-items-center gap-1 border-0 bg-transparent shadow-none"
                        style={{ color: '#063020', fontSize: '0.85rem' }}
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details <i className="bi bi-chevron-right" style={{ fontSize: '0.75rem' }}></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted small">No orders found matching the filter criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="d-flex align-items-center justify-content-between p-3 border-top bg-white">
          <span className="text-muted small">Showing 1-{filteredOrders.length} of {filteredOrders.length} orders</span>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-light border px-2 py-1 rounded-2 d-flex align-items-center" disabled>
              <i className="bi bi-chevron-left" style={{ fontSize: '0.8rem' }}></i>
            </button>
            <button className="btn btn-sm btn-light border px-2 py-1 rounded-2 d-flex align-items-center" onClick={() => alert('Next page')}>
              <i className="bi bi-chevron-right" style={{ fontSize: '0.8rem' }}></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderHistory;