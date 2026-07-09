import React, { useState } from 'react';
import './App.css';
import kebunImg from './assets/kebun.jpg'; // Path gambar lo

// IMPORT SEMUA KOMPONEN FILE BARU LO
import Login from './components/Login';
import Register from './components/Register';
import Market from './components/Market';
import Dashboard from './components/Dashboard';

function App() {
  const [page, setPage] = useState('login');       
  const [role, setRole] = useState('customer');    
  const [regRole, setRegRole] = useState('customer'); 

  const [registeredUser, setRegisteredUser] = useState({
    email: '', password: '', role: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.regEmail.value;
    const password = e.target.regPassword.value;
    setRegisteredUser({ email, password, role: regRole });
    alert(`Akun ${regRole.toUpperCase()} berhasil dibuat! Silakan login.`);
    setPage('login');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    if (email === registeredUser.email && password === registeredUser.password && role === registeredUser.role) {
      setPage(role === 'customer' ? 'market' : 'dashboard');
    } else if (registeredUser.email === '') {
      alert('Email belum terdaftar! Klik "Create an account" dulu.');
    } else {
      alert(`Data salah! Pastikan Email, Password, dan Tab Role (${role.toUpperCase()}) sesuai.`);
    }
  };

  // KONTROL RENDERING HALAMAN YANG JAUH LEBIH BERSIH
  return (
    <>
      {page === 'login' && (
        <Login setPage={setPage} role={role} setRole={setRole} handleSignIn={handleSignIn} kebunImg={kebunImg} />
      )}
      {page === 'register' && (
        <Register setPage={setPage} regRole={regRole} setRegRole={setRegRole} handleRegister={handleRegister} kebunImg={kebunImg} />
      )}
      {page === 'market' && (
        <Market setPage={setPage} registeredUser={registeredUser} setRegisteredUser={setRegisteredUser} />
      )}
      {page === 'dashboard' && (
        <Dashboard setPage={setPage} registeredUser={registeredUser} />
      )}
    </>
  );
}

export default App;