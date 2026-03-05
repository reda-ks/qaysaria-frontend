import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './composants/Header';
import Footer from './composants/Footer';
import Accueil from './pages/accueil/accueil';
import Magasins from './pages/magasins/magasins';
import Contact from './pages/contact/contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/magasins" element={<Magasins />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;