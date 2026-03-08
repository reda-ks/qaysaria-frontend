import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles//pages css/accueil.css';

const Accueil = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      color: '#D9C7B8',
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
      color: '#b0977e',
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
              src="https://images.unsplash.com/photo-1460925895917-adf4e565e479?w=500&h=400&fit=crop"
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