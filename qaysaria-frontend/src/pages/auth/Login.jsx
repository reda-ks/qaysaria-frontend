import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/pages css/auth.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO: send to backend
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">Connexion</h1>
          <p className="auth-subtitle">Connectez-vous à votre compte QAYSARIA</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
            <div className="password-label">
              <label htmlFor="password">Mot de passe</label>
              <a href="#" className="forgot-password">Oublié?</a>
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
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>ou</span>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button className="btn-social btn-google">
            <span>🔍</span> Google
          </button>
          <button className="btn-social btn-facebook">
            <span>f</span> Facebook
          </button>
        </div>

        {/* Footer */}
        <p className="auth-footer">
          Pas encore de compte? <Link to="/register" className="auth-link">S'inscrire</Link>
        </p>
      </div>

      {/* Left Decoration */}
      <div className="auth-decoration left"></div>
      <div className="auth-decoration right"></div>
    </div>
  );
}

export default Login;
