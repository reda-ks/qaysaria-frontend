import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/composantsCSS/composants.css';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import UserDropdown from './UserDropdownAR';

const HeaderAR = ({ currentLang, switchLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isConnected } = useAuth();

  return (
    <header className="header" dir="rtl" style={{ padding: '-10px' ,height: '75px' }}>
      <nav className="navbar">

        <div className="navbar-brand">
          <Link to="/الرئيسية" className="navbar-logo" style={{  margin: 0,padding: 0}}>
            <img src={logo} alt="شعار قيسارية" className="logo-img" />
            <span>قيسارية</span>
          </Link>
        </div>

        <div className="navbar-center" style={{ padding: '-10px' }}>
          <ul className="nav-links" style={{ fontSize: '16px', margin: 0,padding: 0,listStyle: 'none'}}>
            <li><Link style={{ fontWeight: 700 ,fontSize: "17px" ,}} to="/الرئيسية">الرئيسية</Link></li>
            <li><Link style={{ fontWeight: 700 ,fontSize: "17px" ,}} to="/منتجات">المنتجات</Link></li>
            <li><Link style={{ fontWeight: 700 ,fontSize: "17px" ,}} to="/من-نحن">من نحن؟</Link></li>
            <li><Link style={{ fontWeight: 700 ,fontSize: "17px" ,}} to="/كيف-يعمل">كيفية العمل</Link></li>
            <li><Link style={{ fontWeight: 700 ,fontSize: "17px" ,}} to="/اتصل-بنا">اتصل بنا</Link></li>
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
            <svg width="20" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

<<<<<<< HEAD
          <Link to="/تسجيل-الدخول" style={{ textDecoration: 'none'  }} >
            <button className="btn-connexion" style={{ padding:"10px 20px"  }} >تسجيل الدخول</button>
          </Link>
=======
          {isConnected ? (
            <UserDropdown />
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button className="btn-connexion">تسجيل الدخول</button>
            </Link>
          )}
>>>>>>> frontt-saad-branch

          {/* ── Hamburger (mobile only) ── */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── Mobile menu RTL ── */}
      {menuOpen && (
        <div className="mobile-menu mobile-menu--rtl">
<<<<<<< HEAD
          <ul className="mobile-links" style={{ fontSize: '16px', margin: 0,padding: 0,listStyle: 'none'}}>
            <li  ><Link to="/الرئيسية" onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 ,fontSize: "17px" ,}} >الرئيسية</Link></li>
            <li ><Link to="/منتجات"   onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 ,fontSize: "17px" ,}} >المنتجات</Link></li>
            <li ><Link to="/من-نحن"   onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 ,fontSize: "17px" ,}} >من نحن؟</Link></li>
            <li ><Link to="/كيف-يعمل" onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 ,fontSize: "17px" ,}} >كيفية العمل</Link></li>
            <li ><Link to="/اتصل-بنا" onClick={() => setMenuOpen(false)} style={{ fontWeight: 700 ,fontSize: "17px" ,}} >اتصل بنا</Link></li>
           <li className="mobile-login">
              <Link to="/login" onClick={() => setMenuOpen(false)}>تسجيل الدخول</Link>
            </li>
=======
          <ul className="mobile-links">
            <li><Link to="/الرئيسية" onClick={() => setMenuOpen(false)}>الرئيسية</Link></li>
            <li><Link to="/منتجات"   onClick={() => setMenuOpen(false)}>المنتجات</Link></li>
            <li><Link to="/من-نحن"   onClick={() => setMenuOpen(false)}>من نحن؟</Link></li>
            <li><Link to="/كيف-يعمل" onClick={() => setMenuOpen(false)}>كيفية العمل</Link></li>
            <li><Link to="/اتصل-بنا" onClick={() => setMenuOpen(false)}>اتصل بنا</Link></li>
            {!isConnected && (
              <li className="mobile-login">
                <Link to="/login" onClick={() => setMenuOpen(false)}>تسجيل الدخول</Link>
              </li>
            )}
>>>>>>> frontt-saad-branch
          </ul>
        </div>
      )}
    </header>
  );
};

export default HeaderAR;