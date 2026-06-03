import { useState, useEffect } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react"; // Using ArrowLeft for RTL flow
import axios from 'axios';
import "../../styles/pages css/auth.css";

function RegisterAR() {
  const [formData, setFormData] = useState({
    fullName: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "", 
  });

  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/villes`);
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
      alert("كلمات المرور غير متطابقة!");
      return;
    }
    
    if (!formData.city) {
      alert("يرجى اختيار المدينة");
      return;
    }

    if (!agreeTerms) {
      alert("يرجى الموافقة على شروط الاستخدام");
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
        alert("تم إنشاء الحساب بنجاح!");
        navigate("/تسجيل-الدخول");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "بيانات غير صالحة. يرجى التحقق من جميع الحقول.";
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
  // Star on the left for Arabic labels
  const requiredStar = <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>;

  return (
    <div className="auth-page" dir="rtl">
      <div className="auth-shell">
        <div className="auth-container">
          <div className="auth-header">
            <h1 className="auth-title">إنشاء حساب</h1>
            <p className="auth-subtitle">انضم إلى قيسارية مجاناً 🇲🇦</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="fullName">الاسم الكامل {requiredStar}</label>
                <input 
                  type="text" id="fullName" name="fullName" 
                  placeholder="محمد العلمي" 
                  value={formData.fullName} onChange={handleChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="tel">رقم الهاتف {requiredStar}</label>
                <input 
                  type="tel" id="tel" name="tel" 
                  placeholder="+212 6 00 00 00 00" 
                  value={formData.tel} onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input 
                type="email" id="email" name="email" 
                placeholder="votre@email.com" 
                value={formData.email} onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">المدينة {requiredStar}</label>
              <select 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                required
                className="city-select"
              >
                <option value="">اختر مدينتك</option>
                {loadingCities ? (
                  <option disabled>جاري تحميل المدن...</option>
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
              <label htmlFor="password">كلمة المرور {requiredStar}</label>
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
              <label htmlFor="confirmPassword">تأكيد كلمة المرور {requiredStar}</label>
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
                  {formData.password === formData.confirmPassword ? '✓ كلمات المرور متطابقة' : '✗ غير متطابقة'}
                </span>
              )}
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required />
              <label htmlFor="terms">
                أوافق على <a href="/" className="terms-link">شروط الاستخدام</a> و <a href="/" className="terms-link">سياسة الخصوصية</a> {requiredStar}
              </label>
            </div>

            <button type="submit" className="btn-submit">
              إنشاء حسابي <ArrowLeft size={14} strokeWidth={2.5} style={{marginRight: '8px'}} />
            </button>

          </form>

          <div className="auth-divider"><span>أو</span></div>

          <p className="auth-footer">
            لديك حساب بالفعل؟{" "}
            <Link to="/تسجيل-الدخول" className="auth-link">تسجيل الدخول</Link>
          </p>

        </div>

        <div className="auth-panel">
          <div className="auth-panel-dots" />
          <div className="auth-panel-content">
            <div className="auth-panel-logo">قيسارية</div>
            <div className="auth-panel-welcome">عضو بالفعل؟</div>
            <p className="auth-panel-tagline">
              قم بتسجيل الدخول للوصول<br />
              إلى مساحتك الخاصة والاستفادة<br />
              من جميع متاجرنا.
            </p>
            <Link to="/تسجيل-الدخول" className="auth-panel-cta">
              تسجيل الدخول <ArrowLeft size={13} strokeWidth={2.5} style={{marginRight: '5px'}} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default RegisterAR;