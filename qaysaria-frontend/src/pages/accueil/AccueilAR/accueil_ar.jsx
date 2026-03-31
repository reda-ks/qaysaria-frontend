import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../../styles/pages css/accueil_ar.css';

import logo from '../../../assets/logo.png';

const AccueilAR = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleExplorer     = () => navigate('/منتجات');
  const handleSubscription = () => navigate('/register');
  const handleConnexion    = () => navigate('/login');
  const handleDevenir      = () => setIsModalOpen(true);
  const closeModal         = () => setIsModalOpen(false);

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

  const stats = [
    { number: '+12',  label: 'مدينة'     },
    { number: '+500', label: 'متجر'      },
    { number: '15k',  label: 'منتج'      },
    { number: '98%',  label: 'راضون'     },
    { number: '+2k',  label: 'عميل'      },
    { number: '24/7', label: 'دعم'       },
  ];

  const featured = [
    {
      id: 'f1',
      nom: 'حقيبة جلد حرفية',
      description: 'صناعة جلدية تقليدية من فاس',
      prix: 450,
      nom_ville: 'فاس',
      category: 'أزياء وإكسسوارات',
      promo: null,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=500&fit=crop',
    },
    {
      id: 'f2',
      nom: 'مجموعة صيف المرأة',
      description: 'فساتين خفيفة وأزياء صيفية أنيقة',
      prix: 299,
      nom_ville: 'الدار البيضاء',
      category: 'أزياء وإكسسوارات',
      promo: 'مجموعة الصيف',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&h=900&fit=crop',
    },
    {
      id: 'f3',
      nom: 'حذاء رياضي احترافي',
      description: 'أداء عالٍ وراحة مثلى للرياضة',
      prix: 899,
      nom_ville: 'الرباط',
      category: 'رياضة وأحذية',
      promo: '-30%',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop',
    },
    {
      id: 'f4',
      nom: 'قفطان مطرز فاخر',
      description: 'نسيج يدوي من مراكش',
      prix: 1200,
      nom_ville: 'مراكش',
      category: 'أزياء وإكسسوارات',
      promo: '-20%',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=400&fit=crop',
    },
    {
      id: 'f5',
      nom: 'صندل جلد مضفر',
      description: 'صناعة بربرية أصيلة من الجنوب',
      prix: 320,
      nom_ville: 'أكادير',
      category: 'أحذية',
      promo: null,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop',
    },
  ];

  const categories = [
    {
      title: 'الأزياء والإكسسوارات',
      slug: 'ملابس-إكسسوارات',
      products: [
        { id: 1,  nom: 'جلابة رجالية فاخرة',    description: 'صوف مرينوس، قصة عصرية، تطريز تقليدي',     prix: 850,  nom_ville: 'فاس',          category: 'أزياء',     image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=320&fit=crop' },
        { id: 2,  nom: 'حقيبة كتف جلدية',        description: 'جلد أصيل مدبوغ في فاس، خياطة يدوية',       prix: 580,  nom_ville: 'فاس',          category: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=320&fit=crop' },
        { id: 3,  nom: 'قفطان سهرة مطرز',        description: 'دانتيل ناعم وخرز، جاهز للارتداء',           prix: 1400, nom_ville: 'الدار البيضاء', category: 'أزياء',     image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=320&fit=crop' },
        { id: 4,  nom: 'حزام صناعي يدوي',         description: 'جلد منقوش، إبزيم فضي صنع يدوياً',           prix: 210,  nom_ville: 'مراكش',        category: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=320&fit=crop' },
        { id: 5,  nom: 'جاكيت أمازيغي مطرز',     description: 'نقوش بربرية، قماش دافئ، إصدار محدود',        prix: 760,  nom_ville: 'أكادير',       category: 'أزياء',     image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=320&fit=crop' },
        { id: 6,  nom: 'وشاح صوف الصحراء',        description: 'صوف الجمل، ألوان طبيعية من الجنوب',          prix: 175,  nom_ville: 'الراشيدية',   category: 'إكسسوارات', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=320&fit=crop' },
      ],
    },
    {
      title: 'الإلكترونيات والتكنولوجيا',
      slug: 'إلكترونيات',
      products: [
        { id: 7,  nom: 'سماعات لاسلكية احترافية', description: 'إلغاء الضوضاء، 30 ساعة، بلوتوث 5.3',       prix: 650,  nom_ville: 'الدار البيضاء', category: 'صوتيات',    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=320&fit=crop' },
        { id: 8,  nom: 'ساعة ذكية رياضية',         description: 'GPS، متابعة صحية، مقاومة للماء',             prix: 1290, nom_ville: 'الرباط',       category: 'ساعات',     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=320&fit=crop' },
        { id: 9,  nom: 'تابلت 10 بوصة',            description: '4G، 128 غيغا، شاشة Full HD، قلم مرفق',    prix: 2100, nom_ville: 'الدار البيضاء', category: 'إعلاميات',  image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=320&fit=crop' },
        { id: 10, nom: 'باور بانك 20 000 مللي',    description: 'شحن سريع 65W، 3 منافذ USB',                  prix: 320,  nom_ville: 'طنجة',         category: 'ملحقات',   image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=320&fit=crop' },
        { id: 11, nom: 'كاميرا مراقبة 4K',          description: 'رؤية ليلية، واي فاي، كشف حركة',              prix: 480,  nom_ville: 'مراكش',        category: 'أمن',       image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=320&fit=crop' },
        { id: 12, nom: 'لوحة مفاتيح ميكانيكية',   description: 'مفاتيح بلو، إضاءة RGB، USB-C',               prix: 590,  nom_ville: 'أكادير',       category: 'إعلاميات',  image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=320&fit=crop' },
      ],
    },
    {
      title: 'المنزل والديكور',
      slug: 'منزل-ديكور',
      products: [
        { id: 13, nom: 'زربية أمازيغية يدوية',     description: 'صوف بكر، نقوش أسلافية، 200×150 سم',          prix: 1800, nom_ville: 'خنيفرة',      category: 'ديكور',    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=320&fit=crop' },
        { id: 14, nom: 'فانوس نحاسي منقوش',        description: 'نحاس مطروق، طراز أرابيسك، ارتفاع 40 سم',     prix: 380,  nom_ville: 'مراكش',       category: 'إضاءة',    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35549579?w=400&h=320&fit=crop' },
        { id: 15, nom: 'طاجين خزفي مزخرف',         description: 'خزف آسفي مرسوم يدوياً، قطر 30 سم',            prix: 260,  nom_ville: 'آسفي',        category: 'أواني',    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=320&fit=crop' },
        { id: 16, nom: 'وسادة كيليم منسوجة',       description: 'قطن معاد تدوير، نقوش هندسية، 45×45 سم',       prix: 140,  nom_ville: 'الرباط',      category: 'منسوجات',  image: 'https://images.unsplash.com/photo-1540638349517-3abd5afc5847?w=400&h=320&fit=crop' },
        { id: 17, nom: 'مرآة مشربية',              description: 'خشب ثويا منحوت، إطار 60×80 سم',                prix: 920,  nom_ville: 'الصويرة',     category: 'ديكور',    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=320&fit=crop' },
        { id: 18, nom: 'صينية زليج فسيفساء',       description: 'فايانس حرفي من فاس، قطر 50 سم',               prix: 490,  nom_ville: 'فاس',         category: 'فنون مائدة', image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=320&fit=crop' },
      ],
    },
  ];

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <div dir="rtl" lang="ar">

      {/* ════ HERO ════ */}
      <section className="ar-hero-section">
        <div className="ar-hero-pattern"></div>
        <div className="ar-hero-content">
          <div className="ar-hero-left">
            <span className="ar-hero-tag">🇲🇦 منصة رقمية وطنية</span>
            <h1 className="ar-hero-title">
              اكتشف <span className="ar-highlight">المغرب</span> عبر الإنترنت
            </h1>
            <p className="ar-hero-description">
              تواصل مع آلاف المتاجر الموثقة في المغرب.
              تسوّق بثقة وادعم التجارة المحلية.
            </p>
            <div className="ar-hero-buttons">
              <button className="ar-btn ar-btn-primary" onClick={handleExplorer}>استكشف المنتجات</button>
              <button className="ar-btn ar-btn-outline" onClick={handleDevenir}>كن تاجراً</button>
            </div>
            <div className="ar-hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="ar-stat-item">
                  <div className="ar-stat-number">{s.number}</div>
                  <div className="ar-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="ar-hero-right">
            <img src={logo} alt="قيصرية" />
          </div>
        </div>
      </section>

      {/* ════ FEATURED MOSAIC ════ */}
      <section className="ar-featured-section">
        <h2 className="ar-titre-top">توجهات الموضة</h2>

        <div className="ar-featured-inner">

          {/* عمود يمين — 2 بطاقات */}
          <div className="ar-featured-col ar-featured-col--right">
            {[featured[0], featured[3]].map((p) => (
              <div key={p.id} className="ar-featured-card ar-featured-card--sm">
                <img src={p.image} alt={p.nom} className="ar-featured-img" />
                <div className="ar-featured-info">
                  {p.promo && <span className="ar-featured-promo">{p.promo}</span>}
                  <span className="ar-featured-cat">{p.category}</span>
                  <h3 className="ar-featured-name">{p.nom}</h3>
                  <div className="ar-featured-bottom">
                    <span className="ar-featured-price">{p.prix} <small>درهم</small></span>
                    <button className="ar-btn-wa ar-btn-wa--sm" onClick={() => handleWhatsApp(p)}>
                      <WhatsAppIcon /> اطلب
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* عمود وسط — بطاقة طويلة */}
          <div className="ar-featured-col ar-featured-col--center">
            <div className="ar-featured-card ar-featured-card--tall">
              <img src={featured[1].image} alt={featured[1].nom} className="ar-featured-img" />
              <div className="ar-featured-info ar-featured-info--tall">
                {featured[1].promo && <span className="ar-featured-promo">{featured[1].promo}</span>}
                <span className="ar-featured-cat">{featured[1].category}</span>
                <h3 className="ar-featured-name ar-featured-name--lg">{featured[1].nom}</h3>
                <p className="ar-featured-desc">{featured[1].description}</p>
                <div className="ar-featured-bottom">
                  <span className="ar-featured-price ar-featured-price--lg">{featured[1].prix} <small>درهم</small></span>
                  <button className="ar-btn-wa" onClick={() => handleWhatsApp(featured[1])}>
                    <WhatsAppIcon /> اطلب عبر واتساب
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* عمود يسار — 2 بطاقات */}
          <div className="ar-featured-col ar-featured-col--left">
            {[featured[2], featured[4]].map((p) => (
              <div key={p.id} className="ar-featured-card ar-featured-card--sm">
                <img src={p.image} alt={p.nom} className="ar-featured-img" />
                <div className="ar-featured-info">
                  {p.promo && <span className="ar-featured-promo">{p.promo}</span>}
                  <span className="ar-featured-cat">{p.category}</span>
                  <h3 className="ar-featured-name">{p.nom}</h3>
                  <div className="ar-featured-bottom">
                    <span className="ar-featured-price">{p.prix} <small>درهم</small></span>
                    <button className="ar-btn-wa ar-btn-wa--sm" onClick={() => handleWhatsApp(p)}>
                      <WhatsAppIcon /> اطلب
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════ CATEGORY GRIDS ════ */}
      <section className="ar-categories-section">
        {categories.map((cat, ci) => (
          <div key={ci} className="ar-category-block">
            <div className="ar-category-header">
              <div>
                <div className="ar-category-label">جديد</div>
                <h2 className="ar-category-title">{cat.title}</h2>
              </div>
              <Link to={`/منتجات?categorie=${cat.slug}`} className="ar-category-link">
                عرض الكل ←
              </Link>
            </div>

            <div className="ar-shops-grid">
              {cat.products.map((p) => (
                <div key={p.id} className="ar-shop-card">
                  <div className="ar-shop-card-image">
                    <img src={p.image} alt={p.nom} className="ar-shop-image" />
                  </div>
                  <div className="ar-shop-content">
                    <div className="ar-shop-meta-top">
                      <span className="ar-shop-category-tag">{p.category}</span>
                      <span className="ar-shop-city">📍 {p.nom_ville}</span>
                    </div>
                    <h3 className="ar-shop-name">{p.nom}</h3>
                    <p className="ar-shop-description">{p.description}</p>
                    <div className="ar-shop-footer">
                      <span className="ar-shop-price">
                        {p.prix.toLocaleString('fr-MA')} <small>درهم</small>
                      </span>
                      <button
                        className="ar-btn-wa ar-btn-wa--card"
                        onClick={() => handleWhatsApp(p)}
                        title="اطلب عبر واتساب"
                      >
                        <WhatsAppIcon /> واتساب
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ════ MODAL ════ */}
      <div className={`ar-modal-overlay ${isModalOpen ? 'show' : 'hidden'}`}>
        <div className="ar-modal-content">
          <button className="ar-modal-close" onClick={closeModal}>✕</button>
          <h2 className="ar-modal-title">انضم إلى قيصرية</h2>
          <p className="ar-modal-text">
            كن تاجراً وطوّر عملك التجاري عبر الإنترنت.
            سجّل دخولك أو أنشئ حساباً للبدء.
          </p>
          <div className="ar-modal-buttons">
            <button className="ar-btn ar-btn-primary" onClick={handleConnexion}>تسجيل الدخول</button>
            <button className="ar-btn ar-btn-outline" onClick={handleSubscription}>إنشاء حساب</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AccueilAR;