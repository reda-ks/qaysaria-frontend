import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './composants/Header';
import HeaderAR from './composantsAR/HeaderAR';
import Footer from './composants/Footer';
import FooterAR from './composantsAR/FooterAR';
import SidebarAR from './composantsAR/SidebarAR';
//import Sidebar from './composants/Sidebar';

import Accueil from './pages/accueil/AccueilFR/accueil';
import AccueilAR from './pages/accueil/AccueilAR/accueil_ar';
import Produits from './pages/produits/produitsFR/produits';
import ProduitsAr from './pages/produits/produitsAR/produits';
import Location from './pages/location/locationFR/Location';
import ProduitDetailAR from './pages/detailleProduit/DetailProduitAR/ProduitDetail_ar';
import ProduitDetail from './pages/detailleProduit/DetailProduitFR/ProduitDetail_fr';
import Contact from './pages/contact/ContactFR/contact';
import ContactAR from './pages/contact/ContactAR/contact';
import QuiSommesNous from './pages/quisommesnous/QuiSommesNousFR/QuiSommesNous';
import QuiSommesNousAr from './pages/quisommesnous/QuiSommesNousAR/QuiSommesNous';
import Howitworks from './pages/Howitworks/HowitworksFR/Howitworks';
import HowItWorksAr from './pages/Howitworks/HowitworksAR/Howitworks';

import Login from './pages/auth/Login';
import LoginAR from './pages/auth/LoginAR';
import Register from './pages/auth/Register';
import RegisterAR from './pages/auth/RegisterAR';
import AuthTest from './pages/auth/AuthTest';
import BoutiqueUtilisateur from './pages/auth/utilisateurs/boutique_utilisateur';
import Commandes from './pages/auth/utilisateurs/commandes';
import Support from './pages/auth/utilisateurs/support';
import Profile from './pages/auth/utilisateurs/profile';
import TableauDeBord from './pages/auth/utilisateurs/tableau_de_bord';
import './App.css';

const USER_ROUTES = [
  '/tableau-de-bord',
  '/boutique-utilisateur',
  '/commandes',
  '/support',
  '/profile',
];

const ROUTE_MAP = {
  // Français vers Arabe
  '/accueil': '/الرئيسية',
  '/produits': '/منتجات',
  'tenue-mariage': '/فستان-الزفاف',
  '/contact': '/اتصل-بنا',
  '/qui-sommes-nous': '/من-نحن',
  '/Howitworks': '/كيف-يعمل',
  '/login': '/تسجيل-الدخول',
  '/register': '/إنشاء-حساب',

  // Arabe vers Français
  '/الرئيسية': '/accueil',
  '/منتجات': '/produits',
  '/فستان-الزفاف': '/tenue-mariage',
  '/اتصل-بنا': '/contact',
  '/من-نحن': '/qui-sommes-nous',
  '/كيف-يعمل': '/Howitworks',
  '/تسجيل-الدخول': '/login',
  '/إنشاء-حساب': '/register',
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/الرئيسية" element={<AccueilAR />} />
      <Route path="/produits" element={<Produits />} />
      <Route path="/منتجات" element={<ProduitsAr />} />
      <Route path="/tenue-mariage" element={<Location />} />
      
      <Route path="/منتج/:id" element={<ProduitDetailAR />} />
      <Route path="/produit/:id" element={<ProduitDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/اتصل-بنا" element={<ContactAR />} />
      <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
      <Route path="/من-نحن" element={<QuiSommesNousAr />} />
      <Route path="/Howitworks" element={<Howitworks />} />
      <Route path="/كيف-يعمل" element={<HowItWorksAr />} />
      <Route path="/login" element={<Login />} />
      <Route path="/تسجيل-الدخول" element={<LoginAR />} />
      <Route path="/register" element={<Register />} />
      <Route path="/إنشاء-حساب" element={<RegisterAR />} />
      <Route path="/auth-test" element={<AuthTest />} />
      <Route path="/boutique-utilisateur" element={<BoutiqueUtilisateur />} />
      <Route path="/commandes" element={<Commandes />} /> 
      <Route path="/support" element={<Support />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
      {/* Redirection automatique vers l'accueil Arabe si route vide */}
      <Route path="/" element={<AccueilAR />} /> 
    </Routes>
  );
}

function AppContent() {
  const [language, setLanguage] = useState('ar');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Vérification si la route actuelle (décodée) fait partie du dashboard
  const currentDecodedPath = decodeURIComponent(location.pathname);
  const isUserRoute = USER_ROUTES.includes(currentDecodedPath);

  useEffect(() => {
    document.body.dir = language === 'ar' ? "rtl" : "ltr";
  }, [language]);

  const toggleLanguage = (lang) => {
    const currentPath = decodeURIComponent(location.pathname);
    const nextPath = ROUTE_MAP[currentPath];

    setLanguage(lang);

    if (nextPath) {
      navigate(nextPath);
    } else if (currentPath === '/') {
      navigate(lang === 'ar' ? '/الرئيسية' : '/accueil');
    } else {
      // Pour les routes sans traduction explicite (comme le dashboard), on reste sur la même URL
      console.log("Maintien de la route actuelle pour la langue :", lang);
    }
  };

  return (
    <div className={`app-container ${language}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header dynamique */}
      {language === 'fr' ? (
        <Header currentLang={language} switchLang={toggleLanguage} />
      ) : (
        <HeaderAR currentLang={language} switchLang={toggleLanguage} />
      )}

      {/* Contenu Principal avec Sidebar conditionnelle */}
      {isUserRoute ? (
        <div className="user-dashboard-layout">
          <SidebarAR />
          {/* <Sidebar /> */}
          <main className="content-area">
            <AppRoutes />
          </main>
        </div>
      ) : (
        <AppRoutes />
      )}

      {/* Footer dynamique */}
      {language === 'fr' ? <Footer /> : <FooterAR />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;