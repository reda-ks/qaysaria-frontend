import React, { useState } from 'react';
import {
  TrendingUp, Package, Eye, Wallet,
  AlertTriangle, PlusCircle, BarChart2, Settings,
  ArrowUpRight, ArrowDownRight, ChevronRight,
  Calendar, RefreshCw, ShoppingBag, CheckCircle2,
  Clock, XCircle
} from 'lucide-react';
import '../../../styles/pages css/tableau_de_bord.css';

/* ═══════════════════════════════════════════
   DONNÉES
═══════════════════════════════════════════ */
const STATS = [
  { id: 1, title: 'Ventes Totales',  value: '245 890', currency: 'DH', change: '+12.5%', up: true,  Icon: Wallet    },
  { id: 2, title: 'Commandes',       value: '1 234',                   change: '+8.2%',  up: true,  Icon: Package   },
  { id: 3, title: 'Visites',         value: '45 678',                  change: '+15.8%', up: true,  Icon: Eye       },
  { id: 4, title: 'Revenus Nets',    value: '189 450', currency: 'DH', change: '+5.3%',  up: true,  Icon: TrendingUp },
];

const CHART_DATA = [
  { month: 'Jan', sales: 12000 },
  { month: 'Fév', sales: 18000 },
  { month: 'Mar', sales: 15000 },
  { month: 'Avr', sales: 22000 },
  { month: 'Mai', sales: 25000 },
  { month: 'Jun', sales: 28000 },
];

const ORDERS = [
  { id: 'CMD-001', client: 'Fatima Benali',   montant: 1299.99, statut: 'Livré',    date: '2025-03-01' },
  { id: 'CMD-002', client: 'Ahmed Kharchi',   montant: 759.50,  statut: 'En cours', date: '2025-03-02' },
  { id: 'CMD-003', client: 'Saira Mohamed',   montant: 449.99,  statut: 'En cours', date: '2025-03-03' },
  { id: 'CMD-004', client: 'Hassan Jabir',    montant: 2199.00, statut: 'Livré',    date: '2025-02-28' },
  { id: 'CMD-005', client: 'Nadia Alaoui',    montant: 899.00,  statut: 'Annulé',   date: '2025-02-27' },
];

const STOCK_ALERTS = [
  { id: 1, product: 'Robe Élégante', sku: 'SKU-001', stock: 5,  max: 10, critical: true  },
  { id: 2, product: 'Sac Luxe',      sku: 'SKU-002', stock: 8,  max: 15, critical: false },
  { id: 3, product: 'Bijoux Dorés',  sku: 'SKU-004', stock: 3,  max: 10, critical: true  },
  { id: 4, product: 'Chemise Pro',   sku: 'SKU-003', stock: 12, max: 20, critical: false },
];

const STATUS_MAP = {
  'Livré':    { cls: 'status--green',  Icon: CheckCircle2 },
  'En cours': { cls: 'status--orange', Icon: Clock        },
  'Annulé':   { cls: 'status--red',    Icon: XCircle      },
};

