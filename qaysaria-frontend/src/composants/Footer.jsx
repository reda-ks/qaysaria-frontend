import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/composantsCSS/composants.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Column 1: Brand */}
        <div className="footer-column">
          <h3 className="footer-title">QAYSARIA</h3>
          <p className="footer-description">
            La plateforme de commerce électronique marocaine qui connecte des millions d'acheteurs avec des vendeurs vérifiés du Maroc.
          </p>
          <div className="social-links">
            <a href="/" className="social-icon" title="Facebook">f</a>
            <a href="/" className="social-icon" title="Twitter">𝕏</a>
            <a href="/" className="social-icon" title="Instagram">📷</a>
            <a href="/" className="social-icon" title="LinkedIn">in</a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-column">
          <h4 className="footer-subtitle">Navigation</h4>
          <ul className="footer-links">
             <li><Link to="/accueil">Accueil</Link></li>
             <li><Link to="/produits">Produits</Link></li>
             <li><Link to="/qui-sommes-nous">Qui Sommes Nous?</Link></li>
             <li><Link to="/Howitworks">Comment ça marche</Link></li>
             <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-column">
          <h4 className="footer-subtitle">Catégories</h4>
          <ul className="footer-links">
            <li><a href="#mode">Mode & Accessoires</a></li>
            <li><a href="#tech">Électronique & Tech</a></li>
            <li><a href="#maison">Maison & Décoration</a></li>
            <li><a href="#boutiques">Toutes les Boutiques</a></li>
          </ul>
        </div>

        {/* Column 4: Legal & Support */}
        <div className="footer-column">
          <h4 className="footer-subtitle">Assistance</h4>
          <ul className="footer-links">
            <li><a href="#help">Centre d'aide</a></li>
            <li><a href="#terms">Conditions d'utilisation</a></li>
            <li><a href="#privacy">Politique de confidentialité</a></li>
            <li><a href="#contact">Support Client</a></li>
          </ul>
        </div>

        {/* Column 5: Info */}
        <div className="footer-column">
          <h4 className="footer-subtitle">À Propos</h4>
          <ul className="footer-links">
            <li><a href="#about">À Propos de nous</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#careers">Carrières</a></li>
            <li><a href="#partnership">Partenaires</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-info">
          <p>
            Casablanca, Maroc • Téléphone: <a href="tel:+212612345678">+212 6 12 34 56 78</a> • Email: <a href="mailto:support@qaysaria.com">support@qaysaria.com</a>
          </p>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} QAYSARIA. Tous droits réservés. 🇲🇦</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
