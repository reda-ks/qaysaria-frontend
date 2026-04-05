import React, { useState } from 'react';
import {
  Package, CheckCircle2, Clock, XCircle,
  Eye, Pencil, Trash2, FileDown,
  TrendingUp, Search
} from 'lucide-react';
import '../../../styles/pages css/commandes.css';

/* ════════════════════════════════════════════════════════
   البيانات
═══════════════════════════════════════════════════════════ */
const COMMANDES = [
  { id: 'CMD-001', client: 'فاطمة بنعلي',       date: '2025-03-01', montant: 1299.99, statut: 'تم التسليم' },
  { id: 'CMD-002', client: 'أحمد الخارجي',       date: '2025-03-02', montant: 759.50,  statut: 'قيد التنفيذ' },
  { id: 'CMD-003', client: 'سيرة محمد',          date: '2025-03-03', montant: 449.99,  statut: 'قيد التنفيذ' },
  { id: 'CMD-004', client: 'حسن جابر',           date: '2025-02-28', montant: 2199.00, statut: 'تم التسليم' },
  { id: 'CMD-005', client: 'زينب الفاسي',        date: '2025-02-25', montant: 899.75,  statut: 'ملغى'        },
  { id: 'CMD-006', client: 'عمر الشرقاوي',       date: '2025-03-04', montant: 599.99,  statut: 'قيد التنفيذ' },
  { id: 'CMD-007', client: 'ليلى المنصوري',      date: '2025-03-05', montant: 1599.50, statut: 'تم التسليم' },
  { id: 'CMD-008', client: 'محسن رشيد',          date: '2025-02-20', montant: 799.99,  statut: 'ملغى'        },
];

const STATUS_CONFIG = {
  'تم التسليم': { cls: 'cmd-badge--green',  Icon: CheckCircle2, filterKey: 'تم التسليم' },
  'قيد التنفيذ': { cls: 'cmd-badge--orange', Icon: Clock,        filterKey: 'قيد التنفيذ' },
  'ملغى':        { cls: 'cmd-badge--red',    Icon: XCircle,      filterKey: 'ملغى'        },
};

const FILTERS = [
  { key: '',           label: 'الكل'         },
  { key: 'قيد التنفيذ', label: 'قيد التنفيذ' },
  { key: 'تم التسليم', label: 'تم التسليم'  },
  { key: 'ملغى',       label: 'ملغى'         },
];

