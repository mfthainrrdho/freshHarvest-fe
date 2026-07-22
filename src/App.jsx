import React, { useState, useEffect } from 'react';
import './App.css';
import kebunImg from './assets/kebun.jpg'; 

// IMPORT KOMPONEN PUBLIC & USER
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboarduser from './components/User/Dashboard';
import Marketplace from './components/User/Marketplace';

// IMPORT KOMPONEN ADMIN
import ProductManagement from './components/admin/ProductManagement';
import AdminDashboard from './components/admin/AdminDashboard';
import Orders from './components/admin/Orders';

// 👑 KOMPONEN WRAPPER/LAYOUT UNTUK ADMIN (Agar Sidebar Gak Ikut Kedip/Reload)
function AdminLayout({ page, setPage, registeredUser, handleLogout, notifications, handleMarkNotifsAsRead, orders }) {
  return (
    <div className="admin-layout">
      {page === 'admin-dashboard' && (
        <AdminDashboard 
          setPage={setPage} 
          adminUser={registeredUser} 
          onLogout={handleLogout}
          notifications={notifications}
          onMarkNotifsAsRead={handleMarkNotifsAsRead}
          orders={orders}
        />
      )}
      {page === 'admin-products' && (
        <ProductManagement 
          setPage={setPage} 
          adminUser={registeredUser} 
          onLogout={handleLogout} 
          notifications={notifications}
          onMarkNotifsAsRead={handleMarkNotifsAsRead}
        />
      )}
      {page === 'admin-orders' && (
        <Orders 
          setPage={setPage} 
          adminUser={registeredUser} 
          onLogout={handleLogout} 
          notifications={notifications}
          onMarkNotifsAsRead={handleMarkNotifsAsRead}
          orders={orders}
        />
      )}
    </div>
  );
}

function App() {
  const [page, setPage] = useState('landing');

  // 1. DATABASE USERS DARI LOCALSTORAGE
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // 2. USER YANG SEDANG LOGIN AKTIF
  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedActiveUser = localStorage.getItem('registeredUser');
    return savedActiveUser ? JSON.parse(savedActiveUser) : {
      name: '', email: '', password: '', role: 'customer'
    };
  });

  // 3. STATE ORDERS GLOBAL
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [
      { id: 'FH-9821', customer: 'Eleanor Shelistrop', items: ['Kesar Mangoes', 'Wild Honey 500g'], date: 'Oct 24, 2023', amount: 124.50, status: 'Processing' },
      { id: 'FH-9820', customer: 'Tahani Al-Jamil', items: ['Premium Hass Avocados'], date: 'Oct 23, 2023', amount: 89.20, status: 'Shipped' },
    ];
  });

  // 4. STATE NOTIFIKASI GLOBAL
  const [notifications, setNotifications] = useState(() => {
    const savedNotifs = localStorage.getItem('notifications');
    return savedNotifs ? JSON.parse(savedNotifs) : [
      { id: 1, title: 'Pesanan baru masuk', message: 'eleanor shelistrop baru saja membuat pesanan.', time: '15.09', isRead: false },
      { id: 2, title: 'Pesanan baru masuk', message: 'tahani al-jamil baru saja membuat pesanan.', time: '14.30', isRead: false }
    ];
  });

  // Simpan otomatis ke localStorage
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // 🛒 FUNGSI SAAT USER CHECKOUT / MEMBELI
  const handleCreateOrder = (orderData) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const customerName = orderData.customerName || registeredUser.name || 'Pelanggan';

    // Buat Pesanan Baru
    const newOrder = {
      id: `FH-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: customerName,
      items: orderData.items || ['Produk FreshHarvest'],
      date: dateString,
      amount: Number(orderData.amount || 0),
      status: 'Processing',
    };

    // Buat Notifikasi Baru (isRead: false)
    const newNotif = {
      id: Date.now(),
      title: 'Pesanan baru masuk',
      message: `${customerName.toLowerCase()} baru saja membuat pesanan.`,
      time: timeString,
      isRead: false,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // 🔔 FUNGSI TANDAI NOTIFIKASI SUDAH DIBACA (HILANGKAN BADGE MERAH)
  const handleMarkNotifsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };

  // 📝 FUNGSI REGISTER
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.regName.value.trim();
    const email = e.target.regEmail.value.trim().toLowerCase();
    const password = e.target.regPassword.value;
    const confirmPassword = e.target.regConfirmPassword.value;

    if (password !== confirmPassword) {
      alert('Konfirmasi password tidak cocok.');
      return;
    }

    const emailExists = users.some((user) => user.email.toLowerCase() === email);
    if (emailExists) {
      alert('Email sudah terdaftar! Silakan gunakan email lain.');
      return;
    }

    const newUser = { name, email, password, role: 'customer' };
    const updatedUsers = [...users, newUser];
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setRegisteredUser(newUser);
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    alert('Akun pembeli berhasil dibuat! Silakan login.');
    setPage('login');
  };

  // 🔑 FUNGSI LOGIN
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value.trim().toLowerCase();
    const password = e.target.loginPassword.value;

    if (email === 'admin@freshharvest.com' && password === 'admin123') {
      const adminData = { name: 'Admin FreshHarvest', email, role: 'admin' };
      setRegisteredUser(adminData);
      localStorage.setItem('registeredUser', JSON.stringify(adminData));
      
      alert('Login sebagai Admin Berhasil!');
      setPage('admin-dashboard');
      return;
    }

    const foundUser = users.find((user) => user.email.toLowerCase() === email);

    if (foundUser && foundUser.password === password) {
      setRegisteredUser(foundUser);
      localStorage.setItem('registeredUser', JSON.stringify(foundUser));
      
      if (foundUser.role === 'admin') {
        alert('Selamat datang Admin!');
        setPage('admin-dashboard');
      } else {
        setPage('Dashboarduser');
      }
    } else if (!foundUser) {
      alert('Email belum terdaftar! Klik "Create an account" dulu.');
    } else {
      alert('Password salah! Silakan cek kembali password Anda.');
    }
  };

  // 🚪 FUNGSI LOGOUT
  const handleLogout = () => {
    localStorage.removeItem('registeredUser'); 
    setRegisteredUser({ name: '', email: '', password: '', role: 'customer' }); 
    setPage('landing');
  };

  // Cek apakah halaman saat ini adalah halaman admin
  const isAdminPage = page.startsWith('admin-');

  return (
    <main className="app-container">
      {/* 🌐 ROUTE PUBLIC */}
      {page === 'landing' && (
        <div className="page-transition">
          <LandingPage setPage={setPage} />
        </div>
      )}

      {page === 'login' && (
        <div className="page-transition">
          <Login setPage={setPage} handleSignIn={handleSignIn} kebunImg={kebunImg} />
        </div>
      )}

      {page === 'register' && (
        <div className="page-transition">
          <Register setPage={setPage} handleRegister={handleRegister} kebunImg={kebunImg} />
        </div>
      )}

      {/* 👤 ROUTE USER */}
      {page === 'Marketplace' && (
        <div className="page-transition">
          <Marketplace 
            setPage={setPage} 
            registeredUser={registeredUser} 
            onLogout={handleLogout}
            onCheckout={handleCreateOrder}
          />
        </div>
      )}

      {page === 'Dashboarduser' && (
        <div className="page-transition">
          <Dashboarduser 
            setPage={setPage} 
            onLogout={handleLogout}
            registeredUser={registeredUser} 
            setRegisteredUser={setRegisteredUser} 
            onCheckout={handleCreateOrder}
          />
        </div>
      )}

      {/* 👑 ROUTE ADMIN (Tanpa Dibungkus Class 'page-transition' Agar Gak Kedip) */}
      {isAdminPage && (
        <AdminLayout 
          page={page}
          setPage={setPage}
          registeredUser={registeredUser}
          handleLogout={handleLogout}
          notifications={notifications}
          handleMarkNotifsAsRead={handleMarkNotifsAsRead}
          orders={orders}
        />
      )}
    </main>
  );
}

export default App;