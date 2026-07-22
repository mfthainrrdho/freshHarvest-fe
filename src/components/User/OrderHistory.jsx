import React, { useState, useEffect } from 'react';
import api from '../../services/api';

// ==========================================
// 1. KOMPONEN DETAIL PESANAN (DARI API)
// ==========================================
function OrderDetailView({ order, onBack }) {
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        // Extract ID dari order (misal #FH-2024-9182 -> 9182)
        const orderId = order.id.replace('#FH-', '');
        const response = await api.get(`/orders/${orderId}`);
        setOrderDetail(response.data.data);
      } catch (error) {
        console.error('Gagal fetch detail order:', error);
        // Fallback ke data dummy
        setOrderDetail({
          items: [
            { name: 'Produk FreshHarvest', quantity: 1, price: order.amount }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [order.id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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
          backgroundColor: order.status === 'pending' || order.status === 'diproses' ? '#fde68a' : 
                          order.status === 'selesai' ? '#d1e7dd' : '#fef3c7', 
          color: order.status === 'pending' || order.status === 'diproses' ? '#9a3412' : 
                 order.status === 'selesai' ? '#0f5132' : '#b45309', 
          fontSize: '0.75rem' 
        }}>
          ● {order.status?.toUpperCase() || 'PROCESSING'}
        </span>
      </div>

      {/* Order Items dari API */}
      <div className="bg-white rounded-3 border shadow-sm p-4">
        <h5 className="fw-bold mb-3">Order Items</h5>
        {orderDetail?.items?.map((item, index) => (
          <div key={index} className="d-flex justify-content-between py-2 border-bottom">
            <span>{item.name}</span>
            <span>${item.price?.toFixed(2) || '0.00'} x {item.quantity || 1}</span>
          </div>
        ))}
        <div className="d-flex justify-content-between pt-3 fw-bold">
          <span>Total</span>
          <span>${order.amount?.toFixed(2) || '0.00'}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN UTAMA ORDER HISTORY
// ==========================================
function OrderHistory({ registeredUser }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [timeframe, setTimeframe] = useState('Last 30 Days');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy data fallback
  const dummyOrders = [
    { id: '#FH-2024-9182', date: 'Oct 24, 2024', amount: 342.15, status: 'PROCESSING' },
    { id: '#FH-2024-8843', date: 'Oct 18, 2024', amount: 1120.00, status: 'DELIVERED' },
    { id: '#FH-2024-8551', date: 'Oct 05, 2024', amount: 89.50, status: 'SHIPPED' },
    { id: '#FH-2024-8219', date: 'Sep 28, 2024', amount: 540.00, status: 'DELIVERED' },
    { id: '#FH-2024-7721', date: 'Sep 15, 2024', amount: 1204.30, status: 'DELIVERED' },
  ];

  // 📥 Fetch orders dari API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      
      // Map response API ke format yang sesuai
      const apiOrders = response.data.data.map((item, index) => ({
        id: `#FH-${item.id || index}`,
        date: new Date(item.created_at).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        amount: parseFloat(item.total_amount) || 0,
        status: mapStatus(item.status),
        original: item,
      }));
      
      setOrders(apiOrders);
    } catch (error) {
      console.error('Gagal fetch orders:', error);
      // Fallback ke dummy orders
      setOrders(dummyOrders);
    } finally {
      setLoading(false);
    }
  };

  // Map status dari backend ke format UI
  const mapStatus = (status) => {
    const statusMap = {
      'pending': 'PROCESSING',
      'diproses': 'PROCESSING',
      'dikirim': 'SHIPPED',
      'selesai': 'DELIVERED',
      'dibatalkan': 'CANCELLED',
    };
    return statusMap[status] || 'PROCESSING';
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PROCESSING':
        return { backgroundColor: '#fde68a', color: '#9a3412' };
      case 'DELIVERED':
        return { backgroundColor: '#d1e7dd', color: '#0f5132' };
      case 'SHIPPED':
        return { backgroundColor: '#fef3c7', color: '#b45309' };
      case 'CANCELLED':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  // --- LOGIKA AUTO-FILTER ---
  let filteredOrders = [...orders];

  // 1. Filter Berdasarkan Status
  if (statusFilter !== 'All Orders') {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === statusFilter.toUpperCase()
    );
  }

  // 2. Filter Berdasarkan Waktu
  if (timeframe === 'Last 30 Days') {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.date);
      return orderDate >= thirtyDaysAgo;
    });
  }

  // SAKLAR: Jika ada order yang dipilih
  if (selectedOrder) {
    return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="text-center">
          <div className="spinner-border text-success mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Memuat riwayat pesanan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-100 animate__animated animate__fadeIn">
      
      <div className="mb-4">
        <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: '-0.5px', color: '#063020' }}>Order History</h2>
        <p className="text-muted small mt-1">Lihat riwayat pesanan Anda</p>
      </div>

      {/* FILTER ROWS */}
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
                <option>Cancelled</option>
              </select>
            </div>

            <div style={{ minWidth: '150px' }}>
              <label className="text-muted text-uppercase fw-bold d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '0.5px' }}>Timeframe</label>
              <select className="form-select form-select-sm border rounded-2" style={{ fontSize: '0.85rem', color: '#334155' }} value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Past Year</option>
                <option>All Time</option>
              </select>
            </div>

            <button className="btn btn-sm btn-outline-success" onClick={fetchOrders}>
              <i className="bi bi-arrow-clockwise me-1"></i> Refresh
            </button>
          </div>
        </div>

        <div className="col-lg-4 col-md-5">
          <div className="rounded-3 p-3 border text-white h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#063020' }}>
            <span className="text-uppercase fw-semibold" style={{ fontSize: '0.65rem', letterSpacing: '1px', opacity: 0.8 }}>Total Orders</span>
            <h2 className="fw-bold m-0 mt-1" style={{ fontSize: '2rem' }}>{orders.length}</h2>
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
                  <td colSpan="5" className="text-center py-4 text-muted small">
                    <i className="bi bi-inbox fs-3 d-block mb-2"></i>
                    No orders found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="d-flex align-items-center justify-content-between p-3 border-top bg-white">
          <span className="text-muted small">Showing {filteredOrders.length} of {orders.length} orders</span>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-light border px-2 py-1 rounded-2 d-flex align-items-center" disabled>
              <i className="bi bi-chevron-left" style={{ fontSize: '0.8rem' }}></i>
            </button>
            <button className="btn btn-sm btn-light border px-2 py-1 rounded-2 d-flex align-items-center">
              <i className="bi bi-chevron-right" style={{ fontSize: '0.8rem' }}></i>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default OrderHistory;