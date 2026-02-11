import { useState } from "react";
import "../../styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    tel: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    // later: send to backend
  };

  return (
    <div className="auth-container">
      <h2>إنشاء حساب</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="الاسم الكامل"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="tel"
          placeholder="رقم الهاتف"
          value={formData.tel}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="البريد الإلكتروني"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="كلمة المرور"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
}

export default Register;
