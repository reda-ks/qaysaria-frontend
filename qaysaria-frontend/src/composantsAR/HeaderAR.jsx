import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/composantsCSS/composants.css';
import logo from '../assets/logo.png';

const HeaderAR = ({ currentLang, switchLang }) => {
  return (
    <header className="header" dir="rtl">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/الرئيسية" className="navbar-logo">
            <img src={logo} alt="شعار قيسارية" className="logo-img" />
            <span>قيسارية</span>
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link to="/الرئيسية">الرئيسية</Link></li>
            <li><Link to="/منتجات">المنتجات</Link></li>
            <li><Link to="/من-نحن">من نحن؟</Link></li>
            <li><Link to="/كيف-يعمل">كيفية العمل</Link></li>
            <li><Link to="/اتصل-بنا">اتصل بنا</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="lang-switcher">
            <span 
              className={currentLang === 'fr' ? 'active-lang' : ''} 
              onClick={() => switchLang('fr')}
            >FR</span>
            <span className="separator">|</span>
            <span 
              className={currentLang === 'ar' ? 'active-lang' : ''} 
              onClick={() => switchLang('ar')}
            >AR</span>
          </div>
          <button className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-connexion">تسجيل الدخول</button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAR;