import React, { useState } from 'react';
import '../styles/composants css/VillesSelector.css';
const VILLES = [
  { id: '', label: 'Tout le Maroc', emoji: '🇲🇦' },
  { id: 'casablanca', label: 'Casablanca', emoji: '' },
  { id: 'marrakech', label: 'Marrakech', emoji: '' },
  { id: 'rabat', label: 'Rabat', emoji: '' },
  { id: 'fes', label: 'Fès', emoji: '' },
  { id: 'tanger', label: 'Tanger', emoji: '' },
  { id: 'agadir', label: 'Agadir', emoji: '' },
  { id: 'meknes', label: 'Meknès', emoji: '' },
  { id: 'oujda', label: 'Oujda', emoji: '' },
];

const VillesSelector = ({ selectedVille, onVilleChange }) => {
  return (
    <div className="villes-selector">
      <div className="villes-label">Ville</div>
      <div className="villes-scroll">
        {VILLES.map((ville) => (
          <button
            key={ville.id}
            className={`ville-chip ${selectedVille === ville.id ? 'active' : ''}`}
            onClick={() => onVilleChange(ville.id)}
          >
            <span className="ville-emoji">{ville.emoji}</span>
            <span className="ville-name">{ville.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VillesSelector;