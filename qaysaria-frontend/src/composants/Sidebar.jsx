import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/composants css/sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  // Éléments du menu
  const menuItems = [
    {
      label: 'Tableau de Bord',
      path: '/tableau-de-bord',
      icon: '📊',
    },
    {
      label: 'Ma Boutique',
      path: '/boutique-utilisateur',
      icon: '🏪',
    },
    {
      label: 'Commandes',
      path: '/commandes',
      icon: '📦',
    },
    {
      label: 'Support',
      path: '/support',
      icon: '💬',
    },
    {
      label: 'Paramètres',
      path: '/profile',
      icon: '⚙️',
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Bouton toggle mobile */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Header Sidebar */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">🏬</span>
            <span className="logo-text">Qaysaria</span>
          </div>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar">F</div>
          <div className="profile-info">
            <h3>Fatima Benali</h3>
            <p>Qaysaria Luxury</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {isActive(item.path) && <span className="nav-indicator" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Actions Bottom */}
        <div className="sidebar-actions">
          <a href="/" className="action-link">
            <span>🏠</span>
            <span>Retour à l'accueil</span>
          </a>
          <button className="action-link logout">
            <span>🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className="main-content-wrapper">
        {/* Le contenu principal sera inséré ici */}
      </div>
    </>
  );
};

export default Sidebar;
