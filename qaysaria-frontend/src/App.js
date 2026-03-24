import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './composants/Header';
import Footer from './composants/Footer';
import Sidebar from './composants/Sidebar';
import Accueil from './pages/accueil/accueil';

import Produits from './pages/produits/produits_fr/produits';
import ProduitsAr from './pages/produits/produits_ar/produits';

import Contact from './pages/contact/contact_fr/contact';
import Contact_ar from './pages/contact/contact_ar/contact';

import QuiSommesNous from './pages/quisommesnous/QuiSommesNous_fr/QuiSommesNous';
import QuiSommesNousAr from './pages/quisommesnous/QuiSommesNous_ar/QuiSommesNous';

import Howitworks from './pages/Howitworks/Howitworks_fr/Howitworks';
import Howitworks_ar from './pages/Howitworks/Howitworks_ar/Howitworks';

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
      <Route path="/" element={<Accueil />} />
      <Route path="/accueil" element={<Accueil />} />
      {/* produits */}
      <Route path="/produits" element={<Produits />} />
      <Route path="/منتجات" element={<ProduitsAr />} />

      {/* contact */}
      <Route path="/contact" element={<Contact />} />
      <Route path="/اتصل-بنا" element={<Contact_ar />} />
      {/*QuiSommesNous */}
      <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
      <Route path="/من-نحن" element={<QuiSommesNousAr />} />
      {/*Howitworks */}
      <Route path="/Howitworks" element={<Howitworks />} />
      <Route path="/كيف-يعمل" element={<Howitworks_ar />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/boutique-utilisateur" element={<BoutiqueUtilisateur />} />
      <Route path="/commandes" element={<Commandes />} /> 
      <Route path="/support" element={<Support />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/tableau-de-bord" element={<TableauDeBord />} />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();
  const isUserRoute = USER_ROUTES.includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
      { <Header /> }
      {isUserRoute ? (
        <div className="user-dashboard-layout">
          { <Sidebar /> }
          <main className="content-area">
            <AppRoutes />
          </main>
        </div>
      ) : (
        <>
          <AppRoutes />
        </>
      )}
      { <Footer /> }
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