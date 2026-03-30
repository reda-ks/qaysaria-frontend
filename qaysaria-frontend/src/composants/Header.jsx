
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/composants css/composants.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
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
            <li><Link to="/accueil">Accueil</Link></li>
            <li><Link to="/produits">Produits</Link></li>
            <li><Link to="/qui-sommes-nous">Qui Sommes Nous?</Link></li>
            <li><Link to="/Howitworks">Comment ça marche</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
          <button className="search-button" title="Rechercher">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button className="btn-connexion">
              Connexion
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
