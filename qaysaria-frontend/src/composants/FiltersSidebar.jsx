import React, { useState } from 'react';
import {
  LayoutGrid, Tag, SlidersHorizontal, Ruler, Palette,
  ChevronDown, ChevronRight, RotateCcw, Check
} from 'lucide-react';
import '../styles/composants css/FiltersSidebar.css';

const CATEGORIES = [
  { id: '',           label: 'Toutes catégories', sub: [] },
  {
    id: 'vetements',  label: 'Vêtements', sub: [
      { id: 'vetements-hommes',  label: 'Hommes'  },
      { id: 'vetements-femmes',  label: 'Femmes'  },
      { id: 'vetements-enfants', label: 'Enfants' },
    ],
  },
  {
    id: 'accessoires', label: 'Accessoires', sub: [
      { id: 'accessoires-sacs',   label: 'Sacs & Maroquinerie' },
      { id: 'accessoires-bijoux', label: 'Bijoux & Montres'    },
      { id: 'accessoires-autres', label: 'Ceintures & Divers'  },
    ],
  },
  {
    id: 'artisanat',  label: 'Artisanat 🔥', sub: [
      { id: 'artisanat-zellige',  label: 'Zellige & Céramique' },
      { id: 'artisanat-cuir',     label: 'Cuir tanné'          },
      { id: 'artisanat-tapis',    label: 'Tapis & Tissage'     },
      { id: 'artisanat-bois',     label: 'Bois & Thuya'        },
      { id: 'artisanat-cuivre',   label: 'Cuivre & Laiton'     },
    ],
  },
  {
    id: 'chaussures', label: 'Chaussures', sub: [
      { id: 'chaussures-hommes',    label: 'Hommes'         },
      { id: 'chaussures-femmes',    label: 'Femmes'         },
      { id: 'chaussures-enfants',   label: 'Enfants'        },
      { id: 'chaussures-babouches', label: 'Babouches 🥿'   },
    ],
  },
];

// const MARQUES = [
//   'Artisan Local', 'Maison Zhor', 'Atlas Craft', 'Tannerie Chouara',
//   'Souk El Khair', 'Sahara Wool', 'Zellige Fès', 'Poteries Safi',
// ];

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
  { id: 'multicolore', label: 'Multicolore', hex: 'conic-gradient(#EF3B3C,#fdd835,#43a047,#1e88e5,#EF3B3C)' },
];

/* Collapsible section */
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
          strokeWidth={2}
          color="#888"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .28s' }}
        />
      </button>
      {open && <div className="filter-section-body">{children}</div>}
    </div>
  );
};

const FiltersSidebar = ({ filters, onFiltersChange }) => {
  const [expandedCat, setExpandedCat] = useState('');

  const toggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };

  const handlePrix = (e, bound) => {
    onFiltersChange({ ...filters, prix: { ...filters.prix, [bound]: Number(e.target.value) } });
  };

  const handleCategory = (id, parentId = null) => {
    if (filters.category === id) {
      onFiltersChange({ ...filters, category: '' });
      setExpandedCat('');
      return;
    }
    onFiltersChange({ ...filters, category: id });
    if (parentId) setExpandedCat(parentId);
  };

  const handleReset = () => {
    onFiltersChange({ category: '', /*marques: [],*/ tailles: [], couleurs: [], prix: { min: 0, max: 15000 } });
    setExpandedCat('');
  };

  const prix = filters.prix || { min: 0, max: 15000 };

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
      <Section title="Catégories" Icon={LayoutGrid} defaultOpen={true}>
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

          {CATEGORIES.filter(c => c.id !== '').map((cat) => {
            const isParentActive = filters.category === cat.id || cat.sub.some(s => s.id === filters.category);
            const isExpanded = expandedCat === cat.id || isParentActive;

            return (
              <li key={cat.id} className="cat-group">
                <div className="cat-parent-row">
                  <button
                    className={`filter-category-item ${isParentActive ? 'active' : ''}`}
                    onClick={() => { handleCategory(cat.id); setExpandedCat(isExpanded ? '' : cat.id); }}
                  >
                    <span className="cat-label">{cat.label}</span>
                    <span className="cat-right">
                      {isParentActive && <Check size={11} strokeWidth={3} color="#EF3B3C" />}
                      {cat.sub.length > 0 && (
                        <ChevronRight
                          size={13}
                          strokeWidth={2}
                          color="#888"
                          style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform .25s' }}
                        />
                      )}
                    </span>
                  </button>
                </div>

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
                          {filters.category === sub.id && <Check size={11} strokeWidth={3} color="#EF3B3C" style={{ marginLeft: 'auto' }} />}
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

      {/* PRIX */}
      <Section title="Prix (MAD)" Icon={Tag} defaultOpen={true}>
        <div className="filter-price">
          <div className="price-range-display">
            <span>{prix.min.toLocaleString()} MAD</span>
            <span>{prix.max.toLocaleString()} MAD</span>
          </div>
          <div className="price-inputs">
            <label>
              <span>Min</span>
              <input type="range" min="0" max="15000" step="50" value={prix.min} onChange={(e) => handlePrix(e, 'min')} className="range-slider" />
            </label>
            <label>
              <span>Max</span>
              <input type="range" min="0" max="15000" step="50" value={prix.max} onChange={(e) => handlePrix(e, 'max')} className="range-slider" />
            </label>
          </div>
        </div>
      </Section>

      {/* TAILLE */}
      <Section title="Taille" Icon={Ruler} defaultOpen={false}>
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

      {/* COULEURS */}
      <Section title="Couleurs" Icon={Palette} defaultOpen={false}>
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
                style={{ background: c.hex, border: c.id === 'blanc' ? '1.5px solid #ddd' : 'none' }}
              />
              {(filters.couleurs || []).includes(c.id) && (
                <span className="color-check">
                  <Check size={10} strokeWidth={3} color="#fff" />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="filter-colors-labels">
          {(filters.couleurs || []).map(id => {
            const c = COULEURS.find(x => x.id === id);
            return c ? (
              <span key={id} className="color-label-tag">
                {c.label}
                <button onClick={() => toggle('couleurs', id)}>
                  <Check size={9} strokeWidth={3} />
                </button>
              </span>
            ) : null;
          })}
        </div>
      </Section>

    </aside>
  );
};

export default FiltersSidebar;