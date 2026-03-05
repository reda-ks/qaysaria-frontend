import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../../styles/pages css/magasins.css';

const Magasins = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorie = searchParams.get('categorie');

  const [filteredCategory, setFilteredCategory] = useState(categorie || '');

  const allShops = [
    {
      id: 1,
      name: 'Boutique Marrakech Style',
      city: 'Marrakech',
      rating: 4.8,
      badge: 'Vérifié',
      category: 'mode-accessoires',
      image:
        'https://images.unsplash.com/photo-1595777707802-221b84ce8dd9?w=400&h=300&fit=crop',
      description: 'Mode et accessoires haut de gamme',
    },
    {
      id: 2,
      name: 'Fès Fashion Hub',
      city: 'Fès',
      rating: 4.9,
      badge: 'Top Vendeur',
      category: 'mode-accessoires',
      image:
        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop',
      description: 'Tendances fashion modernes',
    },
    {
      id: 7,
      name: 'Tech Maroc Casablanca',
      city: 'Casablanca',
      rating: 4.8,
      badge: 'Top Vendeur',
      category: 'electronique-tech',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      description: 'Appareils électroniques premium',
    },
    {
      id: 13,
      name: 'Décor Maroc Premium',
      city: 'Casablanca',
      rating: 4.7,
      badge: 'Vérifié',
      category: 'maison-decoration',
      image:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      description: 'Décoration intérieure et extérieure',
    },
  ];

  const filteredShops = useMemo(() => {
    if (!filteredCategory) return allShops;
    return allShops.filter((shop) => shop.category === filteredCategory);
  }, [filteredCategory]);

  const handleFilter = (category) => {
    setFilteredCategory(filteredCategory === category ? '' : category);
  };

  return (
    <div className="magasins-container">
      <div className="magasins-header">
        <h1 className="magasins-title">Explorez nos Magasins</h1>
        <p className="magasins-subtitle">
          Découvrez les meilleures boutiques du Maroc
        </p>
      </div>

      <div className="magasins-filters">
        <button
          className={`filter-btn ${!filteredCategory ? 'active' : ''}`}
          onClick={() => setFilteredCategory('')}
        >
          Tous
        </button>
        <button
          className={`filter-btn ${filteredCategory === 'mode-accessoires' ? 'active' : ''}`}
          onClick={() => handleFilter('mode-accessoires')}
        >
          Mode & Accessoires
        </button>
        <button
          className={`filter-btn ${filteredCategory === 'electronique-tech' ? 'active' : ''}`}
          onClick={() => handleFilter('electronique-tech')}
        >
          Électronique & Tech
        </button>
        <button
          className={`filter-btn ${filteredCategory === 'maison-decoration' ? 'active' : ''}`}
          onClick={() => handleFilter('maison-decoration')}
        >
          Maison & Décoration
        </button>
      </div>

      {filteredShops.length > 0 ? (
        <div className="magasins-grid">
          {filteredShops.map((shop) => (
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
                <p className="shop-description">{shop.description}</p>
                <div className="shop-meta">
                  <span className="shop-city">{shop.city}</span>
                  <span className="shop-rating">⭐ {shop.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>Aucun magasin trouvé</h3>
          <p>Essayez d'ajuster vos filtres pour voir plus de résultats</p>
        </div>
      )}
    </div>
  );
};

export default Magasins;