import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/pages css/auth.css';

function AuthTest() {
  // On récupère les états et fonctions du contexte
  const { isConnected, user, logout, login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Récupération automatique des infos si un token existe mais que l'user n'est pas chargé
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      
      // On ne lance la requête que si on a un token et pas encore d'utilisateur dans le contexte
      if (token && !user) {
        setLoading(true);
        try {
          const response = await axios.get('http://localhost:8080/api/boutiques/me', {
            headers: { 
              Authorization: `Bearer ${token}` 
            }
          });
          
          // On met à jour le contexte global avec les vraies données du backend
          login(response.data); 
          console.log("✅ Profil récupéré avec succès:", response.data);
        } catch (err) {
          console.error("❌ Erreur lors de la récupération du profil:", err.response?.data || err.message);
          // Si le token est mort, on peut forcer la déconnexion ici
          if (err.response?.status === 401 || err.response?.status === 403) {
            logout();
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [user, login, logout]); // Dépendances pour éviter les boucles infinies

  return (
    <div className="auth-page" style={{ padding: '40px 20px', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div className="auth-container" style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        
        <div className="auth-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="auth-title" style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b' }}>👤 Profil Boutique</h1>
          <p className="auth-subtitle" style={{ color: '#64748b' }}>Données réelles issues de la base de données</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Chargement du profil...</p>
          </div>
        ) : isConnected ? (
          <div className="profile-content">
            {/* Carte de profil visuelle */}
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <img 
                src={user?.shopPhoto || `https://ui-avatars.com/api/?name=${user?.shopName || 'Shop'}&background=random`} 
                alt="Avatar Boutique" 
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              />
              <div>
                <h2 style={{ margin: 0, fontSize: '20px', color: '#166534' }}>{user?.shopName || 'Ma Boutique'}</h2>
                <p style={{ margin: '4px 0', color: '#475569' }}>Gérant : <strong>{user?.name || 'Non renseigné'}</strong></p>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>📞 {user?.phoneNumber}</p>
              </div>
            </div>

            {/* Inspecteur de données JSON */}
            <div style={{ background: '#0f172a', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
              <p style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 'bold' }}>Réponse JSON du Backend :</p>
              <pre style={{ margin: 0, color: '#38bdf8', fontSize: '12px', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <button 
              onClick={logout}
              style={{ width: '100%', padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.target.style.background = '#dc2626'}
              onMouseOut={(e) => e.target.style.background = '#ef4444'}
            >
              🚪 Se déconnecter
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔒</div>
            <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>Accès Restreint</h3>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>Aucune session active trouvée. Connectez-vous pour voir vos informations.</p>
            <Link to="/login" style={{ display: 'inline-block', padding: '12px 24px', background: '#6366f1', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              Aller à la page Login
            </Link>
          </div>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}

export default AuthTest;