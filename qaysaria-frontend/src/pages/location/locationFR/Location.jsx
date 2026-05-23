import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/pages css/locationFR.css';
import SearchBar from '../../../composants/SearchBar';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */


const products = [
  {
    id: 1,
    name: 'Robe Princesse Ivoire',
    category: 'Robe de Mariée',
    price: '1 200',
    duration: '3 jours',
    badge: 'Coup de cœur',
    badgeType: 'favorite',
    emoji: '👗',
    available: true,
  },
  {
    id: 2,
    name: 'Takchita Brodée Or',
    category: 'Traditionnel',
    price: '800',
    duration: '3 jours',
    badge: 'Exclusif',
    badgeType: 'exclusive',
    emoji: '✨',
    available: true,
  },
  {
    id: 3,
    name: 'Smoking Noir Classique',
    category: 'Costume Homme',
    price: '600',
    duration: '3 jours',
    badge: null,
    badgeType: null,
    emoji: '🤵',
    available: true,
  },
  {
    id: 4,
    name: 'Caftan Cerise Brodé',
    category: 'Traditionnel',
    price: '950',
    duration: '3 jours',
    badge: 'Nouveau',
    badgeType: 'new',
    emoji: '🌸',
    available: true,
  },
  {
    id: 5,
    name: 'Robe Sirène Dentelle',
    category: 'Robe de Mariée',
    price: '1 400',
    duration: '3 jours',
    badge: 'Premium',
    badgeType: 'premium',
    emoji: '💎',
    available: false,
  },
  {
    id: 6,
    name: 'Ensemble Demoiselle Rose',
    category: 'Demoiselles',
    price: '450',
    duration: '3 jours',
    badge: null,
    badgeType: null,
    emoji: '💐',
    available: true,
  },
];
const steps = [
  {
    num: '01',
    title: 'Choisissez votre tenue',
    desc: 'Parcourez notre catalogue et sélectionnez la tenue qui vous correspond.',
    icon: '',
  },
  {
    num: '02',
    title: 'Réservez en ligne',
    desc: 'Choisissez vos dates et confirmez votre réservation en quelques clics.',
    icon: '',
  },
  {
    num: '03',
    title: 'Essayage & retouches',
    desc: 'Venez en boutique pour l\'essayage et les ajustements personnalisés.',
    icon: '',
  },
  {
    num: '04',
    title: 'Profitez de votre journée',
    desc: 'Rayonnez le jour J, puis retournez simplement la tenue après.',
    icon: '',
  },
];
/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}
/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={`tm-animate ${visible ? 'tm-animate--in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const TenueMariage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
const [hoveredProduct, setHoveredProduct] = useState(null);
const [visibleCount, setVisibleCount] = useState(4); // nombre initial de produits visibles

const filters = ['Tous', 'Robe de Mariée', 'Traditionnel', 'Costume Homme', 'Demoiselles'];
const filtered = activeFilter === 'Tous'
  ? products
  : products.filter(p => p.category === activeFilter);
const visibleProducts = filtered.slice(0, visibleCount);
  return (
    <main className="tm-page">

      {/* ── HERO ── */}
     <div className="location-hero">
        <div className="location-hero-inner">
          <span className="location-hero-tag">🇲🇦 Collection Mariage</span>
          <h1 className="location-hero-title">Tenues de Mariage à la Location</h1>
        </div>
      </div>

      <div className="location-search-wrap">
        <SearchBar className="searchbar-btn" value={searchQuery} onChange={setSearchQuery} />
      </div>
      {/* ── PRODUCTS GRID ── */}
      <section className="tm-section">
        <div className="tm-container">
          <AnimatedSection>
            <div className="tm-section-head">
              <span className="tm-section-head__tag">Notre Sélection</span>
              <h2 className="tm-section-head__title">Tenues disponibles <em>à la location</em></h2>
            </div>
          </AnimatedSection>
          {/* Filters */}
          <AnimatedSection delay={100}>
            <div className="tm-filters">
              {filters.map(f => (
                <button
                  key={f}
                  className={`tm-filter-btn ${activeFilter === f ? 'tm-filter-btn--active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </AnimatedSection>
          {/* Grid */} 
          <div className="tm-products">
          {visibleProducts.map((product, i) => (
               <AnimatedSection key={product.id} delay={i * 60}>
                <div
                  className={`tm-product-card ${!product.available ? 'tm-product-card--unavailable' : ''}`}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {product.badge && (
                    <span className={`tm-product-card__badge tm-product-card__badge--${product.badgeType}`}>
                      {product.badge}
                    </span>
                  )}
                  {!product.available && (
                    <div className="tm-product-card__unavailable-overlay">
                      <span>Indisponible</span>
                    </div>
                  )}
                  <div className="tm-product-card__visual">
                    <span className="tm-product-card__emoji">{product.emoji}</span>
                  </div>
                  <div className="tm-product-card__body">
                    <span className="tm-product-card__cat">{product.category}</span>
                    <h3 className="tm-product-card__name">{product.name}</h3>
                    <div className="tm-product-card__meta">
                      <div className="tm-product-card__price">
                        <span className="tm-product-card__price-num">{product.price} DH</span>
                        <span className="tm-product-card__price-label">/{product.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`tm-product-card__actions ${hoveredProduct === product.id ? 'tm-product-card__actions--visible' : ''}`}>
                    <button className="tm-btn tm-btn--primary tm-btn--sm" disabled={!product.available}>
                      {product.available ? 'Réserver' : 'Indisponible'}
                    </button>
                    <button className="tm-btn tm-btn--outline tm-btn--sm">
                      Détails
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={200}>
          <div className="tm-products-footer">
            {visibleCount < filtered.length && (
              <button
                className="tm-btn tm-btn--primary"
                onClick={() => setVisibleCount(prev => prev + 3)} // affiche 3 produits de plus
              >
                Voir plus de tenues
              </button>
            )}
          </div>
        </AnimatedSection>

        </div>
      </section>

     {/* ── HOW IT WORKS ── */}
      <section className="tm-section tm-how">
        <div className="tm-container">
          <AnimatedSection>
            <div className="tm-section-head">
              <span className="tm-section-head__tag">Comment ça marche</span>
              <h2 className="tm-section-head__title">
                Réservez votre tenue en 4 étapes simples
              </h2>
            </div>
          </AnimatedSection>
          <div className="tm-steps">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 100}>
                <div className="tm-step-card">
                  <span className="tm-step-card__num">{step.num}</span>
                  <span className="tm-step-card__icon">{step.icon}</span>
                  <h3 className="tm-step-card__title">{step.title}</h3>
                  <p className="tm-step-card__desc">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
{/* ── CTA FINAL ── */}
      <section className="tm-section tm-cta">
        <div className="tm-container">
          <AnimatedSection>
            <h2 className="tm-cta__title">
              Choisissez la tenue qui vous correspond pour votre mariage ✨
            </h2>
            <p className="tm-cta__subtitle">
              Réservez dès aujourd’hui et profitez d’un service complet : essayage, retouches et accompagnement personnalisé.
            </p>
            <div className="tm-cta__actions">
              <Link to="/produits" className="tm-btn tm-btn--primary">
                Explorer le catalogue
              </Link>
              <Link to="/كيف-يعمل" className="tm-btn tm-btn--ghost">
                En savoir plus
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};
export default TenueMariage;