/* ═══════════════════════════════════════════
   COMPOSANT
═══════════════════════════════════════════ */
const TableauDeBord = () => {
  const [period, setPeriod] = useState('Cette année');
  const maxSales = Math.max(...CHART_DATA.map(d => d.sales));

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  /* Points du graphique SVG */
  const buildPoints = () =>
    CHART_DATA.map((d, i) => {
      const x = (i / (CHART_DATA.length - 1)) * 480 + 40;
      const y = 220 - (d.sales / maxSales) * 180;
      return { x, y, ...d };
    });

  const points = buildPoints();
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},220 ${polyline} ${points[points.length - 1].x},220`;

  return (
    <div className="tdb-page">

      {/* ══ EN-TÊTE ══ */}
      <header className="tdb-header">
        <div>
          <h1 className="tdb-title">Tableau de Bord</h1>
          <p className="tdb-subtitle">Vue d'ensemble de votre boutique QAISARYA</p>
        </div>
        <div className="tdb-header-right">
          <div className="tdb-date">
            <Calendar size={15} strokeWidth={1.8} />
            <span>{today}</span>
          </div>
          <button className="tdb-refresh" title="Actualiser">
            <RefreshCw size={16} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ══ STATS CARDS ══ */}
      <div className="tdb-stats">
        {STATS.map(({ id, title, value, currency, change, up, Icon }) => (
          <div key={id} className="tdb-stat-card">
            <div className="tdb-stat-icon">
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <div className="tdb-stat-body">
              <span className="tdb-stat-title">{title}</span>
              <div className="tdb-stat-value">
                {value}
                {currency && <small>{currency}</small>}
              </div>
              <div className={`tdb-stat-change ${up ? 'tdb-stat-change--up' : 'tdb-stat-change--down'}`}>
                {up
                  ? <ArrowUpRight size={13} strokeWidth={2.5} />
                  : <ArrowDownRight size={13} strokeWidth={2.5} />
                }
                {change} ce mois
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ══ ZONE PRINCIPALE ══ */}
      <div className="tdb-main">

        {/* ── GRAPHIQUE ── */}
        <section className="tdb-card tdb-chart-card">
          <div className="tdb-card-header">
            <div>
              <h2 className="tdb-card-title">
                <BarChart2 size={18} strokeWidth={1.8} />
                Évolution des Ventes
              </h2>
              <span className="tdb-card-sub">6 derniers mois</span>
            </div>
            <select
              className="tdb-select"
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              <option>Cette année</option>
              <option>Ce mois</option>
              <option>Cette semaine</option>
            </select>
          </div>

          <div className="tdb-chart-wrap">
            {/* Valeurs Y */}
            <div className="tdb-chart-yaxis">
              {[28, 21, 14, 7, 0].map(v => (
                <span key={v}>{v}k</span>
              ))}
            </div>

            <div className="tdb-chart-area">
              <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" className="tdb-svg">
                {/* Lignes de grille */}
                {[0.25, 0.5, 0.75, 1].map((r, i) => (
                  <line key={i} x1="40" y1={220 - r * 180} x2="520" y2={220 - r * 180}
                    stroke="#E4E4E4" strokeWidth="1" strokeDasharray="4 4" />
                ))}
                {/* Zone remplie */}
                <polygon points={area} fill="rgba(239,59,60,.07)" />
                {/* Ligne */}
                <polyline points={polyline}
                  fill="none" stroke="#EF3B3C" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                {/* Points */}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="5" fill="#EF3B3C" />
                    <circle cx={p.x} cy={p.y} r="9" fill="rgba(239,59,60,.18)" />
                  </g>
                ))}
              </svg>

              {/* Labels X */}
              <div className="tdb-chart-xaxis">
                {CHART_DATA.map(d => <span key={d.month}>{d.month}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMANDES ── */}
        <section className="tdb-card tdb-orders-card">
          <div className="tdb-card-header">
            <div>
              <h2 className="tdb-card-title">
                <ShoppingBag size={18} strokeWidth={1.8} />
                Dernières Commandes
              </h2>
              <span className="tdb-card-sub">{ORDERS.length} commandes récentes</span>
            </div>
            <a href="/commandes" className="tdb-link">
              Voir tout <ChevronRight size={14} strokeWidth={2.5} />
            </a>
          </div>

          <div className="tdb-table-wrap">
            <table className="tdb-table">
              <thead>
                <tr>
                  <th>Réf.</th>
                  <th>Client</th>
                  <th>Montant</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map(order => {
                  const { cls, Icon: SIcon } = STATUS_MAP[order.statut] || {};
                  return (
                    <tr key={order.id}>
                      <td><span className="tdb-order-id">{order.id}</span></td>
                      <td className="tdb-client">{order.client}</td>
                      <td className="tdb-amount">{order.montant.toLocaleString('fr-FR')} DH</td>
                      <td>
                        <span className={`tdb-status ${cls}`}>
                          {SIcon && <SIcon size={12} strokeWidth={2.5} />}
                          {order.statut}
                        </span>
                      </td>
                      <td className="tdb-date">
                        {new Date(order.date).toLocaleDateString('fr-FR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── BARRE LATÉRALE ── */}
        <aside className="tdb-aside">

          {/* Stock faible */}
          <div className="tdb-card">
            <div className="tdb-card-header">
              <div>
                <h2 className="tdb-card-title">
                  <AlertTriangle size={17} strokeWidth={1.8} />
                  Stock Faible
                </h2>
                <span className="tdb-card-sub">{STOCK_ALERTS.length} alertes</span>
              </div>
              <span className="tdb-badge-count">{STOCK_ALERTS.length}</span>
            </div>

            <div className="tdb-alerts">
              {STOCK_ALERTS.map(a => (
                <div key={a.id} className={`tdb-alert ${a.critical ? 'tdb-alert--critical' : 'tdb-alert--warning'}`}>
                  <div className="tdb-alert-top">
                    <div className="tdb-alert-dot" />
                    <div className="tdb-alert-info">
                      <strong>{a.product}</strong>
                      <small>{a.sku}</small>
                    </div>
                    <span className="tdb-alert-qty">{a.stock}/{a.max}</span>
                  </div>
                  <div className="tdb-stock-bar">
                    <div
                      className="tdb-stock-fill"
                      style={{ width: `${Math.min((a.stock / a.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions rapides */}
          <div className="tdb-card tdb-actions-card">
            <h2 className="tdb-card-title tdb-card-title--mb">Actions Rapides</h2>
            <div className="tdb-quick-btns">
              <button className="tdb-quick-btn">
                <PlusCircle size={17} strokeWidth={2} />
                Ajouter un Produit
              </button>
              <button className="tdb-quick-btn">
                <BarChart2 size={17} strokeWidth={2} />
                Voir les Rapports
              </button>
              <button className="tdb-quick-btn">
                <Settings size={17} strokeWidth={2} />
                Paramètres
              </button>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default TableauDeBord;
