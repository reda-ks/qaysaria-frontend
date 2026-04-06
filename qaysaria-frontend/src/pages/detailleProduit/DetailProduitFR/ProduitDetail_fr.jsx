import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Star, ShieldCheck, Truck, RotateCcw,
  ChevronLeft, ArrowLeft, Share2, Heart
} from 'lucide-react';
import '../../../styles/pages css/detailleProduit_fr.css';

/* ════════════════════════════════════════════════════════
   DONNÉES — même que page produits FR
═══════════════════════════════════════════════════════════ */
const ALL_PRODUCTS = [
  { id:1,  nom:'Djellaba Homme Luxe',          description:'Laine mérinos fine, coupe moderne avec broderie traditionnelle fassie faite à la main.',               prix:850,  nom_ville:'fes',        category:'mode-accessoires',  marque:'Artisan Local',    taille:['S','M','L','XL'], images:['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=600&fit=crop'] },
  { id:2,  nom:'Caftan Soirée Brodé',           description:'Soie naturelle avec broderies en fil doré, parfait pour les occasions spéciales et mariages.',          prix:1400, nom_ville:'casablanca', category:'mode-accessoires',  marque:'Maison Zhor',      taille:['S','M','L'],      images:['https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop'] },
  { id:3,  nom:'Sac Cuir Tannerie Fès',         description:'Cuir véritable tanné artisanalement dans les célèbres tanneries de Fès, cousu main avec précision.',   prix:580,  nom_ville:'fes',        category:'mode-accessoires',  marque:'Tannerie Chouara', taille:[],                 images:['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop'] },
  { id:4,  nom:'Veste Amazigh Brodée',           description:'Tissu chaud aux motifs berbères authentiques, édition limitée artisanale du Sud marocain.',             prix:760,  nom_ville:'agadir',     category:'mode-accessoires',  marque:'Atlas Craft',      taille:['M','L','XL'],     images:['https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=600&fit=crop'] },
  { id:5,  nom:'Écharpe Laine Sahara',           description:'Laine de chameau aux teintes naturelles du désert, douce et chaude, tissage main authentique.',         prix:175,  nom_ville:'errachidia', category:'mode-accessoires',  marque:'Sahara Wool',      taille:[],                 images:['https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=600&fit=crop'] },
  { id:6,  nom:'Babouches Cuir Dorées',          description:'Chaussures traditionnelles marocaines en cuir souple, brodées à la main, couleur dorée luxueuse.',       prix:290,  nom_ville:'marrakech',  category:'mode-accessoires',  marque:'Souk El Khair',    taille:['38','39','40','41','42','43'], images:['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=600&fit=crop'] },
  { id:7,  nom:'Écouteurs Sans Fil Pro',         description:'Réduction active du bruit, 30h d\'autonomie, Bluetooth 5.3, son hi-fi certifié pour audiophiles.',       prix:650,  nom_ville:'casablanca', category:'electronique-tech', marque:'SoundPro',         taille:[],                 images:['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop'] },
  { id:8,  nom:'Montre Connectée Sport',         description:'GPS intégré, suivi santé 24/7, étanche 50m, autonomie 7 jours, écran AMOLED lumineux.',                  prix:1290, nom_ville:'rabat',      category:'electronique-tech', marque:'FitTech',          taille:[],                 images:['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop'] },
  { id:9,  nom:'Tablette 10 Pouces 4G',          description:'128 Go de stockage, écran Full HD 10 pouces, 4G LTE, stylet inclus, Android 14 dernière version.',       prix:2100, nom_ville:'casablanca', category:'electronique-tech', marque:'DigiTab',          taille:[],                 images:['https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop'] },
  { id:10, nom:'Powerbank 20 000 mAh',           description:'Charge rapide 65W, 3 ports USB-C & USB-A, compatible tous smartphones et ordinateurs portables.',        prix:320,  nom_ville:'tanger',     category:'electronique-tech', marque:'ChargePlus',       taille:[],                 images:['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop'] },
  { id:11, nom:'Caméra Surveillance 4K',         description:'Vision nocturne couleur, WiFi double bande, détection mouvement IA, stockage cloud inclus.',             prix:480,  nom_ville:'marrakech',  category:'electronique-tech', marque:'SecureCam',        taille:[],                 images:['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop'] },
  { id:12, nom:'Clavier Mécanique RGB',          description:'Switches Blue tactiles, rétroéclairage RGB 16M couleurs, anti-ghosting total, connecteur USB-C.',       prix:590,  nom_ville:'agadir',     category:'electronique-tech', marque:'TypeForce',        taille:[],                 images:['https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=600&fit=crop'] },
  { id:13, nom:'Tapis Berbère Fait Main',        description:'Laine vierge aux motifs ancestraux du Moyen Atlas, 200×150 cm, entièrement tissé à la main.',           prix:1800, nom_ville:'khenifra',   category:'maison-decoration', marque:'Atlas Tapis',      taille:[],                 images:['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop'] },
  { id:14, nom:'Lanterne Cuivre Ciselée',        description:'Lanterne artisanale en cuivre martelé et ciselé, style arabesque authentique, hauteur 40 cm.',          prix:380,  nom_ville:'marrakech',  category:'maison-decoration', marque:'Cuivre Art',       taille:[],                 images:['https://images.unsplash.com/photo-1513506003901-1e6a35549579?w=800&h=600&fit=crop'] },
  { id:15, nom:'Tajine Décoratif Émaillé',       description:'Céramique artisanale de Safi peinte à la main, motifs floraux magnifiques, diamètre 30 cm.',            prix:260,  nom_ville:'safi',       category:'maison-decoration', marque:'Poteries Safi',    taille:[],                 images:['https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=600&fit=crop'] },
  { id:16, nom:'Plateau Zellige Mosaïque',       description:'Faïence artisanale de Fès, mosaïque géométrique traditionnelle somptueuse, diamètre 50 cm.',            prix:490,  nom_ville:'fes',        category:'maison-decoration', marque:'Zellige Fès',      taille:[],                 images:['https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&h=600&fit=crop'] },
  { id:17, nom:'Vélo VTT Aluminium 27.5"',       description:'Cadre aluminium léger, 21 vitesses Shimano, freins à disque hydrauliques, fourche suspendue.',          prix:3200, nom_ville:'casablanca', category:'sport-loisirs',     marque:'TrailRider',       taille:['S','M','L'],      images:['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'] },
  { id:18, nom:'Tapis de Yoga Antidérapant',     description:'Caoutchouc naturel 6mm d\'épaisseur, surface antidérapante premium, sangle de transport incluse.',       prix:220,  nom_ville:'rabat',      category:'sport-loisirs',     marque:'ZenFlow',          taille:[],                 images:['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'] },
  { id:19, nom:'Huile d\'Argan Pure BIO',        description:'Huile d\'argan 100% pure et naturelle, certifiée bio, pressée à froid, multi-usages beauté.',            prix:150,  nom_ville:'agadir',     category:'beaute-sante',      marque:'Argan Gold',       taille:[],                 images:['https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop'] },
  { id:20, nom:'Savon Beldi Artisanal',          description:'Savon traditionnel marocain au karité et huile d\'olive, hydratant et purifiant naturellement, 300g.',   prix:55,   nom_ville:'fes',        category:'beaute-sante',      marque:'Hammam Bliss',     taille:[],                 images:['https://images.unsplash.com/photo-1600857062241-98e5dba7f025?w=800&h=600&fit=crop'] },
];

