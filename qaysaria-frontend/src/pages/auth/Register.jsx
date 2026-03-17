import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles//pages css//auth.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas!");
      return;
    }
    if (!agreeTerms) {
      alert("Veuillez accepter les conditions d'utilisation");
      return;
    }
    console.log("Register Data:", formData);
    // TODO: send to backend
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Créer un compte</h1>
          <p className="auth-subtitle">Rejoignez la communauté QAYSARIA</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullName">Nom complet</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Votre nom complet"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tel">Téléphone</label>
            <input
              type="tel"
              id="tel"
              name="tel"
              placeholder="+212 6 12 34 56 78"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre.email@exemple.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
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
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms">
              J'accepte les <a href="/" className="terms-link">Conditions d'utilisation</a> et la <a href="/" className="terms-link">Politique de confidentialité</a>
            </label>
          </div>

          <button type="submit" className="btn-submit">
            S'inscrire
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>ou</span>
        </div>

        {/* Social Signup
        <div className="social-login">
          <button type="button" className="btn-social btn-google">
            <span>🔍</span> Google
          </button>
          <button type="button" className="btn-social btn-facebook">
            <span>f</span> Facebook
          </button>
        </div> */}

        {/* Footer */}
        <p className="auth-footer">
          Vous avez déjà un compte? <Link to="/login" className="auth-link">Se connecter</Link>
        </p>
      </div>

      {/* Decorations */}
      <div className="auth-decoration left"></div>
      <div className="auth-decoration right"></div>
    </div>
  );
}

export default Register;
