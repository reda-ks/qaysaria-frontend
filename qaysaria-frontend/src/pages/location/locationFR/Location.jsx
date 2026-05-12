import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Star, SlidersHorizontal,
  Heart, Eye, Phone, Zap, ChevronDown,
  ChevronLeft, ChevronRight, X, Check
} from 'lucide-react';
import '../../../styles/pages css/locationFR.css';
import SearchBar from '../../../composants/SearchBar';


/* ════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const PRODUCTS = [
  { id:1,  name:'Takchita Brodée Or & Ivoire',   type:'takchita',  price:3800, city:'casablanca', size:['36','38','40'],       color:'ivoire',    avail:true,  rating:4.9, reviews:38, image:'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop', seller:'Maison Myriam', badge:'Bestseller' },
  { id:2,  name:'Caftan Royal Soie Émeraude',     type:'caftan',    price:4500, city:'fes',         size:['38','40','42'],       color:'emeraude',  avail:true,  rating:4.8, reviews:24, image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=700&fit=crop', seller:'Atelier Fès', badge:'Nouveau' },
  { id:3,  name:'Costume Marié Sellham Beige',    type:'homme',     price:2900, city:'marrakech',   size:['M','L','XL'],         color:'beige',     avail:true,  rating:4.7, reviews:19, image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop', seller:'Dar Haj', badge:null },
  { id:4,  name:'Caftan Velours Bordeaux Chic',   type:'caftan',    price:3200, city:'rabat',        size:['36','38','40','42'],  color:'bordeaux',  avail:false, rating:4.6, reviews:31, image:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=700&fit=crop', seller:'Nadia Couture', badge:'Location' },
  { id:5,  name:'Takchita Perles & Dentelle',     type:'takchita',  price:5200, city:'casablanca',  size:['36','38','40'],       color:'ivoire',    avail:true,  rating:5.0, reviews:47, image:'https://images.unsplash.com/photo-1596862141021-3ed38bca3b9d?w=600&h=700&fit=crop', seller:'Maison Myriam', badge:'Exclusif' },
  { id:6,  name:'Accessoires Ceinture & Diadème', type:'accessory', price:980,  city:'fes',         size:[],                     color:'or',        avail:true,  rating:4.5, reviews:15, image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=700&fit=crop', seller:'Bijoux Saida', badge:null },
  { id:7,  name:'Djellaba Cérémonie Homme',       type:'homme',     price:1800, city:'agadir',      size:['M','L','XL','XXL'],   color:'blanc',     avail:true,  rating:4.6, reviews:12, image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=700&fit=crop', seller:'Tailor Souss', badge:null },
  { id:8,  name:'Caftan Mousseline Verte Nuit',   type:'caftan',    price:2600, city:'tanger',      size:['36','38','40'],       color:'vert',      avail:true,  rating:4.7, reviews:21, image:'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=700&fit=crop', seller:'Boutique Tanger', badge:null },
];

const CATEGORIES = [
  { id:'all',      label:'Tout',              icon:'✦', count:8 },
  { id:'caftan',   label:'Caftans Femme',      icon:'♛', count:3 },
  { id:'takchita', label:'Takchita',            icon:'◆', count:2 },
  { id:'homme',    label:'Costumes Homme',      icon:'♜', count:2 },
  { id:'accessory',label:'Accessoires',         icon:'◇', count:1 },
];

const CITIES    = ['', 'casablanca', 'fes', 'marrakech', 'rabat', 'agadir', 'tanger'];
const CITY_LABELS = { '':'Toutes les villes', casablanca:'Casablanca', fes:'Fès', marrakech:'Marrakech', rabat:'Rabat', agadir:'Agadir', tanger:'Tanger' };
const SIZES     = ['36','38','40','42','M','L','XL','XXL'];
const COLORS    = [
  { id:'ivoire',   hex:'#F5F0E8', label:'Ivoire'   },
  { id:'or',       hex:'#C9A84C', label:'Or'       },
  { id:'bordeaux', hex:'#7B1C2E', label:'Bordeaux' },
  { id:'emeraude', hex:'#2D6A4F', label:'Émeraude' },
  { id:'vert',     hex:'#3D5A3E', label:'Vert'     },
  { id:'blanc',    hex:'#F8F8F8', label:'Blanc'    },
  { id:'beige',    hex:'#D7C4A3', label:'Beige'    },
];

const TESTIMONIALS = [
  { id:1, name:'Khadija Bennani',   city:'Casablanca', rating:5, text:'J\'ai trouvé ma takchita de rêve en 10 minutes ! Le service est exceptionnel et les vendeurs sont très professionnels.', avatar:'K' },
  { id:2, name:'Fatima Zohra',      city:'Marrakech',  rating:5, text:'Magnifique sélection de caftans. J\'ai pu comparer plusieurs modèles et trouver exactement ce qu\'il me fallait.', avatar:'F' },
  { id:3, name:'Youssef El Amrani', city:'Rabat',      rating:5, text:'Pour le costume de mon mariage, c\'était parfait. Rapide, efficace et de très bonne qualité. Je recommande vivement.', avatar:'Y' },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const  Location = () => {
  const navigate = useNavigate();

  /* State */
  const [searchVal,   setSearchVal]   = useState('');
  const [activeCity,  setActiveCity]  = useState('');
  const [activeCat,   setActiveCat]   = useState('all');
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [liked,       setLiked]       = useState(new Set());
  const [page,        setPage]        = useState(1);
  const [selectedSize,  setSelectedSize]  = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [maxPrice,      setMaxPrice]      = useState(6000);
  const [searchQuery, setSearchQuery] = useState('');
  

  const PER_PAGE = 6;

  const filtered = useMemo(() => PRODUCTS.filter(p => {
    if (activeCat !== 'all' && p.type !== activeCat) return false;
    if (activeCity && p.city !== activeCity) return false;
    if (selectedSize && !p.size.includes(selectedSize)) return false;
    if (selectedColor && p.color !== selectedColor) return false;
    if (p.price > maxPrice) return false;
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.type.includes(q) && !p.city.includes(q)) return false;
    }
    return true;
  }), [activeCat, activeCity, selectedSize, selectedColor, maxPrice, searchVal]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const toggleLike  = (id) => setLiked(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const resetFilters = () => { setSelectedSize(''); setSelectedColor(''); setMaxPrice(6000); setActiveCity(''); setActiveCat('all'); setSearchVal(''); };
  const hasFilters   = selectedSize || selectedColor || maxPrice < 6000 || activeCity || activeCat !== 'all' || searchVal;

  const handleContact = (p) => {
    const msg = encodeURIComponent(`Bonjour ! Je suis intéressé(e) par :\n✨ ${p.name}\n💰 ${p.price.toLocaleString('fr-MA')} MAD\n📍 ${CITY_LABELS[p.city]}\n\nPouvez-vous me donner plus d'informations ?`);
    window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
  };

  return (
    <div className="qw-page">

      {/* ══ HERO ══ */}
      <section className="qw-hero">
        <div className="qw-hero-overlay" />
        <div className="qw-hero-inner">
          <span className="qw-hero-label">✦ Mariage & Événements au Maroc</span>
          <h1 className="qw-hero-title">
            Trouvez Votre Caftan<br />
            <span className="qw-hero-accent">de Mariage Idéal</span>
            <br />en Quelques Minutes
          </h1>
          <p className="qw-hero-sub">
            Découvrez des caftans et takchitas élégants près de chez vous.
            <br />Plus besoin de chercher des heures — votre tenue de rêve est ici.
          </p>

          {/* Search bar */}
          <div className="produits-search-wrap">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

          
        </div>
      </section>

      {/* ══ URGENT NEED ══ */}
      <section className="qw-urgent">
        <div className="qw-urgent-inner">
          <div className="qw-urgent-left">
            <Zap size={22} strokeWidth={2} />
            <div>
              <strong>Mariage Urgent ?</strong>
              <span>Tenue disponible sous 24h dans votre ville</span>
            </div>
          </div>
          <button className="qw-urgent-btn" onClick={() => handleContact(PRODUCTS[0])}>
            <WhatsAppIcon />
            Contactez-nous maintenant
          </button>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section className="qw-cats-section">
        <div className="qw-container">
          <div className="qw-cats-scroll">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`qw-cat-btn ${activeCat === cat.id ? 'active' : ''}`}
                onClick={() => { setActiveCat(cat.id); setPage(1); }}
              >
                <span className="qw-cat-icon">{cat.icon}</span>
                <span className="qw-cat-label">{cat.label}</span>
                <span className="qw-cat-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT: Filters + Grid ══ */}
      <section className="qw-main-section">
        <div className="qw-container">

          {/* Toolbar */}
          <div className="qw-toolbar">
            <div className="qw-toolbar-left">
              <span className="qw-results-count">
                <strong>{filtered.length}</strong> tenue{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
              </span>
              {hasFilters && (
                <button className="qw-reset-btn" onClick={resetFilters}>
                  <X size={12} strokeWidth={2.5} /> Effacer filtres
                </button>
              )}
            </div>
            <button className={`qw-filter-toggle ${filterOpen ? 'active' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
              <SlidersHorizontal size={15} strokeWidth={2} />
              Filtres
              {hasFilters && <span className="qw-filter-dot" />}
            </button>
          </div>

          {/* Filter panel */}
          {filterOpen && (
            <div className="qw-filter-panel">

              {/* Price */}
              <div className="qw-filter-group">
                <p className="qw-filter-label">Prix max : <strong>{maxPrice.toLocaleString('fr-MA')} MAD</strong></p>
                <input type="range" min="500" max="6000" step="100" value={maxPrice}
                  onChange={e => { setMaxPrice(+e.target.value); setPage(1); }}
                  className="qw-range" />
                <div className="qw-range-labels"><span>500 MAD</span><span>6 000 MAD</span></div>
              </div>

              {/* Size */}
              <div className="qw-filter-group">
                <p className="qw-filter-label">Taille</p>
                <div className="qw-size-grid">
                  {SIZES.map(s => (
                    <button key={s} className={`qw-size-btn ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => { setSelectedSize(selectedSize === s ? '' : s); setPage(1); }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="qw-filter-group">
                <p className="qw-filter-label">Couleur</p>
                <div className="qw-color-row">
                  {COLORS.map(c => (
                    <button key={c.id} title={c.label}
                      className={`qw-color-btn ${selectedColor === c.id ? 'active' : ''}`}
                      onClick={() => { setSelectedColor(selectedColor === c.id ? '' : c.id); setPage(1); }}>
                      <span className="qw-color-dot" style={{ background: c.hex, border: c.id === 'blanc' || c.id === 'ivoire' ? '1.5px solid #ccc' : 'none' }} />
                      {selectedColor === c.id && <Check size={10} strokeWidth={3} color="#fff" className="qw-color-check" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="qw-grid">
              {paginated.map((p, i) => (
                <article key={p.id} className="qw-card" style={{ animationDelay: `${i * 0.07}s` }}>

                  {/* Image */}
                  <div className="qw-card-img-wrap">
                    <img src={p.image} alt={p.name} className="qw-card-img" loading="lazy" />
                    {/* Badges */}
                    {p.badge && <span className="qw-badge">{p.badge}</span>}
                    {!p.avail && <span className="qw-badge qw-badge--sold">Indisponible</span>}
                    {/* Like */}
                    <button className={`qw-like-btn ${liked.has(p.id) ? 'liked' : ''}`} onClick={() => toggleLike(p.id)}>
                      <Heart size={15} strokeWidth={2} fill={liked.has(p.id) ? '#C9A84C' : 'none'} color={liked.has(p.id) ? '#C9A84C' : '#fff'} />
                    </button>
                    {/* Overlay */}
                    <div className="qw-card-overlay">
                      <button className="qw-overlay-btn" onClick={() => handleContact(p)}>
                        <Eye size={14} strokeWidth={2} /> Voir détails
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="qw-card-body">
                    <div className="qw-card-meta">
                      <span className="qw-card-seller">{p.seller}</span>
                      <span className="qw-card-city"><MapPin size={11} strokeWidth={2} />{CITY_LABELS[p.city]}</span>
                    </div>
                    <h3 className="qw-card-name">{p.name}</h3>
                    <div className="qw-card-rating">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={11} strokeWidth={1.5}
                          fill={i <= Math.round(p.rating) ? '#C9A84C' : 'none'}
                          color={i <= Math.round(p.rating) ? '#C9A84C' : '#D1D1D1'} />
                      ))}
                      <span>({p.reviews})</span>
                    </div>
                    <div className="qw-card-footer">
                      <div className="qw-card-price">
                        {p.price.toLocaleString('fr-MA')} <small>MAD</small>
                      </div>
                      <button
                        className={`qw-contact-btn ${!p.avail ? 'disabled' : ''}`}
                        disabled={!p.avail}
                        onClick={() => handleContact(p)}
                      >
                        <WhatsAppIcon />
                        {p.avail ? 'Réserver' : 'Indispo'}
                      </button>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          ) : (
            <div className="qw-empty">
              <div className="qw-empty-icon">✦</div>
              <h3>Aucune tenue trouvée</h3>
              <p>Essayez d'élargir vos critères de recherche ou de changer la ville.</p>
              <button className="qw-empty-btn" onClick={resetFilters}>Réinitialiser les filtres</button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="qw-pagination">
              <button className="qw-page-btn" disabled={page === 1} onClick={() => setPage(p => p-1)}>
                <ChevronLeft size={15} strokeWidth={2.5} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map(n => (
                <button key={n} className={`qw-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="qw-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p+1)}>
                <ChevronRight size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="qw-testimonials">
        <div className="qw-container">
          <div className="qw-section-head">
            <span className="qw-section-tag">✦ Témoignages</span>
            <h2 className="qw-section-title">Elles ont trouvé leur tenue de rêve</h2>
          </div>
          <div className="qw-testi-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="qw-testi-card">
                <div className="qw-testi-stars">
                  {[1,2,3,4,5].map(i => <Star key={i} size={13} strokeWidth={1.5} fill="#C9A84C" color="#C9A84C" />)}
                </div>
                <p className="qw-testi-text">"{t.text}"</p>
                <div className="qw-testi-author">
                  <div className="qw-testi-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="qw-cta-section">
        <div className="qw-cta-inner">
          <span className="qw-cta-badge">✦ Mariage au Maroc</span>
          <h2 className="qw-cta-title">Votre tenue de mariage vous attend</h2>
          <p className="qw-cta-sub">
            Parcourez des centaines de caftans et takchitas sélectionnés par nos experts.
            <br />Trouvez la tenue parfaite pour votre grand jour.
          </p>
          <div className="qw-cta-btns">
            <button className="qw-cta-btn-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Explorer les tenues
            </button>
            <button className="qw-cta-btn-secondary" onClick={() => navigate('/register')}>
              Devenir vendeur
            </button>
          </div>
        </div>
      </section>

    </div>

  );
};
export default Location;
