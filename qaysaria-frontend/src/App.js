import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './composants/Header';
import Footer from './composants/Footer';
import Sidebar from './composants/Sidebar';
import Accueil from './pages/accueil/accueil';
import Produits from './pages/produits/produits';
import Contact from './pages/contact/contact';
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
      <Route path="/produits" element={<Produits />} />
      <Route path="/contact" element={<Contact />} />
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