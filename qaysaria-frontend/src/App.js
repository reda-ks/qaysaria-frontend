import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Header from './composants/Header';
import HeaderAR from './composantsAR/HeaderAR';
import Footer from './composants/Footer';
import FooterAR from './composantsAR/FooterAR';
import Sidebar from './composants/Sidebar';

import Accueil from './pages/accueil/AccueilFR/accueil';
import AccueilAR from './pages/accueil/AccueilAR/accueil_ar';
import Produits from './pages/produits/produitsFR/produits';
import ProduitsAr from './pages/produits/produitsAR/produits';
import Contact from './pages/contact/ContactFR/contact';
import ContactAR from './pages/contact/ContactAR/contact';
import QuiSommesNous from './pages/quisommesnous/QuiSommesNousFR/QuiSommesNous';
import QuiSommesNousAr from './pages/quisommesnous/QuiSommesNousAR/QuiSommesNous';
import Howitworks from './pages/Howitworks/HowitworksFR/Howitworks';
import HowItWorksAr from './pages/Howitworks/HowitworksAR/Howitworks';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/الرئيسية" element={<AccueilAR />} />
      <Route path="/produits" element={<Produits />} />
      <Route path="/منتجات" element={<ProduitsAr />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/اتصل-بنا" element={<ContactAR />} />
      <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
      <Route path="/من-نحن" element={<QuiSommesNousAr />} />
      <Route path="/Howitworks" element={<Howitworks />} />
      <Route path="/كيف-يعمل" element={<HowItWorksAr />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/boutique-utilisateur" element={<BoutiqueUtilisateur />} />
      <Route path="/commandes" element={<Commandes />} /> 
      <Route path="/support" element={<Support />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
      {/* Changement de la route par défaut vers l'Arabe */}
      <Route path="/" element={<AccueilAR />} /> 
    </Routes>
  );
}

function AppContent() {
  // 1. Initialisation sur 'ar'
  const [language, setLanguage] = useState('ar');
  const location = useLocation();
  const navigate = useNavigate();
  const isUserRoute = USER_ROUTES.includes(location.pathname);

  // 2. useEffect pour appliquer le RTL dès le premier chargement
  useEffect(() => {
    if (language === 'ar') {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [language]);

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    if (lang === 'ar') {
      navigate('/الرئيسية');
    } else {
      navigate('/accueil');
    }
  };

  return (
    <div className={`app-container ${language}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {language === 'fr' ? (
        <Header currentLang={language} switchLang={toggleLanguage} />
      ) : (
        <HeaderAR currentLang={language} switchLang={toggleLanguage} />
      )}

      {isUserRoute ? (
        <div className="user-dashboard-layout">
          <Sidebar />
          <main className="content-area">
            <AppRoutes />
          </main>
        </div>
      ) : (
        <AppRoutes />
      )}

      {language === 'fr' ? <Footer /> : <FooterAR />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;