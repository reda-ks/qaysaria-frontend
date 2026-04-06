import React, { useState } from 'react';
import {
  MapPin, Phone, Star, Instagram, Facebook,
  Twitter, MessageCircle, SlidersHorizontal,
  RotateCcw, Package, ShoppingBag, Tag, Ruler,PlusCircle
} from 'lucide-react';
import '../../../styles/pages css/boutique_utilisateur.css';

const BoutiqueUtilisateur = () => {
  const [filters, setFilters] = useState({
    category: '',
    maxPrice: 5000,
    size: '',
  });

  /* ─── بيانات البوتيك ─── */
  const boutique = {
    nom: 'قيصرية لوكس',
    localisation: 'الدار البيضاء',
    telephone: '+212 6 12 34 56 78',
    note: 4,
    reseaux: {
      instagram: 'https://instagram.com',
      facebook:  'https://facebook.com',
      twitter:   'https://twitter.com',
      whatsapp:  'https://wa.me/212612345678',
    },
  };

  /* ─── المنتجات ─── */
  const produits = [
    { id:1, nom:'جلابة رجالية فاخرة',     categorie:'ملابس',      prix:850,  taille:'M',  image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=320&fit=crop' },
    { id:2, nom:'حقيبة جلد تقليدية',        categorie:'إكسسوارات', prix:580,  taille:'',   image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=320&fit=crop' },
    { id:3, nom:'قفطان سهرة مطرز',          categorie:'ملابس',      prix:1400, taille:'L',  image:'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=320&fit=crop' },
    { id:4, nom:'مجوهرات ذهبية',             categorie:'إكسسوارات', prix:320,  taille:'',   image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=320&fit=crop' },
    { id:5, nom:'بنطلون كلاسيكي',            categorie:'ملابس',      prix:420,  taille:'M',  image:'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=320&fit=crop' },
    { id:6, nom:'حزام جلد مصنوع يدوياً',    categorie:'إكسسوارات', prix:210,  taille:'',   image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=320&fit=crop' },
    { id:7, nom:'جاكيت عصري أنيق',           categorie:'ملابس',      prix:760,  taille:'S',  image:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=320&fit=crop' },
    { id:8, nom:'ساعة أنيقة',                categorie:'إكسسوارات', prix:1290, taille:'',   image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=320&fit=crop' },
  ];

  /* ─── فلترة ─── */
  const filtered = produits.filter(p => {
    if (filters.category && p.categorie !== filters.category) return false;
    if (p.prix > filters.maxPrice) return false;
    if (filters.size && p.taille && p.taille !== filters.size) return false;
    return true;
  });

  const handleReset = () =>
    setFilters({ category: '', maxPrice: 5000, size: '' });

  /* ─── نجوم التقييم ─── */
  const Stars = ({ note }) => (
    <div className="bu-stars">
      {[1,2,3,4,5].map(i => (
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

  /* ─── واتساب     khassha tbadl ─── */
  // const handleWhatsApp = (product) => {
  //   const msg = encodeURIComponent(
  //     `مرحباً ! أنا مهتم بـ :\n🛍️ *${product.nom}*\n💰 ${product.prix} درهم\nهل يمكنك مساعدتي ؟`
  //   );
  //   window.open(`https://wa.me/212612345678?text=${msg}`, '_blank');
  // };

  return (
    <div className="bu-page" dir="rtl" lang="ar">

      {/* ══ رأس البوتيك ══ */}
      <div className="bu-header">
        <div className="bu-header-inner">

          {/* الشعار + المعلومات */}
          <div className="bu-profile">
            <div className="bu-avatar-wrap">
              <div className="bu-avatar">ق</div>
              <span className="bu-avatar-badge">✓</span>
            </div>
            <div className="bu-info">
              <h1 className="bu-name">{boutique.nom}</h1>
              <div className="bu-meta">
                <span className="bu-meta-item">
                  <MapPin size={13} strokeWidth={2} /> {boutique.localisation}
                </span>
                <span className="bu-meta-item">
                  <Phone size={13} strokeWidth={2} /> {boutique.telephone}
                </span>
              </div>
              <Stars note={boutique.note} />
            </div>
          </div>

          {/* الشبكات الاجتماعية */}
          

          <div className="bu-socials">
            
            <a href={boutique.reseaux.whatsapp} className="bu-social bu-social--wa" target="_blank" rel="noopener noreferrer" title="واتساب">
              <MessageCircle size={17} strokeWidth={2} />
            </a>
            <a href={boutique.reseaux.instagram} className="bu-social" target="_blank" rel="noopener noreferrer" title="إنستغرام">
              <Instagram size={17} strokeWidth={1.8} />
            </a>
            <a href={boutique.reseaux.facebook} className="bu-social" target="_blank" rel="noopener noreferrer" title="فيسبوك">
              <Facebook size={17} strokeWidth={1.8} />
            </a>
            <a href={boutique.reseaux.twitter} className="bu-social" target="_blank" rel="noopener noreferrer" title="تويتر">
              <Twitter size={17} strokeWidth={1.8} />
            </a>
          </div>

        </div>
      </div>

      {/* ══ المحتوى الرئيسي ══ */}
      <div className="bu-body">

        {/* ── الفلاتر — يمين ── */}
        <aside className="bu-filters">

          <div className="bu-filters-top">
            <h3 className="bu-filters-title">
              <SlidersHorizontal size={15} strokeWidth={2} color="#EF3B3C" />
              الفلاتر
            </h3>
            <button className="bu-filters-reset" onClick={handleReset}>
              <RotateCcw size={11} strokeWidth={2.5} />
              إعادة ضبط
            </button>
          </div>

          {/* الفئة */}
          <div className="bu-filter-group">
            <label className="bu-filter-label">
              <Tag size={13} strokeWidth={2} /> الفئة
            </label>
            <div className="bu-filter-options">
              {['', 'ملابس', 'إكسسوارات'].map(cat => (
                <button
                  key={cat}
                  className={`bu-filter-chip ${filters.category === cat ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, category: cat }))}
                >
                  {cat || 'الكل'}
                </button>
              ))}
            </div>
          </div>

          {/* السعر */}
          <div className="bu-filter-group">
            <label className="bu-filter-label">
              <Tag size={13} strokeWidth={2} /> السعر الأقصى
            </label>
            <div className="bu-price-display">
              <span>0 درهم</span>
              <span className="bu-price-max">{filters.maxPrice.toLocaleString()} درهم</span>
            </div>
            <input
              type="range"
              className="bu-range"
              min="0" max="5000" step="50"
              value={filters.maxPrice}
              onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
              dir="ltr"
            />
          </div>

          {/* المقاس */}
          <div className="bu-filter-group">
            <label className="bu-filter-label">
              <Ruler size={13} strokeWidth={2} /> المقاس
            </label>
            <div className="bu-filter-options bu-filter-options--sizes">
              {['', 'S', 'M', 'L', 'XL'].map(s => (
                <button
                  key={s}
                  className={`bu-size-btn ${filters.size === s ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, size: s }))}
                >
                  {s || 'الكل'}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* ── المنتجات — يسار ── */}
        <main className="bu-products">
         
          <div className="bu-products-bar">
            <h2 className="bu-products-title">
              <ShoppingBag size={18} strokeWidth={1.8} />
              منتجاتنا
            </h2>
            <span className="bu-products-count">
              <strong>{filtered.length}</strong> منتج
            </span>
            {/* button ajouter produit */}
            <div className="bu-actions">
          <button className="tdb-quick-btn">
                            <PlusCircle size={17} strokeWidth={2} />
                            Ajouter un Produit
                          </button>
          </div>
          </div>

          {filtered.length > 0 ? (
            <div className="bu-grid">
              {filtered.map(p => (
                <div key={p.id} className="bu-card">
                  <div className="bu-card-img-wrap">
                    <img src={p.image} alt={p.nom} className="bu-card-img" />
                    
                  </div>
                  <div className="bu-card-body">
                    <span className="bu-card-cat">{p.categorie}</span>
                    <h3 className="bu-card-name">{p.nom}</h3>
                    {p.taille && (
                      <span className="bu-card-size">المقاس: {p.taille}</span>
                    )}
                   
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bu-empty">
              <Package size={48} strokeWidth={1.2} color="#D1D1D1" />
              <h3>لا توجد منتجات مطابقة</h3>
              <p>جرّب تعديل الفلاتر للحصول على نتائج أخرى</p>
              <button className="bu-empty-btn" onClick={handleReset}>
                إعادة تعيين الفلاتر
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default BoutiqueUtilisateur;