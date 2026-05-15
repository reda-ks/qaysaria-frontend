import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

// const ModernProfile = () => {
//   const { user, logout } = useAuth(); // Récupération du user et de la fonction logout
//   const [isEditing, setIsEditing] = useState({});
//   const [isSaving, setIsSaving] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [activeTab, setActiveTab] = useState('personal');

//   // État local pour gérer les modifications du formulaire
//   const [profileData, setProfileData] = useState({
//     nom: '',
//     telephone: '',
//     nomBoutique: '',
//     description: '',
//     adresse: '',
//     siteWeb: '',
//     heureOuverture: '',
//     heureFermeture: '',
//     city: ''
//   });

//   // Initialisation des données quand l'utilisateur est chargé
//   useEffect(() => {
//     if (user) {
//       setProfileData({
//         nom: user.name || '',
//         telephone: user.phoneNumber || '',
//         nomBoutique: user.shopName || '',
//         description: user.shopDescription || '',
//         adresse: user.shopAddress || '',
//         siteWeb: user.shopWebsite || '',
//         heureOuverture: user.shopOpeningTime || '09:00',
//         heureFermeture: user.shopClosingTime || '18:00',
//         city: user.city || ''
//       });
//     }
//   }, [user]);

//   const handleEditToggle = (field) => {
//     setIsEditing((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = (e) => {
//     e.preventDefault();
//     setIsSaving(true);

//     // Simulation d'appel API
//     setTimeout(() => {
//       console.log('Profil sauvegardé localement:', profileData);
//       setIsSaving(false);
//       setSaveSuccess(true);
//       setIsEditing({});

//       setTimeout(() => {
//         setSaveSuccess(false);
//       }, 3000);
//     }, 1500);
//   };

//   const renderField = (label, name, value, type = 'text', isTextarea = false) => (
//     <div className="modern-field">
//       <label className="field-label">{label}</label>
//       <div className="field-container">
//         {isEditing[name] ? (
//           isTextarea ? (
//             <textarea
//               name={name}
//               value={data[name]}
//               onChange={handleChange}
//               className="field-input textarea-input"
//               rows="4"
//             />
//           ) : (
//             <input
//               type={type}
//               name={name}
//               value={data[name]}
//               onChange={handleChange}
//               className="pf-input"
//             />
//           )
//         ) : (
//           <div className="field-display">
//             <span className="field-value">{value || '—'}</span>
//           </div>
//         )}
//         <button
//           type="button"
//           className={`edit-toggle ${isEditing[name] ? 'active' : ''}`}
//           onClick={() => handleEditToggle(name)}
//           title={isEditing[name] ? 'Valider' : 'Modifier'}
//         >
//           {isEditing[name] ? (
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18">
//               <polyline points="20 6 9 17 4 12"></polyline>
//             </svg>
//           ) : (
//             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18">
//               <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//               <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//             </svg>
//           )}
//         </button>
//       </div>
//     </div>
//   );

//   if (!user) return <div className="loading-profile">Chargement...</div>;

//   return (
//     <div className="modern-profile">
//       <style>{`
//         .modern-profile { background: #F4F6F8; min-height: 100vh; padding: 40px 20px; font-family: 'DM Sans', sans-serif; color: #212326; }
//         .profile-wrapper { max-width: 1000px; margin: 0 auto; }
//         .profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
//         .header-info { display: flex; gap: 24px; align-items: center; }
//         .profile-avatar { width: 100px; height: 100px; border-radius: 50%; background: #E63946; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; color: white; border: 4px solid #fff; box-shadow: 0 10px 20px rgba(230, 57, 70, 0.2); overflow: hidden; }
//         .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
//         .header-text h1 { margin: 0; font-size: 1.8rem; color: #2c1f15; }
//         .header-text p { margin: 5px 0 0; color: #6B7177; }
//         .tab-navigation { display: flex; background: #fff; padding: 5px; border-radius: 12px; margin-bottom: 30px; gap: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
//         .tab-button { flex: 1; padding: 12px; border: none; background: none; cursor: pointer; border-radius: 10px; font-weight: 600; color: #7a6b60; transition: 0.3s; }
//         .tab-button.active { background: #d9c7b8; color: white; }
//         .form-section { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
//         .section-header { padding: 25px 30px; border-bottom: 1px solid #f0f0f0; background: #fafafa; }
//         .section-content { padding: 30px; display: grid; gap: 20px; }
//         .modern-field { display: flex; flex-direction: column; gap: 8px; }
//         .field-label { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #6B7177; }
//         .field-container { position: relative; }
//         .field-input { width: 100%; padding: 12px 15px; border: 1.5px solid #E1E3E5; border-radius: 10px; font-size: 1rem; }
//         .field-display { padding: 12px 0; font-size: 1.1rem; color: #2c1f15; font-weight: 500; }
//         .edit-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #d9c7b8; border: none; color: white; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
//         .edit-toggle.active { background: #2E7D32; }
//         .form-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 25px; }
//         .btn-save { background: #212326; color: white; border: none; padding: 12px 30px; border-radius: 10px; font-weight: 600; cursor: pointer; }
//         .success-banner { background: #d1fae5; color: #065f46; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: center; font-weight: 600; }
//         @media (max-width: 768px) { .profile-header { flex-direction: column; text-align: center; } .header-info { flex-direction: column; } }
//       `}</style>

