
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/composantsCSS/composants.css';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import UserDropdown from './UserDropdown';

const Header = ({ currentLang, switchLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isConnected } = useAuth();

  return (
    // ✅ FIX 2 : wrapper position:relative — le mobile-menu (absolute) s'accroche ici
    //           .header reste sticky via la classe CSS, mais c'est ce div qui est
    //           le containing block pour top:100%
    <div className="header-wrapper">
      <header className="header">
        <nav className="navbar">

          <div className="navbar-brand">
            <Link to="/accueil" className="navbar-logo">
              <img src={logo} alt="Qaysaria Logo" className="logo-img" />
              <span>QAYSARIA</span>
            </Link>
          </div>

          <div className="navbar-center">
            <ul className="nav-links">
              <li><Link style={{ fontWeight: 500 }} to="/accueil">Accueil</Link></li>
              <li><Link style={{ fontWeight: 500 }} to="/produits">Produits</Link></li>
              <li><Link style={{ fontWeight: 500 }} to="/tenue-mariage">Tenue de mariage</Link></li>
              <li><Link style={{ fontWeight: 500 }} to="/qui-sommes-nous">Qui Sommes Nous ?</Link></li>
              <li><Link style={{ fontWeight: 500 }} to="/Howitworks">Comment ça marche</Link></li>
              <li><Link style={{ fontWeight: 500 }} to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="navbar-right">
            <div className="lang-switcher">
              <span className={currentLang === 'fr' ? 'active-lang' : ''} onClick={() => switchLang('fr')}>FR</span>
              <span className="separator">|</span>
              <span className={currentLang === 'ar' ? 'active-lang' : ''} onClick={() => switchLang('ar')}>AR</span>
            </div>

            <button className="search-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {isConnected ? (
              <UserDropdown />
            ) : (
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <button className="btn-connexion">Connexion</button>
              </Link>
            )}

            <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </header>

      {/* ✅ FIX 1 : un seul <ul>, plus de doublon */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul className="mobile-links">
            <li><Link style={{ fontWeight: 500 }} to="/accueil"         onClick={() => setMenuOpen(false)}>Accueil</Link></li>
            <li><Link style={{ fontWeight: 500 }} to="/produits"        onClick={() => setMenuOpen(false)}>Produits</Link></li>
            <li><Link style={{ fontWeight: 500 }} to="/tenue-mariage"   onClick={() => setMenuOpen(false)}>Tenue de mariage</Link></li>
            <li><Link style={{ fontWeight: 500 }} to="/qui-sommes-nous" onClick={() => setMenuOpen(false)}>Qui Sommes Nous ?</Link></li>
            <li><Link style={{ fontWeight: 500 }} to="/Howitworks"      onClick={() => setMenuOpen(false)}>Comment ça marche</Link></li>
            <li><Link style={{ fontWeight: 500 }} to="/contact"         onClick={() => setMenuOpen(false)}>Contact</Link></li>
            {!isConnected && (
              <li className="mobile-login">
                <Link to="/login" onClick={() => setMenuOpen(false)}>Connexion</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;