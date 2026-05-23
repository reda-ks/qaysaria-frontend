import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/pages css/locationAR.css';
import SearchBar from '../../../composants/SearchBar';

/* ─────────────────────────────────────────────
   DATA — Arabic
───────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: 'فستان الأميرة العاجي',
    category: 'فستان زفاف',
    price: '١٢٠٠',
    duration: '٣ أيام',
    badge: 'الأكثر طلباً',
    badgeType: 'favorite',
    emoji: '👗',
    available: true,
  },
  {
    id: 2,
    name: 'تكشيطة مطرزة بالذهب',
    category: 'تقليدي',
    price: '٨٠٠',
    duration: '٣ أيام',
    badge: 'حصري',
    badgeType: 'exclusive',
    emoji: '✨',
    available: true,
  },
  {
    id: 3,
    name: 'بدلة سوداء كلاسيكية',
    category: 'بدلة رجالية',
    price: '٦٠٠',
    duration: '٣ أيام',
    badge: null,
    badgeType: null,
    emoji: '🤵',
    available: true,
  },
  {
    id: 4,
    name: 'قفطان كرزي مطرز',
    category: 'تقليدي',
    price: '٩٥٠',
    duration: '٣ أيام',
    badge: 'جديد',
    badgeType: 'new',
    emoji: '',
    available: true,
  },
  {
    id: 5,
    name: 'فستان حورية الدانتيل',
    category: 'فستان زفاف',
    price: '١٤٠٠',
    duration: '٣ أيام',
    badge: 'بريميوم',
    badgeType: 'premium',
    emoji: '',
    available: false,
  },
  {
    id: 6,
    name: 'طقم وردي للوصيفات',
    category: 'الوصيفات',
    price: '٤٥٠',
    duration: '٣ أيام',
    badge: null,
    badgeType: null,
    emoji: '',
    available: true,
  },
  {
    id: 7,
    name: 'فستان بوهيمي دانتيل',
    category: 'فستان زفاف',
    price: '١١٠٠',
    duration: '٣ أيام',
    badge: null,
    badgeType: null,
    emoji: '',
    available: true,
  },
  {
    id: 8,
    name: 'بدلة بوردو سليم',
    category: 'بدلة رجالية',
    price: '٧٠٠',
    duration: '٣ أيام',
    badge: 'جديد',
    badgeType: 'new',
    emoji: '🎩',
    available: true,
  },
  {
    id: 9,
    name: 'قفطان أزرق ملكي',
    category: 'تقليدي',
    price: '١٠٥٠',
    duration: '٣ أيام',
    badge: 'حصري',
    badgeType: 'exclusive',
    emoji: '💙',
    available: true,
  },
];

const steps = [
  {
    num: '٠١',
    title: 'اختاري تميزيك',
    desc: 'تصفحي كتالوجنا واختاري الزي الذي يناسبك ويعكس شخصيتك.',
    icon: '',
  },
  {
    num: '٠٢',
    title: 'احجزي عبر الإنترنت',
    desc: 'اختاري تواريخك وأكدي حجزك بضغطات بسيطة.',
    icon: '',
  },
  {
    num: '٠٣',
    title: 'القياس والتعديلات',
    desc: 'تفضلي إلى المتجر للقياس والتعديلات الشخصية المجانية.',
    icon: '',
  },
  {
    num: '٠٤',
    title: 'استمتعي بيومك',
    desc: 'تألقي في يوم زفافك، ثم أعيدي الزي بكل بساطة.',
    icon: '',
  },
];

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.12) {
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
   PAGE AR
───────────────────────────────────────────── */
const TenueMariageAR = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const filters = ['الكل', 'فستان زفاف', 'تقليدي', 'بدلة رجالية', 'الوصيفات'];

  const filtered = products.filter(p => {
    const matchCat = activeFilter === 'الكل' || p.category === activeFilter;
    const matchSearch = p.name.includes(searchQuery) ||
                        p.category.includes(searchQuery);
    return matchCat && matchSearch;
  });

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilter = (f) => {
    setActiveFilter(f);
    setVisibleCount(6);
  };
