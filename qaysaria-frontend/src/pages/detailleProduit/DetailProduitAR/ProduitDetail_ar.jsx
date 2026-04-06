import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Star, ShieldCheck, Truck, RotateCcw,
  ChevronRight, ArrowRight, Share2, Heart
} from 'lucide-react';
import '../../../styles/pages css/detailleProduit_ar.css';

/* ════════════════════════════════════════════════════════
   نفس البيانات من صفحة المنتجات
═══════════════════════════════════════════════════════════ */
const ALL_PRODUCTS = [
  { id:1,  nom:'جلابة رجالية فاخرة',         description:'صوف ميرينوس ناعم، قطعة عصرية بتطريز فاسي تقليدي يدوي الصنع.',               prix:850,  nom_ville:'fes',        category:'mode-accessoires',   marque:'حرفي محلي',    taille:['S','M','L','XL'], images:['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=600&fit=crop'] },
  { id:2,  nom:'قفطان سهرة مطرّز',            description:'حرير طبيعي بتطريز بخيط ذهبي، مثالي للمناسبات والأعراس الخاصة.',              prix:1400, nom_ville:'casablanca', category:'mode-accessoires',   marque:'بيت زهور',     taille:['S','M','L'],      images:['https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop'] },
  { id:3,  nom:'حقيبة جلد دباغة فاس',         description:'جلد أصيل مدبوغ يدوياً في دباغات فاس الشهيرة، مخيط باليد بدقة متناهية.',     prix:580,  nom_ville:'fes',        category:'mode-accessoires',   marque:'دباغة شوارة',  taille:[],                 images:['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop'] },
  { id:4,  nom:'سترة أمازيغية مطرّزة',         description:'قماش دافئ بنقوش بربرية أصيلة، إصدار محدود يدوي الصنع من الجنوب المغربي.',    prix:760,  nom_ville:'agadir',     category:'mode-accessoires',   marque:'أطلس كرافت',   taille:['M','L','XL'],     images:['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=600&fit=crop'] },
  { id:5,  nom:'وشاح صوف الصحراء',             description:'صوف الجمل بألوان الصحراء الطبيعية، ناعم ودافئ جداً، نسيج يدوي.',             prix:175,  nom_ville:'errachidia', category:'mode-accessoires',   marque:'صحراء وول',    taille:[],                 images:['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=600&fit=crop'] },
  { id:6,  nom:'بلغة جلد ذهبية',               description:'حذاء مغربي تقليدي من الجلد الطري، مطرّز يدوياً، لون ذهبي فاخر.',             prix:290,  nom_ville:'marrakech',  category:'mode-accessoires',   marque:'سوق الخير',    taille:['38','39','40','41','42','43'], images:['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=600&fit=crop'] },
  { id:7,  nom:'سماعات لاسلكية احترافية',      description:'إلغاء ضوضاء نشط، 30 ساعة استخدام، بلوتوث 5.3، صوت عالي الجودة معتمد.',      prix:650,  nom_ville:'casablanca', category:'electronique-tech',  marque:'ساوند برو',    taille:[],                 images:['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop'] },
  { id:8,  nom:'ساعة ذكية رياضية',              description:'GPS مدمج، متابعة صحية 24/7، مقاومة للماء 50 متراً، شاشة AMOLED، 7 أيام.',    prix:1290, nom_ville:'rabat',      category:'electronique-tech',  marque:'فيت تيك',      taille:[],                 images:['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop'] },
  { id:9,  nom:'تابلت 10 بوصة 4G',              description:'128 جيجا تخزين، شاشة Full HD، 4G LTE، قلم مدمج، نظام أندرويد 14.',           prix:2100, nom_ville:'casablanca', category:'electronique-tech',  marque:'ديجي تاب',     taille:[],                 images:['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'] },
  { id:10, nom:'باور بانك 20,000 مللي أمبير',   description:'شحن سريع 65W، 3 منافذ USB-C وUSB-A، متوافق مع جميع الأجهزة الذكية.',         prix:320,  nom_ville:'tanger',     category:'electronique-tech',  marque:'تشارج بلاس',   taille:[],                 images:['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop'] },
  { id:11, nom:'كاميرا مراقبة 4K',              description:'رؤية ليلية ملونة، واي فاي ثنائي النطاق، كشف حركة بالذكاء الاصطناعي.',         prix:480,  nom_ville:'marrakech',  category:'electronique-tech',  marque:'سيكيور كام',   taille:[],                 images:['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop'] },
  { id:12, nom:'لوحة مفاتيح ميكانيكية RGB',     description:'مفاتيح Blue تكتيلية، إضاءة RGB 16 مليون لون، USB-C، مضاد للغوست.',            prix:590,  nom_ville:'agadir',     category:'electronique-tech',  marque:'تايب فورس',    taille:[],                 images:['https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=600&fit=crop'] },
  { id:13, nom:'زربية بربرية يدوية الصنع',       description:'صوف بكر بنقوش أجداد الأطلس المتوسط، 200×150 سم، منسوجة يدوياً بالكامل.',    prix:1800, nom_ville:'khenifra',   category:'maison-decoration',  marque:'أطلس تاپي',    taille:[],                 images:['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'] },
  { id:14, nom:'فانوس نحاس منقوش',              description:'فانوس حرفي من النحاس المطروق والمنقوش بزخارف عربية أصيلة، ارتفاع 40 سم.',    prix:380,  nom_ville:'marrakech',  category:'maison-decoration',  marque:'نحاس آرت',     taille:[],                 images:['https://images.unsplash.com/photo-1513506003901-1e6a35549579?w=800&h=600&fit=crop'] },
  { id:15, nom:'طاجين خزف مزخرف',               description:'خزف حرفي من آسفي مرسوم يدوياً بنقوش زهرية جميلة، قطر 30 سم.',                prix:260,  nom_ville:'safi',       category:'maison-decoration',  marque:'فخاريات آسفي', taille:[],                 images:['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=600&fit=crop'] },
  { id:16, nom:'صينية زليج فسيفساء',            description:'فايانس حرفي فاسي، فسيفساء هندسية تقليدية رائعة، قطر 50 سم.',                 prix:490,  nom_ville:'fes',        category:'maison-decoration',  marque:'زليج فاس',     taille:[],                 images:['https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=600&fit=crop'] },
  { id:17, nom:'دراجة جبلية ألومنيوم 27.5"',    description:'إطار ألومنيوم خفيف، 21 سرعة شيمانو، فرامل قرصية هيدروليكية، فورك معلق.',    prix:3200, nom_ville:'casablanca', category:'sport-loisirs',      marque:'تريل رايدر',   taille:['S','M','L'],      images:['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'] },
  { id:18, nom:'حصيرة يوغا مانعة للانزلاق',    description:'مطاط طبيعي سماكة 6 مم، سطح مانع للانزلاق بالكامل، حزام نقل مضمّن.',         prix:220,  nom_ville:'rabat',      category:'sport-loisirs',      marque:'زن فلو',       taille:[],                 images:['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'] },
  { id:19, nom:'زيت أركان نقي BIO',             description:'زيت أركان 100% نقي وطبيعي، معتمد عضوياً، عصر بارد، متعدد الاستخدامات.',      prix:150,  nom_ville:'agadir',     category:'beaute-sante',       marque:'أركان غولد',   taille:[],                 images:['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop'] },
  { id:20, nom:'صابون بلدي حرفي',               description:'صابون مغربي تقليدي بزبدة الشيا وزيت الزيتون، مرطب ومنقٍّ، 300 غ.',           prix:55,   nom_ville:'fes',        category:'beaute-sante',       marque:'حمام بليس',    taille:[],                 images:['https://images.unsplash.com/photo-1600857062241-98e5dba7f025?w=800&h=600&fit=crop'] },
];

