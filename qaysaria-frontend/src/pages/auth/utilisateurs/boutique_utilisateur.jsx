import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone, Star, Instagram, /*Facebook,
  Twitter,*/ MessageCircle, SlidersHorizontal,
  RotateCcw, Package, ShoppingBag, Tag, Ruler, PlusCircle, Loader2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/pages css/boutique_utilisateur.css';

const BoutiqueUtilisateur = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    maxPrice: 5000,
    size: '',
  });
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  // 1. Récupération des produits depuis l'API
  useEffect(() => {
    const fetchBoutiqueProducts = async () => {
      // Correction : Utilisation de user.boutiqueId (depuis ton AuthResponse DTO)
      if (!user?.boutiqueId) {
        console.warn("En attente du boutiqueId de l'utilisateur...");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products/productsboutiques`, {
          params: { boutiqueId: user.boutiqueId }
        });
        
        console.log("Produits récupérés:", response.data);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur API détaillée:", err);
        setError("Impossible de charger les produits de votre boutique.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoutiqueProducts();
  }, [user?.boutiqueId, API_BASE_URL]);

  /* ─── FILTRAGE DES DONNÉES (Adapté au JSON de l'API) ─── */
  const filtered = products.filter(p => {
    // Correction : Utilisation des noms de champs API (p.category, p.price)
    if (filters.category && p.category !== filters.category) return false;
    if (p.price > filters.maxPrice) return false;
    
    // Note: p.tailles est une liste dans ton JSON, on vérifie si la taille choisie est dedans
    if (filters.size && p.tailles && !p.tailles.includes(filters.size)) return false;
    
    return true;
  });

  const handleReset = () =>
    setFilters({ category: '', maxPrice: 5000, size: '' });

  /* ─── ÉTOILES DE NOTATION ─── */
  const Stars = ({ note }) => (
    <div className="bu-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={15}
          strokeWidth={1.5}
          fill={i <= note ? '#EF3B3C' : 'none'}
          color={i <= note ? '#EF3B3C' : '#D1D1D1'}
        />
      ))}
      <span className="bu-stars-text">{note}.0 / 5</span>
    </div>
  );

  // Écran de chargement si le AuthContext n'a pas encore fini
  if (!user) {
    return (
      <div className="bu-loading-full">
        <Loader2 className="animate-spin" size={32} />
        <p>Chargement de votre session...</p>
      </div>
    );
  }

  return (
    <div className="bu-page" dir="ltr" lang="fr">

      {/* ══ HEADER DE LA BOUTIQUE (Infos du User / AuthResponse) ══ */}
      <div className="bu-header">
        <div className="bu-header-inner">
          <div className="bu-profile">
            <div className="bu-avatar-wrap">
              <div className="bu-avatar">
                {user.name ? user.name[0].toUpperCase() : 'B'}
              </div>
              <span className="bu-avatar-badge">✓</span>
            </div>
            <div className="bu-info">
              <h1 className="bu-name">{user.name || "Ma Boutique"}</h1>
              <div className="bu-meta">
                <span className="bu-meta-item">
                  <MapPin size={13} strokeWidth={2} /> {user.city || "Maroc"}
                </span>
                <span className="bu-meta-item">
                  <Phone size={13} strokeWidth={2} /> {user.phoneNumber || "N/A"}
                </span>
              </div>
              <Stars note={4} />
            </div>
          </div>

          <div className="bu-socials">
            {user.phoneNumber && (
              <a href={`https://wa.me/${user.phoneNumber}`} className="bu-social bu-social--wa" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} strokeWidth={2} />
              </a>
            )}
            <a href="https://www.instagram.com" className="bu-social" target="_blank" rel="noopener noreferrer">
              <Instagram size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      <div className="bu-body">
        {/* ── FILTRES — GAUCHE ── */}
        <aside className="bu-filters">
          <div className="bu-filters-top">
            <h3 className="bu-filters-title">
              <SlidersHorizontal size={15} strokeWidth={2} color="#EF3B3C" />
              Filtres
            </h3>
            <button className="bu-filters-reset" onClick={handleReset}>
              <RotateCcw size={11} strokeWidth={2.5} /> Réinitialiser
            </button>
          </div>

          {/* Catégorie */}
          <div className="bu-filter-group">
            <label className="bu-filter-label"><Tag size={13} /> Catégorie</label>
            <div className="bu-filter-options">
              {['', 'Vêtements', 'Accessoires'].map(cat => (
                <button
                  key={cat}
                  className={`bu-filter-chip ${filters.category === cat ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, category: cat }))}
                >
                  {cat || 'Tout'}
                </button>
              ))}
            </div>
          </div>

          {/* Prix */}
          <div className="bu-filter-group">
            <label className="bu-filter-label"><Tag size={13} /> Prix Maximum</label>
            <div className="bu-price-display">
              <span>0 DH</span>
              <span className="bu-price-max">{filters.maxPrice.toLocaleString()} DH</span>
            </div>
            <input
              type="range"
              className="bu-range"
              min="0" max="10000" step="100"
              value={filters.maxPrice}
              onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
            />
          </div>

          {/* Taille */}
          <div className="bu-filter-group">
            <label className="bu-filter-label"><Ruler size={13} /> Taille</label>
            <div className="bu-filter-options bu-filter-options--sizes">
              {['', 'S', 'M', 'L', 'XL'].map(s => (
                <button
                  key={s}
                  className={`bu-size-btn ${filters.size === s ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, size: s }))}
                >
                  {s || 'Tout'}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ── PRODUITS — DROITE ── */}
        <main className="bu-products">
          <div className="bu-products-bar">
            <h2 className="bu-products-title">
              <ShoppingBag size={18} strokeWidth={1.8} /> Nos Produits
            </h2>
            <span className="bu-products-count">
              <strong>{filtered.length}</strong> produit{filtered.length > 1 ? 's' : ''}
            </span>
            <div className="bu-actions">
              <button className="tdb-quick-btn">
                <PlusCircle size={17} strokeWidth={2} /> Ajouter un Produit
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bu-status-container" style={{ padding: '60px', textAlign: 'center' }}>
              <Loader2 className="animate-spin" size={48} color="#EF3B3C" />
              <p style={{ marginTop: '15px', color: '#666' }}>Chargement de votre catalogue...</p>
            </div>
          ) : error ? (
            <div className="bu-empty">
               <Package size={48} strokeWidth={1.2} color="#EF3B3C" />
               <h3>Oups !</h3>
               <p>{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="bu-grid">
              {filtered.map(p => (
                <div key={p.id} className="bu-card">
                  <div className="bu-card-img-wrap">
                    <img 
                      src={p.imageUrl || 'https://via.placeholder.com/400x320?text=Produit'} 
                      alt={p.name} 
                      className="bu-card-img" 
                    />
                  </div>
                  <div className="bu-card-body">
                    <span className="bu-card-cat">{p.category}</span>
                    <h3 className="bu-card-name">{p.name}</h3>
                    <div className="bu-card-footer">
                        <span className="bu-card-price">{p.price} DH</span>
                        {p.tailles && p.tailles.length > 0 && (
                          <span className="bu-card-size">T: {p.tailles.join(', ')}</span>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bu-empty">
              <Package size={48} strokeWidth={1.2} color="#D1D1D1" />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez de modifier les filtres ou ajoutez votre premier produit.</p>
              <button className="bu-empty-btn" onClick={handleReset}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BoutiqueUtilisateur;