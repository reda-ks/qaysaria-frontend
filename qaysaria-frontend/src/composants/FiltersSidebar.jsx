import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LayoutGrid, Tag, SlidersHorizontal, Ruler, Users,
  ChevronDown, RotateCcw, Check
} from 'lucide-react';
import '../styles/composantsCSS/FiltersSidebar.css';

/* Section rétractable */
const Section = ({ title, Icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-section">
      <button className="filter-section-header" onClick={() => setOpen(!open)}>
        <span className="filter-section-title">
          <Icon size={14} strokeWidth={2} color="#888" />
          {title}
        </span>
        <ChevronDown
          size={14}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .28s' }}
          color="#888"
        />
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </div>
  );
};

const FiltersSidebar = ({ filters, onFiltersChange }) => {
  const [categories, setCategories] = useState([]);
  const [audiencesMetadata, setAudiencesMetadata] = useState([]); // Renommé pour éviter conflit
  const [tailles, setTailles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        const results = await Promise.allSettled([
          axios.get(`${API_BASE_URL}/categories/all`),
          axios.get(`${API_BASE_URL}/audiences/all`),
          axios.get(`${API_BASE_URL}/tailles/all`)
        ]);

        if (results[0].status === 'fulfilled') setCategories(results[0].value.data);
        if (results[1].status === 'fulfilled') setAudiencesMetadata(results[1].value.data);
        if (results[2].status === 'fulfilled') setTailles(results[2].value.data);

      } catch (err) {
        console.error("Erreur métadonnées :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
  }, [API_BASE_URL]);

  // --- LOGIQUE DE GESTION ---
  const toggle = (key, value) => {
    // CORRECTION : On s'assure de récupérer la clé "audiences" ou "tailles"
    const current = filters[key] || [];
    const valString = String(value);
    const updated = current.includes(valString)
      ? current.filter((v) => v !== valString)
      : [...current, valString];
    
    onFiltersChange({ ...filters, [key]: updated });
  };

  const handlePrix = (e, bound) => {
    onFiltersChange({ ...filters, prix: { ...filters.prix, [bound]: Number(e.target.value) } });
  };

  const handleCategory = (id) => {
    const newCat = filters.category === String(id) ? '' : String(id);
    onFiltersChange({ ...filters, category: newCat });
  };

  const handleReset = () => {
    onFiltersChange({ 
        category: '', 
        tailles: [], 
        audiences: [], // CORRIGÉ : avec un "e"
        prix: { min: 0, max: 15000 } 
    });
  };

  const prix = filters.prix || { min: 0, max: 15000 };

  if (loading) return <aside className="filters-sidebar"><div className="filter-loading">Chargement...</div></aside>;

  return (
    <aside className="filters-sidebar">
      <div className="filters-top">
        <h2 className="filters-title">
          <SlidersHorizontal size={15} strokeWidth={2} color="#1A1A1A" />
          Filtres
        </h2>
        <button className="filters-reset" onClick={handleReset}>
          <RotateCcw size={11} strokeWidth={2.5} />
          Réinitialiser
        </button>
      </div>

      {/* CATEGORIES */}
      <Section title="Catégories" Icon={LayoutGrid}>
        <ul className="filter-category-list">
          <li>
            <button
              className={`filter-category-item ${filters.category === '' ? 'active' : ''}`}
              onClick={() => handleCategory('')}
            >
              <span className="cat-label">Toutes catégories</span>
              {filters.category === '' && <Check size={12} strokeWidth={3} color="#EF3B3C" />}
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`filter-category-item ${filters.category === String(cat.id) ? 'active' : ''}`}
                onClick={() => handleCategory(cat.id)}
              >
                <span className="cat-label">{cat.name}</span>
                {filters.category === String(cat.id) && <Check size={12} strokeWidth={3} color="#EF3B3C" />}
              </button>
            </li>
          ))}
        </ul>
      </Section>
      
      {/* AUDIENCE */}
      <Section title="Audience" Icon={Users}>
        <div className="filter-audience-list" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {audiencesMetadata.map((aud) => {
          const audId = String(aud.id); // "1"
          const audLabel = aud.name || aud.label; // "Homme"
          
          const isActive = (filters.audiences || []).includes(audId);
          
          return (
            <button
              key={audId}
              className={`filter-category-item ${isActive ? 'active' : ''}`}
              onClick={() => toggle('audiences', audId)} // ENVOIE L'ID ICI !
              style={{ /* ton style... */ }}
            >
              <span className="cat-label">{audLabel}</span>
              {isActive && <Check size={12} strokeWidth={3} color="#EF3B3C" />}
            </button>
          );
        })}
        </div>
      </Section>

      {/* PRIX */}
      <Section title="Prix (MAD)" Icon={Tag}>
        <div className="filter-price">
          <div className="price-range-display" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px' }}>
            <span>{prix.min} MAD</span>
            <span>{prix.max} MAD</span>
          </div>
          <div className="price-inputs">
            <input type="range" min="0" max="15000" step="50" value={prix.min} onChange={(e) => handlePrix(e, 'min')} className="range-slider" />
            <input type="range" min="0" max="15000" step="50" value={prix.max} onChange={(e) => handlePrix(e, 'max')} className="range-slider" />
          </div>
        </div>
      </Section>

      {/* TAILLES */}
      <Section title="Taille" Icon={Ruler} defaultOpen={false}>
        <div className="filter-sizes" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {tailles.map((t) => {
            const tValue = String(t.libelle || t.id);
            const isActive = (filters.tailles || []).includes(tValue);
            return (
              <button
                key={tValue}
                className={`size-btn ${isActive ? 'active' : ''}`}
                onClick={() => toggle('tailles', tValue)}
                style={{
                  padding: '8px',
                  border: '1px solid',
                  borderColor: isActive ? '#EF3B3C' : '#eee',
                  borderRadius: '6px',
                  fontSize: '11px',
                  background: isActive ? '#fdeeee' : 'white',
                  color: isActive ? '#EF3B3C' : '#333',
                  cursor: 'pointer'
                }}
              >
                {tValue}
              </button>
            );
          })}
        </div>
      </Section>
    </aside>
  );
};

export default FiltersSidebar;