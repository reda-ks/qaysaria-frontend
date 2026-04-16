import React, { useState } from 'react';
import {
  User, Store, Lock, Save, Check,
  Pencil , ShieldCheck, Smartphone,
  Loader2, CheckCircle2
} from 'lucide-react';
import '../../../styles/pages css/profile.css';

/* ════════════════════════════════════════════════════════
   المكوّن الرئيسي
═══════════════════════════════════════════════════════════ */
const ProfileAR = () => {
  const [editing,     setEditing]     = useState({});
  const [isSaving,    setIsSaving]    = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [data, setData] = useState({
    prenom:          'فاطمة',
    nom:             'بنعلي',
    email:           'fatima.benali@qaisarya.com',
    nomBoutique:     'قيصرية لوكس',
    description:     'متجر متخصص في الأزياء الراقية والإكسسوارات الفاخرة',
    categorie:       'ملابس وإكسسوارات',
    telephone:       '+212 6 12 34 56 78',
    siteWeb:         'https://www.qaisarya.com',
    adresse:         'الدار البيضاء، المغرب',
    heureOuverture:  '09:00',
    heureFermeture:  '18:00',
  });

  const toggleEdit  = (field) => setEditing(prev => ({ ...prev, [field]: !prev[field] }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setEditing({});
      setTimeout(() => setSaveSuccess(false), 3500);
    }, 1500);
  };

  /* ── حقل قابل للتعديل ── */
  const Field = ({ label, name, type = 'text' }) => (
    <div className="pf-field">
      <label className="pf-field-label">{label}</label>
      <div className="pf-field-row">
        {editing[name] ? (
          type === 'textarea' ? (
            <textarea
              name={name}
              value={data[name]}
              onChange={handleChange}
              className="pf-input pf-textarea"
              rows={3}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={data[name]}
              onChange={handleChange}
              className="pf-input"
            />
          )
        ) : (
          <span className="pf-value">{data[name] || '—'}</span>
        )}
        <button
          type="button"
          className={`pf-edit-btn ${editing[name] ? 'active' : ''}`}
          onClick={() => toggleEdit(name)}
          title={editing[name] ? 'تأكيد' : 'تعديل'}
        >
          {editing[name]
            ? <Check size={14} strokeWidth={3} />
            : <Pencil size={13} strokeWidth={2} />
          }
        </button>
      </div>
    </div>
  );

  return (
    <div className="pf-page" dir="rtl" lang="ar">

      {/* ══ رأس الصفحة ══ */}
      <div className="pf-header">
        <div className="pf-header-text">
          <h1 className="pf-title">إعدادات الملف الشخصي</h1>
          <p className="pf-subtitle">إدارة بياناتك الشخصية وإعدادات متجرك</p>
        </div>
        <div className="pf-avatar-wrap">
          <div className="pf-avatar">{data.prenom.charAt(0)}</div>
          <span className="pf-avatar-badge">✓</span>
        </div>
      </div>

      {/* ══ بانر النجاح ══ */}
      {saveSuccess && (
        <div className="pf-success">
          <CheckCircle2 size={18} strokeWidth={2} />
          <span>تم حفظ التعديلات بنجاح!</span>
        </div>
      )}

      {/* ══ النموذج ══ */}
      <form onSubmit={handleSave} className="pf-form">

        {/* ─ معلومات شخصية ─ */}
        <section className="pf-section">
          <div className="pf-section-head">
            <div className="pf-section-icon">
              <User size={17} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="pf-section-title">المعلومات الشخصية</h2>
              <p className="pf-section-sub">بيانات حسابك الشخصي</p>
            </div>
          </div>

          <div className="pf-section-body">
            <div className="pf-row-2">
              <Field label="الاسم الأول"  name="prenom" />
              <Field label="اسم العائلة"  name="nom"    />
            </div>
            <Field label="البريد الإلكتروني" name="email" type="email" />
          </div>
        </section>

        {/* ─ إعدادات المتجر ─ */}
        <section className="pf-section">
          <div className="pf-section-head">
            <div className="pf-section-icon">
              <Store size={17} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="pf-section-title">إعدادات المتجر</h2>
              <p className="pf-section-sub">معلومات متجرك الإلكتروني</p>
            </div>
          </div>

          <div className="pf-section-body">
            <div className="pf-row-2">
              <Field label="اسم المتجر"  name="nomBoutique" />
              <Field label="الفئة"        name="categorie"   />
            </div>

            <Field label="وصف المتجر" name="description" type="textarea" />

            <div className="pf-row-2">
              <Field label="الهاتف"    name="telephone" type="tel" />
              <Field label="الموقع الإلكتروني" name="siteWeb" type="url" />
            </div>

            <Field label="العنوان" name="adresse" />

            <div className="pf-row-2">
              <Field label="ساعة الفتح"   name="heureOuverture" type="time" />
              <Field label="ساعة الإغلاق" name="heureFermeture" type="time" />
            </div>
          </div>
        </section>

        {/* ─ زر الحفظ ─ */}
        <div className="pf-actions">
          <button
            type="submit"
            className={`pf-save-btn ${isSaving ? 'loading' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <><Loader2 size={16} strokeWidth={2} className="pf-spin" /> جارٍ الحفظ...</>
            ) : (
              <><Save size={16} strokeWidth={2} /> حفظ التعديلات</>
            )}
          </button>
        </div>
      </form>

      {/* ══ قسم الأمان ══ */}
      <section className="pf-security">
        <div className="pf-security-head">
          <div className="pf-section-icon pf-section-icon--red">
            <Lock size={17} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="pf-section-title">الأمان</h2>
            <p className="pf-section-sub">إدارة أمان حسابك</p>
          </div>
        </div>

        <div className="pf-security-body">

          <div className="pf-security-item">
            <div className="pf-security-icon">
              <ShieldCheck size={20} strokeWidth={1.8} color="#EF3B3C" />
            </div>
            <div className="pf-security-info">
              <h4>كلمة المرور</h4>
              <p>قم بتغيير كلمة مرورك بانتظام لحماية حسابك</p>
            </div>
            <button type="button" className="pf-link-btn">
              تغيير كلمة المرور
            </button>
          </div>

          <div className="pf-security-item pf-security-item--border">
            <div className="pf-security-icon">
              <Smartphone size={20} strokeWidth={1.8} color="#EF3B3C" />
            </div>
            <div className="pf-security-info">
              <h4>المصادقة الثنائية</h4>
              <p>عزّز حماية حسابك بالتحقق بخطوتين</p>
            </div>
            <button type="button" className="pf-link-btn">
              تفعيل 2FA
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ProfileAR;