import React, { useState } from 'react';
import './App.css';
import kebunImg from './assets/kebun.jpg'; 

// IMPORT SEMUA KOMPONEN
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboarduser from './components/User/Dashboard';
import Marketplace from './components/User/Marketplace';

function App() {
  // 🟢 1. Ubah state default awal ke 'landing' supaya Landing Page yang muncul pertama kali
  const [page, setPage] = useState('landing');

  // 1. 🔐 AMBIL DATABASE USERS DARI LOCALSTORAGE
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  // 2. 🔐 AMBIL USER YANG SEDANG LOGIN AKTIF
  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedActiveUser = localStorage.getItem('registeredUser');
    return savedActiveUser ? JSON.parse(savedActiveUser) : {
      name: '', email: '', password: '', role: 'customer'
    };
  });

  // FUNGSI DAFTAR/REGISTER
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
    
    // Simpan ke State dan LocalStorage
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setRegisteredUser(newUser);
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    alert('Akun berhasil dibuat! Silakan login.');
    setPage('login');
  };

  // FUNGSI LOGIN / SIGN IN
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value.trim().toLowerCase();
    const password = e.target.loginPassword.value;

    const foundUser = users.find((user) => user.email.toLowerCase() === email);

    if (foundUser && foundUser.password === password) {
      setRegisteredUser(foundUser);
      // Kunci sesi login aktif di browser
      localStorage.setItem('registeredUser', JSON.stringify(foundUser));
      setPage('Dashboarduser');
    } else if (!foundUser) {
      alert('Email belum terdaftar! Klik "Create an account" dulu.');
    } else {
      alert('Password salah! Silakan cek kembali password Anda.');
    }
  };

  // FUNGSI LOGOUT (Bersih total dari memori & RAM)
  const handleLogout = () => {
    localStorage.removeItem('registeredUser'); 
    setRegisteredUser({ name: '', email: '', password: '', role: 'customer' }); 
    // 🟢 2. Ketika logout, arahkan kembali ke landing page
    setPage('landing');
  };

  return (
    <>
      {/* 🟢 3. TAMPILKAN LANDING PAGE JIKA STATE ADALAH 'landing' */}
      {page === 'landing' && (
        <LandingPage setPage={setPage} />
      )}

      {page === 'login' && (
        <Login setPage={setPage} handleSignIn={handleSignIn} kebunImg={kebunImg} />
      )}
      {page === 'register' && (
        <Register setPage={setPage} handleRegister={handleRegister} kebunImg={kebunImg} />
      )}
      {page === 'Marketplace' && (
        <Marketplace setPage={setPage} registeredUser={registeredUser} />
      )}
      {page === 'Dashboarduser' && (
        <Dashboarduser 
          setPage={handleLogout} 
          registeredUser={registeredUser} 
          setRegisteredUser={setRegisteredUser} 
        />
      )}
    </>
  );
}

export default App;