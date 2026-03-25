import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MessageCircle, Package, Star,
  Store, Camera, ShoppingBag, Banknote,
  CheckCircle, Lock, Truck/*, RotateCcw*/ , Hammer, Users
  /*,ArrowRight*/
} from 'lucide-react';
import '../../../styles/pages css/Howitworks.css';

/* ─── Cairo Font ── */
const cairoFontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
`;
const ArFontInjector = () => <style>{cairoFontStyle}</style>;

/* ─── DATA ── */
const STEPS_ACHETEUR = [
  { number: '٠١', Icon: Search,        title: 'استكشف',     subtitle: 'ابحث عما تريد',                desc: 'تصفّح آلاف المنتجات والمتاجر الموثّقة عبر مختلف مدن المغرب. صفّح حسب المدينة أو الفئة أو السعر.' },
  { number: '٠٢', Icon: MessageCircle, title: 'تواصل',      subtitle: 'مباشرة عبر واتساب',            desc: 'نقرة واحدة تكفي لفتح واتساب والتحدث مع البائع مباشرةً — فاوض، اسأل، وأكّد طلبك بكل سهولة.' },
  { number: '٠٣', Icon: Package,       title: 'استلم',      subtitle: 'توصيل إلى كل مدن المغرب',     desc: 'يتولى البائع تنظيم التوصيل معك. سريع، بسيط، بدون وسطاء غير ضروريين — إلى أي مكان في المملكة.' },
  { number: '٠٤', Icon: Star,          title: 'قيّم',        subtitle: 'شارك تجربتك',                  desc: 'قيّم مشترياتك وساعد مجتمع قيسارية في التعرف على أفضل المتاجر في مدينتك.' },
];

const STEPS_VENDEUR = [
  { number: '٠١', Icon: Store,         title: 'أنشئ متجرك',       subtitle: 'تسجيل مجاني',              desc: 'افتح متجرك في دقائق. أدخل معلوماتك، اختر فئاتك وأضف شعار متجرك.' },
  { number: '٠٢', Icon: Camera,        title: 'أضف منتجاتك',      subtitle: 'كتالوج غير محدود',         desc: 'أضف منتجاتك مع الصور والأوصاف والأسعار. واجهتنا السهلة تُرشدك في كل خطوة.' },
  { number: '٠٣', Icon: MessageCircle, title: 'استقبل الطلبات',   subtitle: 'مباشرة على واتساب',        desc: 'يتواصل معك المشترون عبر واتساب. أكّد الطلبات وأدِر كل شيء من هاتفك.' },
  { number: '٠٤', Icon: Banknote,      title: 'استلم أرباحك',     subtitle: 'دفع مباشر وسريع',          desc: 'استلم مدفوعاتك مباشرةً بدون وسطاء. عمولات شفافة، بدون أي مفاجآت.' },
];

const FEATURES = [
  { Icon: CheckCircle,   title: 'متاجر موثّقة',        desc: 'كل بائع يخضع للمراجعة والتحقق من قِبل فريقنا قبل النشر.' },
  { Icon: Lock,          title: 'منصة آمنة',            desc: 'بياناتك محمية. تصفّح واشترِ بكل ثقة واطمئنان.' },
  { Icon: Truck,         title: 'توصيل وطني',           desc: 'شبكة لوجستية تغطي جميع مدن المغرب دون استثناء.' },
  { Icon: MessageCircle, title: 'تواصل عبر واتساب',    desc: 'تحدث مباشرةً مع البائع — سريع، إنساني، بلا نماذج معقدة.' },
  { Icon: Hammer,        title: 'صناعة يدوية أصيلة',   desc: 'منتجات مغربية فريدة، من الزليج إلى الجلد المدبوغ في فاس.' },
  { Icon: Users,         title: 'مجتمع محلي',           desc: 'ادعم الحرفيين والتجار المغاربة عبر الشراء المحلي.' },
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
const HowItWorksAr = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('acheteur');
  const [featRef, featVisible] = useInView(0.1);
  const [ctaRef,  ctaVisible]  = useInView(0.1);

  const steps = tab === 'acheteur' ? STEPS_ACHETEUR : STEPS_VENDEUR;

  const arStyle = {
    fontFamily: "'Cairo', sans-serif",
    fontSize: '18px',
    lineHeight: '1.8',
  };

  return (
    <div className="hiw-page" dir="rtl" lang="ar" style={arStyle}>
      <ArFontInjector />

      {/* ── HERO ── */}
      <section className="hiw-hero">
        <div className="hiw-hero-inner">
          <span className="hiw-hero-tag">🇲🇦 دليل استخدام قيسارية</span>
          <h1 className="hiw-hero-title">كيف تعمل المنصة؟</h1>
          <p className="hiw-hero-sub">
            بسيط، سريع وبدون تعقيدات. اكتشف كيف تربط قيسارية
            المشترين والبائعين في جميع أنحاء المغرب.
          </p>
          <div className="hiw-hero-stats">
            <div className="hiw-hero-stat"><strong>+500</strong> متجر موثّق</div>
            <div className="hiw-hero-stat"><strong>15 ألف</strong> منتج متاح</div>
            <div className="hiw-hero-stat"><strong>+12</strong> مدينة مغطّاة</div>
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
              أنا مشترٍ
            </button>
            <button
              className={`hiw-tab ${tab === 'vendeur' ? 'active' : ''}`}
              onClick={() => setTab('vendeur')}
            >
              <Store size={15} strokeWidth={2} />
              أنا بائع
            </button>
          </div>

          <p className="hiw-steps-label">
            {tab === 'acheteur' ? 'اشترِ في ٤ خطوات بسيطة' : 'بِع في ٤ خطوات بسيطة'}
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
            <span className="hiw-section-tag">لماذا قيسارية؟</span>
            <h2 className="hiw-section-title">كل ما يجعل منصتنا فريدة من نوعها</h2>
            <p className="hiw-section-sub">كل ميزة صُمِّمت لتبسيط البيع وتأمين الشراء في المغرب.</p>
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
          <h2 className="hiw-cta-title">هل أنت مستعد للانضمام إلى قيسارية؟</h2>
          <p className="hiw-cta-sub">آلاف المغاربة يشترون ويبيعون بالفعل على منصتنا.</p>
          <div className="hiw-cta-btns">
            <button className="btn btn-primary" onClick={() => navigate('/produits')}>
              <ShoppingBag size={15} /> ابدأ التسوق
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/register')}>
              <Store size={15} /> افتح متجري
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorksAr;