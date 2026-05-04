import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "../../styles/pages css/auth.css";

function Login() {
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api';
      
      // Appel à l'endpoint de connexion
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        phoneNumber: formData.phoneNumber,
        password: formData.password
      });

      if (response.status === 200) {
        // On suppose que ton backend renvoie les infos utilisateur et potentiellement un token
        const userData = response.data; 
        
        // Stockage dans le contexte d'authentification
        login(userData);
        
        // Redirection vers le tableau de bord
        navigate("/tableau-de-bord");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
      const message = err.response?.data?.message || "Numéro de téléphone ou mot de passe incorrect";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">Connexion</h1>
            <p className="auth-subtitle">Bon retour sur QAISARYA 🇲🇦</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            
            {/* Champ Téléphone au lieu de Email */}
            <div className="form-group">
              <label htmlFor="phoneNumber">Numéro de téléphone</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+212 6..."
                value={formData.phoneNumber}
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
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <div className="auth-error" style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"} <ArrowRight size={14} strokeWidth={2.5} />
            </button>

          </form>

          <div className="auth-divider"><span>ou</span></div>

          <p className="auth-footer">
            Pas encore de compte ?{" "}
            <Link to="/register" className="auth-link">S'inscrire</Link>
          </p>
        </div>

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