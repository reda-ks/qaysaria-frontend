import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ShoppingBag, Store } from "lucide-react";
import "../../styles//pages css//auth.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendeur",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    if (!agreeTerms) {
      alert("Veuillez accepter les conditions d'utilisation");
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
    <div className="auth-page">
      <div className="auth-shell">

        {/* ── WHITE FORM CARD ── */}
        <div className="auth-container">

          <div className="auth-header">
            <h1 className="auth-title">Créer un compte</h1>
            <p className="auth-subtitle">Rejoignez QAISARYA gratuitement 🇲🇦</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">

            {/* Role */}
            <div className="form-group">
              <label>Je suis</label>
              <div className="form-type-row">
                
                <label className={`form-type-option ${formData.role === 'vendeur' ? 'active' : ''}`}>
                  <input type="radio" name="role" value="vendeur" checked={formData.role === 'vendeur'} onChange={handleChange} />
                  <Store size={13} strokeWidth={2} />
                  Commerçant
                </label>
              </div>
            </div>

            {/* Name + Phone */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="fullName">Nom complet</label>
                <input type="text" id="fullName" name="fullName" placeholder="Mohammed Alami" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="tel">Téléphone</label>
                <input type="tel" id="tel" name="tel" placeholder="+212 6 00 00 00 00" value={formData.tel} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange} required
                />
                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} strokeWidth={1.8} /> : <Eye size={16} strokeWidth={1.8} />}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  {[1,2,3,4].map(n => (
                    <div key={n} className={`strength-bar ${strength >= n ? sClass : ''}`} />
                  ))}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword" name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange} required
              />
              {formData.confirmPassword && (
                <span className={`pwd-match ${formData.password === formData.confirmPassword ? 'ok' : 'err'}`}>
                  {formData.password === formData.confirmPassword ? '✓ Mots de passe identiques' : '✗ Ne correspondent pas'}
                </span>
              )}
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
              <label htmlFor="terms">
                J'accepte les <a href="/" className="terms-link">CGU</a> et la <a href="/" className="terms-link">politique de confidentialité</a>
              </label>
            </div>

            <button type="submit" className="btn-submit">
              Créer mon compte <ArrowRight size={14} strokeWidth={2.5} />
            </button>

          </form>

          <div className="auth-divider"><span>ou</span></div>

          <p className="auth-footer">
            Déjà un compte ?{" "}
            <Link to="/login" className="auth-link">Se connecter</Link>
          </p>

        </div>

        {/* ── RED RIGHT PANEL ── */}
        <div className="auth-panel">
          <div className="auth-panel-dots" />
          <div className="auth-panel-content">
            <div className="auth-panel-logo">QAISARYA</div>
            <div className="auth-panel-welcome">Déjà membre ?</div>
            <p className="auth-panel-tagline">
              Connectez-vous pour accéder<br />
              à votre espace et profiter<br />
              de toutes nos boutiques.
            </p>
            <Link to="/login" className="auth-panel-cta">
              Se connecter <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;