import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../../../styles/pages css/produits.css';

import VillesSelector from '../../../composants/VillesSelector';
import FiltersSidebar from '../../../composants/FiltersSidebar';
import Pagination from '../../../composants/Pagination';
import SearchBar from '../../../composants/SearchBar';

const ITEMS_PER_PAGE = 6;

const Produits = () => {
  const [searchParams] = useSearchParams();
  const categorieFromUrl = searchParams.get('categorie') || '';

  const [allShops, setAllShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [/*error*/, setError] = useState(null);

  const [searchQuery, setSearchQuery]     = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [currentPage, setCurrentPage]      = useState(1);
  const [filters, setFilters] = useState({
    category: categorieFromUrl,
    marques: [],
    tailles: [],
    prix: { min: 0, max: 15000 },
  });

  const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api';
  console.log("L'API utilisée est :", API_BASE_URL);
  /* ── RÉCUPÉRATION DES DONNÉES (MODE DYNAMIQUE) ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `${API_BASE_URL}/products/all`;
        
        // Si une ville est sélectionnée, on appelle ton nouvel endpoint PathVariable
        if (selectedVille) {
          // On met la première lettre en majuscule car ton ID est 'rabat' mais ta DB attend sûrement 'Rabat'
          const formattedCity = selectedVille.charAt(0).toUpperCase() + selectedVille.slice(1);
          url = `${API_BASE_URL}/products/search/city/${formattedCity}`;
        }

        const response = await axios.get(url);
        setAllShops(response.data);  
      } catch (err) {
        console.error("Erreur API:", err);
        setError("Erreur lors de la récupération des produits.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedVille, API_BASE_URL]);

  const resetPage = () => setCurrentPage(1);

  const handleFiltersChange = (newFilters) => { setFilters(newFilters); resetPage(); };
  const handleVilleChange   = (ville)      => { setSelectedVille(ville); resetPage(); };
  const handleSearch        = (query)      => { setSearchQuery(query); resetPage(); };

  const handleWhatsApp = (product) => {
    const message = encodeURIComponent(
      `Bonjour ! Je suis intéressé(e) par : *${product.name}* (${product.price} MAD).`
    );
    window.open(`https://wa.me/212771887412?text=${message}`, '_blank');
  };

  /* ── FILTRAGE CLIENT (RECHERCHE TEXTUELLE & PRIX) ── */
  const filteredShops = useMemo(() => {
    return allShops.filter((shop) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!shop.name.toLowerCase().includes(q)) return false;
      }
      if (filters.category && shop.category !== filters.category) return false;
      if (shop.price < filters.prix.min || shop.price > filters.prix.max) return false;
      return true;
    });
  }, [searchQuery, filters, allShops]);

  const totalPages     = Math.ceil(filteredShops.length / ITEMS_PER_PAGE);
  const paginatedShops = filteredShops.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  );

  return (
    <div className="produits-page">
      <div className="produits-hero">
        <div className="produits-hero-inner">
          <span className="produits-hero-tag">🇲🇦 Marketplace du Maroc</span>
          <h1 className="produits-hero-title">Explorez nos Produits</h1>
        </div>
      </div>

      <div className="produits-search-wrap">
        <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
      </div>

      <VillesSelector selectedVille={selectedVille} onVilleChange={handleVilleChange} />

      <div className="produits-layout">
        <aside className="produits-sidebar">
          <FiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />
        </aside>

        <div className="produits-main">
          <div className="produits-results-bar">
             <span className="results-count"><strong>{filteredShops.length}</strong> produits trouvés</span>
          </div>

          {loading ? (
            <div className="produits-empty"><h3>Chargement...</h3></div>
          ) : paginatedShops.length > 0 ? (
            <div className="produits-grid">
              {paginatedShops.map((product) => (
                <div key={product.id} className="p-card">
                  <div className="p-card-img-wrap">
                    <img src={product.imageUrl || 'https://via.placeholder.com/400'} alt={product.name} className="p-card-img" />
                  </div>
                  <div className="p-card-body">
                    <div className="p-card-meta">
                      <span className="p-card-category">{product.category || 'Général'}</span>
                    </div>
                    <h3 className="p-card-name">{product.name}</h3>
                    <div className="p-card-footer">
                      <div className="p-card-price">{product.price.toLocaleString('fr-MA')} MAD</div>
                      <button className="p-card-wa" onClick={() => handleWhatsApp(product)}><WhatsAppIcon /> <span>WhatsApp</span></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="produits-empty"><h3>Aucun produit trouvé</h3></div>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Produits;