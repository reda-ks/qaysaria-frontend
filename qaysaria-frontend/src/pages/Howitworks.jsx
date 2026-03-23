import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MessageCircle, Package, Star,
  Store, Camera, ShoppingBag, Banknote,
  CheckCircle, Lock, Truck, RotateCcw, Hammer, Users,
  ArrowRight
} from 'lucide-react';
import '../styles/pages css/Howitworks.css';

/* ─── DATA ── */
const STEPS_ACHETEUR = [
  { number: '01', Icon: Search,        title: 'Explorez',  subtitle: 'Trouvez ce que vous cherchez', desc: 'Parcourez des milliers de produits et boutiques vérifiées à travers tout le Maroc. Filtrez par ville, catégorie ou prix.' },
  { number: '02', Icon: MessageCircle, title: 'Contactez', subtitle: 'Direct via WhatsApp',           desc: 'Un clic suffit pour ouvrir WhatsApp et discuter directement avec le vendeur — négocier, poser vos questions, confirmer votre commande.' },
  { number: '03', Icon: Package,       title: 'Recevez',   subtitle: 'Livraison partout au Maroc',    desc: 'Le vendeur organise la livraison avec vous. Rapide, simple, sans intermédiaire inutile — partout au Royaume.' },
  { number: '04', Icon: Star,          title: 'Évaluez',   subtitle: 'Partagez votre expérience',     desc: 'Notez votre achat et aidez la communauté QAISARYA à identifier les meilleures boutiques de votre ville.' },
];

const STEPS_VENDEUR = [
  { number: '01', Icon: Store,         title: 'Créez votre boutique', subtitle: 'Inscription gratuite',      desc: 'Ouvrez votre boutique en quelques minutes. Renseignez vos informations, choisissez vos catégories et ajoutez votre logo.' },
  { number: '02', Icon: Camera,        title: 'Listez vos produits',  subtitle: 'Catalogue illimité',        desc: 'Ajoutez vos articles avec photos, descriptions et prix. Notre interface intuitive vous guide à chaque étape.' },
  { number: '03', Icon: MessageCircle, title: 'Recevez les demandes', subtitle: 'Directement sur WhatsApp',  desc: 'Les acheteurs vous contactent via WhatsApp. Confirmez les commandes et gérez tout depuis votre téléphone.' },
  { number: '04', Icon: Banknote,      title: 'Encaissez',            subtitle: 'Paiement direct & rapide',  desc: 'Recevez vos paiements directement, sans intermédiaire. Commissions transparentes, zéro surprise.' },
];

const FEATURES = [
  { Icon: CheckCircle, title: 'Boutiques vérifiées',   desc: 'Chaque vendeur est contrôlé et validé par notre équipe avant de publier.' },
  { Icon: Lock,        title: 'Plateforme sécurisée',  desc: 'Vos données sont protégées. Naviguez et achetez en toute confiance.' },
  { Icon: Truck,       title: 'Livraison nationale',   desc: 'Réseau logistique couvrant toutes les villes du Maroc sans exception.' },
  { Icon: MessageCircle, title: 'Contact WhatsApp',    desc: 'Parlez directement au vendeur — rapide, humain, sans formulaire compliqué.' },
  { Icon: Hammer,      title: 'Artisanat authentique', desc: 'Des produits marocains uniques, du zellige au cuir tanné de Fès.' },
  { Icon: Users,       title: 'Communauté locale',     desc: 'Soutenez les artisans et commerçants marocains en achetant local.' },
];

/* ─── HOOK ── */
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

/* ─── STEP CARD ── */
const StepCard = ({ step, index }) => {
  const [ref, visible] = useInView();
  const { Icon } = step;
  return (
    <div
      ref={ref}
      className={`hiw-step-card ${visible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="hiw-step-num">{step.number}</div>
      <div className="hiw-step-icon">
        <Icon size={26} strokeWidth={1.7} color="#EF3B3C" />
      </div>
      <div className="hiw-step-body">
        <h3 className="hiw-step-title">{step.title}</h3>
        <span className="hiw-step-sub">{step.subtitle}</span>
        <p className="hiw-step-desc">{step.desc}</p>
      </div>
    </div>
  );
};

/* ─── MAIN ── */
const HowItWorks = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('acheteur');
  const [featRef, featVisible] = useInView(0.1);
  const [ctaRef,  ctaVisible]  = useInView(0.1);

  const steps = tab === 'acheteur' ? STEPS_ACHETEUR : STEPS_VENDEUR;

  return (
    <div className="hiw-page">

      {/* ── HERO ── */}
      <section className="hiw-hero">
        <div className="hiw-hero-inner">
          <span className="hiw-hero-tag">🇲🇦 Guide d'utilisation QAISARYA</span>
          <h1 className="hiw-hero-title">Comment ça marche ?</h1>
          <p className="hiw-hero-sub">
            Simple, rapide et sans complication. Découvrez comment QAISARYA
            connecte acheteurs et vendeurs à travers tout le Maroc.
          </p>
          <div className="hiw-hero-stats">
            <div className="hiw-hero-stat"><strong>500+</strong> Boutiques vérifiées</div>
            <div className="hiw-hero-stat"><strong>15k</strong> Produits disponibles</div>
            <div className="hiw-hero-stat"><strong>12+</strong> Villes couvertes</div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <section className="hiw-steps-section">
        <div className="hiw-container">

          <div className="hiw-tabs-wrap">
            <button
              className={`hiw-tab ${tab === 'acheteur' ? 'active' : ''}`}
              onClick={() => setTab('acheteur')}
            >
              <ShoppingBag size={15} strokeWidth={2} />
              Je suis acheteur
            </button>
            <button
              className={`hiw-tab ${tab === 'vendeur' ? 'active' : ''}`}
              onClick={() => setTab('vendeur')}
            >
              <Store size={15} strokeWidth={2} />
              Je suis vendeur
            </button>
          </div>

          <p className="hiw-steps-label">
            {tab === 'acheteur' ? 'Achetez en 4 étapes simples' : 'Vendez en 4 étapes simples'}
          </p>

          <div className="hiw-steps-grid" key={tab}>
            {steps.map((step, i) => <StepCard key={step.number} step={step} index={i} />)}
          </div>

        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={featRef} className={`hiw-features-section ${featVisible ? 'visible' : ''}`}>
        <div className="hiw-container">

          <div className="hiw-section-head">
            <span className="hiw-section-tag">Pourquoi QAISARYA ?</span>
            <h2 className="hiw-section-title">Tout ce qui rend notre plateforme unique</h2>
            <p className="hiw-section-sub">Chaque fonctionnalité a été pensée pour simplifier la vente et sécuriser l'achat au Maroc.</p>
          </div>

          <div className="hiw-features-grid">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <div key={title} className="hiw-feature-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="hiw-feature-icon">
                  <Icon size={22} strokeWidth={1.8} color="#EF3B3C" />
                </div>
                <h4 className="hiw-feature-title">{title}</h4>
                <p className="hiw-feature-desc">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className={`hiw-cta-section ${ctaVisible ? 'visible' : ''}`}>
        <div className="hiw-cta-inner">
          <h2 className="hiw-cta-title">Prêt à rejoindre QAISARYA ?</h2>
          <p className="hiw-cta-sub">Des milliers de Marocains achètent et vendent déjà sur notre plateforme.</p>
          <div className="hiw-cta-btns">
            <button className="btn btn-primary" onClick={() => navigate('/produits')}>
              <ShoppingBag size={15} /> Commencer à acheter
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/register')}>
              <Store size={15} /> Ouvrir ma boutique
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;