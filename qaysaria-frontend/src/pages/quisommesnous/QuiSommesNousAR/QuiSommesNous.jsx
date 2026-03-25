import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck, BarChart3, ArrowRight, Lock } from 'lucide-react';
import '../../../styles/pages css/QuiSommesNous.css';

// Cairo Arabic font
const cairoFontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap');
`;

const ArFontInjector = () => (
  <style>{cairoFontStyle}</style>
);

const QuiSommesNousAr = () => {
  const navigate = useNavigate();

  const FEATURES = [
    {
      Icon: MapPin,
      num: '٠١',
      title: 'استكشاف حسب المدينة',
      text: 'لكل مدينة مغربية واجهتها الرقمية الخاصة. تصفّح بين الدار البيضاء ومراكش وفاس وجميع المدن الكبرى لاكتشاف أفضل التجار المحليين بالقرب منك.',
    },
    {
      Icon: ShieldCheck,
      num: '٠٢',
      title: 'متاجر موثّقة',
      text: 'يمر كل تاجر بعملية تحقق شاملة (KYC) قبل الظهور على المنصة. تتسوّق بثقة تامة، مع اليقين بأن كل متجر أصيل وجاد وموثوق.',
    },
    {
      Icon: BarChart3,
      num: '٠٣',
      title: 'تواصل مباشر عبر واتساب',
      text: 'بسّط عمليات شرائك بالتواصل المباشر مع البائع عبر واتساب بنقرة واحدة. لا حاجة للتنقل بين تطبيقات متعددة — البيع يتم ببساطة وسرعة.',
    },
  ];

  const arStyle = {
    fontFamily: "'Cairo', sans-serif",
    fontSize: '18px',
    lineHeight: '1.8',
  };

  return (
    <div className="qui-sommes-nous-container" dir="rtl" lang="ar" style={arStyle}>
      <ArFontInjector />

      {/* ── HERO ── */}
      <section className="qsn-hero">
        <div className="qsn-hero-inner">
          <span className="qsn-hero-tag">🇲🇦 من نحن — قيسارية</span>
          <h1 className="qsn-hero-title">الجسر بين الأصالة والرقمنة</h1>
          <p className="qsn-hero-sub">
            منصة آمنة واحترافية مصمّمة للتجار المغاربة —
            من حرفيي الأسواق التقليدية إلى المحلات التجارية الحديثة.
          </p>
          <div className="qsn-hero-stats">
            <div className="qsn-hero-stat"><strong>+500</strong> متجر موثّق</div>
            <div className="qsn-hero-stat"><strong>+12</strong> مدينة مغطّاة</div>
            <div className="qsn-hero-stat"><strong>15 ألف</strong> منتج متاح</div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM / SOLUTION ── */}
      <section className="qsn-section qsn-section--gray">
        <div className="qsn-container">
          <div className="qsn-section-head">
            <span className="qsn-section-tag">قصتنا</span>
            <h2 className="qsn-section-title">التحدي الذي قبلناه</h2>
            <p className="qsn-section-sub">يستحق التجار المغاربة أكثر من مجرد شبكات التواصل الاجتماعي. لقد بنينا الحل الذي كانوا ينتظرونه.</p>
            <div className="qsn-rule"><span className="qsn-rule-dot" /></div>
          </div>

          <div className="qsn-ps-grid">
            <div className="qsn-card qsn-card--problem">
              <div className="qsn-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22" style={{color:'#EF3B3C'}}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="qsn-card-title">المشكلة</h3>
              <p className="qsn-card-text">
                فيسبوك، إنستغرام، واتساب: أدوات قوية لكنها فوضوية للبيع.
                يتخبّط التجار بين الرسائل الخاصة والمنشورات الضائعة في خضم المحتوى
                وغياب أي هيكل واضح. لا كتالوج، لا إدارة للمخزون،
                لا مصداقية مضمونة — مجرد فوضى.
              </p>
            </div>

            <div className="qsn-card qsn-card--solution">
              <div className="qsn-card-icon">
                <ShieldCheck size={22} strokeWidth={2} style={{color:'#EF3B3C'}} />
              </div>
              <h3 className="qsn-card-title">حل قيسارية</h3>
              <p className="qsn-card-text">
                منظومة رقمية مركزية ومنظّمة واحترافية.
                توفّر قيسارية لكل تاجر متجراً إلكترونياً موثّقاً،
                وكتالوجاً واضحاً، وحضوراً مصنّفاً حسب المدينة ورابطاً مباشراً
                مع المشترين عبر واتساب. بسيط، فعّال، 100% مغربي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="qsn-section qsn-section--white">
        <div className="qsn-container">
          <div className="qsn-section-head">
            <span className="qsn-section-tag">ما يميّزنا</span>
            <h2 className="qsn-section-title">ركائزنا الثلاث</h2>
            <p className="qsn-section-sub">كل ميزة صُمِّمت للاستجابة للاحتياجات الحقيقية للتجار والمشترين المغاربة.</p>
            <div className="qsn-rule"><span className="qsn-rule-dot" /></div>
          </div>

          <div className="qsn-features-grid">
            {FEATURES.map(({ Icon, num, title, text }) => (
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
            <span className="qsn-section-tag">رؤيتنا</span>
            <h2 className="qsn-section-title">رقمنة التجارة المغربية</h2>
            <div className="qsn-rule"><span className="qsn-rule-dot" /></div>
          </div>

          <div className="qsn-vision-wrap">
            <p className="qsn-vision-text">
              أُسِّست قيسارية بقناعة بسيطة: كل تاجر مغربي،
              سواء كان حرفياً في مدينة فاس العتيقة، أو صائغاً في مراكش أو بائع أزياء
              في الدار البيضاء، يستحق حضوراً رقمياً لائقاً واحترافياً.
              مهمتنا هي تحويل التجارة الصغيرة المغربية إلى فاعل حقيقي
              في منظومة رقمية وطنية — مع الحفاظ على الأصالة،
              وضمان الثقة، وتبسيط كل خطوة من خطوات البيع.
            </p>

            <div className="qsn-highlights">
              <div className="qsn-highlight">
                <span className="qsn-highlight-number">%100</span>
                <span className="qsn-highlight-label">مغربي</span>
              </div>
              <div className="qsn-highlight">
                <span className="qsn-highlight-number">%98</span>
                <span className="qsn-highlight-label">راضون</span>
              </div>
              <div className="qsn-highlight">
                <Lock size={28} strokeWidth={1.8} color="#EF3B3C" />
                <span className="qsn-highlight-label">آمن</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="qsn-cta">
        <div className="qsn-cta-inner">
          <h2 className="qsn-cta-title">هل أنت مستعد للانضمام إلى قيسارية؟</h2>
          <p className="qsn-cta-sub">سواء كنت مشترياً أو تاجراً — مكانك هنا.</p>
          <div className="qsn-cta-btns">
            <button className="btn btn-primary" onClick={() => navigate('/accueil')}>
              اكتشف المنصة <ArrowRight size={15} style={{transform: 'scaleX(-1)'}} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/login')}>
              تسجيل الدخول
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default QuiSommesNousAr;