import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/composantsCSS/UserDropdown.css';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fermer le menu au clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.85, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      y: -10,
      transition: { duration: 0.15, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.15 },
    }),
  };

  if (!user) {
    return null;
  }

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        className="avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={user.shopName || user.name || 'Utilisateur'}
      >
        {user.shopPhoto ? (
          <img src={user.shopPhoto} alt="Avatar du magasin" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {(user.shopName || user.name || 'U')[0].toUpperCase()}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* User Info */}
            <div className="dropdown-header">
              <div className="dropdown-user-info">
                <p className="dropdown-name">{}</p>{user.name || 'Nom non renseigné'}
                <p className="dropdown-email">{user.phoneNumber || '+212 00 00 00 00'} | {user.city || /*user.name ||*/ 'Utilisateur'}</p>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            {/* Menu Items */}
            <nav className="dropdown-nav">
              <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
                <Link to="/tableau-de-bord" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <LayoutDashboard size={18} />
                  <span>Tableau de bord</span>
                </Link>
              </motion.div>

              <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
                <Link to="/boutique-utilisateur" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Package size={18} />
                  <span>Ma Boutique</span>
                </Link>
              </motion.div>
                            
              <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
                <Link to="/commandes" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Package size={18} />
                  <span>Commandes</span>
                </Link>
              </motion.div>
              <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
                <Link to="/support" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Package size={18} />
                  <span>Support</span>
                </Link>
              </motion.div>
              <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible">
                <Link to="/profile" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Settings size={18} />
                  <span>Paramètres</span>
                </Link>
              </motion.div>



            </nav>

            <div className="dropdown-divider"></div>

            {/* Logout Button */}
            <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