/* ════════════════════════════════════════════════════════
   المكوّن
═══════════════════════════════════════════════════════════ */
const Commandes = () => {
  const [filterStatut, setFilterStatut] = useState('');
  const [search, setSearch]             = useState('');

  /* فلترة */
  const filtered = COMMANDES.filter(cmd => {
    const matchStatut = !filterStatut || cmd.statut === filterStatut;
    const matchSearch = !search || cmd.client.includes(search) || cmd.id.toLowerCase().includes(search.toLowerCase());
    return matchStatut && matchSearch;
  });

  /* إحصاءات */
  const stats = [
    { label: 'إجمالي الطلبات', value: COMMANDES.length,                                        Icon: Package,      cls: 'cmd-stat--total'  },
    { label: 'تم التسليم',      value: COMMANDES.filter(c => c.statut === 'تم التسليم').length, Icon: CheckCircle2, cls: 'cmd-stat--green'  },
    { label: 'قيد التنفيذ',     value: COMMANDES.filter(c => c.statut === 'قيد التنفيذ').length,Icon: Clock,        cls: 'cmd-stat--orange' },
    { label: 'ملغى',            value: COMMANDES.filter(c => c.statut === 'ملغى').length,        Icon: XCircle,      cls: 'cmd-stat--red'    },
  ];

  /* مجموع المبيعات */
  const totalRevenu = COMMANDES
    .filter(c => c.statut === 'تم التسليم')
    .reduce((acc, c) => acc + c.montant, 0);

  return (
    <div className="cmdar-page" dir="rtl" lang="ar">

      {/* ══ رأس الصفحة ══ */}
      <div className="cmdar-header">
        <div>
          <h1 className="cmdar-title">إدارة الطلبات</h1>
          <p className="cmdar-subtitle">متابعة وإدارة جميع طلباتك</p>
        </div>
        <button className="cmdar-export-btn">
          <FileDown size={15} strokeWidth={2} />
          تصدير PDF
        </button>
      </div>

      {/* ══ الإحصاءات ══ */}
      <div className="cmdar-stats">
        {stats.map(({ label, value, Icon, cls }) => (
          <div key={label} className={`cmdar-stat ${cls}`}>
            <div className="cmdar-stat-icon">
              <Icon size={20} strokeWidth={1.8} />
            </div>
            <div className="cmdar-stat-body">
              <span className="cmdar-stat-label">{label}</span>
              <span className="cmdar-stat-value">{value}</span>
            </div>
          </div>
        ))}

        {/* إجمالي الإيرادات */}
        <div className="cmdar-stat cmdar-stat--revenue">
          <div className="cmdar-stat-icon">
            <TrendingUp size={20} strokeWidth={1.8} />
          </div>
          <div className="cmdar-stat-body">
            <span className="cmdar-stat-label">إجمالي الإيرادات</span>
            <span className="cmdar-stat-value">
              {totalRevenu.toLocaleString('fr-MA', { minimumFractionDigits: 2 })}
              <small> درهم</small>
            </span>
          </div>
        </div>
      </div>

      {/* ══ الفلاتر + البحث ══ */}
      <div className="cmdar-toolbar">
        {/* أزرار الفلترة */}
        <div className="cmdar-filters">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`cmdar-filter-btn ${filterStatut === key ? 'active' : ''}`}
              onClick={() => setFilterStatut(key)}
            >
              {label}
              <span className="cmdar-filter-count">
                {key === '' ? COMMANDES.length : COMMANDES.filter(c => c.statut === key).length}
              </span>
            </button>
          ))}
        </div>

        {/* البحث */}
        <div className="cmdar-search">
          <Search size={15} strokeWidth={2} color="#888" />
          <input
            type="text"
            placeholder="ابحث عن عميل أو رقم طلب..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="cmdar-search-input"
          />
        </div>
      </div>

      {/* ══ جدول الطلبات ══ */}
      <div className="cmdar-table-wrap">
        <table className="cmdar-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>التاريخ</th>
              <th>المبلغ</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(cmd => {
                const { cls, Icon: SIcon } = STATUS_CONFIG[cmd.statut] || {};
                return (
                  <tr key={cmd.id} className="cmdar-row">

                    {/* رقم الطلب */}
                    <td>
                      <span className="cmdar-id">{cmd.id}</span>
                    </td>

                    {/* العميل */}
                    <td>
                      <div className="cmdar-client">
                        <div className="cmdar-avatar">{cmd.client.charAt(0)}</div>
                        <span className="cmdar-client-name">{cmd.client}</span>
                      </div>
                    </td>

                    {/* التاريخ */}
                    <td className="cmdar-date">
                      {new Date(cmd.date).toLocaleDateString('ar-MA', {
                        day: '2-digit', month: '2-digit', year: 'numeric'
                      })}
                    </td>

                    {/* المبلغ */}
                    <td>
                      <span className="cmdar-amount">
                        {cmd.montant.toLocaleString('fr-MA', { minimumFractionDigits: 2 })}
                        <small> درهم</small>
                      </span>
                    </td>

                    {/* الحالة */}
                    <td>
                      <span className={`cmdar-badge ${cls}`}>
                        {SIcon && <SIcon size={12} strokeWidth={2.5} />}
                        {cmd.statut}
                      </span>
                    </td>

                    {/* الإجراءات */}
                    <td>
                      <div className="cmdar-actions">
                        <button className="cmdar-action-btn cmdar-action-btn--view" title="عرض التفاصيل">
                          <Eye size={15} strokeWidth={2} />
                        </button>
                        <button className="cmdar-action-btn cmdar-action-btn--edit" title="تعديل">
                          <Pencil size={15} strokeWidth={2} />
                        </button>
                        <button className="cmdar-action-btn cmdar-action-btn--delete" title="حذف">
                          <Trash2 size={15} strokeWidth={2} />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="cmdar-empty-row">
                  <Package size={40} strokeWidth={1.2} color="#D1D1D1" />
                  <p>لا توجد طلبات مطابقة</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ══ عداد النتائج ══ */}
      {filtered.length > 0 && (
        <div className="cmdar-footer">
          عرض <strong>{filtered.length}</strong> من أصل <strong>{COMMANDES.length}</strong> طلب
        </div>
      )}

    </div>
  );
};

export default Commandes;