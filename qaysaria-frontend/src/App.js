import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

/* ─── COMPOSANTS ─── */
import Header from './composants/Header';
import HeaderAR from './composantsAR/HeaderAR';
import Footer from './composants/Footer';
import FooterAR from './composantsAR/FooterAR';

/* ─── PAGES PUBLIQUES ─── */
import Accueil from './pages/accueil/AccueilFR/accueil';
import AccueilAR from './pages/accueil/AccueilAR/accueil_ar';
import Produits from './pages/produits/produitsFR/produits';
import ProduitsAr from './pages/produits/produitsAR/produits';
import ProduitDetailAR from './pages/detailleProduit/DetailProduitAR/ProduitDetail_ar';
import ProduitDetail from './pages/detailleProduit/DetailProduitFR/ProduitDetail_fr';
import Contact from './pages/contact/ContactFR/contact';
import ContactAR from './pages/contact/ContactAR/contact';
import QuiSommesNous from './pages/quisommesnous/QuiSommesNousFR/QuiSommesNous';
import QuiSommesNousAr from './pages/quisommesnous/QuiSommesNousAR/QuiSommesNous';
import Howitworks from './pages/Howitworks/HowitworksFR/Howitworks';
import HowItWorksAr from './pages/Howitworks/HowitworksAR/Howitworks';

/* ─── AUTHENTIFICATION ─── */
import Login from './pages/auth/Login';
import LoginAR from './pages/auth/LoginAR';
import Register from './pages/auth/Register';
import RegisterAR from './pages/auth/RegisterAR';
import AuthTest from './pages/auth/AuthTest';

/* ─── ESPACE UTILISATEUR (DASHBOARD) ─── */
import BoutiqueUtilisateur from './pages/auth/utilisateurs/boutique_utilisateur';
import BoutiqueUtilisateurAR from './pages/auth/utilisateursAR/boutique_utilisateurAR';
import Commandes from './pages/auth/utilisateurs/commandes';
import CommandesAR from './pages/auth/utilisateursAR/commandesAR';
import Support from './pages/auth/utilisateurs/support';
import SupportAR from './pages/auth/utilisateursAR/supportAR';
import Profile from './pages/auth/utilisateurs/profile';
import ProfileAR from './pages/auth/utilisateursAR/profileAR';
import TableauDeBord from './pages/auth/utilisateurs/tableau_de_bord';
import TableauDeBordAR from './pages/auth/utilisateursAR/tableau_de_bordAR';

import './App.css';

/* ════════════════════════════════════════════════════════
    CONFIGURATION DES ROUTES
═══════════════════════════════════════════════════════════ */

const ROUTE_MAP = {
  // Français -> Arabe
  '/accueil': '/الرئيسية',
  '/produits': '/منتجات',
  '/contact': '/اتصل-بنا',
  '/qui-sommes-nous': '/من-نحن',
  '/Howitworks': '/كيف-يعمل',
  '/login': '/تسجيل-الدخول',
  '/register': '/إنشاء-حساب',
  '/tableau-de-bord': '/tableau-de-bordAR',
  '/boutique-utilisateur': '/boutique-utilisateurAR',
  '/commandes': '/commandesAR',
  '/support': '/supportAR',
  '/profile': '/profileAR',

  // Arabe -> Français
  '/الرئيسية': '/accueil',
  '/منتجات': '/produits',
  '/اتصل-بنا': '/contact',
  '/من-نحن': '/qui-sommes-nous',
  '/كيف-يعمل': '/Howitworks',
  '/تسجيل-الدخول': '/login',
  '/إنشاء-حساب': '/register',
  '/tableau-de-bordAR': '/tableau-de-bord',
  '/boutique-utilisateurAR': '/boutique-utilisateur',
  '/commandesAR': '/commandes',
  '/supportAR': '/support',
  '/profileAR': '/profile',
};

function AppRoutes() {
  return (
    <Routes>
      {/* ─── ROUTES FRANÇAISES ─── */}
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/produits" element={<Produits />} />
      <Route path="/produit/:id" element={<ProduitDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
      <Route path="/Howitworks" element={<Howitworks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
      <Route path="/boutique-utilisateur" element={<BoutiqueUtilisateur />} />
      <Route path="/commandes" element={<Commandes />} />
      <Route path="/support" element={<Support />} />
      <Route path="/profile" element={<Profile />} />

      {/* ─── ROUTES ARABES ─── */}
      <Route path="/الرئيسية" element={<AccueilAR />} />
      <Route path="/منتجات" element={<ProduitsAr />} />
      <Route path="/منتج/:id" element={<ProduitDetailAR />} />
      <Route path="/اتصل-بنا" element={<ContactAR />} />
      <Route path="/من-نحن" element={<QuiSommesNousAr />} />
      <Route path="/كيف-يعمل" element={<HowItWorksAr />} />
      <Route path="/تسجيل-الدخول" element={<LoginAR />} />
      <Route path="/إنشاء-حساب" element={<RegisterAR />} />
      <Route path="/tableau-de-bordAR" element={<TableauDeBordAR />} />
      <Route path="/boutique-utilisateurAR" element={<BoutiqueUtilisateurAR />} />
      <Route path="/commandesAR" element={<CommandesAR />} />
      <Route path="/supportAR" element={<SupportAR />} />
      <Route path="/profileAR" element={<ProfileAR />} />

      <Route path="/auth-test" element={<AuthTest />} />
      <Route path="/" element={<AccueilAR />} /> 
    </Routes>
  );
}

function AppContent() {
  const [language, setLanguage] = useState('ar');
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentPath = decodeURIComponent(location.pathname);

  // Gestion du changement de langue et de direction (RTL/LTR)
  useEffect(() => {
    // Détection automatique de la langue selon l'URL
    const isAr = currentPath.match(/[\u0600-\u06FF]/) || currentPath.endsWith('AR');
    setLanguage(isAr ? 'ar' : 'fr');
    document.body.dir = isAr ? "rtl" : "ltr";
  }, [currentPath]);

  const toggleLanguage = (lang) => {
    const nextPath = ROUTE_MAP[currentPath];
    if (nextPath) {
      navigate(nextPath);
    } else {
      // Redirection par défaut si on est sur la racine
      navigate(lang === 'ar' ? '/الرئيسية' : '/accueil');
    }
  };

  return (
    <div className={`app-container ${language}`} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Header conditionnel selon la langue */}
      {language === 'fr' ? (
        <Header currentLang={language} switchLang={toggleLanguage} />
      ) : (
        <HeaderAR currentLang={language} switchLang={toggleLanguage} />
      )}

      {/* IMPORTANT : On évite les wrappers avec "overflow: hidden" ici.
          Le contenu principal doit permettre au Dropdown du Header de déborder.
      */}
      <main className="main-content" style={{ flex: 1, position: 'relative' }}>
        <AppRoutes />
      </main>

      {/* Footer conditionnel */}
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