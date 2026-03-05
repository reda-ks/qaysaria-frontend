import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/composants css/composants.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/accueil" className="navbar-logo">
            QAYSARIA
          </Link>
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link to="/accueil">Accueil</Link></li>
            <li><Link to="/magasins">Magasins</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="navbar-right">
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
