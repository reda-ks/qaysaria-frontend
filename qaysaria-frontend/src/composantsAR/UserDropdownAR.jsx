import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Package, Settings, LogOut, HeadphonesIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Ajout de useNavigate ici
import { useAuth } from '../context/AuthContext';
import '../styles/composantsCSS/UserDropdown.css';

const UserDropdownAR = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // 1. Initialisation de navigate
  const navigate = useNavigate(); 

  // 2. Définition de isRTL (pour le fichier Arabe, c'est true par défaut)
  //const isRTL = true; 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // 3. Fonction handleLogout avec redirection
  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      // Redirection vers l'accueil Arabe
      navigate('/الرئيسية'); 
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10, originX: 0 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  };

  if (!user) return null;

  return (
    <div className="user-dropdown-container" ref={dropdownRef} dir="rtl">
      <button className="avatar-btn" onClick={() => setIsOpen(!isOpen)}>
        {user.shopPhoto ? (
          <img src={user.shopPhoto} alt="Avatar" className="avatar-img" />
        ) : (
          <div className="avatar-placeholder">
            {(user.shopName || user.name || 'م')[0].toUpperCase()}
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
            style={{ textAlign: 'right', left: 0, right: 'auto' }}
          >
            <div className="dropdown-header">
              <div className="dropdown-user-info">
                <p className="dropdown-name">{user.name || 'اسم غير مسجل'}</p>
                <p className="dropdown-email">{user.phoneNumber  || '+212 000 000'}</p>
              </div>
            </div>

            <div className="dropdown-divider"></div>

            <nav className="dropdown-nav">
              <Link to="/tableau-de-bordAR" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={18} />
                <span>لوحة التحكم</span>
              </Link>
              <Link to="/boutique-utilisateurAR" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Package size={18} />
                <span>متجري</span>
              </Link>
              <Link to="/commandesAR" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Package size={18} />
                <span>الطلبات</span>
              </Link>
              <Link to="/supportAR" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <HeadphonesIcon size={18} />
                <span>الدعم الفني</span>
              </Link>
              <Link to="/profileAR" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Settings size={18} />
                <span>الإعدادات</span>
              </Link>
            </nav>

            <div className="dropdown-divider"></div>

            <button onClick={handleLogout} className="dropdown-item logout-btn">
              <LogOut size={18} />
              <span>تسجيل الخروج</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdownAR;