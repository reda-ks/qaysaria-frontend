import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/composantsCSS/composants.css';
import logo from '../assets/logo.png';

const HeaderAR = () => {
  return (
    <header className="header" dir="rtl"> {/* dir="rtl" flips the layout */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/accueil" className="navbar-logo">
            <img src={logo} alt="شعار قيسارية" className="logo-img" />
            <span>قيسارية</span>
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link to="/accueil_ar">الرئيسية</Link></li>
            <li><Link to="/produits">المنتجات</Link></li>
            <li><Link to="/qui-sommes-nous">من نحن؟</Link></li>
            <li><Link to="/Howitworks">كيفية العمل</Link></li>
            <li><Link to="/contact">اتصل بنا</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          {/* Search Button */}
          <button className="search-button" title="بحث">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {/* Connection Button */}
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-connexion">
              تسجيل الدخول
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAR;


