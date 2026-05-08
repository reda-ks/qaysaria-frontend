import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Settings, LogOut, HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/composantsCSS/UserDropdown.css';

const UserDropdownAR = () => {
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
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      originX: 0 // Important pour RTL : l'animation part du coin en haut à gauche
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15, ease: 'easeIn' },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 15 }, // Animation de glissement vers la droite pour l'arabe
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
    <div className="user-dropdown-container" ref={dropdownRef} dir="rtl">
      {/* Avatar Button */}
      <button
        className="avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        title={user.shopName || user.name || 'المستخدم'}
      >
        {user.shopPhoto ? (
          <img src={user.shopPhoto} alt="الصورة الشخصية" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {(user.shopName || user.name || 'م')[0].toUpperCase()}
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
            style={{ 
                textAlign: 'right',
                left: 0,      /* Aligné sur le bord gauche du bouton car bouton est à gauche */
                right: 'auto' 
            }}
          >
            {/* User Info */}
            <div className="dropdown-header">
              <div className="dropdown-user-info">
                <p className="dropdown-name">{user.name || 'اسم غير مسجل'}</p>
                <p className="dropdown-email">
                  {user.phoneNumber || '+212 00 00 00 00'} | {user.city || 'مستخدم'}
                </p>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            {/* Menu Items */}
            <nav className="dropdown-nav">
              <motion.div custom={0} variants={itemVariants}>
                <Link to="/tableau-de-bordAR" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <LayoutDashboard size={18} />
                  <span>لوحة التحكم</span>
                </Link>
              </motion.div>

              <motion.div custom={1} variants={itemVariants}>
                <Link to="/boutique-utilisateurAR" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Package size={18} />
                  <span>متجري</span>
                </Link>
              </motion.div>
                            
              <motion.div custom={2} variants={itemVariants}>
                <Link to="/commandesAR" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Package size={18} />
                  <span>الطلبات</span>
                </Link>
              </motion.div>

              <motion.div custom={3} variants={itemVariants}>
                <Link to="/supportAR" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <HeadphonesIcon size={18} />
                  <span>الدعم الفني</span>
                </Link>
              </motion.div>

              <motion.div custom={4} variants={itemVariants}>
                <Link to="/profileAR" onClick={() => setIsOpen(false)} className="dropdown-item">
                  <Settings size={18} />
                  <span>الإعدادات</span>
                </Link>
              </motion.div>
            </nav>

            <div className="dropdown-divider"></div>

            {/* Logout Button */}
            <motion.div custom={5} variants={itemVariants}>
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <LogOut size={18} />
                <span>تسجيل الخروج</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdownAR;