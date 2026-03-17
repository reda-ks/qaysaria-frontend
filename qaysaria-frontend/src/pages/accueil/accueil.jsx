import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles//pages css/accueil.css';
import logo from '../../assets/logo.png';

const Accueil = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Color Palette System


  const handleExplorer = () => {
    navigate('/produits');
  };

  const handleSubscription = () => {
    navigate('/register');
  }

  const handleConnexion = () => {
    navigate('/login');
  }

  const handleDevenir = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const stats = [
    { number: '12+', label: 'Villes' },
    { number: '500+', label: 'Boutiques' },
    { number: '15k', label: 'Produits' },
    { number: '98%', label: 'Satisfaits' },
    { number: 'CMI', label: 'Accrédité' },
    { number: '24/7', label: 'Support' },
  ];

  const categories = [
    {
      title: 'Mode & Accessoires',
      color: '#6B7177',
      shops: [
        {
          id: 1,
          name: 'Boutique Marrakech Style',
          city: 'Marrakech',
          rating: 4.8,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1595777707802-221b84ce8dd9?w=400&h=300&fit=crop',
        },
        {
          id: 2,
          name: 'Fès Fashion Hub',
          city: 'Fès',
          rating: 4.9,
          badge: 'Top Vendeur',
          image:
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop',
        },
        {
          id: 3,
          name: 'Casablanca Luxe',
          city: 'Casablanca',
          rating: 4.7,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        },
        {
          id: 4,
          name: 'Agadir Chic',
          city: 'Agadir',
          rating: 4.6,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1490481651971-daf3fba3d554?w=400&h=300&fit=crop',
        },
        {
          id: 5,
          name: 'Rabat Couture',
          city: 'Rabat',
          rating: 4.5,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1515626212432-5e6c7f0a3e1c?w=400&h=300&fit=crop',
        },
        {
          id: 6,
          name: 'Tanger Premium',
          city: 'Tanger',
          rating: 4.9,
          badge: 'Top Vendeur',
          image:
            'https://images.unsplash.com/photo-1441984904556-0ac8d3d96e02?w=400&h=300&fit=crop',
        },
      ],
    },
    {
      title: 'Électronique & Tech',
      color: '#6B7177',
      shops: [
        {
          id: 7,
          name: 'Tech Maroc Casablanca',
          city: 'Casablanca',
          rating: 4.8,
          badge: 'Top Vendeur',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
        },
        {
          id: 8,
          name: 'ElectroShop Fès',
          city: 'Fès',
          rating: 4.7,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1498049794561-7780e6b1b330?w=400&h=300&fit=crop',
        },
        {
          id: 9,
          name: 'Smart Devices Rabat',
          city: 'Rabat',
          rating: 4.6,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
        },
        {
          id: 10,
          name: 'Digital Hub Tanger',
          city: 'Tanger',
          rating: 4.9,
          badge: 'Top Vendeur',
          image:
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        },
        {
          id: 11,
          name: 'MoroccoTech Marrakech',
          city: 'Marrakech',
          rating: 4.5,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
        },
        {
          id: 12,
          name: 'Agadir Electronics',
          city: 'Agadir',
          rating: 4.8,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1517694712202-e9f1b1a7e1d6?w=400&h=300&fit=crop',
        },
      ],
    },
    {
      title: 'Maison & Décoration',
      color: '#8c7260',
      shops: [
        {
          id: 13,
          name: 'Décor Maroc Premium',
          city: 'Casablanca',
          rating: 4.7,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
        },
        {
          id: 14,
          name: 'Home & Living Fès',
          city: 'Fès',
          rating: 4.9,
          badge: 'Top Vendeur',
          image:
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
        },
        {
          id: 15,
          name: 'Interior Design Rabat',
          city: 'Rabat',
          rating: 4.6,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
        },
        {
          id: 16,
          name: 'Maison Chic Tanger',
          city: 'Tanger',
          rating: 4.8,
          badge: 'Top Vendeur',
          image:
            'https://images.unsplash.com/photo-1543198126-cbf4411108d7?w=400&h=300&fit=crop',
        },
        {
          id: 17,
          name: 'Décoration Marrakech',
          city: 'Marrakech',
          rating: 4.5,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1556909405-2a2e12b24ef6?w=400&h=300&fit=crop',
        },
        {
          id: 18,
          name: 'Agadir Home Solutions',
          city: 'Agadir',
          rating: 4.7,
          badge: 'Vérifié',
          image:
            'https://images.unsplash.com/photo-1555041470-a3fe6bc67e26?w=400&h=300&fit=crop',
        },
      ],
    },
  ];

  return (
    <>
      {/* Color Palette Display Section */}
      <section className="color-palette-section" style={{ display: 'none' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '40px', color: '#212326', textAlign: 'center', fontSize: '2rem', fontWeight: '800' }}>
            Design System - Color Palette
          </h2>
          <p style={{ textAlign: 'center', marginBottom: '50px', color: '#6B7177', fontSize: '1.1rem' }}>
            Distribution: 70% White, 20% Gray tones, 8% Dark Gray, 2% Red accent
          </p>
          
          <div className="color-palette-grid">
            {/* Primary / Neutral Colors */}
            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E1E3E5' }}></div>
              <div className="color-name">White</div>
              <div className="color-hex">#FFFFFF</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7177', marginTop: '8px' }}>Main Background (70%)</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#F4F6F8' }}></div>
              <div className="color-name">Light Gray</div>
              <div className="color-hex">#F4F6F8</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7177', marginTop: '8px' }}>Section Backgrounds</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#E1E3E5' }}></div>
              <div className="color-name">Soft Gray</div>
              <div className="color-hex">#E1E3E5</div>
              <div style={{ fontSize: '0.85rem', color: '#6B7177', marginTop: '8px' }}>Borders & Dividers (20%)</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#6B7177' }}></div>
              <div className="color-name">Medium Gray</div>
              <div className="color-hex">#6B7177</div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>Secondary Text (20%)</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#212326' }}></div>
              <div className="color-name">Dark Gray</div>
              <div className="color-hex">#212326</div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>Main Text (8%)</div>
            </div>

            {/* Accent Color */}
            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#E63946' }}></div>
              <div className="color-name">Soft Red</div>
              <div className="color-hex">#E63946</div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>Accent Only (2%)</div>
            </div>

            {/* Status Colors */}
            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#2E7D32' }}></div>
              <div className="color-name">Success Green</div>
              <div className="color-hex">#2E7D32</div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>Success Status</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#F9A825' }}></div>
              <div className="color-name">Warning Orange</div>
              <div className="color-hex">#F9A825</div>
              <div style={{ fontSize: '0.85rem', color: '#212326', marginTop: '8px' }}>Warning Status</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#D32F2F' }}></div>
              <div className="color-name">Error Red</div>
              <div className="color-hex">#D32F2F</div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>Error Status</div>
            </div>

            <div className="color-block">
              <div className="color-sample" style={{ backgroundColor: '#1E88E5' }}></div>
              <div className="color-name">Info Blue</div>
              <div className="color-hex">#1E88E5</div>
              <div style={{ fontSize: '0.85rem', color: '#FFFFFF', marginTop: '8px' }}>Info Status</div>
            </div>
          </div>

          {/* Button Examples */}
          <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #E1E3E5' }}>
            <h3 style={{ marginBottom: '25px', color: '#212326', fontSize: '1.5rem', fontWeight: '700' }}>Button System</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div>
                <button style={{
                  background: '#212326',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}>Primary Button</button>
                <div style={{ fontSize: '0.85rem', color: '#6B7177' }}>#212326</div>
              </div>
              <div>
                <button style={{
                  background: '#FFFFFF',
                  color: '#212326',
                  padding: '12px 24px',
                  border: '2px solid #E1E3E5',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}>Secondary Button</button>
                <div style={{ fontSize: '0.85rem', color: '#6B7177' }}>#FFFFFF</div>
              </div>
              <div>
                <button style={{
                  background: '#E63946',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}>Accent Button (Rare)</button>
                <div style={{ fontSize: '0.85rem', color: '#6B7177' }}>#E63946</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-left">
            <span className="hero-tag">🇲🇦 Plateforme digitale nationale</span>
            <h1 className="hero-title">
              Découvrez le <span className="highlight">Maroc</span> en ligne
            </h1>
            <p className="hero-description">
              Connectez-vous à des milliers de boutiques vérifiées du Maroc.
              Achetez en confiance, soutenez local.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={handleExplorer}>
                Explorer les produits
              </button>
              <button className="btn btn-outline" onClick={handleDevenir}>
                Devenir commerçant
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
            <img
              src={logo}
              alt="Hero"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        {categories.map((category, catIndex) => (
          <div key={catIndex} className="category-block">
            <div className="category-header">
              <div>
                <div
                  className="category-label"
                  style={{ backgroundColor: category.color }}
                >
                  NOUVEAUTÉS
                </div>
                <h2 className="category-title">{category.title}</h2>
              </div>
              <Link
                to={`/magasins?categorie=${category.title
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className="category-link"
              >
                Voir tout →
              </Link>
            </div>
            <div className="shops-grid">
              {category.shops.map((shop) => (
                <div key={shop.id} className="shop-card">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="shop-image"
                    />
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
          <button className="modal-close" onClick={closeModal}>
            ✕
          </button>
          <h2 className="modal-title">Rejoignez QAISARYA</h2>
          <p className="modal-text">
            Devenez commerçant et développez votre business en ligne. Connectez-vous ou
            créez un compte pour commencer.
          </p>
          <div className="modal-buttons">
            <button className="btn btn-primary" onClick={handleConnexion}>Se connecter</button>
            <button className="btn btn-outline" onClick={handleSubscription}>S'inscrire</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accueil;