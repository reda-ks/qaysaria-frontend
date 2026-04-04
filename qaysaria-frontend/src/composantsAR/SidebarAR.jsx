import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Store, ShoppingBag,
  HeadphonesIcon, Settings, Home, LogOut,
  Menu, X, ChevronLeft
} from 'lucide-react';
import '../styles/composantsCSS/sidebar_ar.css';

const MENU_AR = [
  { label: 'لوحة التحكم',  path: '/tableau-de-bord',     Icon: LayoutDashboard },
  { label: 'متجري',         path: '/boutique-utilisateur', Icon: Store           },
  { label: 'الطلبات',       path: '/commandes',            Icon: ShoppingBag     },
  { label: 'الدعم',         path: '/support',              Icon: HeadphonesIcon  },
  { label: 'الإعدادات',     path: '/profile',              Icon: Settings        },
];

const SidebarAR = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleNav = () => {
    if (window.innerWidth <= 768) setIsOpen(false);
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      {/* ── زر الهامبرغر موبايل ── */}
      <button
        className="sbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="فتح القائمة"
      >
        <Menu size={20} strokeWidth={2} />
      </button>

      {/* ── طبقة الخلفية موبايل ── */}
      <div
        className={`sbar-overlay ${isOpen ? 'sbar-overlay--open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* ══ الشريط الجانبي ══ */}
      <aside className={`sbar ${isOpen ? 'sbar--open' : ''}`} dir="rtl">

        {/* ── العلامة التجارية ── */}
        <div className="sbar-header">
          <div className="sbar-brand">
            <div className="sbar-brand-icon">ق</div>
            <span className="sbar-brand-name">قيصرية</span>
          </div>
          <button className="sbar-close" onClick={() => setIsOpen(false)}>
            <X size={17} strokeWidth={2} />
          </button>
        </div>

        {/* ── بطاقة الملف الشخصي ── */}
        <div className="sbar-profile">
          <div className="sbar-avatar">ف</div>
          <div className="sbar-profile-info">
            <strong>فاطمة بنعلي</strong>
            <span>قيصرية لوكس</span>
          </div>
          <span className="sbar-online" title="متصل" />
        </div>

        {/* ── التنقل ── */}
        <nav className="sbar-nav">
          <p className="sbar-nav-label">القائمة</p>
          <ul className="sbar-list">
            {MENU_AR.map(({ label, path, Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`sbar-link ${isActive(path) ? 'sbar-link--active' : ''}`}
                  onClick={handleNav}
                  aria-current={isActive(path) ? 'page' : undefined}
                >
                  {isActive(path) && (
                    <ChevronLeft size={13} strokeWidth={2.5} className="sbar-arrow" />
                  )}
                  <span className="sbar-link-label">{label}</span>
                  <span className="sbar-link-icon">
                    <Icon size={18} strokeWidth={isActive(path) ? 2.2 : 1.8} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sbar-spacer" />

        {/* ── الأزرار السفلية ── */}
        <div className="sbar-bottom">
          <div className="sbar-divider" />
          <Link to="/الرئيسية" className="sbar-action" onClick={handleNav}>
            <span>العودة للرئيسية</span>
            <Home size={15} strokeWidth={1.8} />
          </Link>
          <button className="sbar-action sbar-action--logout" onClick={handleLogout}>
            <span>تسجيل الخروج</span>
            <LogOut size={15} strokeWidth={1.8} />
          </button>
        </div>

      </aside>
    </>
  );
};

export default SidebarAR;