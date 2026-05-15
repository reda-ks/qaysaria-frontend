import React, { useState } from 'react';
import {
  TrendingUp, Package, Eye, Wallet,
  AlertTriangle, PlusCircle, BarChart2, Settings,
  ArrowUpLeft, ArrowDownLeft, ChevronLeft,
  Calendar, RefreshCw, ShoppingBag, CheckCircle2,
  Clock, XCircle
} from 'lucide-react';
/* Assurez-vous d'ajouter 'direction: rtl' dans votre CSS pour .tdb-page-ar */
import '../../../styles/pages css/tableau_de_bord.css';

/* ═══════════════════════════════════════════
   DONNÉES (VERSION ARABE)
═══════════════════════════════════════════ */
const STATS = [
  { id: 1, title: 'إجمالي المبيعات', value: '245,890', currency: 'درهم', change: '+12.5%', up: true, Icon: Wallet },
  { id: 2, title: 'الطلبات', value: '1,234', change: '+8.2%', up: true, Icon: Package },
  { id: 3, title: 'الزيارات', value: '45,678', change: '+15.8%', up: true, Icon: Eye },
  { id: 4, title: 'صافي الإيرادات', value: '189,450', currency: 'درهم', change: '+5.3%', up: true, Icon: TrendingUp },
];

const CHART_DATA = [
  { month: 'يناير', sales: 12000 },
  { month: 'فبراير', sales: 18000 },
  { month: 'مارس', sales: 15000 },
  { month: 'أبريل', sales: 22000 },
  { month: 'مايو', sales: 25000 },
  { month: 'يونيو', sales: 28000 },
];

const ORDERS = [
  { id: 'CMD-001', client: 'فاطمة بنعلي', montant: 1299.99, statut: 'تم التوصيل', date: '2025-03-01' },
  { id: 'CMD-002', client: 'أحمد خرشي', montant: 759.50, statut: 'قيد التنفيذ', date: '2025-03-02' },
  { id: 'CMD-003', client: 'سيرة محمد', montant: 449.99, statut: 'قيد التنفيذ', date: '2025-03-03' },
  { id: 'CMD-004', client: 'حسن جابر', montant: 2199.00, statut: 'تم التوصيل', date: '2025-02-28' },
  { id: 'CMD-005', client: 'نادية العلوي', montant: 899.00, statut: 'ملغي', date: '2025-02-27' },
];

const STOCK_ALERTS = [
  { id: 1, product: 'فستان أنيق', sku: 'SKU-001', stock: 5, max: 10, critical: true },
  { id: 2, product: 'حقيبة فاخرة', sku: 'SKU-002', stock: 8, max: 15, critical: false },
  { id: 3, product: 'مجوهرات ذهبية', sku: 'SKU-004', stock: 3, max: 10, critical: true },
  { id: 4, product: 'قميص رسمي', sku: 'SKU-003', stock: 12, max: 20, critical: false },
];

const STATUS_MAP = {
  'تم التوصيل': { cls: 'status--green', Icon: CheckCircle2 },
  'قيد التنفيذ': { cls: 'status--orange', Icon: Clock },
  'ملغي': { cls: 'status--red', Icon: XCircle },
};

