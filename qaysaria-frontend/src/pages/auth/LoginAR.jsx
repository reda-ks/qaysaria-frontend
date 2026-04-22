import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react"; // Utilisation de ArrowLeft pour le sens arabe
import "../../styles/pages css/auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
    // TODO: backend
  };

  return (
    // Ajout de dir="rtl" pour l'alignement à droite et le sens de lecture
    <div className="auth-page" dir="rtl">
      <div className="auth-shell">

        {/* ── WHITE FORM CARD ── */}
        <div className="auth-container">

          <div className="auth-header">
            <h1 className="auth-title">تسجيل الدخول</h1>
            <p className="auth-subtitle">مرحباً بك مجدداً في قيسارية 🇲🇦</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label htmlFor="email" style={{ textAlign: 'right', display: 'block' }}>البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ textAlign: 'right' }}
              />
            </div>

            <div className="form-group">
              <div className="password-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="password">كلمة المرور</label>
                <a href="/" className="forgot-password">نسيت الكلمة؟</a>
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{ textAlign: 'right', paddingLeft: '40px', paddingRight: '12px' }}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ left: '10px', right: 'auto' }} // Inversion du bouton œil
                >
                  {showPassword
                    ? <EyeOff size={16} strokeWidth={1.8} />
                    : <Eye    size={16} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit">
               دخول <ArrowLeft size={14} strokeWidth={2.5} style={{ marginRight: '8px' }} />
            </button>

          </form>

          <div className="auth-divider"><span>أو</span></div>

          <p className="auth-footer">
            ليس لديك حساب؟{" "}
            <Link to="/إنشاء-حساب" className="auth-link">إنشاء حساب</Link>
          </p>

        </div>

        {/* ── RED RIGHT PANEL ── */}
        <div className="auth-panel">
          <div className="auth-panel-dots" />
          <div className="auth-panel-content">
            <div className="auth-panel-logo">قيسارية</div>
            <div className="auth-panel-welcome">مرحباً بك!</div>
            <p className="auth-panel-tagline">
              ليس لديك حساب بعد؟<br />
              سجل الآن وانضم إلى<br />
              أكبر سوق مغربي إلكتروني.
            </p>
            <Link to="/إنشاء-حساب" className="auth-panel-cta">
              إنشاء حساب <ArrowLeft size={13} strokeWidth={2.5} style={{ marginRight: '8px' }} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;