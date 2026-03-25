import React, { useState } from 'react';
import '../styles/composants css/FiltersSidebar.css';
const CATEGORIES = [
  { id: '', label: 'Toutes catégories' },
  { id: 'mode-accessoires', label: 'Mode & Accessoires' },
  { id: 'electronique-tech', label: 'Électronique & Tech' },
  { id: 'maison-decoration', label: 'Maison & Décoration' },
  { id: 'beaute-sante', label: 'Beauté & Santé' },
  { id: 'sport-loisirs', label: 'Sport & Loisirs' },
];

const MARQUES = ['Nike', 'Adidas', 'Zara', 'H&M', 'Samsung', 'Apple'];

const TAILLES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const COULEURS = [
  { id: 'noir', label: 'Noir', hex: '#1a1a1a' },
  { id: 'blanc', label: 'Blanc', hex: '#f5f5f5' },
  { id: 'rouge', label: 'Rouge', hex: '#e53935' },
  { id: 'bleu', label: 'Bleu', hex: '#1e88e5' },
  { id: 'vert', label: 'Vert', hex: '#43a047' },
  { id: 'jaune', label: 'Jaune', hex: '#fdd835' },
  { id: 'rose', label: 'Rose', hex: '#e91e8c' },
  { id: 'gris', label: 'Gris', hex: '#9e9e9e' },
];
// Section réutilisable pour chaque groupe de filtres
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
// Composant principal de la sidebar de filtres
const FiltersSidebar = ({ filters, onFiltersChange }) => {
  const toggle = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFiltersChange({ ...filters, [key]: updated });
  };
// Gestion du changement de prix
  const handlePrix = (e, bound) => {
    onFiltersChange({
      ...filters,
      prix: { ...filters.prix, [bound]: Number(e.target.value) },
    });
  };
// Gestion du changement de catégorie
  const handleCategory = (id) => {
    onFiltersChange({ ...filters, category: id });
  };
// Réinitialisation de tous les filtres
  const handleReset = () => {
    onFiltersChange({ category: '', marques: [], tailles: [], couleurs: [], prix: { min: 0, max: 5000 } });
  };

  const prix = filters.prix || { min: 0, max: 5000 };

  return (
    <aside className="filters-sidebar">
      <div className="filters-top">
        <h2 className="filters-title">🔍 Filtres</h2>
        <button className="filters-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
      <Section title="Catégories" icon="🗂️">
        <ul className="filter-category-list">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                className={`filter-category-item ${filters.category === cat.id ? 'active' : ''}`}
                onClick={() => handleCategory(cat.id)}
              >
                {cat.label}
                {filters.category === cat.id && <span className="check">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Prix (MAD)" icon="💰">
        <div className="filter-price">
          <div className="price-range-display">
            <span>{prix.min} MAD</span>
            <span>{prix.max} MAD</span>
          </div>
          <div className="price-inputs">
            <label>
              <span>Min</span>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={prix.min}
                onChange={(e) => handlePrix(e, 'min')}
                className="range-slider"
              />
            </label>
            <label>
              <span>Max</span>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={prix.max}
                onChange={(e) => handlePrix(e, 'max')}
                className="range-slider"
              />
            </label>
          </div>
        </div>
      </Section>

      <Section title="Marque" icon="🏷️">
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

      <Section title="Taille" icon="📐" defaultOpen={false}>
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

      <Section title="Couleurs" icon="🎨" defaultOpen={false}>
        <div className="filter-colors">
          {COULEURS.map((c) => (
            <button
              key={c.id}
              className={`color-btn ${(filters.couleurs || []).includes(c.id) ? 'active' : ''}`}
              style={{ '--color': c.hex }}
              onClick={() => toggle('couleurs', c.id)}
              title={c.label}
            >
              <span className="color-dot" style={{ background: c.hex }} />
              {(filters.couleurs || []).includes(c.id) && (
                <span className="color-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </Section>
    </aside>
  );
};

export default FiltersSidebar;