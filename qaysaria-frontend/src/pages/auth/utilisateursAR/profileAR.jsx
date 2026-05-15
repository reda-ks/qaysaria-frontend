import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const ModernProfileAR = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      console.log('تم حفظ الملف الشخصي:', profileData);
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
            <textarea
              name={name}
              value={profileData[name]}
              onChange={handleChange}
              className="field-input textarea-input"
              rows="4"
            />
          ) : (
            <input
              type={type}
              name={name}
              value={profileData[name]}
              onChange={handleChange}
              className="pf-input"
              style={{ width: '100%', padding: '12px 15px', border: '1.5px solid #E1E3E5', borderRadius: '10px' }}
            />
          )
        ) : (
          <div className="field-display">
            <span className="field-value">{value || '—'}</span>
          </div>
        )}
        <button
          type="button"
          className={`edit-toggle ${isEditing[name] ? 'active' : ''}`}
          onClick={() => handleEditToggle(name)}
          title={isEditing[name] ? 'حفظ' : 'تعديل'}
          style={{ left: '10px', right: 'auto' }} // Position adjusted for RTL
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
        </button>
      </div>
    </div>
  );

  if (!user) return <div className="loading-profile" style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>;

  return (
    <div className="modern-profile" dir="rtl">
      <style>{`
        .modern-profile { background: #F4F6F8; min-height: 100vh; padding: 40px 20px; font-family: 'Cairo', sans-serif; color: #212326; }
        .profile-wrapper { max-width: 1000px; margin: 0 auto; }
        .profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .header-info { display: flex; gap: 24px; align-items: center; }
        .profile-avatar { width: 100px; height: 100px; border-radius: 50%; background: #E63946; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; color: white; border: 4px solid #fff; box-shadow: 0 10px 20px rgba(230, 57, 70, 0.2); overflow: hidden; }
        .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .header-text h1 { margin: 0; font-size: 1.8rem; color: #2c1f15; }
        .header-text p { margin: 5px 0 0; color: #6B7177; }
        .tab-navigation { display: flex; background: #fff; padding: 5px; border-radius: 12px; margin-bottom: 30px; gap: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
        .tab-button { flex: 1; padding: 12px; border: none; background: none; cursor: pointer; border-radius: 10px; font-weight: 600; color: #7a6b60; transition: 0.3s; font-family: inherit; }
        .tab-button.active { background: #d9c7b8; color: white; }
        .form-section { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 20px; }
        .section-header { padding: 25px 30px; border-bottom: 1px solid #f0f0f0; background: #fafafa; }
        .section-content { padding: 30px; display: grid; gap: 20px; }
        .modern-field { display: flex; flex-direction: column; gap: 8px; }
        .field-label { font-size: 0.85rem; font-weight: 700; color: #6B7177; text-align: right; }
        .field-container { position: relative; }
        .field-input { width: 100%; padding: 12px 15px; border: 1.5px solid #E1E3E5; border-radius: 10px; font-size: 1rem; text-align: right; }
        .field-display { padding: 12px 0; font-size: 1.1rem; color: #2c1f15; font-weight: 500; text-align: right; }
        .edit-toggle { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: #d9c7b8; border: none; color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .edit-toggle.active { background: #2E7D32; }
        .form-actions { display: flex; justify-content: flex-start; gap: 15px; margin-top: 25px; }
        .btn-save { background: #212326; color: white; border: none; padding: 12px 30px; border-radius: 10px; font-weight: 600; cursor: pointer; font-family: inherit; }
        .success-banner { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center; font-weight: 600; }
        @media (max-width: 768px) { .profile-header { flex-direction: column; text-align: center; } .header-info { flex-direction: column; } }
      `}</style>

      <div className="profile-wrapper">
        <div className="profile-header">
          <div className="header-info">
            <div className="profile-avatar">
              {user.shopPhoto ? (
                <img src={user.shopPhoto} alt="المتجر" />
              ) : (
                (user.shopName || user.name || 'م')[0].toUpperCase()
              )}
            </div>
            <div className="header-text">
              <h1>{profileData.nom || 'مستخدم جديد'}</h1>
              <p>📍 {profileData.city || 'المدينة غير محددة'}</p>
            </div>
          </div>
          <button onClick={logout} className="btn-logout" style={{ border: '1px solid #ddd', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', background: 'white' }}>
            تسجيل الخروج
          </button>
        </div>

        {saveSuccess && (
          <div className="success-banner">
            ✨ تم حفظ التعديلات بنجاح!
          </div>
        )}

        <div className="tab-navigation">
          <button className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>👤 الشخصية</button>
          <button className={`tab-button ${activeTab === 'shop' ? 'active' : ''}`} onClick={() => setActiveTab('shop')}>🏪 المتجر</button>
          <button className={`tab-button ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>🔒 الأمان</button>
        </div>

        <form onSubmit={handleSave}>
          {activeTab === 'personal' && (
            <div className="form-section">
              <div className="section-header">
                <h2>المعلومات الشخصية</h2>
              </div>
              <div className="section-content">
                {renderField('الاسم الكامل', 'nom', profileData.nom)}
                {renderField('رقم الهاتف', 'telephone', profileData.telephone, 'tel')}
                {renderField('المدينة', 'city', profileData.city)}
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="form-section">
              <div className="section-header">
                <h2>متجري</h2>
              </div>
              <div className="section-content">
                {renderField('اسم المتجر', 'nomBoutique', profileData.nomBoutique)}
                {renderField('وصف المتجر', 'description', profileData.description, 'text', true)}
                {renderField('العنوان الفعلي', 'adresse', profileData.adresse)}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {renderField('وقت الافتتاح', 'heureOuverture', profileData.heureOuverture, 'time')}
                  {renderField('وقت الإغلاق', 'heureFermeture', profileData.heureFermeture, 'time')}
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'security' && (
            <div className="form-actions">
              <button type="submit" className="btn-save" disabled={isSaving}>
                {isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات'}
              </button>
            </div>
          )}
        </form>

        {activeTab === 'security' && (
          <div className="form-section">
            <div className="section-header"><h2>الأمان</h2></div>
            <div className="section-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                <div>
                  <h4 style={{ margin: 0 }}>كلمة المرور</h4>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>آخر تغيير منذ 3 أشهر</p>
                </div>
                <button className="tab-button" style={{ width: 'auto', border: '1px solid #d9c7b8', padding: '5px 15px' }}>تعديل</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                <div>
                  <h4 style={{ margin: 0 }}>البريد الإلكتروني للاسترداد</h4>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem', color: '#666' }}>{user.email || 'غير متوفر'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernProfileAR;