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


  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVille, setSelectedVille] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Correction orthographe : "audiences" partout

  const [filters, setFilters] = useState({
    category: categorieFromUrl,
    tailles: [],

    audiences: [], 

    prix: { min: 0, max: 15000 },
  });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  /* ── RÉCUPÉRATION DES DONNÉES ── */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `${API_BASE_URL}/products/all`;

        // Logique de priorité d'appel API
        if (selectedVille) {
          const formattedCity = selectedVille.charAt(0).toUpperCase() + selectedVille.slice(1);
          url = `${API_BASE_URL}/products/search/city/${formattedCity}`;
        } 
        else if (filters.category) {
          url = `${API_BASE_URL}/products/filtercategory?categoryId=${filters.category}`;
        } 
        else if (filters.tailles && filters.tailles.length > 0) {
          const lastSize = filters.tailles[filters.tailles.length - 1];
          url = `${API_BASE_URL}/products/search/taille/${lastSize}`;
        }
        else if (filters.audiences && filters.audiences.length > 0) {
          const lastAudience = filters.audiences[filters.audiences.length - 1];
          url = `${API_BASE_URL}/products/filteraudience?audienceId=${lastAudience}`;
        }

        console.log("Appel API :", url);
        const response = await axios.get(url);
        setAllProducts(Array.isArray(response.data) ? response.data : []);

      } catch (err) {
        console.error("Erreur API Produits:", err);
        setError(err.response?.status === 500 
          ? "Erreur serveur (500). Problème de base de données." 
          : "Connexion au serveur impossible.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // Sécurisation des .join() pour éviter le crash "undefined"
  }, [
    selectedVille, 
    filters.category, 
    (filters.tailles ), 
    (filters.audiences ), 
    API_BASE_URL
  ]);


  /* ── FILTRAGE CLIENT (Le plus fiable pour l'audience) ── */
  const filteredData = useMemo(() => {
    return allProducts.filter((p) => {
      // 1. Recherche textuelle
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches = (p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
        if (!matches) return false;
      }

      // 2. Prix
      const price = Number(p.price) || 0;
      if (price < filters.prix.min || price > filters.prix.max) return false;

     // 3. Audience (Correction finale : comparaison ID vs Nom)
      if (filters.audiences && filters.audiences.length > 0) {
        // On définit la correspondance ID -> Nom (à adapter selon ta DB)
        const audienceMap = {
          "1": "Femme",
          "2": "Homme",
          "3": "Enfant",
          "4": "Bébé"
        };
      
        const isMatch = filters.audiences.some(selectedId => {
          const targetName = audienceMap[selectedId];
          // On compare l'ID ou le nom textuel (p.audience)
          return (
            String(p.audienceId) === String(selectedId) || 
            String(p.audience).toLowerCase() === String(targetName).toLowerCase()
          );
        });
      
        if (!isMatch) return false;
      }

      // 4. Tailles
      if (filters.tailles && filters.tailles.length > 0) {
        const productSizes = Array.isArray(p.tailles) ? p.tailles : [];
        
        // On regarde si la taille du produit est dans la liste des tailles cochées
        const isMatch = filters.tailles.some(selectedSize => 
          productSizes.includes(selectedSize)
        );
        
        if (!isMatch) return false;
      }

      return true;
    });
  }, [allProducts, searchQuery, filters]);

  /* ── PAGINATION ── */
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  /* ── HANDLERS ── */
  const handleFiltersChange = (newFilters) => {
    // On s'assure que les tableaux existent toujours lors de l'update
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      tailles: newFilters.tailles || prev.tailles || [],
      audiences: newFilters.audiences || prev.audiences || []
    }));
    setCurrentPage(1);
  };

  const handleVilleChange = (ville) => {
    setSelectedVille(ville);
    setCurrentPage(1);
  };

  const handleWhatsApp = (product) => {
    const message = encodeURIComponent(`Bonjour ! L'article *${product.name}* est-il disponible ?`);
    window.open(`https://wa.me/212771887412?text=${message}`, '_blank');
  };

  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{marginRight: '8px'}}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
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
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <VillesSelector selectedVille={selectedVille} onVilleChange={handleVilleChange} />

      <div className="produits-layout">
        <aside className="produits-sidebar">
          <FiltersSidebar filters={filters} onFiltersChange={handleFiltersChange} />
        </aside>

        <div className="produits-main">
          <div className="produits-results-bar">
            <span className="results-count">
              <strong>{filteredData.length}</strong> produits trouvés
            </span>
          </div>

          {error && <div className="error-banner" style={{color: 'red', padding: '10px'}}>{error}</div>}

          {loading ? (
            <div className="produits-status-box"><h3>Chargement des pépites...</h3></div>
          ) : paginatedProducts.length > 0 ? (
            <div className="produits-grid">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="p-card">
                  <div className="p-card-img-wrap">
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/400x500'} 
                      alt={product.name} 
                      className="p-card-img" 
                    />
                  </div>
                  <div className="p-card-body">
                    <div className="p-card-meta">
                      <span className="p-card-category">
                        {product.category?.name || product.categoryName || 'Général'}
                      </span>
                    </div>
                    <h3 className="p-card-name">{product.name}</h3>
                    <div className="p-card-footer">
                      <div className="p-card-price">{Number(product.price).toLocaleString('fr-MA')} MAD</div>
                      <button className="p-card-wa" onClick={() => handleWhatsApp(product)}>
                        <WhatsAppIcon /> <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="produits-status-box"><h3>Aucun produit trouvé.</h3></div>
          )}

          {totalPages > 1 && !loading && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Produits;