import React from 'react';
import '../../../styles/pages css/tableau_de_bord.css';

const TableauDeBord = () => {
  // Données de statistiques
  const stats = [
    {
      id: 1,
      title: 'Ventes Totales',
      value: '245,890',
      currency: 'DH',
      change: '+12.5%',
      icon: '💰',
      color: 'blue',
      trend: 'up',
    },
    {
      id: 2,
      title: 'Commandes',
      value: '1,234',
      change: '+8.2%',
      icon: '📦',
      color: 'green',
      trend: 'up',
    },
    {
      id: 3,
      title: 'Visites',
      value: '45,678',
      change: '+15.8%',
      icon: '👁',
      color: 'purple',
      trend: 'up',
    },
    {
      id: 4,
      title: 'Revenus',
      value: '189,450',
      currency: 'DH',
      change: '+5.3%',
      icon: '📈',
      color: 'orange',
      trend: 'up',
    },
  ];

  // Données de graphique (ventes par mois)
  const chartData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Fév', sales: 18000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Avr', sales: 22000 },
    { month: 'Mai', sales: 25000 },
    { month: 'Jun', sales: 28000 },
  ];

  // Données des dernières commandes
  const recentOrders = [
    {
      id: 'CMD-001',
      client: 'Fatima Benali',
      montant: 1299.99,
      statut: 'Livré',
      date: '2025-03-01',
    },
    {
      id: 'CMD-002',
      client: 'Ahmed Kharchi',
      montant: 759.50,
      statut: 'En cours',
      date: '2025-03-02',
    },
    {
      id: 'CMD-003',
      client: 'Saira Mohamed',
      montant: 449.99,
      statut: 'En cours',
      date: '2025-03-03',
    },
    {
      id: 'CMD-004',
      client: 'Hassan Jabir',
      montant: 2199.00,
      statut: 'Livré',
      date: '2025-02-28',
    },
  ];

  // Données des alertes de stock
  const stockAlerts = [
    {
      id: 1,
      product: 'Robe Élégante',
      sku: 'SKU-001',
      stock: 5,
      threshold: 10,
      severity: 'critical',
    },
    {
      id: 2,
      product: 'Sac Luxe',
      sku: 'SKU-002',
      stock: 8,
      threshold: 15,
      severity: 'warning',
    },
    {
      id: 3,
      product: 'Chemise Premium',
      sku: 'SKU-003',
      stock: 12,
      threshold: 20,
      severity: 'warning',
    },
    {
      id: 4,
      product: 'Bijoux Dorés',
      sku: 'SKU-004',
      stock: 3,
      threshold: 10,
      severity: 'critical',
    },
  ];

  const maxSales = Math.max(...chartData.map((d) => d.sales));

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'Livré':
        return 'success';
      case 'En cours':
        return 'pending';
      case 'Annulé':
        return 'cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Tableau de Bord</h1>
          <p className="dashboard-subtitle">Vue d'ensemble de vos performances</p>
        </div>
        <div className="header-date">
          <span className="date-icon">📅</span>
          <span className="date-text">{new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-value">
                {stat.value}
                {stat.currency && <span className="currency"> {stat.currency}</span>}
              </div>
              <div className={`stat-change ${stat.trend}`}>
                <span className="change-icon">{stat.trend === 'up' ? '↑' : '↓'}</span>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenu principal - Graphique et Tableau */}
      <div className="dashboard-main">
        {/* Section Graphique */}
        <div className="main-section chart-section">
          <div className="section-header">
            <h2 className="section-title">📊 Croissance des Ventes</h2>
            <select className="time-period-selector">
              <option>Cette année</option>
              <option>Ce mois</option>
              <option>Cette semaine</option>
            </select>
          </div>

          <div className="chart-container">
            <div className="chart-background">
              {/* Grille */}
              <div className="chart-grid">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid-line"></div>
                ))}
              </div>

              {/* Graphique linéaire */}
              <svg className="line-chart" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
                <polyline
                  points={chartData
                    .map((d, i) => {
                      const x = (i / (chartData.length - 1)) * 500 + 50;
                      const y = 250 - (d.sales / maxSales) * 200;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {chartData.map((d, i) => {
                  const x = (i / (chartData.length - 1)) * 500 + 50;
                  const y = 250 - (d.sales / maxSales) * 200;
                  return (
                    <circle key={i} cx={x} cy={y} r="5" fill="#2563eb" className="chart-point" />
                  );
                })}
              </svg>

              {/* Étiquettes X */}
              <div className="chart-labels">
                {chartData.map((d, i) => (
                  <span key={i} className="chart-label">
                    {d.month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Tableau des Commandes */}
        <div className="main-section orders-section">
          <div className="section-header">
            <h2 className="section-title">📋 Dernières Commandes</h2>
            <a href="/" className="view-all-link">Voir tout →</a>
          </div>

          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td className="order-client">{order.client}</td>
                    <td className="order-amount">{order.montant} DH</td>
                    <td>
                      <span className={`badge badge-${getStatutColor(order.statut)}`}>
                        {order.statut}
                      </span>
                    </td>
                    <td className="order-date">
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Barre Latérale - Alertes de Stock */}
        <aside className="sidebar-section">
          <div className="section-header">
            <h2 className="section-title">⚠️ Stock Faible</h2>
            <span className="alert-count">{stockAlerts.length}</span>
          </div>

          <div className="alerts-list">
            {stockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`alert-item alert-${alert.severity}`}
              >
                <div className="alert-header">
                  <div className="alert-icon">
                    {alert.severity === 'critical' ? '🔴' : '🟡'}
                  </div>
                  <div className="alert-info">
                    <h4 className="alert-title">{alert.product}</h4>
                    <p className="alert-sku">{alert.sku}</p>
                  </div>
                </div>
                <div className="alert-stock">
                  <div className="stock-bar">
                    <div
                      className="stock-fill"
                      style={{
                        width: `${(alert.stock / alert.threshold) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="stock-text">
                    {alert.stock}/{alert.threshold} unités
                  </span>
                </div>
                <button className="btn-restock">Réapprovisionner</button>
              </div>
            ))}
          </div>

          {/* Card d'actions rapides */}
          <div className="quick-actions">
            <h3 className="quick-title">Actions Rapides</h3>
            <button className="quick-btn">
              <span>🛒</span> Ajouter un Produit
            </button>
            <button className="quick-btn">
              <span>📊</span> Voir Rapports
            </button>
            <button className="quick-btn">
              <span>⚙️</span> Paramètres
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TableauDeBord;
