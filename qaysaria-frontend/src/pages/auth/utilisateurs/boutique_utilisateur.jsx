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
  const [loading, setLoading] = useState(true);
  const [/*loadingConfig*/, setLoadingConfig] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true); // ✅ Loading catégories
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
  });

  const API_BASE_URL = 'http://localhost:8080/api' || process.env.REACT_APP_API_URL  ;



  // ════════════════════════════════════════════════════════════════
  // 1. RÉCUPÉRER LES CATÉGORIES ET TAILLES AU CHARGEMENT
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        setLoadingConfig(true);
        setLoadingCategories(true);
        
        const [resCat, resTailles] = await Promise.all([
          axios.get(`${API_BASE_URL}/categories/all`),
          axios.get(`${API_BASE_URL}/tailles/all`)
        ]);

        // 1. Catégories
        const categoriesArray = resCat.data.map(cat => typeof cat === 'object' ? (cat.name || cat.label) : cat);
        setCategories(categoriesArray);
        
        // 2. Tailles API
        const taillesFromAPI = resTailles.data.map(t => typeof t === 'object' ? (t.libelle || t.libelle) : t);
        setTaillesList(taillesFromAPI.length > 0 ? taillesFromAPI : SIZES);

      } catch (err) {
        console.error("Erreur chargement config:", err);
        setCategories(['Vêtements', 'Accessoires', 'Chaussures', 'Autre']);
        setTaillesList(SIZES);
      } finally {
        setLoadingConfig(false);
        setLoadingCategories(false);
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
    if (filters.category && p.category !== filters.category) return false;
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
      category: categories.length > 0 ? categories[0] : '', // ✅ Utiliser la première catégorie
      quantity: '',
      tailles: [],
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
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category,
      quantity: product.quantity || '',
      tailles: product.tailles || [],
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
      category: categories.length > 0 ? categories[0] : '',
      quantity: '',
      tailles: [],
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
  // 12. CRÉER OU MODIFIER PRODUIT
  // ════════════════════════════════════════════════════════════════
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const formDataMultipart = new FormData();
      formDataMultipart.append('name', formData.name);
      formDataMultipart.append('description', formData.description);
      formDataMultipart.append('price', formData.price);
      formDataMultipart.append('category', formData.category);
      formDataMultipart.append('quantity', formData.quantity || 0);
      formDataMultipart.append('boutiqueId', user.boutiqueId);
      formDataMultipart.append('tailles', JSON.stringify(formData.tailles)); // <--- IMPORTANT

      if (imageFile) {
        formDataMultipart.append('image', imageFile);
      }

      if (editingProduct) {
        // MODIFICATION - PUT /api/products/{id}
        await axios.put(`${API_BASE_URL}/products/${editingProduct.id}`, formDataMultipart, {
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { boutiqueId: user.boutiqueId }
        });
        setSuccessMessage('Produit modifié avec succès !');
      } else {
        // CRÉATION - POST /api/products
        await axios.post(`${API_BASE_URL}/products`, formDataMultipart, {
          headers: { 'Content-Type': 'multipart/form-data' },
          params: { boutiqueId: user.boutiqueId }
        });
        setSuccessMessage('Produit créé avec succès !');
      }

      // Recharger la liste
      setTimeout(() => {
        closeModal();
        setSuccessMessage(null);
        // Recharger les produits après création/modification
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
      // DELETE /api/products/{id}?boutiqueId={boutiqueId}
      await axios.delete(`${API_BASE_URL}/products/${productId}`, {
        params: { boutiqueId: user.boutiqueId }
      });
      setDeleteConfirm(null);
      setSuccessMessage('Produit supprimé avec succès !');
      
      // Recharger la liste après suppression
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

  // Écran de chargement si le AuthContext n'a pas encore fini
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
      {/* MESSAGE DE SUCCÈS */}
      {successMessage && (
        <div className="bu-toast bu-toast--success">
          <CheckCircle size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* MESSAGE D'ERREUR GLOBAL */}
      {formError && !showModal && (
        <div className="bu-toast bu-toast--error">
          <AlertCircle size={18} />
          <span>{formError}</span>
        </div>
      )}

      {/* ══ MODAL AJOUT/MODIFICATION ══ */}
      {showModal && (
        <div className="bu-modal-overlay" onClick={closeModal}>
          <div className="bu-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header Modal */}
            <div className="bu-modal-header">
              <h2>{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
              <button className="bu-modal-close" onClick={closeModal}>
                <X size={22} />
              </button>
            </div>

            {/* Contenu Modal */}
            <form onSubmit={handleSubmitProduct} className="bu-modal-form">
              {/* Erreur du formulaire */}
              {formError && (
                <div className="bu-form-error">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              {/* Upload Image */}
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

              {/* Nom */}
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

              {/* Description */}
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

              {/* Grille 2 colonnes: Prix + Catégorie */}
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
                  <label htmlFor="category" className="bu-form-label">Catégorie *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bu-form-select"
                  >
                    {/* ✅ AFFICHER LES CATÉGORIES DYNAMIQUES */}
                    {loadingCategories ? (
                      <option value="">Chargement des catégories...</option>
                    ) : categories.length > 0 ? (
                      categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune catégorie disponible</option>
                    )}
                  </select>
                </div>
              </div>

              {/* Quantité */}
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

              {/* Tailles */}
              {/* Tailles dans la Modal */}
              <div className="bu-form-group">
                <label className="bu-form-label">Tailles disponibles</label>
                <div className="bu-sizes-grid">
                  {/* ✅ On utilise taillesList au lieu de SIZES */}
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

              {/* Boutons d'action */}
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

      {/* ══ MODAL CONFIRMATION SUPPRESSION ══ */}
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

      {/* ══ HEADER DE LA BOUTIQUE ══ */}
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
        {/* ── FILTRES — GAUCHE ── */}
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

          {/* Catégorie - AFFICHER LES CATÉGORIES DYNAMIQUES */}
          <div className="bu-filter-group">
            <label className="bu-filter-label"><Tag size={13} /> Catégorie</label>
            <div className="bu-filter-options">
              {/* ✅ BOUTON "TOUT" */}
              <button
                className={`bu-filter-chip ${filters.category === '' ? 'active' : ''}`}
                onClick={() => setFilters(f => ({ ...f, category: '' }))}
              >
                Tout
              </button>
              
              {/* ✅ AFFICHER TOUTES LES CATÉGORIES DEPUIS L'API */}
              {loadingCategories ? (
                <button className="bu-filter-chip" disabled>
                  Chargement...
                </button>
              ) : (
                categories.map((cat, idx) => (
                  <button
                    key={idx}
                    className={`bu-filter-chip ${filters.category === cat ? 'active' : ''}`}
                    onClick={() => setFilters(f => ({ ...f, category: cat }))}
                  >
                    {cat}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Prix */}
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

          {/* Taille - Sidebar Filtre */}
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

        {/* ── PRODUITS — DROITE ── */}
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
                    {/* Actions overlay au hover */}
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