const CATEGORY_AR = {
  'mode-accessoires':'الأزياء والإكسسوارات', 'electronique-tech':'الإلكترونيات',
  'maison-decoration':'المنزل والديكور', 'sport-loisirs':'الرياضة والترفيه', 'beaute-sante':'الجمال والصحة',
};
const VILLES_AR = {
  casablanca:'الدار البيضاء', marrakech:'مراكش', fes:'فاس', rabat:'الرباط',
  tanger:'طنجة', agadir:'أكادير', errachidia:'الراشيدية', khenifra:'خنيفرة', safi:'آسفي',
};

const BENEFITS = [
  { Icon: ShieldCheck, label: 'متجر موثّق ومعتمد' },
  { Icon: Truck,       label: 'توصيل لكل المغرب'  },
  { Icon: RotateCcw,   label: 'إرجاع مجاني 30 يوماً' },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ════════════════════════════════════════════════════════
   المكوّن الرئيسي
═══════════════════════════════════════════════════════════ */
const ProduitDetailAR = () => {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const product     = ALL_PRODUCTS.find(p => p.id === Number(id));

  const [activeImg,  setActiveImg]  = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [liked,        setLiked]    = useState(false);

  /* منتجات مشابهة — نفس الفئة، بدون المنتج الحالي، بحد 4 */
  const similar = useMemo(() =>
    ALL_PRODUCTS
      .filter(p => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4),
    [product]
  );

  if (!product) return (
    <div className="pd-not-found" dir="rtl" lang="ar">
      <h2>المنتج غير موجود</h2>
      <button className="pd-back-btn" onClick={() => navigate('/منتجات')}>
        <ArrowRight size={16} /> العودة للمنتجات
      </button>
    </div>
  );

  const handleWhatsApp = (p = product) => {
    const size = selectedSize ? `\n📐 المقاس: ${selectedSize}` : '';
    const msg  = encodeURIComponent(
      `مرحباً! أنا مهتم بـ:\n\n🛍️ *${p.nom}*\n💰 السعر: ${p.prix.toLocaleString('fr-MA')} درهم\n📍 ${VILLES_AR[p.nom_ville] || p.nom_ville}${size}\n\nهل يمكنك مساعدتي؟`
    );
    window.open(`https://wa.me/212771887412?text=${msg}`, '_blank');
  };

  const images = product.images?.length ? product.images : [
    `https://images.unsplash.com/photo-${product.id}?w=800&h=600&fit=crop`
  ];

  return (
    <div className="pd-page" dir="rtl" lang="ar">

      {/* ── مسار التنقل ── */}
      <nav className="pd-breadcrumb">
        <button onClick={() => navigate('/منتجات')}>المنتجات</button>
        <ChevronRight size={13} strokeWidth={2} className="pd-bc-sep" />
        <span>{CATEGORY_AR[product.category]}</span>
        <ChevronRight size={13} strokeWidth={2} className="pd-bc-sep" />
        <span className="pd-bc-current">{product.nom}</span>
      </nav>

      {/* ════════════════════════════════════════════════════════
          القسم 1 — الصورة + التفاصيل
      ════════════════════════════════════════════════════════ */}
      <section className="pd-section-1">

        {/* ── معرض الصور ── */}
        <div className="pd-gallery">
          {/* صورة رئيسية */}
          <div className="pd-main-img-wrap">
            <img
              src={images[activeImg]}
              alt={product.nom}
              className="pd-main-img"
            />
            {/* زر المفضلة */}
            <button
              className={`pd-heart-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
              title="إضافة للمفضلة"
            >
              <Heart size={18} strokeWidth={2} fill={liked ? '#EF3B3C' : 'none'} color={liked ? '#EF3B3C' : '#888'} />
            </button>
            {/* زر المشاركة */}
            <button className="pd-share-btn" title="مشاركة">
              <Share2 size={16} strokeWidth={2} color="#888" />
            </button>
          </div>

          {/* صور مصغرة */}
          {images.length > 1 && (
            <div className="pd-thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`صورة ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── تفاصيل المنتج ── */}
        <div className="pd-details">

          {/* الفئة */}
          <span className="pd-category-tag">
            {CATEGORY_AR[product.category]}
          </span>

          {/* الاسم */}
          <h1 className="pd-name">{product.nom}</h1>

          {/* التقييم والمدينة */}
          <div className="pd-meta-row">
            <div className="pd-stars">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} strokeWidth={1.5}
                  fill={i <= 4 ? '#EF3B3C' : 'none'}
                  color={i <= 4 ? '#EF3B3C' : '#D1D1D1'} />
              ))}
              <span>(4.0)</span>
            </div>
            <span className="pd-location">
              <MapPin size={13} strokeWidth={2} />
              {VILLES_AR[product.nom_ville] || product.nom_ville}
            </span>
            <span className="pd-brand">🏷️ {product.marque}</span>
          </div>

          {/* السعر */}
          <div className="pd-price-wrap">
            <span className="pd-price">
              {product.prix.toLocaleString('fr-MA')}
              <small> درهم</small>
            </span>
          </div>

          {/* الوصف */}
          <p className="pd-description">{product.description}</p>

          {/* المقاسات */}
          {product.taille.length > 0 && (
            <div className="pd-sizes-section">
              <p className="pd-sizes-label">
                المقاس
                {selectedSize && <span className="pd-selected-size">: {selectedSize}</span>}
              </p>
              <div className="pd-sizes-grid">
                {product.taille.map(t => (
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

          {/* أزرار الطلب */}
          <div className="pd-cta">
            <button
              className="pd-wa-btn"
              onClick={() => handleWhatsApp()}
            >
              <WhatsAppIcon />
              اطلب عبر واتساب
            </button>
            <button
              className="pd-wa-btn-outline"
              onClick={() => handleWhatsApp()}
            >
              💬 استفسار
            </button>
          </div>

          {/* مميزات الضمان */}
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
          القسم 2 — منتجات مشابهة
      ════════════════════════════════════════════════════════ */}
      {similar.length > 0 && (
        <section className="pd-section-2">

          <div className="pd-similar-header">
            <div>
              <h2 className="pd-similar-title">منتجات مشابهة</h2>
              <p className="pd-similar-sub">قد يعجبك أيضاً من نفس الفئة</p>
            </div>
            <button
              className="pd-similar-link"
              onClick={() => navigate('/منتجات')}
            >
              عرض الكل
              <ArrowRight size={14} strokeWidth={2.5} className="pd-arrow-icon" />
            </button>
          </div>

          <div className="pd-similar-grid">
            {similar.map(p => (
              <div
                key={p.id}
                className="pd-sim-card"
                onClick={() => { navigate(`/منتج/${p.id}`); window.scrollTo(0, 0); }}
              >
                <div className="pd-sim-img-wrap">
                  <img
                    src={p.images?.[0] || `https://images.unsplash.com/photo-${p.id}?w=400&h=300&fit=crop`}
                    alt={p.nom}
                    className="pd-sim-img"
                  />
                  {/* Overlay واتساب */}
                  <div className="pd-sim-overlay">
                    <button
                      className="pd-sim-wa-btn"
                      onClick={e => { e.stopPropagation(); handleWhatsApp(p); }}
                    >
                      <WhatsAppIcon /> اطلب
                    </button>
                  </div>
                </div>
                <div className="pd-sim-body">
                  <span className="pd-sim-cat">{CATEGORY_AR[p.category]}</span>
                  <h3 className="pd-sim-name">{p.nom}</h3>
                  <div className="pd-sim-footer">
                    <span className="pd-sim-price">
                      {p.prix.toLocaleString('fr-MA')} <small>درهم</small>
                    </span>
                    <span className="pd-sim-ville">
                      <MapPin size={11} strokeWidth={2} />
                      {VILLES_AR[p.nom_ville] || p.nom_ville}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

    </div>
  );
};

export default ProduitDetailAR;