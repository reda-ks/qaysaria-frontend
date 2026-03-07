import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../styles/pages css/produits.css';
import { useNavigate } from 'react-router-dom';
import VillesSelector from '../../composants/VillesSelector';
import FiltersSidebar from '../../composants/FiltersSidebar';
import Pagination from '../../composants/Pagination';
import '../../styles/pages css/produits.css';

const ITEMS_PER_PAGE = 6;

const allShops = [
  {
    id: 1,
    name: 'Boutique Marrakech Style',
    city: 'marrakech',
    rating: 4.8,
    badge: 'Vérifié',
    category: 'mode-accessoires',
    marque: 'Zara',
    taille: ['S', 'M', 'L'],
    couleur: 'noir',
    prix: 350,
    image: 'https://images.unsplash.com/photo-1595777707802-221b84ce8dd9?w=400&h=300&fit=crop',
    description: 'Mode et accessoires haut de gamme',
  },
  {
    id: 2,
    name: 'Fès Fashion Hub',
    city: 'fes',
    rating: 4.9,
    badge: 'Top Vendeur',
    category: 'mode-accessoires',
    marque: 'H&M',
    taille: ['M', 'XL'],
    couleur: 'bleu',
    prix: 210,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop',
    description: 'Tendances fashion modernes',
  },
  {
    id: 3,
    name: 'Nike Rabat Store',
    city: 'rabat',
    rating: 4.7,
    badge: 'Vérifié',
    category: 'sport-loisirs',
    marque: 'Nike',
    taille: ['S', 'M', 'L', 'XL'],
    couleur: 'rouge',
    prix: 799,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    description: 'Chaussures et vêtements sport',
  },
  {
    id: 4,
    name: 'Adidas Tanger',
    city: 'tanger',
    rating: 4.6,
    badge: 'Nouveau',
    category: 'sport-loisirs',
    marque: 'Adidas',
    taille: ['XS', 'S', 'M'],
    couleur: 'blanc',
    prix: 650,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=400&h=300&fit=crop',
    description: 'Sportswear et lifestyle',
  },
  {
    id: 5,
    name: 'Beauté Agadir',
    city: 'agadir',
    rating: 4.5,
    badge: 'Vérifié',
    category: 'beaute-sante',
    marque: 'Zara',
    taille: [],
    couleur: 'rose',
    prix: 180,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    description: 'Cosmétiques et soins naturels',
  },
  {
    id: 6,
    name: 'Apple Store Casablanca',
    city: 'casablanca',
    rating: 5.0,
    badge: 'Top Vendeur',
    category: 'electronique-tech',
    marque: 'Apple',
    taille: [],
    couleur: 'gris',
    prix: 12999,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&h=300&fit=crop',
    description: 'iPhone, Mac et accessoires Apple',
  },
  {
    id: 7,
    name: 'Tech Maroc Casablanca',
    city: 'casablanca',
    rating: 4.8,
    badge: 'Top Vendeur',
    category: 'electronique-tech',
    marque: 'Samsung',
    taille: [],
    couleur: 'noir',
    prix: 4500,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Appareils électroniques premium',
  },
  {
    id: 8,
    name: 'Décor Marrakech',
    city: 'marrakech',
    rating: 4.9,
    badge: 'Artisan',
    category: 'maison-decoration',
    marque: 'H&M',
    taille: [],
    couleur: 'jaune',
    prix: 420,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    description: 'Artisanat et déco marocaine',
  },
  {
    id: 9,
    name: 'Sport Meknès',
    city: 'meknes',
    rating: 4.4,
    badge: 'Vérifié',
    category: 'sport-loisirs',
    marque: 'Nike',
    taille: ['L', 'XL', 'XXL'],
    couleur: 'vert',
    prix: 560,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'Équipements sportifs complets',
  },
  {
    id: 13,
    name: 'Décor Maroc Premium',
    city: 'casablanca',
    rating: 4.7,
    badge: 'Vérifié',
    category: 'maison-decoration',
    marque: 'Zara',
    taille: [],
    couleur: 'blanc',
    prix: 890,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    description: 'Décoration intérieure et extérieure',
  },
];

const Produits = () => {
  const [searchParams] = useSearchParams();
  const categorieFromUrl = searchParams.get('categorie') || '';

  const [selectedVille, setSelectedVille] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    category: categorieFromUrl,
    marques: [],
    tailles: [],
    couleurs: [],
    prix: { min: 0, max: 15000 },
  });
// Gestion du changement de filtres
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };
// Gestion du changement de ville et réinitialisation de la page courante
  const handleVilleChange = (ville) => {
    setSelectedVille(ville);
    setCurrentPage(1);
  };
// Filtrage des PRODUITS en fonction des filtres sélectionnés et de la ville sélectionnée
  const filteredShops = useMemo(() => {
    return allShops.filter((shop) => {
      if (selectedVille && shop.city !== selectedVille) return false;
      if (filters.category && shop.category !== filters.category) return false;
      if (filters.marques.length > 0 && !filters.marques.includes(shop.marque)) return false;
      if (filters.tailles.length > 0 && !filters.tailles.some((t) => shop.taille.includes(t))) return false;
      if (filters.couleurs.length > 0 && !filters.couleurs.includes(shop.couleur)) return false;
      if (shop.prix < filters.prix.min || shop.prix > filters.prix.max) return false;
      return true;
    });
  }, [filters, selectedVille]);

  const totalPages = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const paginatedShops = filteredShops.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="produits-page">
      {/* Header */}
      <div className="magasins-header">
        <h1 className="magasins-title">Explorez nos QAYSARIA</h1>
        <p className="magasins-subtitle">Découvrez les meilleures produits du Maroc</p>
      </div>

      {/* Villes horizontal selector */}
      <VillesSelector selectedVille={selectedVille} onVilleChange={handleVilleChange} />

      {/* Main layout: sidebar + grid */}
      <div className="produits-layout">
        {/* Left vertical filters */}
        <FiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Right: grid + pagination */}
        <div className="produits-main">
          <div className="produits-results-bar">
            <span className="results-count">
              <strong>{filteredShops.length}</strong> magasin{filteredShops.length !== 1 ? 's' : ''} trouvé{filteredShops.length !== 1 ? 's' : ''}
            </span>
          </div>

          {paginatedShops.length > 0 ? (
            <div className="magasins-grid">
              {paginatedShops.map((shop) => (
                <div key={shop.id} className="shop-card">
                  <div style={{ position: 'relative' }}>
                    <img src={shop.image} alt={shop.name} className="shop-image" />
                    <span className="shop-badge">{shop.badge}</span>
                  </div>
                  <div className="shop-content">
                    <h3 className="shop-name">{shop.name}</h3>
                    <p className="shop-description">{shop.description}</p>
                    <div className="shop-meta">
                      <span className="shop-city">📍 {shop.city.charAt(0).toUpperCase() + shop.city.slice(1)}</span>
                      <span className="shop-rating">⭐ {shop.rating}</span>
                    </div>
                    <div className="shop-prix">{shop.prix.toLocaleString()} MAD</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>Aucun magasin trouvé</h3>
              <p>Essayez d'ajuster vos filtres pour voir plus de résultats</p>
            </div>
          )}

          {/* Bottom pagination */}
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





















// import React, { useState, useMemo } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import '../../styles/pages css/produits.css';

// const Produits = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const categorie = searchParams.get('categorie');

//   const [filteredCategory, setFilteredCategory] = useState(categorie || '');

//   const allShops = [
//     {
//       id: 1,
//       name: 'Boutique Marrakech Style',
//       city: 'Marrakech',
//       rating: 4.8,
//       badge: 'Vérifié',
//       category: 'mode-accessoires',
//       image:
//         'https://images.unsplash.com/photo-1595777707802-221b84ce8dd9?w=400&h=300&fit=crop',
//       description: 'Mode et accessoires haut de gamme',
//     },
//     {
//       id: 2,
//       name: 'Fès Fashion Hub',
//       city: 'Fès',
//       rating: 4.9,
//       badge: 'Top Vendeur',
//       category: 'mode-accessoires',
//       image:
//         'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=300&fit=crop',
//       description: 'Tendances fashion modernes',
//     },
//     {
//       id: 7,
//       name: 'Tech Maroc Casablanca',
//       city: 'Casablanca',
//       rating: 4.8,
//       badge: 'Top Vendeur',
//       category: 'electronique-tech',
//       image:
//         'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
//       description: 'Appareils électroniques premium',
//     },
//     {
//       id: 13,
//       name: 'Décor Maroc Premium',
//       city: 'Casablanca',
//       rating: 4.7,
//       badge: 'Vérifié',
//       category: 'maison-decoration',
//       image:
//         'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
//       description: 'Décoration intérieure et extérieure',
//     },
//   ];

//   const filteredShops = useMemo(() => {
//     if (!filteredCategory) return allShops;
//     return allShops.filter((shop) => shop.category === filteredCategory);
//   }, [filteredCategory]);

//   const handleFilter = (category) => {
//     setFilteredCategory(filteredCategory === category ? '' : category);
//   };

//   return (
//     <div className="magasins-container">
//       <div className="magasins-header">
//         <h1 className="magasins-title">Explorez nos Magasins</h1>
//         <p className="magasins-subtitle">
//           Découvrez les meilleures boutiques du Maroc
//         </p>
//       </div>

//       <div className="magasins-filters">
//         <button
//           className={`filter-btn ${!filteredCategory ? 'active' : ''}`}
//           onClick={() => setFilteredCategory('')}
//         >
//           Tous
//         </button>
//         <button
//           className={`filter-btn ${filteredCategory === 'mode-accessoires' ? 'active' : ''}`}
//           onClick={() => handleFilter('mode-accessoires')}
//         >
//           Mode & Accessoires
//         </button>
//         <button
//           className={`filter-btn ${filteredCategory === 'electronique-tech' ? 'active' : ''}`}
//           onClick={() => handleFilter('electronique-tech')}
//         >
//           Électronique & Tech
//         </button>
//         <button
//           className={`filter-btn ${filteredCategory === 'maison-decoration' ? 'active' : ''}`}
//           onClick={() => handleFilter('maison-decoration')}
//         >
//           Maison & Décoration
//         </button>
//       </div>

//       {filteredShops.length > 0 ? (
//         <div className="magasins-grid">
//           {filteredShops.map((shop) => (
//             <div key={shop.id} className="shop-card">
//               <div style={{ position: 'relative' }}>
//                 <img
//                   src={shop.image}
//                   alt={shop.name}
//                   className="shop-image"
//                 />
//                 <span className="shop-badge">{shop.badge}</span>
//               </div>
//               <div className="shop-content">
//                 <h3 className="shop-name">{shop.name}</h3>
//                 <p className="shop-description">{shop.description}</p>
//                 <div className="shop-meta">
//                   <span className="shop-city">{shop.city}</span>
//                   <span className="shop-rating">⭐ {shop.rating}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="empty-state">
//           <h3>Aucun magasin trouvé</h3>
//           <p>Essayez d'ajuster vos filtres pour voir plus de résultats</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Produits;