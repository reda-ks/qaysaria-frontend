import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, ShoppingBag, Store } from "lucide-react"; // Utilisation de ArrowLeft pour le sens arabe
import "../../styles/pages css/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "acheteur",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة!");
      return;
    }
    if (!agreeTerms) {
      alert("يرجى الموافقة على شروط الاستخدام");
      return;
    }
    console.log("Register:", formData);
    // TODO: backend
  };

  /* Password strength */
  const getStrength = (p) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strength = getStrength(formData.password);
  const sClass = strength <= 1 ? 'weak' : strength <= 2 ? 'medium' : 'strong';

  return (
    <div className="auth-page" dir="rtl">
      <div className="auth-shell">

        {/* ── WHITE FORM CARD ── */}
        <div className="auth-container">

          <div className="auth-header">
            <h1 className="auth-title">إنشاء حساب</h1>
            <p className="auth-subtitle">انضم إلى قيسارية مجاناً 🇲🇦</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            {/* Role */}
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px' }}>أنا عبارة عن</label>
              <div className="form-type-row" style={{ flexDirection: 'row-reverse' }}>
                <label className={`form-type-option ${formData.role === 'acheteur' ? 'active' : ''}`}>
                  <input type="radio" name="role" value="acheteur" checked={formData.role === 'acheteur'} onChange={handleChange} />
                  <ShoppingBag size={13} strokeWidth={2} />
                  <span>مشتري</span>
                </label>
                <label className={`form-type-option ${formData.role === 'vendeur' ? 'active' : ''}`}>
                  <input type="radio" name="role" value="vendeur" checked={formData.role === 'vendeur'} onChange={handleChange} />
                  <Store size={13} strokeWidth={2} />
                  <span>تاجر</span>
                </label>
              </div>
            </div>

            {/* Name + Phone */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="fullName">الاسم الكامل</label>
                <input type="text" id="fullName" name="fullName" placeholder="محمد العلمي" value={formData.fullName} onChange={handleChange} required style={{ textAlign: 'right' }} />
              </div>
              <div className="form-group">
                <label htmlFor="tel">رقم الهاتف</label>
                <input type="tel" id="tel" name="tel" placeholder="+212 6 00 00 00 00" value={formData.tel} onChange={handleChange} required style={{ textAlign: 'left', direction: 'ltr' }} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input type="email" id="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} required style={{ textAlign: 'right' }} />
            </div>

            <div className="form-group">
              <label htmlFor="password">كلمة المرور</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange} required
                  style={{ textAlign: 'right', paddingLeft: '40px', paddingRight: '12px' }}
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)} style={{ left: '10px', right: 'auto' }}>
                  {showPassword ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength" style={{ flexDirection: 'row-reverse' }}>
                  {[1,2,3,4].map(n => (
                    <div key={n} className={`strength-bar ${strength >= n ? sClass : ''}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword" name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange} required
                style={{ textAlign: 'right' }}
              />
              {formData.confirmPassword && (
                <span className={`pwd-match ${formData.password === formData.confirmPassword ? 'ok' : 'err'}`} style={{ display: 'block', marginTop: '5px' }}>
                  {formData.password === formData.confirmPassword ? '✓ كلمات المرور متطابقة' : '✗ كلمات المرور غير متطابقة'}
                </span>
              )}
            </div>

            <div className="checkbox-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
              <label htmlFor="terms" style={{ fontSize: '13px' }}>
                أوافق على <a href="/" className="terms-link">شروط الاستخدام</a> و <a href="/" className="terms-link">سياسة الخصوصية</a>
              </label>
            </div>

            <button type="submit" className="btn-submit">
               إنشاء الحساب <ArrowLeft size={14} strokeWidth={2.5} style={{ marginRight: '8px' }} />
            </button>

          </form>

          <div className="auth-divider"><span>أو</span></div>

          <p className="auth-footer">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="auth-link">تسجيل الدخول</Link>
          </p>

        </div>

        {/* ── RED RIGHT PANEL ── */}
        <div className="auth-panel">
          <div className="auth-panel-dots" />
          <div className="auth-panel-content">
            <div className="auth-panel-logo">قيسارية</div>
            <div className="auth-panel-welcome">عضو معنا؟</div>
            <p className="auth-panel-tagline">
              سجل دخولك للوصول إلى<br />
              مساحتك الخاصة والاستمتاع<br />
              بكل مميزات متاجرنا.
            </p>
            <Link to="/login" className="auth-panel-cta">
              تسجيل الدخول <ArrowLeft size={13} strokeWidth={2.5} style={{ marginRight: '8px' }} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;