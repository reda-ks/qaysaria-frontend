import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import '../../../styles/pages css/locationAR.css';
import SearchBar from '../../../composants/SearchBar';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const products = [
  {
    id: 101,
    nom: 'فستان الأميرة العاجي',
    description: 'فستان زفاف فاخر بتصميم ملكي أنيق وتفاصيل راقية.',
    prix: 1200,
    nom_ville: 'casablanca',
    category: 'فستان زفاف',
    marque: 'Wedding Collection',
    taille: ['S', 'M', 'L'],
    duration: '٣ أيام',
    badge: 'الأكثر طلباً',
    badgeType: 'favorite',
    emoji: '👗',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 102,
    nom: 'تكشيطة مطرزة بالذهب',
    description: 'تكشيطة مغربية فاخرة مطرزة بخيوط ذهبية.',
    prix: 800,
    nom_ville: 'marrakech',
    category: 'تقليدي',
    marque: 'Caftan Royal',
    taille: ['M', 'L'],
    duration: '٣ أيام',
    badge: 'حصري',
    badgeType: 'exclusive',
    emoji: '✨',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 103,
    nom: 'بدلة سوداء كلاسيكية',
    description: 'بدلة رجالية أنيقة مثالية للمناسبات وحفلات الزفاف.',
    prix: 600,
    nom_ville: 'rabat',
    category: 'بدلة رجالية',
    marque: 'Classic Men',
    taille: ['M', 'L', 'XL'],
    duration: '٣ أيام',
    badge: null,
    badgeType: null,
    emoji: '🤵',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 104,
    nom: 'قفطان كرزي مطرز',
    description: 'قفطان مغربي فاخر بتطريز يدوي أنيق.',
    prix: 950,
    nom_ville: 'fes',
    category: 'تقليدي',
    marque: 'Royal Caftan',
    taille: ['S', 'M'],
    duration: '٣ أيام',
    badge: 'جديد',
    badgeType: 'new',
    emoji: '💃',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 105,
    nom: 'فستان حورية الدانتيل',
    description: 'فستان زفاف دانتيل فاخر بإطلالة رومانسية.',
    prix: 1400,
    nom_ville: 'tanger',
    category: 'فستان زفاف',
    marque: 'Luxury Bride',
    taille: ['S', 'M', 'L'],
    duration: '٣ أيام',
    badge: 'بريميوم',
    badgeType: 'premium',
    emoji: '🤍',
    available: false,
    images: [
      'https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 106,
    nom: 'طقم وردي للوصيفات',
    description: 'طقم أنيق للوصيفات بلون وردي راقٍ.',
    prix: 450,
    nom_ville: 'agadir',
    category: 'الوصيفات',
    marque: 'Bridesmaids Style',
    taille: ['S', 'M', 'L'],
    duration: '٣ أيام',
    badge: null,
    badgeType: null,
    emoji: '🌸',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop',
    ],
  },
];

/* ─────────────────────────────────────────────
   STEPS
───────────────────────────────────────────── */
const steps = [
  {
    num: '٠١',
    title: 'اختاري تميزيك',
    desc: 'تصفحي كتالوجنا واختاري الزي الذي يناسبك.',
  },
  {
    num: '٠٢',
    title: 'احجزي عبر الإنترنت',
    desc: 'اختاري تواريخك وأكدي حجزك بسهولة.',
  },
  {
    num: '٠٣',
    title: 'القياس والتعديلات',
    desc: 'قياسات وتعديلات مجانية للحصول على الإطلالة المثالية.',
  },
  {
    num: '٠٤',
    title: 'استمتعي بيومك',
    desc: 'تألقي في يوم زفافك بكل راحة وأناقة.',
  },
];

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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
   PAGE
