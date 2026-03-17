import React from 'react';
import '../../styles/pages css/QuiSommesNous.css';
import { useNavigate } from 'react-router-dom';


const QuiSommesNous = () => {

  const navigate = useNavigate();

const handleAccueil = () => {
    navigate('/accueil');
  };
const handleLogin = () => {
    navigate('/login');
  };



  return (
    <div className="qui-sommes-nous-container">
      {/* ========== HERO SECTION ========== */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Title - Top Center */}
          <h1 className="hero-title">Qaysaria : Le Pont entre Tradition et Digital</h1>
          
          {/* BILINGUAL CONTENT - French Bottom Left, Arabic Bottom Right */}
          <div className="hero-bilingual">
            {/* French Version - Bottom Left */}
            <div className="hero-lang hero-french">
              <p className="hero-description">
                Découvrez une plateforme sécurisée alternative aux réseaux sociaux, conçue spécialement pour les commerçants marocains.
                Vendez vos produits avec confiance dans un écosystème centralisé et professionnel.
              </p>
            </div>

            {/* Arabic Version - Bottom Right */}
            <div className="hero-lang hero-arabic">
              <p className="hero-description-ar">
                اكتشف منصة آمنة بديلة لوسائل التواصل الاجتماعي، مصممة خصيصاً للتجار المغاربة.
                بع منتجاتك بثقة في نظام بيئي مركزي واحترافي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROBLEM/SOLUTION SECTION ========== */}
      <section className="problem-solution-section">
        <div className="container">
          <h2 className="section-title">Le Défi et la Solution</h2>
          <p className="section-subtitle">التحدي والحل</p>

          <div className="problem-solution-grid">
            {/* Problem */}
            <div className="problem-card">
              <div className="card-icon problem-icon">⚡</div>
              <h3 className="card-title">Le Problème</h3>
              <h3 className="card-title-ar">المشكلة</h3>
              <p className="card-description">
                Les réseaux sociaux : chaotiques, imprévisibles et peu sécurisés. Les commerçants navigent sans structure claire,
                confrontés à des limitations, des restrictions et une absence de contrôle.
              </p>
              <p className="card-description-ar">
                وسائل التواصل الاجتماعي: فوضوية وغير موثوقة وغير آمنة. يواجه التجار عدم وجود هيكل واضح مع قيود وتحديات بلا حل.
              </p>
            </div>

            {/* Solution */}
            <div className="solution-card">
              <div className="card-icon solution-icon">✓</div>
              <h3 className="card-title">La Solution</h3>
              <h3 className="card-title-ar">الحل</h3>
              <p className="card-description">
                Qaysaria : un écosystème centralisé, structuré et professionnel. Chaque ville marocaine dispose de sa propre
                boutique numérique, avec des outils modernes et une sécurité garantie.
              </p>
              <p className="card-description-ar">
                قيصرية: نظام بيئي مركزي ومنظم واحترافي. لكل مدينة مغربية متجرها الرقمي الخاص مع أدوات حديثة وأمان مضمون.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURE GRID SECTION ========== */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Nos Piliers</h2>
          <p className="section-subtitle">أعمدتنا</p>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3 className="feature-title">Exploration par Ville</h3>
              <h3 className="feature-title-ar">استكشاف حسب المدينة</h3>
              <p className="feature-description">
                Parcourez les artisanats locaux et les produits régionaux en naviguant facilement par géographie.
                Chaque ville marocaine dispose de sa propre vitrine numérique avec ses meilleures boutiques.
              </p>
              <p className="feature-description-ar">
                تصفح الحرف اليدوية المحلية والمنتجات الإقليمية بسهولة حسب الموقع الجغرافي.
                لكل مدينة مغربية واجهتها الرقمية الخاصة مع أفضل محلاتها.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3 className="feature-title">Confiance Totale</h3>
              <h3 className="feature-title-ar">ثقة تامة</h3>
              <p className="feature-description">
                Validation complète des boutiques (KYC) et systèmes de paiement ultra-sécurisés. Chaque commerçant est vérifié,
                garantissant une expérience d'achat fiable et transparente pour les clients.
              </p>
              <p className="feature-description-ar">
                التحقق الكامل من المتاجر (KYC) وأنظمة دفع آمنة للغاية. يتم التحقق من كل تاجر لضمان تجربة تسوق موثوقة وشفافة.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Soutien aux Artisans</h3>
              <h3 className="feature-title-ar">دعم الحرفيين</h3>
              <p className="feature-description">
                Tableaux de bord professionnels pour gérer facilement vos stocks, suivre vos ventes en temps réel
                et analyser vos performances. Tous les outils dont un artisan moderne a besoin.
              </p>
              <p className="feature-description-ar">
                لوحات تحكم احترافية لإدارة مخزونك بسهولة، وتتبع المبيعات في الوقت الفعلي وتحليل الأداء.
                جميع الأدوات التي يحتاجها الحرفي الحديث.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VISION SECTION ========== */}
      <section className="vision-section">
        <div className="container">
          <h2 className="section-title">Notre Vision</h2>
          <p className="section-subtitle">رؤيتنا</p>

          <div className="vision-content">
            <p className="vision-text">
              Transformer les petits commerces marocains en acteurs d'un écosystème numérique national.
              Qaysaria crée un pont entre la tradition artisanale marocaine et les technologies modernes, permettant à chaque
              commerçant—du souk au quartier résidentiel—de prospérer dans le monde digital avec fierté et sécurité.
            </p>
            <p className="vision-text-ar">
              تحويل الأعمال التجارية الصغيرة المغربية إلى فاعلين في نظام بيئي رقمي وطني.
              تقيم قيصرية جسراً بين التقاليد الحرفية المغربية والتقنيات الحديثة، مما يسمح لكل تاجر—من السوق إلى الحي السكني—بالازدهار
              في العالم الرقمي بفخر وأمان.
            </p>

            <div className="vision-highlights">
              <div className="highlight-item">
                <span className="highlight-number">100%</span>
                <span className="highlight-text">Marocain</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">∞</span>
                <span className="highlight-text">Possibilités</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-number">🔒</span>
                <span className="highlight-text">Sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CALL TO ACTION ========== */}
      <section className="cta-section">
        <div className="container">
          <h2>Prêt à Rejoindre Qaysaria ?</h2>
          <p>هل أنت مستعد للانضمام إلى قيصرية؟</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={handleAccueil}>Découvrir la Plateforme</button>
            <button className="btn btn-secondary" onClick={handleLogin}>Me Connecter</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuiSommesNous;