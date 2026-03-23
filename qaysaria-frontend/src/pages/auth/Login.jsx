import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
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
    <div className="auth-page">
      <div className="auth-shell">

        {/* ── WHITE FORM CARD (left, overlaps panel) ── */}
        <div className="auth-container">

          <div className="auth-header">
            <h1 className="auth-title">Connexion</h1>
            <p className="auth-subtitle">Bon retour sur QAISARYA 🇲🇦</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Mot de passe</label>
                <a href="/" className="forgot-password">Oublié ?</a>
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
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <EyeOff size={16} strokeWidth={1.8} />
                    : <Eye    size={16} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Se connecter <ArrowRight size={14} strokeWidth={2.5} />
            </button>

          </form>

          <div className="auth-divider"><span>ou</span></div>

          <p className="auth-footer">
            Pas encore de compte ?{" "}
            <Link to="/register" className="auth-link">S'inscrire</Link>
          </p>

        </div>

        {/* ── RED RIGHT PANEL ── */}
        <div className="auth-panel">
          <div className="auth-panel-dots" />
          <div className="auth-panel-content">
            <div className="auth-panel-logo">QAISARYA</div>
            <div className="auth-panel-welcome">Bienvenue !</div>
            <p className="auth-panel-tagline">
              Pas encore de compte ?<br />
              Inscrivez-vous et rejoignez<br />
              la marketplace marocaine.
            </p>
            <Link to="/register" className="auth-panel-cta">
              S'inscrire <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;