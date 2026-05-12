import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Store } from "lucide-react";
import "../../styles//pages css//auth.css";
import axios from 'axios';
import "../../styles/pages css/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "vendeur",
    city: "", // On laisse vide au départ pour forcer la sélection
  });

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api';

  // 1. Récupération des villes depuis l'API au chargement du composant
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/villes/all`);
        // On filtre "Morocco" si nécessaire car c'est le pays, pas une ville
        const list = response.data.filter(v => v.name !== "Morocco");
        setCities(list);
        setLoadingCities(false);
      } catch (err) {
        console.error("Erreur lors du chargement des villes:", err);
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [API_BASE_URL]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    
    if (!formData.city) {
      alert("Veuillez sélectionner une ville");
      return;
    }

    if (!agreeTerms) {
      alert("Veuillez accepter les conditions d'utilisation");
      return;
    }

    const registerData = {
      name: formData.fullName,
      phoneNumber: formData.tel,
      password: formData.password,
      city: formData.city 
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, registerData);

      if (response.status === 200 || response.status === 201) {
        alert("Compte créé avec succès !");
      }
    } catch (err) {
      console.error("Détails erreur:", err.response?.data);
      const errorMessage = err.response?.data?.message || "Données invalides. Vérifiez tous les champs.";
      alert(errorMessage);
    }
  };

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
  const requiredStar = <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>;

  return (
    <div className="auth-page">
      <div className="auth-shell">
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
                <label htmlFor="fullName">Nom complet {requiredStar}</label>
                <input 
                  type="text" id="fullName" name="fullName" 
                  placeholder="Mohammed Alami" 
                  value={formData.fullName} onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel">Téléphone {requiredStar}</label>
                <input 
                  type="tel" id="tel" name="tel" 
                  placeholder="+212 6 00 00 00 00" 
                  value={formData.tel} onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" id="email" name="email" 
                placeholder="votre@email.com" 
                value={formData.email} onChange={handleChange} 
              />
            </div>

            {/* --- DROPDOWN VILLE --- */}
            <div className="form-group">
              <label htmlFor="city">Ville {requiredStar}</label>
              <select 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                required
                className="city-select"
              >
                <option value="">Sélectionnez votre ville</option>
                {loadingCities ? (
                  <option disabled>Chargement des villes...</option>
                ) : (
                  cities.map((ville, index) => (
                    <option key={index} value={ville.name}>
                      {ville.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe {requiredStar}</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password" name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange} 
                  required
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
              <label htmlFor="confirmPassword">Confirmer le mot de passe {requiredStar}</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword" name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange} 
                required
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
                J'accepte les <a href="/" className="terms-link">CGU</a> et la <a href="/" className="terms-link">politique de confidentialité</a> {requiredStar}
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