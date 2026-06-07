import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MapPin, Star, ShieldCheck, Truck, RotateCcw,
  ChevronLeft, ArrowLeft, Share2, Heart
} from 'lucide-react';
import '../../../styles/pages css/detailleProduit_fr.css';

/* ════════════════════════════════════════════════════════
   CONSTANTES
═══════════════════════════════════════════════════════════ */
const BENEFITS = [
  { Icon: ShieldCheck, label: 'Boutique vérifiée & certifiée'  },
  { Icon: Truck,       label: 'Livraison partout au Maroc'      },
  { Icon: RotateCcw,   label: 'Retour gratuit sous 30 jours'    },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */

/**
 * Normalise un produit venant de l'API pour avoir
 * des champs uniformes dans tout le composant.
 */
const normalizeProduct = (p) => ({
  id:           p.id,
  name:         p.name         || p.nom         || '',
  description:  p.description  || '',
  price:        Number(p.price || p.prix)        || 0,
  imageUrl:     p.imageUrl     || p.images?.[0]  || '',
  // Plusieurs images : on préfère imageUrls[], sinon images[], sinon [imageUrl]
  images:       p.imageUrls    || p.images       || (p.imageUrl ? [p.imageUrl] : []),
  categoryName: p.category?.name || p.categoryName || p.category || '',
  categoryId:   p.category?.id   || p.categoryId   || null,
  city:         p.city         || p.nom_ville    || '',
  brand:        p.brand        || p.marque       || '',
  // tailles peut être un tableau ou une chaîne CSV
  tailles:      Array.isArray(p.tailles)
                  ? p.tailles
                  : (p.tailles ? String(p.tailles).split(',').map(s => s.trim()) : []),
  stock:        p.stock        ?? null,
  audience:     p.audience     || '',
});

/* ════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════════════════════════ */
const ProduitDetail = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  /* ── State produit principal ── */
  const [product,     setProduct]     = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  /* ── State produits similaires ── */
  const [similar,     setSimilar]     = useState([]);
  const [loadingSim,  setLoadingSim]  = useState(false);

  /* ── State UI ── */
  const [activeImg,    setActiveImg]    = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [liked,        setLiked]        = useState(false);

  /* ── Fetch produit principal ── */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        setProduct(null);
        setActiveImg(0);
        setSelectedSize('');

        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        const normalized = normalizeProduct(response.data);
        setProduct(normalized);
      } catch (err) {
        console.error('Erreur chargement produit:', err);
        setError(
          err.response?.status === 404
            ? 'Produit introuvable.'
            : err.response?.status === 500
              ? 'Erreur serveur (500).'
              : 'Connexion au serveur impossible.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_BASE_URL]);

  /* ── Fetch produits similaires dès qu'on a la catégorie ── */
  useEffect(() => {
    if (!product?.categoryId && !product?.categoryName) return;

    const fetchSimilar = async () => {
      try {
        setLoadingSim(true);

        let url;
        if (product.categoryId) {
          url = `${API_BASE_URL}/products/filtercategory?categoryId=${product.categoryId}`;
        } else {
          // Fallback si seul le nom de catégorie est disponible
          url = `${API_BASE_URL}/products/all`;
        }

        const response = await axios.get(url);
        const all = Array.isArray(response.data) ? response.data : [];

        const normalized = all
          .map(normalizeProduct)
          // Exclure le produit courant
          .filter(p => String(p.id) !== String(product.id))
          // Si fallback (all), filtrer par nom de catégorie
          .filter(p =>
            product.categoryId
              ? true
              : p.categoryName?.toLowerCase() === product.categoryName?.toLowerCase()
          )
          .slice(0, 4);

        setSimilar(normalized);
      } catch (err) {
        console.error('Erreur produits similaires:', err);
        setSimilar([]);
      } finally {
        setLoadingSim(false);
      }
    };

    fetchSimilar();
  }, [product?.categoryId, product?.categoryName, product?.id, API_BASE_URL]);

  /* ════════════════════════════════════════════════════════
     HANDLERS
  ════════════════════════════════════════════════════════ */
  const handleWhatsApp = (p = product) => {
    if (!p) return;
    const size = selectedSize ? `\n📐 Taille : ${selectedSize}` : '';
    const msg  = encodeURIComponent(
      `Bonjour ! Je suis intéressé(e) par :\n\n🛍️ *${p.name}*\n💰 Prix : ${p.price.toLocaleString('fr-MA')} MAD\n📍 ${p.city}${size}\n\nPouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/212771887412?text=${msg}`, '_blank');
  };

  const handleSimilarClick = (simId) => {
    navigate(`/produit/${simId}`);
    window.scrollTo(0, 0);
  };

  /* ════════════════════════════════════════════════════════
     ÉTATS DE RENDU
  ════════════════════════════════════════════════════════ */
  if (loading) {
    return (
      <div className="pd-not-found">
        <h2>Chargement du produit...</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pd-not-found">
        <h2>{error || 'Produit introuvable'}</h2>
        <button className="pd-back-btn" onClick={() => navigate('/produits')}>
          <ArrowLeft size={16} /> Retour aux produits
        </button>
      </div>
    );
  }

  /* Images : garantit toujours un tableau non vide */
  const images = product.images?.length
    ? product.images
    : product.imageUrl
      ? [product.imageUrl]
      : ['https://via.placeholder.com/800x600'];

  /* ════════════════════════════════════════════════════════
     RENDU
  ════════════════════════════════════════════════════════ */
  return (
    <div className="pd-page">

      {/* ── Fil d'Ariane ── */}
      <nav className="pd-breadcrumb">
        <button onClick={() => navigate('/produits')}>Produits</button>
        <ChevronLeft size={13} strokeWidth={2} className="pd-bc-sep" />
        <span>{product.categoryName || 'Catégorie'}</span>
        <ChevronLeft size={13} strokeWidth={2} className="pd-bc-sep" />
        <span className="pd-bc-current">{product.name}</span>
      </nav>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — Galerie + Détails
      ════════════════════════════════════════════════════════ */}
      <section className="pd-section-1">

        {/* ── Galerie ── */}
        <div className="pd-gallery">
          <div className="pd-main-img-wrap">
            <img
              src={images[activeImg] || images[0]}
              alt={product.name}
              className="pd-main-img"
            />
            <button
              className={`pd-heart-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
              title="Ajouter aux favoris"
            >
              <Heart
                size={18}
                strokeWidth={2}
                fill={liked ? '#EF3B3C' : 'none'}
                color={liked ? '#EF3B3C' : '#888'}
              />
            </button>
            <button className="pd-share-btn" title="Partager">
              <Share2 size={16} strokeWidth={2} color="#888" />
            </button>
          </div>

          {images.length > 1 && (
            <div className="pd-thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`Vue ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Détails produit ── */}
        <div className="pd-details">

          <span className="pd-category-tag">
            {product.categoryName || 'Général'}
          </span>

          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-meta-row">
            <div className="pd-stars">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={14} strokeWidth={1.5}
                  fill={i <= 4 ? '#EF3B3C' : 'none'}
                  color={i <= 4 ? '#EF3B3C' : '#D1D1D1'}
                />
              ))}
              <span>(4.0)</span>
            </div>
            {product.city && (
              <span className="pd-location">
                <MapPin size={13} strokeWidth={2} />
                {product.city}
              </span>
            )}
            {product.brand && (
              <span className="pd-brand">🏷️ {product.brand}</span>
            )}
          </div>

          <div className="pd-price-wrap">
            <span className="pd-price">
              {product.price.toLocaleString('fr-MA')}
              <small> MAD</small>
            </span>
          </div>

          {product.description && (
            <p className="pd-description">{product.description}</p>
          )}

          {/* Stock */}
          {product.stock !== null && (
            <p className="pd-stock" style={{ fontSize: '0.85rem', color: product.stock > 0 ? '#16a34a' : '#dc2626' }}>
              {product.stock > 0 ? `✅ En stock (${product.stock} disponibles)` : '❌ Rupture de stock'}
            </p>
          )}

          {/* Tailles */}
          {product.tailles.length > 0 && (
            <div className="pd-sizes-section">
              <p className="pd-sizes-label">
                Taille
                {selectedSize && <span className="pd-selected-size"> : {selectedSize}</span>}
              </p>
              <div className="pd-sizes-grid">
                {product.tailles.map(t => (
                  <button
                    key={t}
                    className={`pd-size-btn ${selectedSize === t ? 'active' : ''}`}
                    onClick={() => setSelectedSize(selectedSize === t ? '' : t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pd-cta">
            <button className="pd-wa-btn" onClick={() => handleWhatsApp()}>
              <WhatsAppIcon />
              Commander via WhatsApp
            </button>
            <button className="pd-wa-btn-outline" onClick={() => handleWhatsApp()}>
              💬 Renseignement
            </button>
          </div>

          {/* Garanties */}
          <div className="pd-benefits">
            {BENEFITS.map(({ Icon, label }) => (
              <div key={label} className="pd-benefit-item">
                <Icon size={16} strokeWidth={1.8} color="#EF3B3C" />
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — Produits similaires
      ════════════════════════════════════════════════════════ */}
      {(loadingSim || similar.length > 0) && (
        <section className="pd-section-2">
          <div className="pd-similar-header">
            <div>
              <h2 className="pd-similar-title">Produits Similaires</h2>
              <p className="pd-similar-sub">Vous pourriez aussi aimer de la même catégorie</p>
            </div>
            <button className="pd-similar-link" onClick={() => navigate('/produits')}>
              Voir tout
              <ArrowLeft size={14} strokeWidth={2.5} className="pd-arrow-icon" />
            </button>
          </div>

          {loadingSim ? (
            <p style={{ padding: '1rem', color: '#888' }}>Chargement des suggestions...</p>
          ) : (
            <div className="pd-similar-grid">
              {similar.map(p => (
                <div
                  key={p.id}
                  className="pd-sim-card"
                  onClick={() => handleSimilarClick(p.id)}
                >
                  <div className="pd-sim-img-wrap">
                    <img
                      src={p.imageUrl || p.images?.[0] || 'https://via.placeholder.com/400x500'}
                      alt={p.name}
                      className="pd-sim-img"
                    />
                    <div className="pd-sim-overlay">
                      <button
                        className="pd-sim-wa-btn"
                        onClick={e => { e.stopPropagation(); handleWhatsApp(p); }}
                      >
                        <WhatsAppIcon /> Commander
                      </button>
                    </div>
                  </div>
                  <div className="pd-sim-body">
                    <span className="pd-sim-cat">{p.categoryName || 'Général'}</span>
                    <h3 className="pd-sim-name">{p.name}</h3>
                    <div className="pd-sim-footer">
                      <span className="pd-sim-price">
                        {p.price.toLocaleString('fr-MA')} <small>MAD</small>
                      </span>
                      {p.city && (
                        <span className="pd-sim-ville">
                          <MapPin size={11} strokeWidth={2} />
                          {p.city}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

    </div>
  );
};

export default ProduitDetail;