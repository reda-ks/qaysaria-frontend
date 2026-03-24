import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck, BarChart3, ArrowRight, Percent, Infinity, Lock } from 'lucide-react';
import '../../../styles/pages css/QuiSommesNous.css';

const QuiSommesNous = () => {
  const navigate = useNavigate();

  const FEATURES = [
    {
      Icon: MapPin,
      num: '01',
      title: 'Exploration par Ville',
      text: 'Chaque ville marocaine dispose de sa propre vitrine numérique. Naviguez entre Casablanca, Marrakech, Fès et toutes les grandes cités pour découvrir les meilleurs commerçants locaux près de chez vous.',
    },
    {
      Icon: ShieldCheck,
      num: '02',
      title: 'Boutiques Vérifiées',
      text: 'Chaque commerçant passe par un processus de validation complet (KYC) avant d\'apparaître sur la plateforme. Vous achetez avec la certitude que chaque boutique est authentique, sérieuse et fiable.',
    },
    {
      Icon: BarChart3,
      num: '03',
      title: 'Contact Direct WhatsApp',
      text: 'Simplifiez vos achats en contactant directement le vendeur via WhatsApp en un seul clic. Plus besoin de naviguer entre plusieurs applications — la vente se fait simplement et rapidement.',
    },
  ];

  const HIGHLIGHTS = [
    { Icon: Percent,  num: '100%', label: 'Marocain'    },
    { Icon: Infinity, num: '∞',    label: 'Possibilités' },
    { Icon: Lock,     num: '🔒',   label: 'Sécurisé'    },
  ];

  return (
    <div className="qui-sommes-nous-container">

      {/* ── HERO ── */}
      <section className="qsn-hero">
        <div className="qsn-hero-inner">
          <span className="qsn-hero-tag">🇲🇦 À propos de QAISARYA</span>
          <h1 className="qsn-hero-title">Le Pont entre Tradition et Digital</h1>
          <p className="qsn-hero-sub">
            Une plateforme sécurisée et professionnelle conçue pour les commerçants
            marocains — de l'artisan du souk aux boutiques modernes.
          </p>
          <div className="qsn-hero-stats">
            <div className="qsn-hero-stat"><strong>500+</strong> Boutiques vérifiées</div>
            <div className="qsn-hero-stat"><strong>12+</strong> Villes couvertes</div>
            <div className="qsn-hero-stat"><strong>15k</strong> Produits disponibles</div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="qsn-section qsn-section--gray">
        <div className="qsn-container">
          <div className="qsn-section-head">
            <span className="qsn-section-tag">Notre Histoire</span>
            <h2 className="qsn-section-title">Le Défi que nous avons relevé</h2>
            <p className="qsn-section-sub">Les commerçants marocains méritaient mieux que les réseaux sociaux. Nous avons construit la solution qu'ils attendaient.</p>
            <div className="qsn-rule"><span className="qsn-rule-dot" /></div>
          </div>

          <div className="qsn-ps-grid">
            <div className="qsn-card qsn-card--problem">
              <div className="qsn-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" style={{color:'#EF3B3C'}}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="qsn-card-title">Le Problème</h3>
              <p className="qsn-card-text">
                Facebook, Instagram, WhatsApp : des outils puissants mais chaotiques pour vendre.
                Les commerçants jonglent entre les messages privés, les publications perdues dans les fils d'actualité
                et l'absence totale de structure. Pas de catalogue, pas de gestion des stocks,
                pas de crédibilité garantie — juste de la confusion.
              </p>
            </div>

            <div className="qsn-card qsn-card--solution">
              <div className="qsn-card-icon">
                <ShieldCheck size={22} strokeWidth={2} style={{color:'#EF3B3C'}} />
              </div>
              <h3 className="qsn-card-title">La Solution QAISARYA</h3>
              <p className="qsn-card-text">
                Un écosystème numérique centralisé, structuré et professionnel.
                QAISARYA offre à chaque commerçant une boutique en ligne vérifiée,
                un catalogue clair, une visibilité par ville et un lien direct avec
                les acheteurs via WhatsApp. Simple, efficace, 100% marocain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="qsn-section qsn-section--white">
        <div className="qsn-container">
          <div className="qsn-section-head">
            <span className="qsn-section-tag">Ce qui nous rend unique</span>
            <h2 className="qsn-section-title">Nos 3 Piliers</h2>
            <p className="qsn-section-sub">Chaque fonctionnalité a été pensée pour répondre aux vrais besoins des commerçants et des acheteurs marocains.</p>
            <div className="qsn-rule"><span className="qsn-rule-dot" /></div>
          </div>

          <div className="qsn-features-grid">
            {FEATURES.map(({ Icon, num, title, text }, i) => (
              <div key={num} className="qsn-feature" data-num={num}>
                <div className="qsn-feature-icon">
                  <Icon size={22} strokeWidth={1.8} color="#EF3B3C" />
                </div>
                <h3 className="qsn-feature-title">{title}</h3>
                <p className="qsn-feature-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="qsn-section qsn-section--gray">
        <div className="qsn-container">
          <div className="qsn-section-head">
            <span className="qsn-section-tag">Notre Vision</span>
            <h2 className="qsn-section-title">Digitaliser le Commerce Marocain</h2>
            <div className="qsn-rule"><span className="qsn-rule-dot" /></div>
          </div>

          <div className="qsn-vision-wrap">
            <p className="qsn-vision-text">
              QAISARYA a été créée avec une conviction simple : chaque commerçant marocain,
              qu'il soit artisan dans la médina de Fès, bijoutier à Marrakech ou vendeur
              de mode à Casablanca, mérite une présence numérique digne et professionnelle.
              Notre mission est de transformer les petits commerces marocains en acteurs
              d'un écosystème numérique national — en préservant l'authenticité, en
              garantissant la confiance et en simplifiant chaque étape de la vente.
            </p>

            <div className="qsn-highlights">
              <div className="qsn-highlight">
                <span className="qsn-highlight-number">100%</span>
                <span className="qsn-highlight-label">Marocain</span>
              </div>
              <div className="qsn-highlight">
                <span className="qsn-highlight-number">98%</span>
                <span className="qsn-highlight-label">Satisfaits</span>
              </div>
              <div className="qsn-highlight">
                <Lock size={28} strokeWidth={1.8} color="#EF3B3C" />
                <span className="qsn-highlight-label">Sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="qsn-cta">
        <div className="qsn-cta-inner">
          <h2 className="qsn-cta-title">Prêt à Rejoindre QAISARYA ?</h2>
          <p className="qsn-cta-sub">Que vous soyez acheteur ou commerçant — votre place est ici.</p>
          <div className="qsn-cta-btns">
            <button className="btn btn-primary" onClick={() => navigate('/accueil')}>
              Découvrir la Plateforme <ArrowRight size={15} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/login')}>
              Me Connecter
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default QuiSommesNous;