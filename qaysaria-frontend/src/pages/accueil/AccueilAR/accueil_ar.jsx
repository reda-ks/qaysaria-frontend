import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/pages css/accueil.css';
import logo from '../../../assets/logo.png';

const AccueilAR = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // // Color Palette System (Restant inchangé)
  // const colorPalette = {
  //   neutral: {
  //     white: '#FFFFFF',
  //     lightGray: '#F4F6F8',
  //     softGray: '#E1E3E5',
  //     mediumGray: '#6B7177',
  //     darkGray: '#212326',
  //   },
  //   accent: {
  //     softRed: '#E63946',
  //   },
  //   buttons: {
  //     primary: '#212326',
  //     secondary: '#FFFFFF',
  //     accent: '#E63946',
  //   },
  // };

  const handleExplorer = () => navigate('/produits');
  const handleSubscription = () => navigate('/register');
  const handleConnexion = () => navigate('/login');
  const handleDevenir = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const stats = [
    { number: '+12', label: 'مدينة' },
    { number: '+500', label: 'متجر' },
    { number: '15k', label: 'منتج' },
    { number: '98%', label: 'رضا الزبناء' },
    { number: 'CMI', label: 'معتمد' },
    { number: '24/7', label: 'دعم فني' },
  ];

  const categories = [
    {
      title: 'الموضة والإكسسوارات',
      color: '#6B7177',
      shops: [
        { id: 1, name: 'متجر مراكش ستايل', city: 'مراكش', rating: 4.8, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1595777707802-221b84ce8dd9?w=400&h=300&fit=crop' },
        { id: 2, name: 'فاس فاشن هاب', city: 'فاس', rating: 4.9, badge: 'أفضل بائع', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop' },
        { id: 3, name: 'الدار البيضاء لوكس', city: 'الدار البيضاء', rating: 4.7, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
        { id: 4, name: 'أكادير شيك', city: 'أكادير', rating: 4.6, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1490481651971-daf3fba3d554?w=400&h=300&fit=crop' },
        { id: 5, name: 'الرباط كوتير', city: 'الرباط', rating: 4.5, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1515626212432-5e6c7f0a3e1c?w=400&h=300&fit=crop' },
        { id: 6, name: 'طنجة بريميوم', city: 'طنجة', rating: 4.9, badge: 'أفضل بائع', image: 'https://images.unsplash.com/photo-1441984904556-0ac8d3d96e02?w=400&h=300&fit=crop' },
      ],
    },
    {
      title: 'الإلكترونيات والتكنولوجيا',
      color: '#6B7177',
      shops: [
        { id: 7, name: 'تيك ماروك كازابلانكا', city: 'الدار البيضاء', rating: 4.8, badge: 'أفضل بائع', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
        { id: 8, name: 'إلكترو شوب فاس', city: 'فاس', rating: 4.7, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1498049794561-7780e6b1b330?w=400&h=300&fit=crop' },
        { id: 9, name: 'سمارت ديفايس الرباط', city: 'الرباط', rating: 4.6, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop' },
        { id: 10, name: 'ديجيتال هاب طنجة', city: 'طنجة', rating: 4.9, badge: 'أفضل بائع', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop' },
        { id: 11, name: 'موروكو تيك مراكش', city: 'مراكش', rating: 4.5, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop' },
        { id: 12, name: 'أكادير إلكترونيكس', city: 'أكادير', rating: 4.8, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1517694712202-e9f1b1a7e1d6?w=400&h=300&fit=crop' },
      ],
    },
    {
      title: 'المنزل والديكور',
      color: '#8c7260',
      shops: [
        { id: 13, name: 'ديكور ماروك بريميوم', city: 'الدار البيضاء', rating: 4.7, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
        { id: 14, name: 'هوم آند ليفينج فاس', city: 'فاس', rating: 4.9, badge: 'أفضل بائع', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
        { id: 15, name: 'إنتيريور ديزاين الرباط', city: 'الرباط', rating: 4.6, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop' },
        { id: 16, name: 'ميزون شيك طنجة', city: 'طنجة', rating: 4.8, badge: 'أفضل بائع', image: 'https://images.unsplash.com/photo-1543198126-cbf4411108d7?w=400&h=300&fit=crop' },
        { id: 17, name: 'ديكوراسيون مراكش', city: 'مراكش', rating: 4.5, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1556909405-2a2e12b24ef6?w=400&h=300&fit=crop' },
        { id: 18, name: 'أكادير هوم سوليوشنز', city: 'أكادير', rating: 4.7, badge: 'موثوق', image: 'https://images.unsplash.com/photo-1555041470-a3fe6bc67e26?w=400&h=300&fit=crop' },
      ],
    },
  ];

  return (
    <div dir="rtl" className="arabic-page-wrapper"> {/* Add dir="rtl" for proper Arabic layout */}
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-tag">🇲🇦 منصة رقمية وطنية</span>
            <h1 className="hero-title">
              اكتشف <span className="highlight">المغرب</span> عبر الإنترنت
            </h1>
            <p className="hero-description">
              تواصل مع آلاف المتاجر الموثوقة في المغرب.
              تسوق بكل طمأنينة ودعم المنتوج المحلي.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleExplorer}>
                تصفح المنتجات
              </button>
              <button className="btn btn-outline" onClick={handleDevenir}>
                كن شريكاً معنا
              </button>
            </div>

            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-right">
            <img src={logo} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="category-block">
            <div className="category-header">
              <div>
                <div className="category-label" style={{ backgroundColor: category.color }}>
                  وصل حديثاً
                </div>
                <h2 className="category-title">{category.title}</h2>
              </div>
              <Link to={`/magasins?categorie=${category.title}`} className="category-link">
                عرض الكل ←
              </Link>
            </div>
            <div className="shops-grid">
              {category.shops.map((shop) => (
                <div key={shop.id} className="shop-card">
                  <div style={{ position: 'relative' }}>
                    <img src={shop.image} alt={shop.name} className="shop-image" />
                    <span className="shop-badge">{shop.badge}</span>
                  </div>
                  <div className="shop-content">
                    <h3 className="shop-name">{shop.name}</h3>
                    <div className="shop-meta">
                      <span className="shop-city">{shop.city}</span>
                      <span className="shop-rating">⭐ {shop.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'show' : 'hidden'}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>✕</button>
          <h2 className="modal-title">انضم إلى قيسارية</h2>
          <p className="modal-text">
            ابدأ تجارتك وقم بتطوير أعمالك عبر الإنترنت. قم بتسجيل الدخول أو إنشاء حساب للبدء.
          </p>
          <div className="modal-buttons">
            <button className="btn btn-primary" onClick={handleConnexion}>تسجيل الدخول</button>
            <button className="btn btn-outline" onClick={handleSubscription}>إنشاء حساب</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccueilAR;