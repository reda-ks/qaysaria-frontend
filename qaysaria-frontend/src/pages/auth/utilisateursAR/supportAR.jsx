import React, { useState } from 'react';
import '../../../styles/pages css/support.css';

const SupportAR = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const subjects = [
    { value: '', label: 'اختر موضوعاً' },
    { value: 'question', label: '❓ سؤال عام' },
    { value: 'commande', label: '📦 مشكلة في طلبية' },
    { value: 'produit', label: '🛍️ سؤال عن منتج' },
    { value: 'retour', label: '↩️ استرجاع أو استبدال' },
    { value: 'paiement', label: '💳 مشكلة في الدفع' },
    { value: 'compte', label: '👤 مشكلة في الحساب' },
    { value: 'autre', label: '⚙️ أخرى' },
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
      alert('يرجى ملء جميع الخانات');
      return;
    }

    // Simuler l'envoi du formulaire
    console.log('تم إرسال النموذج:', formData);
    setIsSubmitted(true);

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({ subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="support-container" dir="rtl">
      {/* Illustration côté droit (inversé pour RTL) */}
      <div className="support-illustration">
        <div className="headset-3d">
          <div className="headset-ear left"></div>
          <div className="headset-ear right"></div>
          <div className="headset-band"></div>
          <div className="headset-mic"></div>
        </div>
        <div className="support-text">
          <h2>مركز المساعدة</h2>
          <p>نحن هنا لمساعدتكم</p>
        </div>
      </div>

      {/* Formulaire centré */}
      <div className="support-form-wrapper">
        <div className="support-form-container">
          <div className="form-header">
            <h1>اتصل بنا</h1>
            <p className="form-subtitle">قم بتعبئة النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن</p>
          </div>

          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>تم إرسال رسالتك بنجاح!</h3>
              <p>شكراً لتواصلك معنا. سنرد عليك في غضون 24 ساعة.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="support-form">
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  الموضوع <span className="required">*</span>
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
                  الرسالة <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="يرجى وصف سؤالك أو مشكلتك بالتفصيل..."
                  className="form-textarea"
                  rows="6"
                ></textarea>
                <div className="char-count">
                  {formData.message.length} / 1000 حرف
                </div>
              </div>

              <button type="submit" className="btn-submit">
                <span className="btn-text">إرسال الرسالة</span>
                <span className="btn-icon">←</span>
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
              <span className="info-text">الاثنين-الجمعة: 9 صباحاً - 6 مساءً</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportAR;