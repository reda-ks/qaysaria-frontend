import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../styles/pages css/produits.css';
import VillesSelector from '../../composants/VillesSelector';
import FiltersSidebar from '../../composants/FiltersSidebar';
import Pagination from '../../composants/Pagination';
import SearchBar from '../../composants/SearchBar';

const ITEMS_PER_PAGE = 6;

/* ─────────────────────────────────────────────────────────
data fake ───────────────────────────────────────────────────────── */
const allShops = [
  /* ── MODE & ACCESSOIRES ── */
  {
    id: 1,
    nom: 'Djellaba Homme Luxe',
    description: 'Laine mérinos fine, coupe moderne avec broderie traditionnelle fassie faite à la main.',
    prix: 850,
    nom_ville: 'fes',
    category: 'mode-accessoires',
    marque: 'Artisan Local',
    taille: ['S', 'M', 'L', 'XL'],
    couleur: 'beige',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    nom: 'Caftan Soirée Brodé',
    description: 'Soie naturelle avec broderies en fil doré, parfait pour les occasions spéciales.',
    prix: 1400,
    nom_ville: 'casablanca',
    category: 'mode-accessoires',
    marque: 'Maison Zhor',
    taille: ['S', 'M', 'L'],
    couleur: 'bordeaux',
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    nom: 'Sac Cuir Tannerie Fès',
    description: 'Cuir véritable tanné artisanalement dans les célèbres tanneries de Fès, cousu main.',
    prix: 580,
    nom_ville: 'fes',
    category: 'mode-accessoires',
    marque: 'Tannerie Chouara',
    taille: [],
    couleur: 'marron',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    nom: 'Veste Amazigh Brodée',
    description: 'Tissu chaud aux motifs berbères authentiques, édition limitée artisanale du Sud.',
    prix: 760,
    nom_ville: 'agadir',
    category: 'mode-accessoires',
    marque: 'Atlas Craft',
    taille: ['M', 'L', 'XL'],
    couleur: 'rouge',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop',
  },
  {
    id: 5,
    nom: 'Écharpe Laine Sahara',
    description: 'Laine de chameau aux teintes naturelles du désert, douce et chaude, tissage main.',
    prix: 175,
    nom_ville: 'errachidia',
    category: 'mode-accessoires',
    marque: 'Sahara Wool',
    taille: [],
    couleur: 'camel',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=300&fit=crop',
  },
  {
    id: 6,
    nom: 'Babouches Cuir Dorées',
    description: 'Chaussures traditionnelles marocaines en cuir souple, brodées à la main, couleur dorée.',
    prix: 290,
    nom_ville: 'marrakech',
    category: 'mode-accessoires',
    marque: 'Souk El Khair',
    taille: ['38', '39', '40', '41', '42', '43'],
    couleur: 'or',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
  },

  /* ── ÉLECTRONIQUE & TECH ── */
  {
    id: 7,
    nom: 'Écouteurs Sans Fil Pro',
    description: 'Réduction active du bruit, 30h d\'autonomie, Bluetooth 5.3, son hi-fi certifié.',
    prix: 650,
    nom_ville: 'casablanca',
    category: 'electronique-tech',
    marque: 'SoundPro',
    taille: [],
    couleur: 'noir',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  },
  {
    id: 8,
    nom: 'Montre Connectée Sport',
    description: 'GPS intégré, suivi santé 24/7, étanche 50m, autonomie 7 jours, écran AMOLED.',
    prix: 1290,
    nom_ville: 'rabat',
    category: 'electronique-tech',
    marque: 'FitTech',
    taille: [],
    couleur: 'noir',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
  },
  {
    id: 9,
    nom: 'Tablette 10 Pouces 4G',
    description: '128 Go de stockage, écran Full HD 10 pouces, 4G LTE, stylet inclus, Android 14.',
    prix: 2100,
    nom_ville: 'casablanca',
    category: 'electronique-tech',
    marque: 'DigiTab',
    taille: [],
    couleur: 'gris',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
  },
  {
    id: 10,
    nom: 'Powerbank 20 000 mAh',
    description: 'Charge rapide 65W, 3 ports USB-C & USB-A, compatible tous smartphones et laptops.',
    prix: 320,
    nom_ville: 'tanger',
    category: 'electronique-tech',
    marque: 'ChargePlus',
    taille: [],
    couleur: 'blanc',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop',
  },
  {
    id: 11,
    nom: 'Caméra Surveillance 4K',
    description: 'Vision nocturne couleur, WiFi double bande, détection mouvement IA, stockage cloud.',
    prix: 480,
    nom_ville: 'marrakech',
    category: 'electronique-tech',
    marque: 'SecureCam',
    taille: [],
    couleur: 'blanc',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&h=300&fit=crop',
  },
  {
    id: 12,
    nom: 'Clavier Mécanique RGB',
    description: 'Switches Blue tactiles, rétroéclairage RGB 16M couleurs, anti-ghosting total, USB-C.',
    prix: 590,
    nom_ville: 'agadir',
    category: 'electronique-tech',
    marque: 'TypeForce',
    taille: [],
    couleur: 'noir',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop',
  },

  /* ── MAISON & DÉCORATION ── */
  {
    id: 13,
    nom: 'Tapis Berbère Fait Main',
    description: 'Laine vierge aux motifs ancestraux du Moyen Atlas, 200×150 cm, tissé à la main.',
    prix: 1800,
    nom_ville: 'khenifra',
    category: 'maison-decoration',
    marque: 'Atlas Tapis',
    taille: [],
    couleur: 'multicolore',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
  },
  {
    id: 14,
    nom: 'Lanterne Cuivre Ciselée',
    description: 'Lanterne artisanale en cuivre martelé et ciselé, style arabesque, hauteur 40 cm.',
    prix: 380,
    nom_ville: 'marrakech',
    category: 'maison-decoration',
    marque: 'Cuivre Art',
    taille: [],
    couleur: 'cuivre',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a35549579?w=400&h=300&fit=crop',
  },
  {
    id: 15,
    nom: 'Tajine Décoratif Émaillé',
    description: 'Céramique artisanale de Safi peinte à la main, motifs floraux, diamètre 30 cm.',
    prix: 260,
    nom_ville: 'safi',
    category: 'maison-decoration',
    marque: 'Poteries Safi',
    taille: [],
    couleur: 'bleu',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=300&fit=crop',
  },
  {
    id: 16,
    nom: 'Plateau Zellige Mosaïque',
    description: 'Faïence artisanale de Fès, mosaïque géométrique traditionnelle, diamètre 50 cm.',
    prix: 490,
    nom_ville: 'fes',
    category: 'maison-decoration',
    marque: 'Zellige Fès',
    taille: [],
    couleur: 'multicolore',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=400&h=300&fit=crop',
  },

  /* ── SPORT & LOISIRS ── */
  {
    id: 17,
    nom: 'Vélo VTT Aluminium 27.5"',
    description: 'Cadre aluminium léger, 21 vitesses Shimano, freins à disque hydrauliques, fourche suspendue.',
    prix: 3200,
    nom_ville: 'casablanca',
    category: 'sport-loisirs',
    marque: 'TrailRider',
    taille: ['S', 'M', 'L'],
    couleur: 'vert',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  },
  {
    id: 18,
    nom: 'Tapis de Yoga Antidérapant',
    description: 'Caoutchouc naturel 6mm d\'épaisseur, surface antidérapante, sangle de transport incluse.',
    prix: 220,
    nom_ville: 'rabat',
    category: 'sport-loisirs',
    marque: 'ZenFlow',
    taille: [],
    couleur: 'violet',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  },

  /* ── BEAUTÉ & SANTÉ ── */
  {
    id: 19,
    nom: 'Huile d\'Argan Pure BIO',
    description: 'Huile d\'argan 100% pure et naturelle, certifiée bio, pressée à froid, multi-usages.',
    prix: 150,
    nom_ville: 'agadir',
    category: 'beaute-sante',
    marque: 'Argan Gold',
    taille: [],
    couleur: 'or',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
  },
  {
    id: 20,
    nom: 'Savon Beldi Artisanal',
    description: 'Savon traditionnel marocain au karité et huile d\'olive, hydratant et purifiant, 300g.',
    prix: 55,
    nom_ville: 'fes',
    category: 'beaute-sante',
    marque: 'Hammam Bliss',
    taille: [],
    couleur: 'vert',
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f025?w=400&h=300&fit=crop',
  },
];

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
const Produits = () => {
  const [searchParams] = useSearchParams();
  const categorieFromUrl = searchParams.get('categorie') || '';

  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [currentPage, setCurrentPage]     = useState(1);
  const [filters, setFilters] = useState({
    category: categorieFromUrl,
    marques: [],
    tailles: [],
    couleurs: [],
    prix: { min: 0, max: 15000 },
  });

  const resetPage = () => setCurrentPage(1);

  const handleFiltersChange = (newFilters) => { setFilters(newFilters); resetPage(); };
  const handleVilleChange   = (ville)      => { setSelectedVille(ville); resetPage(); };
  const handleSearch        = (query)      => { setSearchQuery(query); resetPage(); };

  /* WhatsApp */
  const handleWhatsApp = (product) => {
    const message = encodeURIComponent(
      `Bonjour ! Je suis intéressé(e) par :\n\n` +
      `🛍️ *${product.nom}*\n` +
      `💰 Prix : ${product.prix.toLocaleString('fr-MA')} MAD\n` +
      `📍 Ville : ${product.nom_ville.charAt(0).toUpperCase() + product.nom_ville.slice(1)}\n\n` +
      `Pouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/212771887412?text=${message}`, '_blank');
  };

  const filteredShops = useMemo(() => {
    return allShops.filter((shop) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match =
          shop.nom.toLowerCase().includes(q) ||
          shop.description.toLowerCase().includes(q) ||
          shop.nom_ville.toLowerCase().includes(q) ||
          shop.marque.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedVille && shop.nom_ville !== selectedVille) return false;
      if (filters.category && shop.category !== filters.category) return false;
      if (filters.marques.length > 0 && !filters.marques.includes(shop.marque)) return false;
      if (filters.tailles.length > 0 && !filters.tailles.some((t) => shop.taille.includes(t))) return false;
      if (filters.couleurs.length > 0 && !filters.couleurs.includes(shop.couleur)) return false;
      if (shop.prix < filters.prix.min || shop.prix > filters.prix.max) return false;
      return true;
    });
  }, [searchQuery, filters, selectedVille]);

  const totalPages     = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const paginatedShops = filteredShops.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  return (
    <div className="produits-page">

      {/* ── PAGE HEADER ── */}
      <div className="produits-hero">
        <div className="produits-hero-inner">
          <span className="produits-hero-tag">🇲🇦 Marketplace du Maroc</span>
          <h1 className="produits-hero-title">Explorez nos Produits</h1>
          <p className="produits-hero-sub">
            Découvrez l'artisanat et les meilleurs produits des boutiques marocaines vérifiées
          </p>
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      <div className="produits-search-wrap">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      {/* ── VILLES SELECTOR ── */}
      <VillesSelector selectedVille={selectedVille} onVilleChange={handleVilleChange} />

      {/* ── MAIN LAYOUT ── */}
      <div className="produits-layout">

        {/* Sidebar filters */}
        <aside className="produits-sidebar">
          <FiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />
        </aside>

        {/* Grid area */}
        <div className="produits-main">

          {/* Results bar */}
          <div className="produits-results-bar">
            <div className="results-left">
              {searchQuery && (
                <span className="search-tag">
                  🔍 &ldquo;{searchQuery}&rdquo;
                  <button onClick={() => handleSearch('')} className="search-tag-clear">✕</button>
                </span>
              )}
              <span className="results-count">
                <strong>{filteredShops.length}</strong>{' '}
                produit{filteredShops.length !== 1 ? 's' : ''} trouvé{filteredShops.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Cards grid */}
          {paginatedShops.length > 0 ? (
            <div className="produits-grid">
              {paginatedShops.map((product) => (
                <div key={product.id} className="p-card">

                  {/* Image — no hover overlay, no badge */}
                  <div className="p-card-img-wrap">
                    <img
                      src={product.image}
                      alt={product.nom}
                      className="p-card-img"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-card-body">

                    <div className="p-card-meta">
                      <span className="p-card-category">{product.category.replace(/-/g, ' & ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                      <span className="p-card-ville"> {product.nom_ville.charAt(0).toUpperCase() + product.nom_ville.slice(1)}</span>
                    </div>

                    <h3 className="p-card-name">{product.nom}</h3>
                    <p className="p-card-desc">{product.description}</p>

                    <div className="p-card-footer">
                      <div className="p-card-price">
                        {product.prix.toLocaleString('fr-MA')}
                        <small> MAD</small>
                      </div>
                      <button
                        className="p-card-wa"
                        onClick={() => handleWhatsApp(product)}
                        title="Commander via WhatsApp"
                      >
                        <WhatsAppIcon />
                        <span>WhatsApp</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="produits-empty">
              <div className="empty-icon">🔍</div>
              <h3>Aucun produit trouvé</h3>
              <p>Essayez d'ajuster vos filtres ou votre recherche</p>
              <button className="btn-reset" onClick={() => { handleSearch(''); handleVilleChange(''); handleFiltersChange({ category: '', marques: [], tailles: [], couleurs: [], prix: { min: 0, max: 15000 } }); }}>
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredShops.length}
            itemsPerPage={ITEMS_PER_PAGE}
          />

        </div>
      </div>
    </div>
  );
};

export default Produits;