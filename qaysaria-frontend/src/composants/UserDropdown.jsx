import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Settings, LogOut, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/composantsCSS/UserDropdown.css';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Détection de la direction pour l'alignement
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

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
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
      {/* Bouton Avatar */}
      <button
        className="avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.shopPhoto ? (
          <img src={user.shopPhoto} alt="Avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {(user.shopName || user.name || 'U')[0].toUpperCase()}
          </div>
        )}
      </button>

      {/* Menu Déroulant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-menu"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            /* Aligne à gauche si Arabe (RTL), à droite si Français (LTR) */
            style={{ 
                left: isRTL ? 0 : 'auto', 
                right: isRTL ? 'auto' : 0 
            }}
          >
            <div className="dropdown-header">
              <div className="dropdown-user-info">
                <p className="dropdown-name">{user.name || (isRTL ? 'اسم غير مسجل' : 'Nom inconnu')}</p>
                <p className="dropdown-email">
                  {user.phoneNumber || '+212 00 00 00 00'} | {user.city || (isRTL ? 'مستخدم' : 'Utilisateur')}
                </p>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <nav className="dropdown-nav">
              {[
                { to: isRTL ? "/tableau-de-bordAR" : "/tableau-de-bord", icon: <LayoutDashboard size={18} />, label: isRTL ? "لوحة التحكم" : "Tableau de bord" },
                { to: isRTL ? "/boutique-utilisateurAR" : "/boutique-utilisateur", icon: <Package size={18} />, label: isRTL ? "متجري" : "Ma Boutique" },
                { to: isRTL ? "/commandesAR" : "/commandes", icon: <Package size={18} />, label: isRTL ? "الطلبات" : "Commandes" },
                { to: isRTL ? "/supportAR" : "/support", icon: <HeadphonesIcon size={18} />, label: isRTL ? "الدعم" : "Support" },
                { to: isRTL ? "/profileAR" : "/profile", icon: <Settings size={18} />, label: isRTL ? "الإعدادات" : "Paramètres" },
              ].map((item, i) => (
                <Link key={i} to={item.to} onClick={() => setIsOpen(false)} className="dropdown-item">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="dropdown-divider"></div>

            <button onClick={handleLogout} className="dropdown-item logout-btn">
              <LogOut size={18} />
              <span>{isRTL ? "تسجيل الخروج" : "Déconnexion"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;