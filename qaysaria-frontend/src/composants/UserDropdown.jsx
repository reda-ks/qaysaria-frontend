import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Settings, LogOut, HeadphonesIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Correction : ajout de useNavigate
import { useAuth } from '../context/AuthContext';
import '../styles/composantsCSS/UserDropdown.css';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 1. Initialisation du hook navigate
  const navigate = useNavigate(); 

  // 2. Détection de la direction (LTR pour le français)
  const isRTL = document.body.dir === 'rtl';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 3. Fonction handleLogout avec redirection vers l'accueil
  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      
      // Redirection après déconnexion
      if (isRTL) {
        navigate('/الرئيسية'); 
      } else {
        navigate('/'); // Ou '/accueil' selon votre route
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      originX: isRTL ? 0 : 1 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.15 } 
    },
  };

  if (!user) return null;

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <button className="avatar-btn" onClick={() => setIsOpen(!isOpen)}>
        {user.shopPhoto ? (
          <img src={user.shopPhoto} alt="Avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {(user.shopName || user.name || 'U')[0].toUpperCase()}
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              right: isRTL ? 'auto' : 0, 
              left: isRTL ? 0 : 'auto' 
            }}
          >
            <div className="dropdown-header">
              <div className="dropdown-user-info" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                <p className="dropdown-name">{user.name || 'Utilisateur'}</p>
                <p className="dropdown-email">{user.phoneNumber || '+212 000 000'}</p>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <nav className="dropdown-nav">
              <Link to="/tableau-de-bord" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={18} />
                <span>Tableau de bord</span>
              </Link>
              <Link to="/boutique-utilisateur" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Package size={18} />
                <span>Ma Boutique</span>
              </Link>
              <Link to="/commandes" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Package size={18} />
                <span>Commandes</span>
              </Link>
              <Link to="/support" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <HeadphonesIcon size={18} />
                <span>Support</span>
              </Link>
              <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Settings size={18} />
                <span>Paramètres</span>
              </Link>
            </nav>

            <div className="dropdown-divider"></div>

            <button onClick={handleLogout} className="dropdown-item logout-btn">
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;