<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const ModernProfile = () => {
  const { user, logout } = useAuth(); // Récupération du user et de la fonction logout
  const [isEditing, setIsEditing] = useState({});
  const [isSaving, setIsSaving] = useState(false);
>>>>>>> frontt-saad-branch
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

<<<<<<< HEAD
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
=======
  // État local pour gérer les modifications du formulaire
  const [profileData, setProfileData] = useState({
    nom: '',
    telephone: '',
    nomBoutique: '',
    description: '',
    adresse: '',
    siteWeb: '',
    heureOuverture: '',
    heureFermeture: '',
    city: ''
  });

  // Initialisation des données quand l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setProfileData({
        nom: user.name || '',
        telephone: user.phoneNumber || '',
        nomBoutique: user.shopName || '',
        description: user.shopDescription || '',
        adresse: user.shopAddress || '',
        siteWeb: user.shopWebsite || '',
        heureOuverture: user.shopOpeningTime || '09:00',
        heureFermeture: user.shopClosingTime || '18:00',
        city: user.city || ''
      });
    }
  }, [user]);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

>>>>>>> frontt-saad-branch
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
<<<<<<< HEAD
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
=======

    // Simulation d'appel API
    setTimeout(() => {
      console.log('Profil sauvegardé localement:', profileData);
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing({});

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const renderField = (label, name, value, type = 'text', isTextarea = false) => (
    <div className="modern-field">
      <label className="field-label">{label}</label>
      <div className="field-container">
        {isEditing[name] ? (
          isTextarea ? (
>>>>>>> frontt-saad-branch
            <textarea
              name={name}
              value={data[name]}
              onChange={handleChange}
<<<<<<< HEAD
              className="pf-input pf-textarea"
              rows={3}
=======
              className="field-input textarea-input"
              rows="4"
>>>>>>> frontt-saad-branch
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
<<<<<<< HEAD
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
=======
          <div className="field-display">
            <span className="field-value">{value || '—'}</span>
          </div>
        )}
        <button
          type="button"
          className={`edit-toggle ${isEditing[name] ? 'active' : ''}`}
          onClick={() => handleEditToggle(name)}
          title={isEditing[name] ? 'Valider' : 'Modifier'}
        >
          {isEditing[name] ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          )}
>>>>>>> frontt-saad-branch
        </button>
      </div>
    </div>
  );

  if (!user) return <div className="loading-profile">Chargement...</div>;

  return (
<<<<<<< HEAD
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
=======
    <div className="modern-profile">
      <style>{`
        .modern-profile { background: #F4F6F8; min-height: 100vh; padding: 40px 20px; font-family: 'DM Sans', sans-serif; color: #212326; }
        .profile-wrapper { max-width: 1000px; margin: 0 auto; }
        .profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .header-info { display: flex; gap: 24px; align-items: center; }
        .profile-avatar { width: 100px; height: 100px; border-radius: 50%; background: #E63946; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; color: white; border: 4px solid #fff; box-shadow: 0 10px 20px rgba(230, 57, 70, 0.2); overflow: hidden; }
        .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .header-text h1 { margin: 0; font-size: 1.8rem; color: #2c1f15; }
        .header-text p { margin: 5px 0 0; color: #6B7177; }
        .tab-navigation { display: flex; background: #fff; padding: 5px; border-radius: 12px; margin-bottom: 30px; gap: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
        .tab-button { flex: 1; padding: 12px; border: none; background: none; cursor: pointer; border-radius: 10px; font-weight: 600; color: #7a6b60; transition: 0.3s; }
        .tab-button.active { background: #d9c7b8; color: white; }
        .form-section { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .section-header { padding: 25px 30px; border-bottom: 1px solid #f0f0f0; background: #fafafa; }
        .section-content { padding: 30px; display: grid; gap: 20px; }
        .modern-field { display: flex; flex-direction: column; gap: 8px; }
        .field-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #6B7177; }
        .field-container { position: relative; }
        .field-input { width: 100%; padding: 12px 15px; border: 1.5px solid #E1E3E5; border-radius: 10px; font-size: 1rem; }
        .field-display { padding: 12px 0; font-size: 1.1rem; color: #2c1f15; font-weight: 500; }
        .edit-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #d9c7b8; border: none; color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .edit-toggle.active { background: #2E7D32; }
        .form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 25px; }
        .btn-save { background: #212326; color: white; border: none; padding: 12px 30px; border-radius: 10px; font-weight: 600; cursor: pointer; }
        .success-banner { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center; font-weight: 600; }
        @media (max-width: 768px) { .profile-header { flex-direction: column; text-align: center; } .header-info { flex-direction: column; } }
      `}</style>

      <div className="profile-wrapper">
        {/* En-tête avec les vraies infos du Context */}
        <div className="profile-header">
          <div className="header-info">
            <div className="profile-avatar">
              {user.shopPhoto ? (
                <img src={user.shopPhoto} alt="Boutique" />
              ) : (
                (user.shopName || user.name || 'U')[0].toUpperCase()
              )}
            </div>
            <div className="header-text">
              <h1>{profileData.nom || 'Utilisateur'}</h1>
              <p>📍 {profileData.city || 'Ville non renseignée'}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-cancel" style={{border: '1px solid #ddd', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer'}}>
            Déconnexion
>>>>>>> frontt-saad-branch
          </button>
        </div>

<<<<<<< HEAD
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

=======
        {saveSuccess && (
          <div className="success-banner">
            ✨ Vos modifications ont été enregistrées avec succès !
          </div>
        )}

        <div className="tab-navigation">
          <button className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>👤 Personnel</button>
          <button className={`tab-button ${activeTab === 'shop' ? 'active' : ''}`} onClick={() => setActiveTab('shop')}>🏪 Boutique</button>
          <button className={`tab-button ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>🔒 Sécurité</button>
        </div>

        <form onSubmit={handleSave}>
          {activeTab === 'personal' && (
            <div className="form-section">
              <div className="section-header">
                <h2>Informations Personnelles</h2>
              </div>
              <div className="section-content">
                {renderField('Nom complet', 'nom', profileData.nom)}
                {renderField('Téléphone', 'telephone', profileData.telephone, 'tel')}
                {renderField('Ville', 'city', profileData.city)}
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="form-section">
              <div className="section-header">
                <h2>Ma Boutique</h2>
              </div>
              <div className="section-content">
                {renderField('Nom de la Boutique', 'nomBoutique', profileData.nomBoutique)}
                {renderField('Description', 'description', profileData.description, 'text', true)}
                {renderField('Adresse physique', 'adresse', profileData.adresse)}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                   {renderField('Ouverture', 'heureOuverture', profileData.heureOuverture, 'time')}
                   {renderField('Fermeture', 'heureFermeture', profileData.heureFermeture, 'time')}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'security' && (
            <div className="form-actions">
              <button type="submit" className="btn-save" disabled={isSaving}>
                {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
            </div>
          )}
        </form>

        {activeTab === 'security' && (
          <div className="form-section">
            <div className="section-header"><h2>Sécurité</h2></div>
            <div className="section-content">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee'}}>
                <div>
                  <h4 style={{margin: 0}}>Mot de passe</h4>
                  <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#666'}}>Dernière modification il y a 3 mois</p>
                </div>
                <button className="tab-button" style={{width: 'auto', border: '1px solid #d9c7b8'}}>Modifier</button>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0'}}>
                <div>
                  <h4 style={{margin: 0}}>Email de récupération</h4>
                  <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#666'}}>{user.email || 'Non renseigné'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
>>>>>>> frontt-saad-branch
    </div>
  );
};

<<<<<<< HEAD
export default ProfileAR;
=======
export default ModernProfile;
>>>>>>> frontt-saad-branch
