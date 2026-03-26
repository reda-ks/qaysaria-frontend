import React, { useState, useRef } from 'react';
import '../styles/composantsCSS/SearchBar.css';
const SUGGESTIONS = [
  'Nike Rabat', 'Zara Casablanca', 'Apple Store', 'Décor Marrakech',
  'Mode Fès', 'Samsung', 'Sport Meknès', 'Beauté Agadir', 'Adidas Tanger',
];

const SearchBar = ({ value, onChange, onSearch }) => {
  const [focused, setFocused] = useState(false);
  const [inputVal, setInputVal] = useState(value || '');
  const inputRef = useRef(null);

  const filtered = SUGGESTIONS.filter(
    (s) => s.toLowerCase().includes(inputVal.toLowerCase()) && inputVal.length > 0
  );

  const handleChange = (e) => {
    setInputVal(e.target.value);
    onChange(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setInputVal(suggestion);
    onChange(suggestion);
    onSearch(suggestion);
    setFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputVal);
      setFocused(false);
    }
    if (e.key === 'Escape') {
      setFocused(false);
    }
  };

  const handleClear = () => {
    setInputVal('');
    onChange('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className={`searchbar-wrapper ${focused ? 'focused' : ''}`}>
      <div className="searchbar-inner">
        <span className="searchbar-icon">🔍</span>
        <input
          ref={inputRef}
          className="searchbar-input"
          type="text"
          placeholder="Rechercher un magasin, marque, ville…"
          value={inputVal}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={handleKeyDown}
        />
        {inputVal && (
          <button className="searchbar-clear" onClick={handleClear} tabIndex={-1}>
            ✕
          </button>
        )}
        <button
          className="searchbar-btn"
          onClick={() => { onSearch(inputVal); setFocused(false); }}
        >
          Rechercher
        </button>
      </div>

      {focused && filtered.length > 0 && (
        <ul className="searchbar-dropdown">
          {filtered.map((s) => {
            const idx = s.toLowerCase().indexOf(inputVal.toLowerCase());
            return (
              <li
                key={s}
                className="searchbar-suggestion"
                onMouseDown={() => handleSelect(s)}
              >
                <span className="suggestion-icon">🏪</span>
                <span>
                  {s.slice(0, idx)}
                  <strong>{s.slice(idx, idx + inputVal.length)}</strong>
                  {s.slice(idx + inputVal.length)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;