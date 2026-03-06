import React, { useState } from 'react';
import '../../../styles/pages css/boutique_utilisateur.css';

const BoutiqueUtilisateur = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 500],
    size: '',
  });

  // Données fictives de la boutique
  const boutique = {
    nom: 'Qaysaria Luxury',
    photo: 'https://via.placeholder.com/120',
    localisation: 'Casablanca',
    telephone: '+212 6 12 34 56 78',
    note: 4,
    reseaux: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      whatsapp: 'https://whatsapp.com',
    },
  };

  // Produits fictifs
  const produits = [
    { id: 1, nom: 'Robe Élégante', categorie: 'Vêtements', prix: 299, taille: 'M', image: 'https://via.placeholder.com/200' },
    { id: 2, nom: 'Sac Luxe', categorie: 'Accessoires', prix: 450, taille: '', image: 'https://via.placeholder.com/200' },
    { id: 3, nom: 'Chemise Premium', categorie: 'Vêtements', prix: 189, taille: 'L', image: 'https://via.placeholder.com/200' },
    { id: 4, nom: 'Bijoux Dorés', categorie: 'Accessoires', prix: 120, taille: '', image: 'https://via.placeholder.com/200' },
    { id: 5, nom: 'Pantalon Classique', categorie: 'Vêtements', prix: 199, taille: 'M', image: 'https://via.placeholder.com/200' },
    { id: 6, nom: 'Ceinture en Cuir', categorie: 'Accessoires', prix: 99, taille: '', image: 'https://via.placeholder.com/200' },
    { id: 7, nom: 'Veste Chic', categorie: 'Vêtements', prix: 399, taille: 'S', image: 'https://via.placeholder.com/200' },
    { id: 8, nom: 'Montre Élégante', categorie: 'Accessoires', prix: 350, taille: '', image: 'https://via.placeholder.com/200' },
  ];

  // Filtrer les produits
  const produitsFiltres = produits.filter((produit) => {
    if (filters.category && produit.categorie !== filters.category) return false;
    if (produit.prix < filters.priceRange[0] || produit.prix > filters.priceRange[1]) return false;
    if (filters.size && produit.taille && produit.taille !== filters.size) return false;
    return true;
  });

  const renderStars = (note) => {
    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`star ${i < note ? 'filled' : 'empty'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="boutique-container">
      {/* Header Boutique */}
      <div className="boutique-header">
        <div className="boutique-header-content">
          <img src={boutique.photo} alt={boutique.nom} className="profile-photo" />
          <div className="boutique-info">
            <h1 className="boutique-nom">{boutique.nom}</h1>
            <div className="boutique-meta">
              <div className="location">
                <span className="icon">📍</span>
                <span>{boutique.localisation}</span>
              </div>
              <div className="phone">
                <span className="icon">📞</span>
                <span>{boutique.telephone}</span>
              </div>
            </div>
            <div className="boutique-rating">
              {renderStars(boutique.note)}
              <span className="note-text">{boutique.note}.0/5</span>
            </div>
          </div>
        </div>

        {/* Réseaux Sociaux */}
        <div className="social-networks">
          <a href={boutique.reseaux.instagram} target="_blank" rel="noopener noreferrer" className="social-btn instagram">
            📷
          </a>
          <a href={boutique.reseaux.facebook} target="_blank" rel="noopener noreferrer" className="social-btn facebook">
            f
          </a>
          <a href={boutique.reseaux.twitter} target="_blank" rel="noopener noreferrer" className="social-btn twitter">
            𝕏
          </a>
          <a href={boutique.reseaux.whatsapp} target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
            💬
          </a>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="boutique-body">
        {/* Barre de Filtres */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3 className="filter-title">Trier par</h3>
            
            <div className="filter-item">
              <label>Catégorie</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Toutes</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Accessoires">Accessoires</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Plage de Prix</label>
              <input
                type="range"
                min="0"
                max="500"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])
                }
              />
              <div className="price-display">0 DH - {filters.priceRange[1]} DH</div>
            </div>

            <div className="filter-item">
              <label>Taille</label>
              <select
                value={filters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
              >
                <option value="">Toutes</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Grille de Produits */}
        <main className="products-section">
          <div className="products-header">
            <h2>Nos Produits</h2>
            <span className="product-count">{produitsFiltres.length} produits</span>
          </div>

          {produitsFiltres.length > 0 ? (
            <div className="products-grid">
              {produitsFiltres.map((produit) => (
                <div key={produit.id} className="product-card">
                  <div className="product-image">
                    <img src={produit.image} alt={produit.nom} />
                    <div className="product-overlay">
                      <button className="btn-add-cart">Ajouter au panier</button>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{produit.nom}</h3>
                    <p className="product-category">{produit.categorie}</p>
                    {produit.taille && <p className="product-size">Taille: {produit.taille}</p>}
                    <p className="product-price">{produit.prix} DH</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>Aucun produit ne correspond à vos critères.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BoutiqueUtilisateur;
