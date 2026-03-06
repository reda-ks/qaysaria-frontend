import React, { useState } from 'react';
import '../../../styles/pages css/support.css';

const Support = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjects = [
    { value: '', label: 'Sélectionnez un sujet' },
    { value: 'question', label: '❓ Question générale' },
    { value: 'commande', label: '📦 Problème avec une commande' },
    { value: 'produit', label: '🛍️ Question sur un produit' },
    { value: 'retour', label: '↩️ Retour ou échange' },
    { value: 'paiement', label: '💳 Problème de paiement' },
    { value: 'compte', label: '👤 Problème de compte' },
    { value: 'autre', label: '⚙️ Autre' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.subject || !formData.message.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    // Simuler l'envoi du formulaire
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({ subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="support-container">
      {/* Illustration côté gauche */}
      <div className="support-illustration">
        <div className="headset-3d">
          <div className="headset-ear left"></div>
          <div className="headset-ear right"></div>
          <div className="headset-band"></div>
          <div className="headset-mic"></div>
        </div>
        <div className="support-text">
          <h2>Centre d'assistance</h2>
          <p>Nous sommes là pour vous aider</p>
        </div>
      </div>

      {/* Formulaire centré */}
      <div className="support-form-wrapper">
        <div className="support-form-container">
          <div className="form-header">
            <h1>Contactez-nous</h1>
            <p className="form-subtitle">Remplissez le formulaire ci-dessous et nous vous répondrons rapidement</p>
          </div>

          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message envoyé avec succès!</h3>
              <p>Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="support-form">
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Sujet <span className="required">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-select"
                >
                  {subjects.map((subject) => (
                    <option key={subject.value} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre question ou votre problème en détail..."
                  className="form-textarea"
                  rows="6"
                ></textarea>
                <div className="char-count">
                  {formData.message.length} / 1000 caractères
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <span className="btn-text">Envoyer le message</span>
                <span className="btn-icon">→</span>
              </button>
            </form>
          )}

          {/* Informations de contact */}
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📧</span>
              <span className="info-text">support@qaysaria.com</span>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <span className="info-text">+212 5 22 12 34 56</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <span className="info-text">Lun-Ven: 9h-18h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
