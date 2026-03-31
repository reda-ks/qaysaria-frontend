import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../../styles/pages css/produits_ar.css';


const ITEMS_PER_PAGE = 6;

/* ─── WhatsApp Icon ── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="17" height="17">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

/* ─── Data Maps ── */
const CATEGORY_AR = {
  '':                  'الكل',
  'mode-accessoires':  'الأزياء والإكسسوارات',
  'electronique-tech': 'الإلكترونيات والتقنية',
  'maison-decoration': 'المنزل والديكور',
  'sport-loisirs':     'الرياضة والترفيه',
  'beaute-sante':      'الجمال والصحة',
};
const CATEGORY_ICON = {
  '': '🛍️', 'mode-accessoires': '', 'electronique-tech': '',
  'maison-decoration': '', 'sport-loisirs': '', 'beaute-sante': '',
};
const VILLES_AR = {
  '': 'كل المدن', casablanca: 'الدار البيضاء', marrakech: 'مراكش',
  fes: 'فاس', rabat: 'الرباط', tanger: 'طنجة', agadir: 'أكادير',
  errachidia: 'الراشيدية', khenifra: 'خنيفرة', safi: 'آسفي',
};
// const COULEUR_AR = {
//   beige: 'بيج', bordeaux: 'بوردو', marron: 'بني', rouge: 'أحمر',
//   camel: 'كمل', or: 'ذهبي', noir: 'أسود', blanc: 'أبيض',
//   gris: 'رمادي', multicolore: 'متعدد الألوان', cuivre: 'نحاسي',
//   bleu: 'أزرق', vert: 'أخضر', violet: 'بنفسجي',
// };