const handleWhatsApp = (product) => {
    const message = encodeURIComponent(
      `مرحباً ! أنا مهتم بـ :\n\n` +
      `🛍️ *${product.nom}*\n` +
      `💰 السعر : ${product.prix} درهم\n` +
      `📍 المدينة : ${product.nom_ville}\n\n` +
      `هل يمكنك إعطائي مزيداً من المعلومات ؟`
    );
    window.open(`https://wa.me/212600000000?text=${message}`, '_blank');
  };
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <main className="tm-page" dir="rtl">

      {/* ── HERO ── */}
      <div className="location-hero">
        <div className="location-hero-inner">
          <span className="location-hero-tag">🇲🇦 مجموعة الزفاف</span>
          <h1 className="location-hero-title">أزياء الزفاف<br className="tm-hero-br" /> للإيجار</h1>
          <p className="location-hero-sub">
            أزياء استثنائية ليومك الأجمل — إيجار مبسّط، تعديلات مجانية، توصيل في كل المغرب.
          </p>
        </div>
      </div>

      {/* ── SEARCH ── */}
      <div className="location-search-wrap">
        <SearchBar
          className="searchbar-btn"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="ابحثي عن زي..."
        />
      </div>

      {/* ── STATS ── */}
      <AnimatedSection>
        <div className="tm-stats-band">
          <div className="tm-stat">
            <strong>+٨٠</strong>
            <span>زي متاح</span>
          </div>
          <div className="tm-stat-sep" />
          <div className="tm-stat">
            <strong>٣ أيام</strong>
            <span>مدة الإيجار</span>
          </div>
          <div className="tm-stat-sep" />
          <div className="tm-stat">
            <strong>١٠٠٪</strong>
            <span>تعديلات مجانية</span>
          </div>
          <div className="tm-stat-sep" />
          <div className="tm-stat">
            <strong>توصيل</strong>
            <span>في كل المغرب</span>
          </div>
        </div>
      </AnimatedSection>

      {/* ── PRODUCTS ── */}
      <section className="tm-section">
        <div className="tm-container">

          <AnimatedSection>
            <div className="tm-section-head">
              <span className="tm-section-head__tag">تشكيلتنا</span>
              <h2 className="tm-section-head__title">
                أزياء متاحة <em>للإيجار</em>
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <div className="tm-filters">
              {filters.map(f => (
                <button
                  key={f}
                  className={`tm-filter-btn ${activeFilter === f ? 'tm-filter-btn--active' : ''}`}
                  onClick={() => handleFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {filtered.length === 0 ? (
            <div className="tm-empty">
              <span>😔</span>
              <p>لا توجد نتائج لـ « {searchQuery} »</p>
            </div>
          ) : (
            <div className="tm-products">
              {visibleProducts.map((product, i) => (
                <AnimatedSection key={product.id} delay={i * 55}>
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
                        <span>غير متاح</span>
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
                          <span className="tm-product-card__price-num">{product.price} د.م.</span>
                          <span className="tm-product-card__price-label">/{product.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`tm-product-card__actions ${hoveredProduct === product.id ? 'tm-product-card__actions--visible' : ''}`}>
                      <button className="ar-btn-wa" onClick={() => handleWhatsApp(products[1])}>
                    <WhatsAppIcon /> اطلب عبر واتساب
                  </button>
                      <button className="tm-btn tm-btn--outline tm-btn--sm">
                        التفاصيل
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          <AnimatedSection delay={150}>
            <div className="tm-products-footer">
              {hasMore && (
                <button
                  className="tm-btn tm-btn--primary"
                  onClick={() => setVisibleCount(prev => prev + 3)}
                >
                  عرض المزيد من الأزياء
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
              <span className="tm-section-head__tag tm-section-head__tag--light">كيف يعمل</span>
              <h2 className="tm-section-head__title tm-section-head__title--light">
                احجزي زيك في <em className="tm-em-light">٤ خطوات</em> بسيطة
              </h2>
            </div>
          </AnimatedSection>
          <div className="tm-steps">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} delay={i * 90}>
                <div className="tm-step-card">
                  
                  <span className="tm-step-card__num">{step.num}</span>
                  <h3 className="tm-step-card__title">{step.title}</h3>
                  <p className="tm-step-card__desc">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="tm-cta-section">
        <div className="tm-container">
          <AnimatedSection>
            <div className="tm-cta">
              <span className="tm-cta__deco">💍</span>
              <h2 className="tm-cta__title">
                يوم زفاف يستحق الأجمل ✨
              </h2>
              <p className="tm-cta__subtitle">
                احجزي اليوم واستفيدي من خدمة متكاملة: قياس، تعديلات ومرافقة شخصية.
              </p>
              <div className="tm-cta__actions">
                <Link to="/منتجات" className="tm-btn tm-btn--primary tm-btn--lg">
                  استعرضي الكتالوج
                </Link>
                <Link to="/اتصل-بنا" className="tm-btn tm-btn--ghost-dark tm-btn--lg">
                  تواصلي معنا
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
};

export default TenueMariageAR;