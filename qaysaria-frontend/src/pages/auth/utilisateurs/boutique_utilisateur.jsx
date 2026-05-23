import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone, Star, Instagram, /*Facebook,
  Twitter,*/ MessageCircle, SlidersHorizontal,
  RotateCcw, Package, ShoppingBag, Tag, Ruler, PlusCircle, Loader2,
  Edit, Trash2, X, Upload, AlertCircle, CheckCircle
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/pages css/boutique_utilisateur.css';
import '../../../styles/pages css/boutique_utilisateur_enhanced.css';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
const BoutiqueUtilisateur = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ✅ État pour les catégories
  const [taillesList, setTaillesList] = useState([]); // Pour stocker les tailles de l'API
  const [audiences, setAudiences] = useState([]); // ✅ État pour les audiences
  const [loading, setLoading] = useState(true);
  const [/*loadingConfig*/, setLoadingConfig] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true); // ✅ Loading catégories
  const [loadingAudiences, setLoadingAudiences] = useState(true); // ✅ Loading audiences
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    maxPrice: 5000,
    size: '',
  });

  // États pour la modal
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    tailles: [],
    audience: '',
  });

  const API_BASE_URL = 'http://localhost:8080/api' || process.env.REACT_APP_API_URL;

  // ════════════════════════════════════════════════════════════════
  // 1. RÉCUPÉRER LES CATÉGORIES, TAILLES ET AUDIENCES AU CHARGEMENT
  // ════════════════════════════════════════════════════════════════
 useEffect(() => {
  const fetchConfigData = async () => {
    try {
      setLoadingConfig(true);
      setLoadingCategories(true);
      setLoadingAudiences(true);
      
      const [resCat, resTailles, resAudiences] = await Promise.all([
        axios.get(`${API_BASE_URL}/categories/all`),
        axios.get(`${API_BASE_URL}/tailles/all`),
        axios.get(`${API_BASE_URL}/audiences/all`)
      ]);

      // 1. Catégories : On garde les objets complets { id, name }
      const categoriesArray = resCat.data.map(cat => {
        if (typeof cat === 'object' && cat !== null) {
          return {
            id: cat.id,
            name: cat.name || cat.label
          };
        }
        return { id: cat, name: cat };
      });
      setCategories(categoriesArray);
      
      // 2. Tailles API
      const taillesFromAPI = resTailles.data.map(t => typeof t === 'object' ? (t.libelle || t.libelle) : t);
      setTaillesList(taillesFromAPI.length > 0 ? taillesFromAPI : SIZES);

      // 3. Audiences API
      const audiencesArray = resAudiences.data.map(aud => {
        if (typeof aud === 'object' && aud !== null) {
          return {
            id: aud.id,
            name: aud.name || aud.label
          };
        }
        return { id: aud, name: aud };
      });
      setAudiences(audiencesArray);

    } catch (err) {
      console.error("Erreur chargement config:", err);
      // Mode de secours si l'API plante
      setCategories([
        { id: 1, name: 'Vêtements' },
        { id: 2, name: 'Accessoires' },
        { id: 3, name: 'Chaussures' },
        { id: 4, name: 'Autre' }
      ]);
      setTaillesList(SIZES);
      setAudiences([
        { id: 1, name: 'Hommes' },
        { id: 2, name: 'Femmes' },
        { id: 3, name: 'Enfants' }
      ]);
    } finally {
      setLoadingConfig(false);
      setLoadingCategories(false);
      setLoadingAudiences(false);
    }
  };

  fetchConfigData();
}, [API_BASE_URL]);

  // ════════════════════════════════════════════════════════════════
  // 2. RÉCUPÉRATION DES PRODUITS DEPUIS L'API
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const fetchBoutiqueProducts = async () => {
      if (!user?.boutiqueId) {
        console.warn("En attente du boutiqueId de l'utilisateur...");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/products/productsboutiques`, {
          params: { boutiqueId: user.boutiqueId }
        });
        
        console.log("Produits récupérés:", response.data);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur API détaillée:", err);
        setError("Impossible de charger les produits de votre boutique.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoutiqueProducts();
  }, [user?.boutiqueId, API_BASE_URL]);

  // ════════════════════════════════════════════════════════════════
  // 3. FILTRAGE DES PRODUITS
  // ════════════════════════════════════════════════════════════════
  const filtered = products.filter(p => {
     if (filters.category) {
    let productCatId = p.category?.id || categories.find(cat => cat.name === p.category)?.id || p.category;
    if (String(productCatId) !== String(filters.category)) return false;
  }
    if (p.price > filters.maxPrice) return false;
    if (filters.size && p.tailles && !p.tailles.includes(filters.size)) return false;
    return true;
  });

  // ════════════════════════════════════════════════════════════════
  // 4. RÉINITIALISER LES FILTRES
  // ════════════════════════════════════════════════════════════════
  const handleReset = () => {
    setFilters({ category: '', maxPrice: 5000, size: '' });
  };

  // ════════════════════════════════════════════════════════════════
  // 5. MODAL - OUVRIR POUR CRÉER
  // ════════════════════════════════════════════════════════════════
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories.length > 0 ? categories[0].id : '', // ✅ Utiliser la première catégorie
      quantity: '',
      tailles: [],
      audience: audiences.length > 0 ? audiences[0].id : '', // ✅ Utiliser la première audience
    });
    setImageFile(null);
    setImagePreview(null);
    setFormError(null);
    setShowModal(true);
  };

  // ════════════════════════════════════════════════════════════════
  // 6. MODAL - OUVRIR POUR ÉDITER
  // ════════════════════════════════════════════════════════════════
    const openEditModal = (product) => {
      setEditingProduct(product);
    
      // 1. Trouver l'ID numérique correspondant à la catégorie du produit
      let categoryIdFound = '';

      if (product.category) {
        if (typeof product.category === 'object') {
          categoryIdFound = product.category.id;
        } else if (typeof product.category === 'string') {
          // Si l'API renvoie juste la chaîne "Chaussures", on cherche l'objet correspondant dans notre tableau 'categories'
          const match = categories.find(cat => cat.name === product.category);
          categoryIdFound = match ? match.id : '';
        }
      }
    
      // 2. Trouver l'ID d'audience correspondant
      let audienceIdFound = '';
      if (product.audience) {
        if (typeof product.audience === 'object') {
          audienceIdFound = product.audience.id;
        } else if (typeof product.audience === 'string') {
          const matchAud = audiences.find(aud => aud.name === product.audience);
          audienceIdFound = matchAud ? matchAud.id : '';
        }
      }

      // 3. Remplir le formulaire avec les IDs trouvés
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        category: categoryIdFound, // ◄ Ici, on stocke obligatoirement l'ID (ex: 3)
        quantity: product.quantity || '',
        tailles: product.tailles || [],
        audience: audienceIdFound,
      });
    
      setImagePreview(product.imageUrl);
      setImageFile(null);
      setFormError(null);
      setShowModal(true);
    };

  // ════════════════════════════════════════════════════════════════
  // 7. MODAL - FERMER
  // ════════════════════════════════════════════════════════════════
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories.length > 0 ? categories[0].id : '',
      quantity: '',
      tailles: [],
      audience: audiences.length > 0 ? audiences[0].id : '',
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingProduct(null);
    setFormError(null);
  };

  // ════════════════════════════════════════════════════════════════
  // 8. GÉRER CHANGEMENT DES CHAMPS TEXTE
  // ════════════════════════════════════════════════════════════════
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || '' : value
    }));
  };

  // ════════════════════════════════════════════════════════════════
  // 9. GÉRER CHANGEMENT IMAGE
  // ════════════════════════════════════════════════════════════════
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 10. GÉRER SÉLECTION DE TAILLES
  // ════════════════════════════════════════════════════════════════
  const toggleSize = (size) => {
    setFormData(prev => ({
      ...prev,
      tailles: prev.tailles.includes(size)
        ? prev.tailles.filter(s => s !== size)
        : [...prev.tailles, size]
    }));
  };

  // ════════════════════════════════════════════════════════════════
  // 11. VALIDER LE FORMULAIRE
  // ════════════════════════════════════════════════════════════════
  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Le nom du produit est obligatoire');
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setFormError('Le prix doit être supérieur à 0');
      return false;
    }
    if (!editingProduct && !imageFile) {
      setFormError('L\'image du produit est obligatoire');
      return false;
    }
    if (!formData.category) {
      setFormError('Veuillez sélectionner une catégorie');
      return false;
    }
    return true;
  };

  // ════════════════════════════════════════════════════════════════
  // 12. CRÉER OU MODIFIER PRODUIT (BASÉ SUR LA NOUVELLE CONFIG JAVA)
  // ════════════════════════════════════════════════════════════════
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const formDataMultipart = new FormData();

      // 1. On construit l'objet complet attendu par CreateProductRequest
      const productDto = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        categoryId: formData.category? Number(formData.category) : null,
        quantity: formData.quantity || 0,
        tailles: formData.tailles,
        audienceId: formData.audience? Number(formData.audience) : null
      };

      // 2. CRUCIAL : On encapsule le JSON dans un Blob de type 'application/json'
      const dataBlob = new Blob([JSON.stringify(productDto)], { type: 'application/json' });
      formDataMultipart.append('data', dataBlob);

      // 3. On ajoute l'image si elle existe
      if (imageFile) {
        formDataMultipart.append('image', imageFile);
      }

      // 4. Envoi de la requête (Laisser Axios gérer automatiquement le multipart boundary !)
      // Récupérez votre token (adaptez selon l'endroit où vous le stockez : localStorage, cookies, ou user.token)
const token = user?.token; 

if (editingProduct) {
  // MODIFICATION - PUT /api/products/{id}
  await axios.put(`${API_BASE_URL}/products/${editingProduct.id}`, formDataMultipart, {
    params: { boutiqueId: user.boutiqueId },
    headers: {
      'Authorization': `Bearer ${token}` // ◄ FORCE LE TOKEN ICI
    }
  });
  setSuccessMessage('Produit modifié avec succès !');
} else {
  // CRÉATION - POST /api/products
  await axios.post(`${API_BASE_URL}/products`, formDataMultipart, {
    params: { boutiqueId: user.boutiqueId },
    headers: {
      'Authorization': `Bearer ${token}` // ◄ FORCE LE TOKEN ICI
    }
  });
  setSuccessMessage('Produit créé avec succès !');
}

      // Recharger la liste après succès
      setTimeout(() => {
        closeModal();
        setSuccessMessage(null);
        const fetchBoutiqueProducts = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}/products/productsboutiques`, {
              params: { boutiqueId: user.boutiqueId }
            });
            setProducts(response.data);
          } catch (err) {
            console.error("Erreur lors du rechargement:", err);
            setError("Erreur lors du rechargement de la liste");
          }
        };
        fetchBoutiqueProducts();
      }, 1500);

    } catch (err) {
      console.error("Erreur:", err);
      setFormError(err.response?.data?.message || 'Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setSubmitting(false);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 13. SUPPRIMER PRODUIT
  // ════════════════════════════════════════════════════════════════
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/products/${productId}`, {
        params: { boutiqueId: user.boutiqueId }
      });
      setDeleteConfirm(null);
      setSuccessMessage('Produit supprimé avec succès !');
      
      setTimeout(() => {
        setSuccessMessage(null);
        const fetchBoutiqueProducts = async () => {
          try {
            const response = await axios.get(`${API_BASE_URL}/products/productsboutiques`, {
              params: { boutiqueId: user.boutiqueId }
            });
            setProducts(response.data);
          } catch (err) {
            console.error("Erreur lors du rechargement:", err);
            setError("Erreur lors du rechargement de la liste");
          }
        };
        fetchBoutiqueProducts();
      }, 1500);
    } catch (err) {
      console.error("Erreur suppression:", err);
      const errorMsg = err.response?.data?.message || 'Impossible de supprimer le produit.';
      setFormError(errorMsg);
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 14. COMPOSANT ÉTOILES
  // ════════════════════════════════════════════════════════════════
  const Stars = ({ note }) => (
    <div className="bu-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={15}
          strokeWidth={1.5}
          fill={i <= note ? '#EF3B3C' : 'none'}
          color={i <= note ? '#EF3B3C' : '#D1D1D1'}
        />
      ))}
      <span className="bu-stars-text">{note}.0 / 5</span>
    </div>
  );

  if (!user) {
    return (
      <div className="bu-loading-full">
        <Loader2 className="animate-spin" size={32} />
        <p>Chargement de votre session...</p>
      </div>
    );
  }

  return (
    <div className="bu-page" dir="ltr" lang="fr">
      {successMessage && (
        <div className="bu-toast bu-toast--success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {formError && !showModal && (
        <div className="bu-toast bu-toast--error">
          <AlertCircle size={18} />
          <span>{formError}</span>
        </div>
      )}

      {showModal && (
        <div className="bu-modal-overlay" onClick={closeModal}>
          <div className="bu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bu-modal-header">
              <h2>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
              <button className="bu-modal-close" onClick={closeModal}>
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmitProduct} className="bu-modal-form">
              {formError && (
                <div className="bu-form-error">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="bu-form-group">
                <label className="bu-form-label">
                  <Upload size={16} /> Image du produit *
                </label>
                <div className="bu-image-upload">
                  {imagePreview ? (
                    <div className="bu-image-preview-wrap">
                      <img src={imagePreview} alt="Aperçu" className="bu-image-preview" />
                      <button
                        type="button"
                        className="bu-image-change"
                        onClick={() => document.getElementById('imageInput').click()}
                      >
                        Changer l'image
                      </button>
                    </div>
                  ) : (
                    <label className="bu-image-input-label">
                      <Upload size={32} />
                      <span>Cliquez pour ajouter une image</span>
                      <input
                        id="imageInput"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                      />
                    </label>
                  )}
                  {imagePreview && (
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                  )}
                </div>
              </div>

              <div className="bu-form-group">
                <label htmlFor="name" className="bu-form-label">Nom du produit *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: T-shirt coton blanc"
                  className="bu-form-input"
                  maxLength={100}
                />
              </div>

              <div className="bu-form-group">
                <label htmlFor="description" className="bu-form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre produit..."
                  className="bu-form-textarea"
                  rows="3"
                  maxLength={500}
                />
              </div>

              <div className="bu-form-row">
                <div className="bu-form-group">
                  <label htmlFor="price" className="bu-form-label">Prix (DH) *</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="99.99"
                    className="bu-form-input"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="bu-form-group">
                  <label htmlFor="audience" className="bu-form-label">Audience *</label>
                  <select
                    id="audience"
                    name="audience"
                    value={formData.audience}
                    onChange={handleInputChange}
                    className="bu-form-select"
                  >
                    {loadingAudiences ? (
                      <option value="">Chargement des audiences...</option>
                    ) : audiences.length > 0 ? (
                      audiences.map((aud, idx) => (
                        <option key={aud.id || idx} value={aud.id}>
                          {aud.name}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune audience disponible</option>
                    )}
                  </select>
                </div>

                <div className="bu-form-group">
                  <label htmlFor="category" className="bu-form-label">Catégorie *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bu-form-select"
                  >
                    {loadingCategories ? (
                      <option value="">Chargement des catégories...</option>
                    ) : categories.length > 0 ? (
                      categories.map((cat, idx) => (
                      <option key={cat.id || idx} value={cat.id}>
                               {cat.name}
                             </option>
                      ))
                    ) : (
                      <option value="">Aucune catégorie disponible</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="bu-form-group">
                <label htmlFor="quantity" className="bu-form-label">Quantité en stock</label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bu-form-input"
                  min="0"
                />
              </div>

              <div className="bu-form-group">
                <label className="bu-form-label">Tailles disponibles</label>
                <div className="bu-sizes-grid">
                  {taillesList.map(size => (
                    <button
                      key={size}
                      type="button"
                      className={`bu-size-checkbox ${formData.tailles.includes(size) ? 'active' : ''}`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bu-modal-actions">
                <button
                  type="button"
                  className="bu-btn-cancel"
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bu-btn-submit"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    editingProduct ? 'Modifier' : 'Créer'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="bu-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="bu-modal bu-modal--small" onClick={(e) => e.stopPropagation()}>
            <div className="bu-modal-header">
              <h2>Confirmer la suppression</h2>
            </div>
            <p className="bu-modal-message">
              Êtes-vous sûr de vouloir supprimer ce produit ? Cette action ne peut pas être annulée.
            </p>
            <div className="bu-modal-actions">
              <button
                className="bu-btn-cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Annuler
              </button>
              <button
                className="bu-btn-delete"
                onClick={() => handleDeleteProduct(deleteConfirm)}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bu-header">
        <div className="bu-header-inner">
          <div className="bu-profile">
            <div className="bu-avatar-wrap">
              <div className="bu-avatar">
                {user.name ? user.name[0].toUpperCase() : 'B'}
              </div>
              <span className="bu-avatar-badge">✓</span>
            </div>
            <div className="bu-info">
              <h1 className="bu-name">{user.name || "Ma Boutique"}</h1>
              <div className="bu-meta">
                <span className="bu-meta-item">
                  <MapPin size={13} strokeWidth={2} /> {user.city || "Maroc"}
                </span>
                <span className="bu-meta-item">
                  <Phone size={13} strokeWidth={2} /> {user.phoneNumber || "N/A"}
                </span>
              </div>
              <Stars note={4} />
            </div>
          </div>

          <div className="bu-socials">
            {user.phoneNumber && (
              <a href={`https://wa.me/${user.phoneNumber}`} className="bu-social bu-social--wa" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} strokeWidth={2} />
              </a>
            )}
            <a href="https://www.instagram.com" className="bu-social" target="_blank" rel="noopener noreferrer">
              <Instagram size={17} strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </div>

      <div className="bu-body">
        <aside className="bu-filters">
          <div className="bu-filters-top">
            <h3 className="bu-filters-title">
              <SlidersHorizontal size={15} strokeWidth={2} color="#EF3B3C" />
              Filtres
            </h3>
            <button className="bu-filters-reset" onClick={handleReset}>
              <RotateCcw size={11} strokeWidth={2.5} /> Réinitialiser
            </button>
          </div>

          <div className="bu-filter-group">
            <label className="bu-filter-label"><Tag size={13} /> Catégorie</label>
            <div className="bu-filter-options">
              <button
                className={`bu-filter-chip ${filters.category === '' ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, category: '' }))}
              >
                Tout
              </button>
              
              {loadingCategories ? (
                <button className="bu-filter-chip" disabled>
                  Chargement...
                </button>
              ) : (
              // ✅ MAINTENANT : On compare l'ID et on affiche le nom !
              categories.map((cat, idx) => (
                <button
                  key={cat.id || idx}
                  className={`bu-filter-chip ${filters.category === cat.id ? 'active' : ''}`}
                  onClick={() => setFilters(f => ({ ...f, category: cat.id }))}
                >
                  {cat.name}
                </button>
              ))
              )}
            </div>
          </div>

          <div className="bu-filter-group">
            <label className="bu-filter-label"><Tag size={13} /> Prix Maximum</label>
            <div className="bu-price-display">
              <span>0 DH</span>
              <span className="bu-price-max">{filters.maxPrice.toLocaleString()} DH</span>
            </div>
            <input
              type="range"
              className="bu-range"
              min="0" max="10000" step="100"
              value={filters.maxPrice}
              onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))}
            />
          </div>

          <div className="bu-filter-group">
            <label className="bu-filter-label"><Ruler size={13} /> Taille</label>
            <div className="bu-filter-options bu-filter-options--sizes">
              <button 
                className={`bu-size-btn ${filters.size === '' ? 'active' : ''}`} 
                onClick={() => setFilters(f => ({ ...f, size: '' }))}
              >
                Toutes
              </button>
              {taillesList.map(s => (
                <button 
                  key={s} 
                  className={`bu-size-btn ${filters.size === s ? 'active' : ''}`} 
                  onClick={() => setFilters(f => ({ ...f, size: s }))}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="bu-products">
          <div className="bu-products-bar">
            <h2 className="bu-products-title">
              <ShoppingBag size={18} strokeWidth={1.8} /> Nos Produits
            </h2>
            <span className="bu-products-count">
              <strong>{filtered.length}</strong> produit{filtered.length > 1 ? 's' : ''}
            </span>
            <div className="bu-actions">
              <button className="tdb-quick-btn" onClick={openAddModal}>
                <PlusCircle size={20} strokeWidth={2} /> Ajouter un Produit
              </button>
            </div>
          </div>

          {loading ? (
            <div className="bu-status-container" style={{ padding: '60px', textAlign: 'center' }}>
              <Loader2 className="animate-spin" size={48} color="#EF3B3C" />
              <p style={{ marginTop: '15px', color: '#666' }}>Chargement de votre catalogue...</p>
            </div>
          ) : error ? (
            <div className="bu-empty">
              <Package size={48} strokeWidth={1.2} color="#EF3B3C" />
              <h3>Oups !</h3>
              <p>{error}</p>
            </div>
          ) : filtered.length > 0 ? (
            <div className="bu-grid">
              {filtered.map(p => (
                <div key={p.id} className="bu-card">
                  <div className="bu-card-img-wrap">
                    <img 
                      src={p.imageUrl || 'https://via.placeholder.com/400x320?text=Produit'} 
                      alt={p.name} 
                      className="bu-card-img" 
                    />
                    <div className="bu-card-overlay">
                      <button
                        className="bu-card-action bu-card-action--edit"
                        onClick={() => openEditModal(p)}
                        title="Modifier"
                      >
                        <Edit size={20} strokeWidth={2} />
                      </button>
                      <button
                        className="bu-card-action bu-card-action--delete"
                        onClick={() => setDeleteConfirm(p.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={20} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                  <div className="bu-card-body">
                    <span className="bu-card-cat">{p.category}</span>
                    <h3 className="bu-card-name">{p.name}</h3>
                    <div className="bu-card-footer">
                      <span className="bu-card-price">{p.price} DH</span>
                      {p.tailles && p.tailles.length > 0 && (
                        <span className="bu-card-size">T: {p.tailles.join(', ')}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bu-empty">
              <Package size={48} strokeWidth={1.2} color="#D1D1D1" />
              <h3>Aucun produit trouvé</h3>
              <p>Essayez de modifier les filtres ou ajoutez votre premier produit.</p>
              <button className="bu-empty-btn" onClick={handleReset}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BoutiqueUtilisateur;