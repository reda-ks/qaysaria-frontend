import React, { useState } from 'react';
import '../styles/composants css/FiltersSidebar.css';

/* ─────────────────────────────────────────────────────────
   CATEGORIES — Catégories produits QAISARYA
───────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: '',
    label: 'Toutes catégories',
    icon: '',
    sub: [],
  },
  {
    id: 'vetements',
    label: 'Vêtements',
    icon: '',
    sub: [
      { id: 'vetements-hommes',  label: 'Hommes'  },
      { id: 'vetements-femmes',  label: 'Femmes'  },
      { id: 'vetements-enfants', label: 'Enfants' },
    ],
  },
  {
    id: 'accessoires',
    label: 'Accessoires',
    icon: '',
    sub: [
      { id: 'accessoires-sacs',   label: 'Sacs & Maroquinerie' },
      { id: 'accessoires-bijoux', label: 'Bijoux & Montres'    },
      { id: 'accessoires-autres', label: 'Ceintures & Divers'  },
    ],
  },
  {
    id: 'artisanat',
    label: 'Artisanat ',
    icon: '',
    sub: [
      { id: 'artisanat-zellige',  label: 'Zellige & Céramique' },
      { id: 'artisanat-cuir',     label: 'Cuir tanné'          },
      { id: 'artisanat-tapis',    label: 'Tapis & Tissage'     },
      { id: 'artisanat-bois',     label: 'Bois & Thuya'        },
      { id: 'artisanat-cuivre',   label: 'Cuivre & Laiton'     },
    ],
  },
  {
    id: 'chaussures',
    label: 'Chaussures',
    icon: '',
    sub: [
      { id: 'chaussures-hommes',   label: 'Hommes'              },
      { id: 'chaussures-femmes',   label: 'Femmes'              },
      { id: 'chaussures-enfants',  label: 'Enfants'             },
      { id: 'chaussures-babouches',label: 'Babouches '        },
    ],
  },
];

const MARQUES = [
  'Artisan Local', 'Maison Zhor', 'Atlas Craft', 'Tannerie Chouara',
  'Souk El Khair', 'Sahara Wool', 'Zellige Fès', 'Poteries Safi',
];

const TAILLES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COULEURS = [
  { id: 'noir',        label: 'Noir',        hex: '#1a1a1a' },
  { id: 'blanc',       label: 'Blanc',       hex: '#f0f0f0' },
  { id: 'rouge',       label: 'Rouge',       hex: '#e53935' },
  { id: 'bleu',        label: 'Bleu',        hex: '#1e88e5' },
  { id: 'vert',        label: 'Vert',        hex: '#43a047' },
  { id: 'jaune',       label: 'Jaune',       hex: '#fdd835' },
  { id: 'rose',        label: 'Rose',        hex: '#e91e8c' },
  { id: 'gris',        label: 'Gris',        hex: '#9e9e9e' },
  { id: 'marron',      label: 'Marron',      hex: '#795548' },
  { id: 'beige',       label: 'Beige',       hex: '#d7c4a3' },
  { id: 'bordeaux',    label: 'Bordeaux',    hex: '#7b1c2e' },
  { id: 'multicolore', label: 'Multicolore', hex: 'linear-gradient(135deg,#EF3B3C,#fdd835,#43a047,#1e88e5)' },
];

/* ─────────────────────────────────────────────────────────
   Collapsible Section
───────────────────────────────────────────────────────── */
const Section = ({ title, icon, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-section">
      <button className="filter-section-header" onClick={() => setOpen(!open)}>
        <span className="filter-section-title">
          <span>{icon}</span> {title}
        </span>
        <span className={`filter-chevron ${open ? 'open' : ''}`}>‹</span>
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   FiltersSidebar
───────────────────────────────────────────────────────── */
const FiltersSidebar = ({ filters, onFiltersChange }) => {
  /* Track which parent category is expanded to show subcategories */
  const [expandedCat, setExpandedCat] = useState('');

  const toggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const handlePrix = (e, bound) => {
    onFiltersChange({
      ...filters,
      prix: { ...filters.prix, [bound]: Number(e.target.value) },
    });
  };

  /* Select a category or subcategory */
  const handleCategory = (id, parentId = null) => {
    /* If clicking same → clear */
    if (filters.category === id) {
      onFiltersChange({ ...filters, category: '' });
      setExpandedCat('');
      return;
    }
    onFiltersChange({ ...filters, category: id });
    /* Expand the parent if a sub was clicked */
    if (parentId) setExpandedCat(parentId);
  };

  const handleReset = () => {
    onFiltersChange({
      category: '',
      marques: [],
      tailles: [],
      couleurs: [],
      prix: { min: 0, max: 15000 },
    });
    setExpandedCat('');
  };

  const prix = filters.prix || { min: 0, max: 15000 };

  return (
    <aside className="filters-sidebar">

      {/* ── TOP ── */}
      <div className="filters-top">
        <h2 className="filters-title"> Filtres</h2>
        <button className="filters-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>

      {/* ════ CATÉGORIES ════ */}
      <Section title="Catégories" icon="" defaultOpen={true}>
        <ul className="filter-category-list">

          {/* "Toutes catégories" */}
          <li key="">
            <button
              className={`filter-category-item ${filters.category === '' ? 'active' : ''}`}
              onClick={() => handleCategory('')}
            >
              <span className="cat-icon"></span>
              <span className="cat-label">Toutes catégories</span>
              {filters.category === '' && <span className="check">✓</span>}
            </button>
          </li>

          {/* Parent categories with optional subcategories */}
          {CATEGORIES.filter(c => c.id !== '').map((cat) => {
            const isParentActive = filters.category === cat.id ||
              cat.sub.some(s => s.id === filters.category);
            const isExpanded = expandedCat === cat.id || isParentActive;

            return (
              <li key={cat.id} className="cat-group">

                {/* Parent row */}
                <div className="cat-parent-row">
                  <button
                    className={`filter-category-item ${isParentActive ? 'active' : ''}`}
                    onClick={() => {
                      handleCategory(cat.id);
                      setExpandedCat(isExpanded ? '' : cat.id);
                    }}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-label">{cat.label}</span>
                    <span className="cat-right">
                      {isParentActive && <span className="check">✓</span>}
                      {cat.sub.length > 0 && (
                        <span className={`sub-arrow ${isExpanded ? 'open' : ''}`}>›</span>
                      )}
                    </span>
                  </button>
                </div>

                {/* Subcategories */}
                {cat.sub.length > 0 && isExpanded && (
                  <ul className="filter-subcategory-list">
                    {cat.sub.map((sub) => (
                      <li key={sub.id}>
                        <button
                          className={`filter-subcategory-item ${filters.category === sub.id ? 'active' : ''}`}
                          onClick={() => handleCategory(sub.id, cat.id)}
                        >
                          <span className="sub-dot" />
                          <span>{sub.label}</span>
                          {filters.category === sub.id && <span className="check">✓</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            );
          })}
        </ul>
      </Section>

      {/* ════ PRIX ════ */}
      <Section title="Prix (MAD)" icon="" defaultOpen={true}>
        <div className="filter-price">
          <div className="price-range-display">
            <span>{prix.min.toLocaleString()} MAD</span>
            <span>{prix.max.toLocaleString()} MAD</span>
          </div>
          <div className="price-inputs">
            <label>
              <span>Min</span>
              <input
                type="range" min="0" max="15000" step="50"
                value={prix.min}
                onChange={(e) => handlePrix(e, 'min')}
                className="range-slider"
              />
            </label>
            <label>
              <span>Max</span>
              <input
                type="range" min="0" max="15000" step="50"
                value={prix.max}
                onChange={(e) => handlePrix(e, 'max')}
                className="range-slider"
              />
            </label>
          </div>
        </div>
      </Section>

      {/* ════ MARQUE ════ */}
      <Section title="Marque" icon="" defaultOpen={false}>
        <div className="filter-checkboxes">
          {MARQUES.map((marque) => (
            <label key={marque} className="filter-checkbox-label">
              <input
                type="checkbox"
                checked={(filters.marques || []).includes(marque)}
                onChange={() => toggle('marques', marque)}
                className="filter-checkbox"
              />
              <span className="checkbox-custom" />
              <span>{marque}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* ════ TAILLE ════ */}
      <Section title="Taille" icon="" defaultOpen={false}>
        <div className="filter-sizes">
          {TAILLES.map((t) => (
            <button
              key={t}
              className={`size-btn ${(filters.tailles || []).includes(t) ? 'active' : ''}`}
              onClick={() => toggle('tailles', t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Section>

      {/* ════ COULEURS ════ */}
      <Section title="Couleurs" icon="" defaultOpen={false}>
        <div className="filter-colors">
          {COULEURS.map((c) => (
            <button
              key={c.id}
              className={`color-btn ${(filters.couleurs || []).includes(c.id) ? 'active' : ''}`}
              onClick={() => toggle('couleurs', c.id)}
              title={c.label}
            >
              <span
                className="color-dot"
                style={{
                  background: c.hex,
                  border: c.id === 'blanc' ? '1.5px solid #ddd' : 'none',
                }}
              />
              {(filters.couleurs || []).includes(c.id) && (
                <span className="color-check">✓</span>
              )}
            </button>
          ))}
        </div>
        {/* Color labels below */}
        <div className="filter-colors-labels">
          {(filters.couleurs || []).map(id => {
            const c = COULEURS.find(x => x.id === id);
            return c ? (
              <span key={id} className="color-label-tag">
                {c.label}
                <button onClick={() => toggle('couleurs', id)}>✕</button>
              </span>
            ) : null;
          })}
        </div>
      </Section>

    </aside>
  );
};

export default FiltersSidebar;