//       <div className="profile-wrapper">
//         {/* En-tête avec les vraies infos du Context */}
//         <div className="profile-header">
//           <div className="header-info">
//             <div className="profile-avatar">
//               {user.shopPhoto ? (
//                 <img src={user.shopPhoto} alt="Boutique" />
//               ) : (
//                 (user.shopName || user.name || 'U')[0].toUpperCase()
//               )}
//             </div>
//             <div className="header-text">
//               <h1>{profileData.nom || 'Utilisateur'}</h1>
//               <p>📍 {profileData.city || 'Ville non renseignée'}</p>
//             </div>
//           </div>
//           <button onClick={logout} className="btn-cancel" style={{border: '1px solid #ddd', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer'}}>
//             Déconnexion
//           </button>
//         </div>

//         {saveSuccess && (
//           <div className="success-banner">
//             ✨ Vos modifications ont été enregistrées avec succès !
//           </div>
//         )}

//         <div className="tab-navigation">
//           <button className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>👤 Personnel</button>
//           <button className={`tab-button ${activeTab === 'shop' ? 'active' : ''}`} onClick={() => setActiveTab('shop')}>🏪 Boutique</button>
//           <button className={`tab-button ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>🔒 Sécurité</button>
//         </div>

//         <form onSubmit={handleSave}>
//           {activeTab === 'personal' && (
//             <div className="form-section">
//               <div className="section-header">
//                 <h2>Informations Personnelles</h2>
//               </div>
//               <div className="section-content">
//                 {renderField('Nom complet', 'nom', profileData.nom)}
//                 {renderField('Téléphone', 'telephone', profileData.telephone, 'tel')}
//                 {renderField('Ville', 'city', profileData.city)}
//               </div>
//             </div>
//           )}

//           {activeTab === 'shop' && (
//             <div className="form-section">
//               <div className="section-header">
//                 <h2>Ma Boutique</h2>
//               </div>
//               <div className="section-content">
//                 {renderField('Nom de la Boutique', 'nomBoutique', profileData.nomBoutique)}
//                 {renderField('Description', 'description', profileData.description, 'text', true)}
//                 {renderField('Adresse physique', 'adresse', profileData.adresse)}
//                 <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
//                    {renderField('Ouverture', 'heureOuverture', profileData.heureOuverture, 'time')}
//                    {renderField('Fermeture', 'heureFermeture', profileData.heureFermeture, 'time')}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab !== 'security' && (
//             <div className="form-actions">
//               <button type="submit" className="btn-save" disabled={isSaving}>
//                 {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
//               </button>
//             </div>
//           )}
//         </form>

//         {activeTab === 'security' && (
//           <div className="form-section">
//             <div className="section-header"><h2>Sécurité</h2></div>
//             <div className="section-content">
//               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee'}}>
//                 <div>
//                   <h4 style={{margin: 0}}>Mot de passe</h4>
//                   <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#666'}}>Dernière modification il y a 3 mois</p>
//                 </div>
//                 <button className="tab-button" style={{width: 'auto', border: '1px solid #d9c7b8'}}>Modifier</button>
//               </div>
//               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0'}}>
//                 <div>
//                   <h4 style={{margin: 0}}>Email de récupération</h4>
//                   <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#666'}}>{user.email || 'Non renseigné'}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ModernProfile;
const ModernProfile = () => {
  const { user, logout } = useAuth(); // Récupération du user et de la fonction logout
  const [isEditing, setIsEditing] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

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

   const handleChange = (e) => {
     //const { name, value } = e.target;
   //  setData(prev => ({ ...prev, [name]: value }));
   };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

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
            <textarea
              name={name}
              //value={data[name]}
              onChange={handleChange}
              className="field-input textarea-input"
              rows="4"
            />
          ) : (
            <input
              type={type}
              name={name}
             // value={data[name]}
              onChange={handleChange}
              className="pf-input"
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
        </button>
      </div>
    </div>
  );

  if (!user) return <div className="loading-profile">Chargement...</div>;

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>
      <h2>Profil Utilisateur</h2>
      <p>Cette section est en cours de développement. Restez à l'écoute pour découvrir votre espace personnel amélioré !</p>
      <p>Nous travaillons dur pour vous offrir une expérience utilisateur exceptionnelle. Merci de votre patience !</p>
    </div>
  );
}
 export default ModernProfile;

