import React, { useState } from 'react';
import '../../../styles/pages css/profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    // Informations Personnelles
    nom: 'Benali',
    prenom: 'Fatima',
    email: 'fatima.benali@qaysaria.com',

    // Paramètres de la Boutique
    nomBoutique: 'Qaysaria Luxury',
    description:
      'Boutique spécialisée dans la haute couture et les accessoires de luxe',
    categorie: 'Vêtements & Accessoires',
    telephone: '+212 6 12 34 56 78',
    adresse: 'Casablanca, Maroc',
    siteWeb: 'https://www.qaysaria.com',
    heureOuverture: '09:00',
    heureFermeture: '18:00',
  });

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simuler l'envoi des données
    setTimeout(() => {
      console.log('Profil sauvegardé:', profileData);
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing({});

      // Afficher le message de succès pendant 3 secondes
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const renderField = (label, name, value, type = 'text', icon = '✏️') => (
    <div className="form-field">
      <label className="field-label">{label}</label>
      <div className="input-wrapper">
        {isEditing[name] ? (
          type === 'textarea' ? (
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              className="field-input textarea"
              rows="4"
            />
          ) : (
            <input
              type={type}
              name={name}
              value={value}
              onChange={handleChange}
              className="field-input"
            />
          )
        ) : (
          <span className="field-value">{value || 'Non renseigné'}</span>
        )}
        <button
          type="button"
          className={`edit-btn ${isEditing[name] ? 'active' : ''}`}
          onClick={() => handleEditToggle(name)}
          title={isEditing[name] ? 'Fermer' : 'Éditer'}
        >
          {isEditing[name] ? '✓' : icon}
        </button>
      </div>
    </div>
  );

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="header-content">
          <h1 className="page-title">Paramètres du Profil</h1>
          <p className="page-subtitle">
            Gérez vos informations personnelles et les paramètres de votre boutique
          </p>
        </div>
        <div className="profile-avatar">
          <span className="avatar-letter">{profileData.prenom.charAt(0)}</span>
        </div>
      </div>

      {/* Message de succès */}
      {saveSuccess && (
        <div className="success-banner">
          <span className="success-icon">✓</span>
          <span className="success-text">Modifications enregistrées avec succès!</span>
        </div>
      )}

      {/* Formulaire */}
      <form onSubmit={handleSave} className="profile-form">
        {/* Section Informations Personnelles */}
        <section className="form-section">
          <div className="section-header">
            <h2 className="section-title">👤 Informations Personnelles</h2>
            <p className="section-subtitle">Vos informations de compte</p>
          </div>

          <div className="section-content">
            <div className="form-row">
              {renderField('Prénom', 'prenom', profileData.prenom)}
              {renderField('Nom', 'nom', profileData.nom)}
            </div>
            {renderField('Email', 'email', profileData.email, 'email')}
          </div>
        </section>

        {/* Section Paramètres de la Boutique */}
        <section className="form-section">
          <div className="section-header">
            <h2 className="section-title">🏪 Paramètres de la Boutique</h2>
            <p className="section-subtitle">Informations de votre boutique en ligne</p>
          </div>

          <div className="section-content">
            <div className="form-row">
              {renderField('Nom de la Boutique', 'nomBoutique', profileData.nomBoutique)}
              {renderField('Catégorie', 'categorie', profileData.categorie)}
            </div>

            {renderField(
              'Description de la Boutique',
              'description',
              profileData.description,
              'textarea'
            )}

            <div className="form-row">
              {renderField('Téléphone', 'telephone', profileData.telephone, 'tel')}
              {renderField('Site Web', 'siteWeb', profileData.siteWeb, 'url')}
            </div>

            {renderField('Adresse', 'adresse', profileData.adresse)}

            <div className="form-row">
              {renderField('Heure d\'ouverture', 'heureOuverture', profileData.heureOuverture, 'time')}
              {renderField('Heure de fermeture', 'heureFermeture', profileData.heureFermeture, 'time')}
            </div>
          </div>
        </section>

        {/* Bouton Sauvegarder */}
        <div className="form-actions">
          <button
            type="submit"
            className={`btn-save ${isSaving ? 'loading' : ''}`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="spinner"></span>
                Sauvegarde en cours...
              </>
            ) : (
              <>
                <span className="btn-icon">💾</span>
                Sauvegarder les modifications
              </>
            )}
          </button>
        </div>
      </form>

      {/* Section de sécurité */}
      <section className="security-section">
        <div className="security-header">
          <h3>🔒 Sécurité</h3>
        </div>
        <div className="security-content">
          <div className="security-item">
            <div className="security-info">
              <h4>Mot de passe</h4>
              <p>Modifiez votre mot de passe régulièrement pour sécuriser votre compte</p>
            </div>
            <button type="button" className="btn-link">
              Modifier le mot de passe
            </button>
          </div>
          <div className="security-item border-top">
            <div className="security-info">
              <h4>Authentification à deux facteurs</h4>
              <p>Renforcez la sécurité de votre compte avec l'authentification à deux facteurs</p>
            </div>
            <button type="button" className="btn-link">
              Activer la 2FA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
