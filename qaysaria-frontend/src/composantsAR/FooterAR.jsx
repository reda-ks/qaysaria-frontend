import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/composantsCSS/composants.css';

const FooterAR = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" dir="rtl">
      <div className="footer-content">
        {/* Column 1: Brand */}
        <div className="footer-column">
          <h3 className="footer-title">قيسارية</h3>
          <p className="footer-description">
            منصة التجارة الإلكترونية المغربية التي تجمع ملايين المشترين مع بائعين موثوقين من جميع أنحاء المغرب.
          </p>
          <div className="social-links">
            <a href="/" className="social-icon" title="فيسبوك">f</a>
            <a href="/" className="social-icon" title="تويتر">𝕏</a>
            <a href="/" className="social-icon" title="إنستغرام">📷</a>
            <a href="/" className="social-icon" title="لينكد إن">in</a>
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-column">
          <h4 className="footer-subtitle">التنقل</h4>
          <ul className="footer-links">
            <li><Link to="/الرئيسية">الرئيسية</Link></li>
            <li><Link to="/منتجات">المنتجات</Link></li>
            <li><Link to="/من-نحن">من نحن؟</Link></li>
            <li><Link to="/كيف-يعمل">كيفية العمل</Link></li>
            <li><Link to="/اتصل-بنا">اتصل بنا</Link></li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="footer-column">
          <h4 className="footer-subtitle">الفئات</h4>
          <ul className="footer-links">
            <li><a href="#mode">الموضة والإكسسوارات</a></li>
            <li><a href="#tech">الإلكترونيات والتكنولوجيا</a></li>
            <li><a href="#maison">المنزل والديكور</a></li>
            <li><a href="#boutiques">جميع المحلات</a></li>
          </ul>
        </div>

        {/* Column 4: Legal & Support */}
        <div className="footer-column">
          <h4 className="footer-subtitle">المساعدة</h4>
          <ul className="footer-links">
            <li><a href="#help">مركز المساعدة</a></li>
            <li><a href="#terms">شروط الاستخدام</a></li>
            <li><a href="#privacy">سياسة الخصوصية</a></li>
            <li><a href="#contact">دعم العملاء</a></li>
          </ul>
        </div>

        {/* Column 5: Info */}
        <div className="footer-column">
          <h4 className="footer-subtitle">حول الشركة</h4>
          <ul className="footer-links">
            <li><Link to="/login">تسجيل الدخول</Link></li>
            <li><Link to="/register">إنشاء حساب</Link></li>
            <li><a href="#blog">المدونة</a></li>
            <li><a href="#careers">الوظائف</a></li>
            <li><a href="#partnership">الشركاء</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-info">
          <p>
            الدار البيضاء، المغرب • هاتف: <a href="tel:+212612345678">78 56 34 12 6 212+</a> • بريد إلكتروني: <a href="mailto:support@qaysaria.com">support@qaysaria.com</a>
          </p>
        </div>
        <div className="footer-copyright">
          <p>&copy; {currentYear} قيسارية. جميع الحقوق محفوظة. 🇲🇦</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterAR;