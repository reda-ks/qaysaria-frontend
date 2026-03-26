import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/composantsCSS/sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // ← Changed: Default to closed on mobile
  const location = useLocation();

  // Menu items
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

  // Close sidebar when navigating on mobile
  const handleNavClick = () => {
    // Close sidebar only on mobile (max-width: 768px)
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay - Always rendered, hidden by default via CSS */}
      {/* ← Changed: Always render, CSS handles display based on 'open' class */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
        role="presentation"
      />

      {/* Sidebar */}
      <aside 
        className={`sidebar ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
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
                  onClick={handleNavClick}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {isActive(item.path) && (
                    <span className="nav-indicator" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div className="sidebar-divider" />

        {/* Actions Bottom */}
        <div className="sidebar-actions">
          <a 
            href="/" 
            className="action-link"
            onClick={handleNavClick}
          >
            <span aria-hidden="true">🏠</span>
            <span>Retour à l'accueil</span>
          </a>
          <button 
            className="action-link logout"
            onClick={(e) => {
              e.preventDefault();
              // Add logout logic here
              setIsOpen(false);
              // Example: logout and redirect
              // navigate('/login');
            }}
          >
            <span aria-hidden="true">🚪</span>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;