/* ─── Products Data ── */
const allShops = [
  { id: 1, nom: 'جلابة رجالية فاخرة', description: 'صوف ميرينوس ناعم، قطعة عصرية بتطريز فاسي تقليدي يدوي الصنع.', prix: 850, nom_ville: 'fes', category: 'mode-accessoires', marque: 'حرفي محلي', taille: ['S', 'M', 'L', 'XL'], couleur: 'beige', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop' },
  { id: 2, nom: 'قفطان سهرة مطرّز', description: 'حرير طبيعي بتطريز بخيط ذهبي، مثالي للمناسبات الخاصة.', prix: 1400, nom_ville: 'casablanca', category: 'mode-accessoires', marque: 'بيت زهور', taille: ['S', 'M', 'L'], couleur: 'bordeaux', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=300&fit=crop' },
  { id: 3, nom: 'حقيبة جلد دباغة فاس', description: 'جلد أصيل مدبوغ يدوياً في دباغات فاس الشهيرة، مخيط باليد.', prix: 580, nom_ville: 'fes', category: 'mode-accessoires', marque: 'دباغة شوارة', taille: [], couleur: 'marron', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop' },
  { id: 4, nom: 'سترة أمازيغية مطرّزة', description: 'قماش دافئ بنقوش بربرية أصيلة، إصدار محدود يدوي الصنع من الجنوب.', prix: 760, nom_ville: 'agadir', category: 'mode-accessoires', marque: 'أطلس كرافت', taille: ['M', 'L', 'XL'], couleur: 'rouge', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop' },
  { id: 5, nom: 'وشاح صوف الصحراء', description: 'صوف الجمل بألوان الصحراء الطبيعية، ناعم ودافئ، نسيج يدوي.', prix: 175, nom_ville: 'errachidia', category: 'mode-accessoires', marque: 'صحراء وول', taille: [], couleur: 'camel', image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=300&fit=crop' },
  { id: 6, nom: 'بلغة جلد ذهبية', description: 'حذاء مغربي تقليدي من الجلد الطري، مطرّز يدوياً، لون ذهبي.', prix: 290, nom_ville: 'marrakech', category: 'mode-accessoires', marque: 'سوق الخير', taille: ['38', '39', '40', '41', '42', '43'], couleur: 'or', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop' },
  { id: 7, nom: 'سماعات لاسلكية احترافية', description: 'إلغاء ضوضاء نشط، 30 ساعة استخدام، بلوتوث 5.3، صوت عالي الجودة.', prix: 650, nom_ville: 'casablanca', category: 'electronique-tech', marque: 'ساوند برو', taille: [], couleur: 'noir', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop' },
  { id: 8, nom: 'ساعة ذكية رياضية', description: 'GPS مدمج، متابعة صحية 24/7، مقاومة للماء 50م، شاشة AMOLED، 7 أيام.', prix: 1290, nom_ville: 'rabat', category: 'electronique-tech', marque: 'فيت تيك', taille: [], couleur: 'noir', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop' },
  { id: 9, nom: 'تابلت 10 بوصة 4G', description: '128 جيجا تخزين، شاشة Full HD، 4G LTE، قلم مدمج، أندرويد 14.', prix: 2100, nom_ville: 'casablanca', category: 'electronique-tech', marque: 'ديجي تاب', taille: [], couleur: 'gris', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop' },
  { id: 10, nom: 'باور بانك 20,000 مللي أمبير', description: 'شحن سريع 65W، 3 منافذ USB-C وUSB-A، متوافق مع جميع الأجهزة.', prix: 320, nom_ville: 'tanger', category: 'electronique-tech', marque: 'تشارج بلاس', taille: [], couleur: 'blanc', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop' },
  { id: 11, nom: 'كاميرا مراقبة 4K', description: 'رؤية ليلية ملونة، واي فاي ثنائي النطاق، كشف حركة بالذكاء الاصطناعي.', prix: 480, nom_ville: 'marrakech', category: 'electronique-tech', marque: 'سيكيور كام', taille: [], couleur: 'blanc', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=300&fit=crop' },
  { id: 12, nom: 'لوحة مفاتيح ميكانيكية RGB', description: 'مفاتيح Blue تكتيلية، إضاءة RGB 16 مليون لون، USB-C، مضاد للغوست.', prix: 590, nom_ville: 'agadir', category: 'electronique-tech', marque: 'تايب فورس', taille: [], couleur: 'noir', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop' },
  { id: 13, nom: 'زربية بربرية يدوية الصنع', description: 'صوف بكر بنقوش أجداد الأطلس المتوسط، 200×150 سم، منسوجة يدوياً.', prix: 1800, nom_ville: 'khenifra', category: 'maison-decoration', marque: 'أطلس تاپي', taille: [], couleur: 'multicolore', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop' },
  { id: 14, nom: 'فانوس نحاس منقوش', description: 'فانوس حرفي من النحاس المطروق والمنقوش بزخارف عربية، ارتفاع 40 سم.', prix: 380, nom_ville: 'marrakech', category: 'maison-decoration', marque: 'نحاس آرت', taille: [], couleur: 'cuivre', image: 'https://images.unsplash.com/photo-1513506003901-1e6a35549579?w=400&h=300&fit=crop' },
  { id: 15, nom: 'طاجين خزف مزخرف', description: 'خزف حرفي من آسفي مرسوم يدوياً، نقوش زهرية، قطر 30 سم.', prix: 260, nom_ville: 'safi', category: 'maison-decoration', marque: 'فخاريات آسفي', taille: [], couleur: 'bleu', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop' },
  { id: 16, nom: 'صينية زليج فسيفساء', description: 'فايانس حرفي فاسي، فسيفساء هندسية تقليدية، قطر 50 سم.', prix: 490, nom_ville: 'fes', category: 'maison-decoration', marque: 'زليج فاس', taille: [], couleur: 'multicolore', image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=300&fit=crop' },
  { id: 17, nom: 'دراجة جبلية ألومنيوم 27.5"', description: 'إطار ألومنيوم خفيف، 21 سرعة شيمانو، فرامل قرصية هيدروليكية، فورك معلق.', prix: 3200, nom_ville: 'casablanca', category: 'sport-loisirs', marque: 'تريل رايدر', taille: ['S', 'M', 'L'], couleur: 'vert', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop' },
  { id: 18, nom: 'حصيرة يوغا مانعة للانزلاق', description: 'مطاط طبيعي سماكة 6 مم، سطح مانع للانزلاق، حزام نقل مضمّن.', prix: 220, nom_ville: 'rabat', category: 'sport-loisirs', marque: 'زن فلو', taille: [], couleur: 'violet', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
  { id: 19, nom: 'زيت أركان نقي BIO', description: 'زيت أركان 100% نقي وطبيعي، معتمد عضوياً، عصر بارد، متعدد الاستخدامات.', prix: 150, nom_ville: 'agadir', category: 'beaute-sante', marque: 'أركان غولد', taille: [], couleur: 'or', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' },
  { id: 20, nom: 'صابون بلدي حرفي', description: 'صابون مغربي تقليدي بزبدة الشيا وزيت الزيتون، مرطب ومنقٍّ، 300 غ.', prix: 55, nom_ville: 'fes', category: 'beaute-sante', marque: 'حمام بليس', taille: [], couleur: 'vert', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f025?w=400&h=300&fit=crop' },
];

/* ════ SUB-COMPONENTS ════ */

const VillesSelectorAr = ({ selectedVille, onVilleChange }) => (
  <div className="ar-villes-wrap">
    <div className="ar-villes-scroll">
      {Object.entries(VILLES_AR).map(([key, label]) => (
        <button
          key={key}
          className={`ar-ville-btn ${selectedVille === key ? 'active' : ''}`}
          onClick={() => onVilleChange(key)}
        >{label}</button>
      ))}
    </div>
  </div>
);

const FiltersSidebarAr = ({ filters, onFiltersChange, shops }) => {
  const allTailles  = [...new Set(shops.flatMap((s) => s.taille))].filter(Boolean);
  // const allCouleurs = [...new Set(shops.map((s) => s.couleur))].filter(Boolean);

  const toggle = (key, value) => {
    const arr = filters[key];
    onFiltersChange({ ...filters, [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] });
  };

  const hasActive = filters.category || filters.marques.length || filters.tailles.length || filters.couleurs.length || filters.prix.max < 15000;

  return (
    <div className="ar-sidebar-inner">
      <div className="ar-sidebar-head">
        <span className="ar-sidebar-title">🔧 الفلاتر</span>
        {hasActive && <button className="ar-sidebar-reset" onClick={() => onFiltersChange({ category: '', marques: [], tailles: [], couleurs: [], prix: { min: 0, max: 15000 } })}>إعادة ضبط</button>}
      </div>

      {/* Category */}
      <div className="ar-filter-block">
        <h4 className="ar-filter-label">الفئة</h4>
        <div className="ar-filter-cats">
          {Object.entries(CATEGORY_AR).map(([key, label]) => (
            <button
              key={key}
              className={`ar-cat-btn ${filters.category === key ? 'active' : ''}`}
              onClick={() => onFiltersChange({ ...filters, category: key })}
            >
              {CATEGORY_ICON[key]} {label}
            </button>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div className="ar-filter-block">
        <h4 className="ar-filter-label">
          السعر
          <span className="ar-price-range">حتى {filters.prix.max.toLocaleString()} درهم</span>
        </h4>
        <input
          type="range" min="0" max="15000" step="100"
          value={filters.prix.max}
          className="ar-range-input"
          onChange={(e) => onFiltersChange({ ...filters, prix: { ...filters.prix, max: +e.target.value } })}
        />
        <div className="ar-range-labels"><span>0</span><span>15,000 درهم</span></div>
      </div>


      {/* Tailles */}
      {allTailles.length > 0 && (
        <div className="ar-filter-block">
          <h4 className="ar-filter-label">المقاس</h4>
          <div className="ar-taille-grid">
            {allTailles.map((t) => (
              <button key={t} className={`ar-taille-btn ${filters.tailles.includes(t) ? 'active' : ''}`} onClick={() => toggle('tailles', t)}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {/* Couleurs */}
      {/* <div className="ar-filter-block">
        <h4 className="ar-filter-label">اللون</h4>
        <div className="ar-check-list">
          {allCouleurs.map((c) => (
            <label key={c} className="ar-check-row">
              <input type="checkbox" checked={filters.couleurs.includes(c)} onChange={() => toggle('couleurs', c)} />
              <span>{COULEUR_AR[c] || c}</span>
            </label>
          ))}
        </div>
      </div> */}
    </div>
  );
};

const PaginationAr = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end   = Math.min(currentPage * itemsPerPage, totalItems);
  return (
    <div className="ar-pagination">
      <span className="ar-pagination-info">عرض {start}–{end} من {totalItems}</span>
      <div className="ar-pagination-btns">
        <button className="ar-page-btn ar-page-nav" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>›</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} className={`ar-page-btn ${currentPage === p ? 'active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
        ))}
        <button className="ar-page-btn ar-page-nav" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>‹</button>
      </div>
    </div>
  );
};

/* ════ MAIN ════ */
const ProduitsAr = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [currentPage, setCurrentPage]     = useState(1);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('categorie') || '',
    marques: [], tailles: [], couleurs: [],
    prix: { min: 0, max: 15000 },
  });

  const resetPage = () => setCurrentPage(1);
  const handleFiltersChange = (f) => { setFilters(f); resetPage(); };
  const handleVilleChange   = (v) => { setSelectedVille(v); resetPage(); };
  const handleSearch        = (q) => { setSearchQuery(q); resetPage(); };

  const handleWhatsApp = (p) => {
    const msg = encodeURIComponent(`مرحباً! أنا مهتم بـ:\n\n🛍️ *${p.nom}*\n💰 السعر: ${p.prix.toLocaleString('fr-MA')} درهم\n📍 ${VILLES_AR[p.nom_ville] || p.nom_ville}\n\nهل يمكنك إعطائي مزيداً من المعلومات؟`);
    window.open(`https://wa.me/212771887412?text=${msg}`, '_blank');
  };

  const filtered = useMemo(() => allShops.filter((s) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!s.nom.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q) && !s.nom_ville.toLowerCase().includes(q) && !s.marque.toLowerCase().includes(q)) return false;
    }
    if (selectedVille && s.nom_ville !== selectedVille) return false;
    if (filters.category && s.category !== filters.category) return false;
    if (filters.marques.length && !filters.marques.includes(s.marque)) return false;
    if (filters.tailles.length && !filters.tailles.some((t) => s.taille.includes(t))) return false;
    if (filters.couleurs.length && !filters.couleurs.includes(s.couleur)) return false;
    if (s.prix < filters.prix.min || s.prix > filters.prix.max) return false;
    return true;
  }), [searchQuery, filters, selectedVille]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const hasFilters = filters.category || filters.marques.length || filters.tailles.length || filters.couleurs.length || filters.prix.max < 15000;

  return (
    <div className="ar-produits-page" dir="rtl" lang="ar">

      {/* HERO */}
      <div className="ar-produits-hero">
        <div className="ar-produits-hero-inner">
          <span className="ar-produits-hero-tag">🇲🇦 سوق المغرب الرقمي</span>
          <h1 className="ar-produits-hero-title">اكتشف منتجاتنا</h1>
          <p className="ar-produits-hero-sub">الحرف اليدوية وأفضل منتجات المتاجر المغربية الموثّقة</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="ar-search-wrap">
        <div className="ar-search-bar">
          <SearchIcon />
          <input
            type="text"
            className="ar-search-input"
            placeholder="ابحث عن منتج، ماركة، مدينة..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); handleSearch(e.target.value); }}
            dir="rtl"
          />
          {searchQuery && <button className="ar-search-clear" onClick={() => { setSearchQuery(''); handleSearch(''); }}>✕</button>}
        </div>
      </div>

      {/* VILLES */}
      <VillesSelectorAr selectedVille={selectedVille} onVilleChange={handleVilleChange} />

      {/* MOBILE FILTER TOGGLE */}
      <div className="ar-mobile-bar">
        <button className={`ar-mobile-filter-btn ${hasFilters ? 'has-filters' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
          🔧 الفلاتر {hasFilters && <span className="ar-filter-dot" />}
        </button>
        <span className="ar-mobile-count"><strong>{filtered.length}</strong> منتج</span>
      </div>

      {/* LAYOUT */}
      <div className="ar-produits-layout">

        <aside className={`ar-produits-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <FiltersSidebarAr filters={filters} onFiltersChange={handleFiltersChange} shops={allShops} />
        </aside>

        <div className="ar-produits-main">

          {/* Results bar */}
          <div className="ar-results-bar">
            <div className="ar-results-left">
              {searchQuery && (
                <span className="ar-search-tag">
                  🔍 &quot;{searchQuery}&quot;
                  <button onClick={() => { setSearchQuery(''); handleSearch(''); }} className="ar-search-tag-clear">✕</button>
                </span>
              )}
              <span className="ar-results-count">
                <strong>{filtered.length}</strong> منتج{filtered.length !== 1 ? '' : ''} وجد
              </span>
            </div>
          </div>

          {/* Cards */}
          {paginated.length > 0 ? (
            <div className="ar-produits-grid">
              {paginated.map((product) => (
                <div key={product.id} className="ar-p-card">

                  <div className="ar-p-card-img-wrap">
                    <img src={product.image} alt={product.nom} className="ar-p-card-img" loading="lazy" />
                  </div>

                  <div className="ar-p-card-body">
                    <div className="ar-p-card-meta">
                      <span className="ar-p-card-category">
                        {CATEGORY_ICON[product.category]} {CATEGORY_AR[product.category]}
                      </span>
                      <span className="ar-p-card-ville">
                        📍 {VILLES_AR[product.nom_ville] || product.nom_ville}
                      </span>
                    </div>

                    <h3 className="ar-p-card-name">{product.nom}</h3>
                    <p className="ar-p-card-desc">{product.description}</p>

                    {product.taille.length > 0 && (
                      <div className="ar-p-card-sizes">
                        {product.taille.map((t) => <span key={t} className="ar-size-chip">{t}</span>)}
                      </div>
                    )}

                    <div className="ar-p-card-footer">
                      <div className="ar-p-card-price">
                        {product.prix.toLocaleString('fr-MA')}
                        <small> درهم</small>
                      </div>
                      <button className="ar-p-card-wa" onClick={() => handleWhatsApp(product)}>
                        <WhatsAppIcon />
                        <span>واتساب</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="ar-produits-empty">
              <div className="ar-empty-icon">🔍</div>
              <h3>لم يُعثر على منتجات</h3>
              <p>حاول تعديل الفلاتر أو مصطلح البحث</p>
              <button className="ar-btn-reset" onClick={() => { setSearchQuery(''); handleSearch(''); handleVilleChange(''); handleFiltersChange({ category: '', marques: [], tailles: [], couleurs: [], prix: { min: 0, max: 15000 } }); }}>
                إعادة ضبط الفلاتر
              </button>
            </div>
          )}

          <PaginationAr
            currentPage={currentPage} totalPages={totalPages}
            onPageChange={setCurrentPage} totalItems={filtered.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />

        </div>
      </div>
    </div>
  );
};

export default ProduitsAr;