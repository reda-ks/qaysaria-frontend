import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pages css/Howitworks.css';



const STEPS_ACHETEUR = [
  {
    number: '01',
    icon: '🔍',
    title: 'Explorez',
    subtitle: 'Trouvez ce que vous cherchez',
    desc: 'Parcourez des milliers de produits et boutiques vérifiées à travers tout le Maroc. Filtrez par ville, catégorie, marque ou prix.',
  },
  {
    number: '02',
    icon: '🛒',
    title: 'Commandez',
    subtitle: 'En quelques clics',
    desc: 'Ajoutez vos articles au panier et finalisez votre commande en toute sécurité. Paiement en ligne ou à la livraison disponible.',
  },
  {
    number: '03',
    icon: '📦',
    title: 'Recevez',
    subtitle: 'Livraison partout au Maroc',
    desc: 'Suivez votre commande en temps réel. Livraison rapide à domicile dans toutes les villes du Royaume.',
  },
  {
    number: '04',
    icon: '⭐',
    title: 'Évaluez',
    subtitle: 'Partagez votre expérience',
    desc: 'Notez votre achat et aidez la communauté Qaysaria à identifier les meilleures boutiques.',
  },
];

const STEPS_VENDEUR = [
  {
    number: '01',
    icon: '🏪',
    title: 'Créez votre boutique',
    subtitle: 'Inscription gratuite',
    desc: 'Ouvrez votre boutique en ligne en quelques minutes. Renseignez vos informations, choisissez vos catégories et téléchargez votre logo.',
  },
  {
    number: '02',
    icon: '📸',
    title: 'Listez vos produits',
    subtitle: 'Catalogue illimité',
    desc: 'Ajoutez vos articles avec photos, descriptions et prix. Notre interface intuitive vous guide à chaque étape.',
  },
  {
    number: '03',
    icon: '💬',
    title: 'Gérez vos commandes',
    subtitle: 'Tableau de bord complet',
    desc: 'Recevez les commandes, communiquez avec vos clients et gérez vos livraisons depuis votre espace vendeur.',
  },
  {
    number: '04',
    icon: '💰',
    title: 'Encaissez',
    subtitle: 'Paiement sécurisé & rapide',
    desc: 'Recevez vos paiements directement sur votre compte. Commissions transparentes, zéro surprise.',
  },
];

const FEATURES = [
  { icon: '', title: 'Boutiques vérifiées', desc: 'Chaque vendeur est contrôlé et validé par notre équipe.' },
  { icon: '', title: 'Paiement sécurisé', desc: 'Transactions protégées par chiffrement SSL 256 bits.' },
  { icon: '', title: 'Livraison nationale', desc: 'Réseau logistique couvrant toutes les villes du Maroc.' },
  { icon: '', title: 'Retour facile', desc: 'Politique de retour sous 14 jours sans questions posées.' },
  { icon: '', title: 'Support 7j/7', desc: 'Notre équipe est disponible pour vous aider à tout moment.' },
  { icon: '', title: 'Communauté locale', desc: 'Soutenez les artisans et commerçants marocains.' },
];

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const StepCard = ({ step, index, side }) => {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`step-card ${visible ? 'visible' : ''} side-${side}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="step-number">{step.number}</div>
      <div className="step-icon-wrap">
        <span className="step-icon">{step.icon}</span>
      </div>
      <div className="step-body">
        <h3 className="step-title">{step.title}</h3>
        <span className="step-subtitle">{step.subtitle}</span>
        <p className="step-desc">{step.desc}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('acheteur');
  const [heroRef, heroVisible] = useInView(0.1);
  const [featRef, featVisible] = useInView(0.1);
  const [ctaRef, ctaVisible] = useInView(0.1);

  const steps = tab === 'acheteur' ? STEPS_ACHETEUR : STEPS_VENDEUR;

  return (
    <div className="hiw-page">

      {/* ── HERO ── */}
      <section ref={heroRef} className={`hiw-hero ${heroVisible ? 'visible' : ''}`}>
        <div className="hiw-hero-bg">
          <div className="hiw-orb hiw-orb-1" />
          <div className="hiw-orb hiw-orb-2" />
          <div className="hiw-orb hiw-orb-3" />
          <div className="hiw-geo hiw-geo-1">◆</div>
          <div className="hiw-geo hiw-geo-2">◈</div>
          <div className="hiw-geo hiw-geo-3">◇</div>
        </div>
        <div className="hiw-hero-content">
          <div className="hiw-badge">🇲🇦 Plateforme digitale nationale</div>
          <h1 className="hiw-hero-title">
            Comment ça<br />
            <span className="hiw-gradient-text">marche ?</span>
          </h1>
          <p className="hiw-hero-subtitle">
            Simple, rapide et sécurisé. Découvrez comment Qaysaria connecte<br />
            acheteurs et vendeurs à travers tout le Royaume.
          </p>
          <div className="hiw-hero-stats">
            <div className="hiw-stat">
              <span className="hiw-stat-num">+500</span>
              <span className="hiw-stat-label">Boutiques</span>
            </div>
            <div className="hiw-stat-divider" />
            <div className="hiw-stat">
              <span className="hiw-stat-num">+15k</span>
              <span className="hiw-stat-label">Produits</span>
            </div>
            <div className="hiw-stat-divider" />
            <div className="hiw-stat">
              <span className="hiw-stat-num">12</span>
              <span className="hiw-stat-label">Villes</span>
            </div>
          </div>
        </div>
        <div className="hiw-scroll-hint">
          <span>Défiler</span>
          <div className="hiw-scroll-arrow" />
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="hiw-steps-section">
        <div className="hiw-tabs">
          <button
            className={`hiw-tab ${tab === 'acheteur' ? 'active' : ''}`}
            onClick={() => setTab('acheteur')}
          >
            🛍️ Je suis acheteur
          </button>
          <button
            className={`hiw-tab ${tab === 'vendeur' ? 'active' : ''}`}
            onClick={() => setTab('vendeur')}
          >
            🏪 Je suis vendeur
          </button>
        </div>

        <div className="hiw-steps-label">
          {tab === 'acheteur'
            ? 'Achetez en 4 étapes simples'
            : 'Vendez en 4 étapes simples'}
        </div>

        <div className="hiw-steps-grid" key={tab}>
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} side={i % 2 === 0 ? 'left' : 'right'} />
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featRef} className={`hiw-features-section ${featVisible ? 'visible' : ''}`}>
        <div className="hiw-section-header">
          <span className="hiw-section-eyebrow">Pourquoi Qaysaria ?</span>
          <h2 className="hiw-section-title">Tout ce qui rend<br />notre plateforme unique</h2>
        </div>
        <div className="hiw-features-grid">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="hiw-feature-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="hiw-feature-icon">{f.icon}</div>
              <h4 className="hiw-feature-title">{f.title}</h4>
              <p className="hiw-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className={`hiw-cta-section ${ctaVisible ? 'visible' : ''}`}>
        <div className="hiw-cta-inner">
          <div className="hiw-cta-deco">🇲🇦</div>
          <h2 className="hiw-cta-title">Prêt à rejoindre<br />Qaysaria ?</h2>
          <p className="hiw-cta-sub">
            Des milliers de Marocains achètent et vendent déjà sur notre plateforme.
          </p>
          <div className="hiw-cta-buttons">
            <button className="hiw-btn-primary" onClick={() => navigate('/produits')}>
              🛍️ Commencer à acheter
            </button>
            <button className="hiw-btn-secondary" onClick={() => navigate('/register')}>
              🏪 Ouvrir ma boutique
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;