const CATEGORY_FR = {
  'mode-accessoires':  'Mode & Accessoires',
  'electronique-tech': 'Électronique & Tech',
  'maison-decoration': 'Maison & Décoration',
  'sport-loisirs':     'Sport & Loisirs',
  'beaute-sante':      'Beauté & Santé',
};

const VILLES_FR = {
  casablanca:'Casablanca', marrakech:'Marrakech', fes:'Fès', rabat:'Rabat',
  tanger:'Tanger', agadir:'Agadir', errachidia:'Errachidia',
  khenifra:'Khénifra', safi:'Safi',
};

const BENEFITS = [
  { Icon: ShieldCheck, label: 'Boutique vérifiée & certifiée'    },
  { Icon: Truck,       label: 'Livraison partout au Maroc'        },
  { Icon: RotateCcw,   label: 'Retour gratuit sous 30 jours'      },
];

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
═══════════════════════════════════════════════════════════ */
const ProduitDetail = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const product  = ALL_PRODUCTS.find(p => p.id === Number(id));

  const [activeImg,    setActiveImg]    = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [liked,        setLiked]        = useState(false);

  /* Produits similaires — même catégorie, sans le produit actuel, max 4 */
  const similar = useMemo(() =>
    ALL_PRODUCTS
      .filter(p => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4),
    [product]
  );

  if (!product) return (
    <div className="pd-not-found">
      <h2>Produit introuvable</h2>
      <button className="pd-back-btn" onClick={() => navigate('/produits')}>
        <ArrowLeft size={16} /> Retour aux produits
      </button>
    </div>
  );

  const handleWhatsApp = (p = product) => {
    const size = selectedSize ? `\n📐 Taille : ${selectedSize}` : '';
    const msg  = encodeURIComponent(
      `Bonjour ! Je suis intéressé(e) par :\n\n🛍️ *${p.nom}*\n💰 Prix : ${p.prix.toLocaleString('fr-MA')} MAD\n📍 ${VILLES_FR[p.nom_ville] || p.nom_ville}${size}\n\nPouvez-vous me donner plus d'informations ?`
    );
    window.open(`https://wa.me/212771887412?text=${msg}`, '_blank');
  };

  const images = product.images?.length ? product.images : [];

  return (
    <div className="pd-page">

      {/* ── Fil d'Ariane ── */}
      <nav className="pd-breadcrumb">
        <button onClick={() => navigate('/produits')}>Produits</button>
        <ChevronLeft size={13} strokeWidth={2} className="pd-bc-sep" />
        <span>{CATEGORY_FR[product.category]}</span>
        <ChevronLeft size={13} strokeWidth={2} className="pd-bc-sep" />
        <span className="pd-bc-current">{product.nom}</span>
      </nav>

      {/* ════════════════════════════════════════════════════════
          SECTION 1 — Image + Détails
      ════════════════════════════════════════════════════════ */}
      <section className="pd-section-1">

        {/* ── Galerie ── */}
        <div className="pd-gallery">

          {/* Image principale */}
          <div className="pd-main-img-wrap">
            <img
              src={images[activeImg] || images[0]}
              alt={product.nom}
              className="pd-main-img"
            />
            <button
              className={`pd-heart-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
              title="Ajouter aux favoris"
            >
              <Heart size={18} strokeWidth={2} fill={liked ? '#EF3B3C' : 'none'} color={liked ? '#EF3B3C' : '#888'} />
            </button>
            <button className="pd-share-btn" title="Partager">
              <Share2 size={16} strokeWidth={2} color="#888" />
            </button>
          </div>

          {/* Miniatures */}
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
            {CATEGORY_FR[product.category]}
          </span>

          <h1 className="pd-name">{product.nom}</h1>

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
              {VILLES_FR[product.nom_ville] || product.nom_ville}
            </span>
            <span className="pd-brand">🏷️ {product.marque}</span>
          </div>

          <div className="pd-price-wrap">
            <span className="pd-price">
              {product.prix.toLocaleString('fr-MA')}
              <small> MAD</small>
            </span>
          </div>

          <p className="pd-description">{product.description}</p>

          {/* Tailles */}
          {product.taille.length > 0 && (
            <div className="pd-sizes-section">
              <p className="pd-sizes-label">
                Taille
                {selectedSize && <span className="pd-selected-size"> : {selectedSize}</span>}
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
      {similar.length > 0 && (
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

          <div className="pd-similar-grid">
            {similar.map(p => (
              <div
                key={p.id}
                className="pd-sim-card"
                onClick={() => { navigate(`/produit/${p.id}`); window.scrollTo(0, 0); }}
              >
                <div className="pd-sim-img-wrap">
                  <img
                    src={p.images?.[0]}
                    alt={p.nom}
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
                  <span className="pd-sim-cat">{CATEGORY_FR[p.category]}</span>
                  <h3 className="pd-sim-name">{p.nom}</h3>
                  <div className="pd-sim-footer">
                    <span className="pd-sim-price">
                      {p.prix.toLocaleString('fr-MA')} <small>MAD</small>
                    </span>
                    <span className="pd-sim-ville">
                      <MapPin size={11} strokeWidth={2} />
                      {VILLES_FR[p.nom_ville] || p.nom_ville}
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

export default ProduitDetail;