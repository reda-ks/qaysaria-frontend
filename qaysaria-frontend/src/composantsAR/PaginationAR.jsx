import React from 'react';

import '../styles/composantsCSS/Pagination.css';
// Composant de pagination pour les listes de produits
const PaginationAR = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;
// Génère la liste des pages à afficher en fonction du nombre total de pages et de la page courante
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-wrapper">
      <span className="pagination-info">
        Affichage <strong>{start}–{end}</strong> sur <strong>{totalItems}</strong> produits
      </span>

      <div className="pagination-controls">
        <button
          className="page-btn nav-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Page précédente"
        >
          ‹
        </button>
        
        {getPages().map((page, idx) =>
          page === '...' ? (
            <span key={`dots-${idx}`} className="page-dots">…</span>
          ) : (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className="page-btn nav-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Page suivante"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default PaginationAR;