───────────────────────────────────────────── */
const TenueMariageAR = () => {
  useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const navigate = useNavigate();

  const filters = [
    'الكل',
    'فستان زفاف',
    'تقليدي',
    'بدلة رجالية',
    'الوصيفات',
  ];

  const filtered = products.filter((p) => {
    const matchCat =
      activeFilter === 'الكل' || p.category === activeFilter;

    const matchSearch =
      p.nom.includes(searchQuery) ||
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
      `مرحباً! أنا مهتم بـ:\n\n` +
      `🛍️ *${product.nom}*\n` +
      `💰 السعر: ${product.prix} درهم\n` +
      `📍 المدينة: ${product.nom_ville}\n\n` +
      `هل يمكنك إعطائي مزيداً من المعلومات؟`
    );

    window.open(
      `https://wa.me/212771887412?text=${message}`,
      '_blank'
    );
  };

  const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
    </svg>
  );

  return (
    <main className="tm-page" dir="rtl">

      <div className="location-hero">
        <div className="location-hero-inner">
          <span className="location-hero-tag">🇲🇦 مجموعة الزفاف</span>

          <h1 className="location-hero-title">
            أزياء الزفاف
            <br />
            للإيجار
          </h1>

          <p className="location-hero-sub">
            أزياء استثنائية ليومك الأجمل
          </p>
        </div>
      </div>

      <div className="location-search-wrap">
        <SearchBar
          className="searchbar-btn"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="ابحثي عن زي..."
        />
      </div>

      <section className="tm-section">
        <div className="tm-container">

          <AnimatedSection>
            <div className="tm-filters">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`tm-filter-btn ${
                    activeFilter === f
                      ? 'tm-filter-btn--active'
                      : ''
                  }`}
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
              <p>لا توجد نتائج</p>
            </div>
          ) : (
            <div className="tm-products">
              {visibleProducts.map((product, i) => (
                <AnimatedSection key={product.id} delay={i * 50}>

                  <div
                    className={`tm-product-card ${
                      !product.available
                        ? 'tm-product-card--unavailable'
                        : ''
                    }`}
                    onMouseEnter={() =>
                      setHoveredProduct(product.id)
                    }
                    onMouseLeave={() =>
                      setHoveredProduct(null)
                    }
                  >

                    {product.badge && (
                      <span
                        className={`tm-product-card__badge tm-product-card__badge--${product.badgeType}`}
                      >
                        {product.badge}
                      </span>
                    )}

                    {!product.available && (
                      <div className="tm-product-card__unavailable-overlay">
                        <span>غير متاح</span>
                      </div>
                    )}

                    <div className="tm-product-card__visual">
                      <span className="tm-product-card__emoji">
                        {product.emoji}
                      </span>
                    </div>

                    <div className="tm-product-card__body">
                      <span className="tm-product-card__cat">
                        {product.category}
                      </span>

                      <h3 className="tm-product-card__name">
                        {product.nom}
                      </h3>

                      <div className="tm-product-card__price">
                        {product.prix} د.م
                      </div>
                    </div>

                    <div
                      className={`tm-product-card__actions ${
                        hoveredProduct === product.id
                          ? 'tm-product-card__actions--visible'
                          : ''
                      }`}
                    >

                      <button
                        className="ar-btn-wa"
                        onClick={() => handleWhatsApp(product)}
                      >
                        <WhatsAppIcon />
                        اطلب عبر واتساب
                      </button>

                      <button
                        className="tm-btn tm-btn--outline tm-btn--sm"
                        onClick={() =>
                          navigate(`/منتج/${product.id}`)
                        }
                      >
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
                  onClick={() =>
                    setVisibleCount((prev) => prev + 3)
                  }
                >
                  عرض المزيد
                </button>
              )}
            </div>
          </AnimatedSection>

        </div>
      </section>

      <section className="tm-section tm-how">
        <div className="tm-container">

          <div className="tm-steps">
            {steps.map((step, i) => (
              <AnimatedSection
                key={step.num}
                delay={i * 90}
              >
                <div className="tm-step-card">
                  <span className="tm-step-card__num">
                    {step.num}
                  </span>

                  <h3 className="tm-step-card__title">
                    {step.title}
                  </h3>

                  <p className="tm-step-card__desc">
                    {step.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      <section className="tm-cta-section">
        <div className="tm-container">

          <div className="tm-cta">
            <h2 className="tm-cta__title">
              يوم زفاف يستحق الأجمل ✨
            </h2>

            <div className="tm-cta__actions">

              <Link
                to="/منتجات"
                className="tm-btn tm-btn--primary tm-btn--lg"
              >
                استعرضي الكتالوج
              </Link>

              <Link
                to="/اتصل-بنا"
                className="tm-btn tm-btn--ghost-dark tm-btn--lg"
              >
                تواصلي معنا
              </Link>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
};

export default TenueMariageAR;