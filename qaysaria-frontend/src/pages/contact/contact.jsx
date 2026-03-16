import React, { useState } from 'react';
import '../../styles/pages css/contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Nous Contacter</h1>
        <p className="contact-subtitle">
          Nous sommes là pour répondre à toutes vos questions et préoccupations
        </p>
      </div>

      <div className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted && (
            <div className="success-message">
              ✓ Merci! Votre message a été envoyé avec succès.
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="votre.email@exemple.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sujet</label>
            <input
              type="text"
              className="form-input"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Objet de votre message"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Écrivez votre message ici..."
            ></textarea>
          </div>

          <button type="submit" className="form-submit">
            Envoyer le message
          </button>
        </form>

        <div className="contact-info">
          <div className="info-block">
            <h3 className="info-title">
              <span className="info-icon">📍</span>
              Adresse
            </h3>
            <p className="info-text">
              QAISARYA Platform<br />
              Casablanca, Maroc<br />
              200010
            </p>
          </div>

          <div className="info-block">
            <h3 className="info-title">
              <span className="info-icon">📞</span>
              Téléphone
            </h3>
            <p className="info-text">
              <a href="tel:+212612345678">+212 6 12 34 56 78</a><br />
              <span style={{ fontSize: '0.9rem' }}>Lun-Ven: 9h-18h</span>
            </p>
          </div>

          <div className="info-block">
            <h3 className="info-title">
              <span className="info-icon">✉️</span>
              Email
            </h3>
            <p className="info-text">
              <a href="mailto:support@qaisarya.com">support@qaisarya.com</a><br />
              <a href="mailto:contact@qaisarya.com">contact@qaisarya.com</a>
            </p>
          </div>

          <div className="info-block">
            <h3 className="info-title">
              <span className="info-icon">🌐</span>
              Suivez-nous
            </h3>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                f
              </a>
              <a href="#" className="social-link" title="Twitter">
                𝕏
              </a>
              <a href="#" className="social-link" title="Instagram">
                📷
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;