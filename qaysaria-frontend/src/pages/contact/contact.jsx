
import React, { useState } from 'react';
import {
  MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2,
  Facebook, Instagram, Linkedin, Twitter, MessageCircle, ChevronRight
} from 'lucide-react';
import '../../styles/pages css/contact.css';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', type: 'acheteur' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '', type: 'acheteur' });
        setSubmitted(false);
      }, 4000);
    }, 1200);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Bonjour QAISARYA ! Je voudrais obtenir de l'aide.");
    window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
  };

  const INFO = [
    { Icon: MapPin,  title: 'Adresse',        lines: ['QAISARYA Platform', 'Casablanca, Maroc — 20000'] },
    { Icon: Phone,   title: 'Téléphone',       lines: ['+212 6 12 34 56 78'], sub: 'Lundi – Vendredi : 9h à 18h' },
    { Icon: Mail,    title: 'Email',            lines: ['support@qaisarya.com', 'contact@qaisarya.com'] },
    { Icon: Clock,   title: 'Disponibilité',   lines: ['Lun – Ven : 9h – 18h', 'Sam : 10h – 14h'], sub: 'Réponse sous 24h' },
  ];

  const SOCIALS = [
    { Icon: Facebook,  label: 'Facebook',    href: '#' },
    { Icon: Instagram, label: 'Instagram',   href: '#' },
    { Icon: Linkedin,  label: 'LinkedIn',    href: '#' },
    { Icon: Twitter,   label: 'Twitter / X', href: '#' },
  ];

  const TYPE_OPTIONS = [
    { value: 'acheteur', label: 'Acheteur',  Icon: () => <span>🛍️</span> },
    { value: 'vendeur',  label: 'Vendeur',   Icon: () => <span>🏪</span> },
    { value: 'autre',    label: 'Autre',     Icon: MessageCircle },
  ];

  return (
    <div className="contact-page">

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <span className="contact-hero-tag">🇲🇦 Support QAISARYA</span>
          <h1 className="contact-hero-title">Nous sommes là pour vous</h1>
          <p className="contact-hero-sub">
            Une question, un problème ou une suggestion ? Notre équipe vous
            répond dans les 24 heures ouvrées.
          </p>
          <div className="contact-hero-stats">
            <div className="contact-hero-stat"><strong>&lt; 24h</strong> Temps de réponse</div>
            <div className="contact-hero-stat"><strong>7j/7</strong> Support WhatsApp</div>
            <div className="contact-hero-stat"><strong>100%</strong> Satisfaction garantie</div>
          </div>
        </div>
      </section>

      {/* ── WA BAR ── */}
      <div className="contact-wa-bar">
        <div className="contact-wa-bar-inner">
          <div className="contact-wa-bar-text">
            <strong>Besoin d'une réponse rapide ?</strong>
            <span>Contactez-nous directement sur WhatsApp — réponse immédiate.</span>
          </div>
          <button className="btn-wa-lg" onClick={handleWhatsApp}>
            <WhatsAppIcon />
            Écrire sur WhatsApp
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="contact-body">
        <div className="contact-layout">

          {/* FORM */}
          <div className="contact-form-wrap">
            <div className="contact-form-head">
              <span className="contact-form-tag">Message</span>
              <h2 className="contact-form-title">Envoyez-nous un message</h2>
              <p className="contact-form-sub">Remplissez le formulaire et nous vous répondrons très rapidement.</p>
            </div>

            {submitted ? (
              <div className="contact-success">
                <CheckCircle2 size={52} color="#25D366" strokeWidth={1.5} />
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Notre équipe vous contactera dans les 24 heures.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>

                <div className="form-type-row">
                  {TYPE_OPTIONS.map(({ value, label, Icon }) => (
                    <label key={value} className={`form-type-option ${formData.type === value ? 'active' : ''}`}>
                      <input type="radio" name="type" value={value} checked={formData.type === value} onChange={handleChange} />
                      <Icon size={15} />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Nom complet <span>*</span></label>
                    <input type="text" className="form-input" name="name" value={formData.name} onChange={handleChange} required placeholder="Mohammed Alami" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span>*</span></label>
                    <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} required placeholder="votre@email.com" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Sujet <span>*</span></label>
                  <input type="text" className="form-input" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Ex : Problème de commande, question sur une boutique…" />
                </div>

                <div className="form-group">
                  <label className="form-label">Message <span>*</span></label>
                  <textarea className="form-textarea" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Décrivez votre demande en détail…" />
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading
                    ? <><Loader2 size={16} className="spin-icon" /> Envoi en cours…</>
                    : <><Send size={15} /> Envoyer le message</>
                  }
                </button>

              </form>
            )}
          </div>

          {/* INFO COL */}
          <aside className="contact-info-col">
            <div className="contact-info-head">
              <span className="contact-form-tag">Coordonnées</span>
              <h2 className="contact-form-title">Retrouvez-nous</h2>
            </div>

            <div className="contact-info-cards">
              {INFO.map(({ Icon, title, lines, sub }) => (
                <div key={title} className="contact-info-card">
                  <div className="contact-info-icon">
                    <Icon size={18} strokeWidth={1.8} color="#EF3B3C" />
                  </div>
                  <div className="contact-info-text">
                    <strong>{title}</strong>
                    {lines.map((l, i) => <span key={i}>{l}</span>)}
                    {sub && <span className="contact-info-sub">{sub}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <p className="contact-social-label">Suivez-nous</p>
              <div className="contact-social-row">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a key={label} href={href} className="contact-social-btn" title={label}>
                    <Icon size={17} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Contact;