/* ═══════════════════════════════════════════
   COMPOSANT
═══════════════════════════════════════════ */
const TableauDeBordAR = () => {
  const [period, setPeriod] = useState('هذه السنة');
  const maxSales = Math.max(...CHART_DATA.map(d => d.sales));

  const today = new Date().toLocaleDateString('ar-MA', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const buildPoints = () =>
    CHART_DATA.map((d, i) => {
      // Inverser l'axe X pour le RTL : 520 (droite) vers 40 (gauche)
      const x = 520 - ((i / (CHART_DATA.length - 1)) * 480);
      const y = 220 - (d.sales / maxSales) * 180;
      return { x, y, ...d };
    });

  const points = buildPoints();
  const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
  const area = `${points[0].x},220 ${polyline} ${points[points.length - 1].x},220`;

  return (
    <div className="tdb-page tdb-page-ar" dir="rtl">

      {/* ══ EN-TÊTE ══ */}
      <header className="tdb-header">
        <div>
          <h1 className="tdb-title">لوحة التحكم</h1>
          <p className="tdb-subtitle">نظرة عامة على متجر قيسارية الخاص بك</p>
        </div>
        <div className="tdb-header-right">
          <div className="tdb-date">
            <Calendar size={15} strokeWidth={1.8} />
            <span>{today}</span>
          </div>
          <button className="tdb-refresh" title="تحديث">
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
                {currency && <small> {currency}</small>}
              </div>
              <div className={`tdb-stat-change ${up ? 'tdb-stat-change--up' : 'tdb-stat-change--down'}`}>
                {up
                  ? <ArrowUpLeft size={13} strokeWidth={2.5} />
                  : <ArrowDownLeft size={13} strokeWidth={2.5} />
                }
                {change} هذا الشهر
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
                تطور المبيعات
              </h2>
              <span className="tdb-card-sub">آخر 6 أشهر</span>
            </div>
            <select
              className="tdb-select"
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              <option>هذه السنة</option>
              <option>هذا الشهر</option>
              <option>هذا الأسبوع</option>
            </select>
          </div>

          <div className="tdb-chart-wrap">
            <div className="tdb-chart-yaxis">
              {[28, 21, 14, 7, 0].map(v => (
                <span key={v}>{v}ألف</span>
              ))}
            </div>

            <div className="tdb-chart-area">
              <svg viewBox="0 0 560 240" preserveAspectRatio="xMidYMid meet" className="tdb-svg">
                {[0.25, 0.5, 0.75, 1].map((r, i) => (
                  <line key={i} x1="40" y1={220 - r * 180} x2="520" y2={220 - r * 180}
                    stroke="#E4E4E4" strokeWidth="1" strokeDasharray="4 4" />
                ))}
                <polygon points={area} fill="rgba(239,59,60,.07)" />
                <polyline points={polyline}
                  fill="none" stroke="#EF3B3C" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="5" fill="#EF3B3C" />
                    <circle cx={p.x} cy={p.y} r="9" fill="rgba(239,59,60,.18)" />
                  </g>
                ))}
              </svg>

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
                أحدث الطلبات
              </h2>
              <span className="tdb-card-sub">{ORDERS.length} طلبات حديثة</span>
            </div>
            <a href="/commandes" className="tdb-link">
              عرض الكل <ChevronLeft size={14} strokeWidth={2.5} />
            </a>
          </div>

          <div className="tdb-table-wrap">
            <table className="tdb-table">
              <thead>
                <tr>
                  <th>المرجع</th>
                  <th>الزبون</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map(order => {
                  const { cls, Icon: SIcon } = STATUS_MAP[order.statut] || {};
                  return (
                    <tr key={order.id}>
                      <td><span className="tdb-order-id">{order.id}</span></td>
                      <td className="tdb-client">{order.client}</td>
                      <td className="tdb-amount">{order.montant.toLocaleString('ar-MA')} درهم</td>
                      <td>
                        <span className={`tdb-status ${cls}`}>
                          {SIcon && <SIcon size={12} strokeWidth={2.5} />}
                          {order.statut}
                        </span>
                      </td>
                      <td className="tdb-date">
                        {new Date(order.date).toLocaleDateString('ar-MA')}
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
          <div className="tdb-card">
            <div className="tdb-card-header">
              <div>
                <h2 className="tdb-card-title">
                  <AlertTriangle size={17} strokeWidth={1.8} />
                  مخزون منخفض
                </h2>
                <span className="tdb-card-sub">{STOCK_ALERTS.length} تنبيهات</span>
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

          <div className="tdb-card tdb-actions-card">
            <h2 className="tdb-card-title tdb-card-title--mb">إجراءات سريعة</h2>
            <div className="tdb-quick-btns">
              <button className="tdb-quick-btn">
                <PlusCircle size={17} strokeWidth={2} />
                إضافة منتج
              </button>
              <button className="tdb-quick-btn">
                <BarChart2 size={17} strokeWidth={2} />
                عرض التقارير
              </button>
              <button className="tdb-quick-btn">
                <Settings size={17} strokeWidth={2} />
                الإعدادات
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TableauDeBordAR;