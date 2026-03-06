import React, { useState } from 'react';
import '../../../styles/pages css/commandes.css';

const Commandes = () => {
  const [commandes, setCommandes] = useState([
    {
      id: 'CMD-001',
      client: 'Fatima Benali',
      date: '2025-03-01',
      montant: 1299.99,
      statut: 'Livré',
    },
    {
      id: 'CMD-002',
      client: 'Ahmed Kharchi',
      date: '2025-03-02',
      montant: 759.50,
      statut: 'En cours',
    },
    {
      id: 'CMD-003',
      client: 'Saira Mohamed',
      date: '2025-03-03',
      montant: 449.99,
      statut: 'En cours',
    },
    {
      id: 'CMD-004',
      client: 'Hassan Jabir',
      date: '2025-02-28',
      montant: 2199.00,
      statut: 'Livré',
    },
    {
      id: 'CMD-005',
      client: 'Zainab El Fassi',
      date: '2025-02-25',
      montant: 899.75,
      statut: 'Annulé',
    },
    {
      id: 'CMD-006',
      client: 'Omar Cherkaoui',
      date: '2025-03-04',
      montant: 599.99,
      statut: 'En cours',
    },
    {
      id: 'CMD-007',
      client: 'Leila Al-Mansouri',
      date: '2025-03-05',
      montant: 1599.50,
      statut: 'Livré',
    },
    {
      id: 'CMD-008',
      client: 'Mohsin Rachid',
      date: '2025-02-20',
      montant: 799.99,
      statut: 'Annulé',
    },
  ]);

  const [filtreStatut, setFiltreStatut] = useState('');

  // Filtrer les commandes
  const commandesFiltrees = filtreStatut
    ? commandes.filter((cmd) => cmd.statut === filtreStatut)
    : commandes;

  // Statistiques
  const stats = {
    total: commandes.length,
    livres: commandes.filter((cmd) => cmd.statut === 'Livré').length,
    encours: commandes.filter((cmd) => cmd.statut === 'En cours').length,
    annules: commandes.filter((cmd) => cmd.statut === 'Annulé').length,
  };

  const getStatutClass = (statut) => {
    switch (statut) {
      case 'Livré':
        return 'badge-success';
      case 'En cours':
        return 'badge-pending';
      case 'Annulé':
        return 'badge-cancelled';
      default:
        return '';
    }
  };

  const getStatutIcon = (statut) => {
    switch (statut) {
      case 'Livré':
        return '✓';
      case 'En cours':
        return '⏱';
      case 'Annulé':
        return '✕';
      default:
        return '';
    }
  };

  return (
    <div className="commandes-container">
      {/* Header */}
      <div className="commandes-header">
        <div className="header-content">
          <h1 className="header-title">Gestion des Commandes</h1>
          <p className="header-subtitle">Suivi et gestion de toutes vos commandes</p>
        </div>
        <button className="btn-export">📊 Exporter en PDF</button>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">📦</div>
          <div className="stat-content">
            <h3>Total Commandes</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success">✓</div>
          <div className="stat-content">
            <h3>Livrées</h3>
            <p className="stat-number">{stats.livres}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon pending">⏱</div>
          <div className="stat-content">
            <h3>En Cours</h3>
            <p className="stat-number">{stats.encours}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cancelled">✕</div>
          <div className="stat-content">
            <h3>Annulées</h3>
            <p className="stat-number">{stats.annules}</p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="filters-section">
        <h3>Filtrer par statut:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filtreStatut === '' ? 'active' : ''}`}
            onClick={() => setFiltreStatut('')}
          >
            Tous
          </button>
          <button
            className={`filter-btn ${filtreStatut === 'En cours' ? 'active' : ''}`}
            onClick={() => setFiltreStatut('En cours')}
          >
            En cours
          </button>
          <button
            className={`filter-btn ${filtreStatut === 'Livré' ? 'active' : ''}`}
            onClick={() => setFiltreStatut('Livré')}
          >
            Livré
          </button>
          <button
            className={`filter-btn ${filtreStatut === 'Annulé' ? 'active' : ''}`}
            onClick={() => setFiltreStatut('Annulé')}
          >
            Annulé
          </button>
        </div>
      </div>

      {/* Tableau des Commandes */}
      <div className="table-container">
        <table className="commandes-table">
          <thead>
            <tr>
              <th>ID Commande</th>
              <th>Client</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {commandesFiltrees.length > 0 ? (
              commandesFiltrees.map((commande) => (
                <tr key={commande.id} className="commande-row">
                  <td className="id-cell">
                    <span className="id-badge">{commande.id}</span>
                  </td>
                  <td className="client-cell">
                    <span className="client-avatar">{commande.client.charAt(0)}</span>
                    <span className="client-name">{commande.client}</span>
                  </td>
                  <td className="date-cell">
                    {new Date(commande.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="montant-cell">
                    <span className="montant">{commande.montant.toFixed(2)} DH</span>
                  </td>
                  <td className="statut-cell">
                    <span className={`badge ${getStatutClass(commande.statut)}`}>
                      <span className="badge-icon">{getStatutIcon(commande.statut)}</span>
                      {commande.statut}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-action view" title="Voir détails">
                      👁
                    </button>
                    <button className="btn-action edit" title="Modifier">
                      ✏
                    </button>
                    <button className="btn-action delete" title="Supprimer">
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">
                  <p>Aucune commande trouvée</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Commandes;
