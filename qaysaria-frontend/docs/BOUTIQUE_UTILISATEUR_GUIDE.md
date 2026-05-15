# Guide d'intégration - Composant BoutiqueUtilisateur Amélioré

## 📋 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Prérequis](#prérequis)
3. [Fonctionnalités](#fonctionnalités)
4. [Installation](#installation)
5. [API Endpoints](#api-endpoints)
6. [Exemples de requêtes](#exemples-de-requêtes)
7. [Structuration des données](#structuration-des-données)
8. [Personnalisation](#personnalisation)
9. [Dépannage](#dépannage)

---

## 📌 Vue d'ensemble

Le composant **BoutiqueUtilisateur** permet aux vendeurs (propriétaires de boutique) de gérer leur catalogue de produits de manière intuitive avec :

- ✅ **Création de produits** avec upload d'image et sélection de tailles
- ✅ **Modification de produits** avec pré-remplissage des données
- ✅ **Suppression de produits** avec confirmation
- ✅ **Filtrage et recherche** par catégorie, prix et taille
- ✅ **Actions hover** intuitives sur les cartes produits
- ✅ **Gestion des erreurs** avec messages clairs
- ✅ **Responsive design** pour mobile, tablet et desktop

---

## 🔧 Prérequis

### Dépendances npm installées :
```bash
npm install react react-dom axios framer-motion lucide-react react-router-dom react-scripts
```

### Variables d'environnement (.env) :
```
REACT_APP_API_URL=http://localhost:8080/api
```

### AuthContext doit fournir :
```javascript
{
  user: {
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    city: string,
    boutiqueId: string,  // ID unique de la boutique (REQUIS)
    role: string
  }
}
```

---

## ✨ Fonctionnalités

### 1. LECTURE DE PRODUITS
- ✅ Charge automatiquement les produits de la boutique au montage
- ✅ Filtre par catégorie, prix max, taille
- ✅ Affiche le nombre de produits correspondants

### 2. CRÉATION DE PRODUIT
**Déclencheur :** Clic sur le bouton "Ajouter un Produit"

**Formulaire :**
- Nom du produit (obligatoire, max 100 chars)
- Description (optionnel, max 500 chars)
- Prix (obligatoire, > 0)
- Catégorie (liste déroulante)
- Quantité en stock (optionnel)
- Tailles disponibles (checkboxes : XS, S, M, L, XL, XXL)
- Upload d'image (obligatoire, avec prévisualisation)

**Validation :**
- Tous les champs obligatoires doivent être remplis
- Prix doit être > 0
- Image est obligatoire pour la création

### 3. MODIFICATION DE PRODUIT
**Déclencheur :** Clic sur l'icône 🖊️ verte au hover de la carte

**Formulaire :**
- Pré-rempli avec les données actuelles du produit
- Permet de changer l'image
- Les autres champs sont modifiables

### 4. SUPPRESSION DE PRODUIT
**Déclencheur :** Clic sur l'icône 🗑️ rouge au hover de la carte

**Processus :**
1. Affiche une modal de confirmation
2. Demande confirmation à l'utilisateur
3. Supprime le produit et recharge la liste

### 5. ACTIONS VISUELLES
- Image devient légèrement transparente au hover
- Deux boutons apparaissent au centre avec animation : Edit (vert) et Delete (rouge)
- Transitions fluides et responsives

---

## 📦 Installation

### Étape 1 : Importer le composant
```jsx
import BoutiqueUtilisateur from './pages/auth/utilisateurs/boutique_utilisateur';
```

### Étape 2 : Utiliser dans une route
```jsx
// Dans votre fichier de routing (App.js ou Router.jsx)
import BoutiqueUtilisateur from './pages/auth/utilisateurs/boutique_utilisateur';

<Route path="/boutique-utilisateur" element={<BoutiqueUtilisateur />} />
```

### Étape 3 : Vérifier l'AuthContext
Assurez-vous que AuthContext fournit :
- `user.boutiqueId` (obligatoire)
- `user.name`, `user.city`, `user.phoneNumber` (optionnel mais recommandé)

### Étape 4 : Configurer l'API
Le composant utilise automatiquement `process.env.REACT_APP_API_URL`

---

## 🔌 API Endpoints

Le composant interact avec les endpoints suivants :

### 1. GET /api/products/productsboutiques
**Description :** Récupère tous les produits d'une boutique

**Paramètres de query :**
- `boutiqueId` (string, obligatoire)

**Réponse (200 OK) :**
```json
[
  {
    "id": "prod-123",
    "name": "T-shirt blanc",
    "description": "T-shirt coton premium",
    "price": 99.99,
    "category": "Vêtements",
    "quantity": 50,
    "tailles": ["M", "L", "XL"],
    "imageUrl": "https://cdn.example.com/image.jpg",
    "boutiqueId": "boutique-456",
    "createdAt": "2024-05-14T10:30:00Z"
  }
]
```

---

### 2. POST /api/products
**Description :** Crée un nouveau produit

**Content-Type :** `multipart/form-data`

**Body (FormData) :**
```
name: "T-shirt blanc" (string)
description: "T-shirt coton premium" (string)
price: 99.99 (number)
category: "Vêtements" (string)
quantity: 50 (number)
tailles: ["M", "L", "XL"] (JSON string)
boutiqueId: "boutique-456" (string)
image: <File object> (multipart)
```

**Réponse (201 Created) :**
```json
{
  "id": "prod-123",
  "name": "T-shirt blanc",
  "description": "T-shirt coton premium",
  "price": 99.99,
  "category": "Vêtements",
  "quantity": 50,
  "tailles": ["M", "L", "XL"],
  "imageUrl": "https://cdn.example.com/image.jpg",
  "boutiqueId": "boutique-456"
}
```

**Erreurs possibles :**
- 400 Bad Request : Champs obligatoires manquants
- 413 Payload Too Large : Fichier image trop gros
- 415 Unsupported Media Type : Type de fichier non supporté

---

### 3. PUT /api/products/{id}
**Description :** Modifie un produit existant

**Content-Type :** `multipart/form-data`

**Paramètres :**
- `id` : ID du produit à modifier (URL parameter)

**Body (FormData) :** Mêmes champs que POST, image optionnel

**Réponse (200 OK) :**
```json
{
  "id": "prod-123",
  "name": "T-shirt blanc modifié",
  ...
}
```

---

### 4. DELETE /api/products/{id}
**Description :** Supprime un produit

**Paramètres :**
- `id` : ID du produit à supprimer (URL parameter)

**Réponse (200 OK / 204 No Content) :**
```json
{
  "message": "Produit supprimé avec succès"
}
```

---

## 📡 Exemples de requêtes

### Avec cURL

#### 1. Récupérer les produits
```bash
curl -X GET \
  "http://localhost:8080/api/products/productsboutiques?boutiqueId=boutique-456" \
  -H "Authorization: Bearer token"
```

#### 2. Créer un produit
```bash
curl -X POST \
  http://localhost:8080/api/products \
  -H "Authorization: Bearer token" \
  -F "name=T-shirt blanc" \
  -F "description=T-shirt coton premium" \
  -F "price=99.99" \
  -F "category=Vêtements" \
  -F "quantity=50" \
  -F 'tailles=["M","L","XL"]' \
  -F "boutiqueId=boutique-456" \
  -F "image=@/path/to/image.jpg"
```

#### 3. Modifier un produit
```bash
curl -X PUT \
  http://localhost:8080/api/products/prod-123 \
  -H "Authorization: Bearer token" \
  -F "name=T-shirt blanc édité" \
  -F "description=Nouvelle description" \
  -F "price=89.99" \
  -F "category=Vêtements" \
  -F "quantity=45"
```

#### 4. Supprimer un produit
```bash
curl -X DELETE \
  http://localhost:8080/api/products/prod-123 \
  -H "Authorization: Bearer token"
```

### Avec Axios (dans le composant)

```javascript
// GET - Récupérer les produits
const response = await axios.get(
  `${API_BASE_URL}/products/productsboutiques`,
  {
    params: { boutiqueId: user.boutiqueId },
    headers: { 'Authorization': `Bearer ${token}` }
  }
);

// POST - Créer un produit
const formData = new FormData();
formData.append('name', 'Nouveau produit');
formData.append('price', 99.99);
formData.append('boutiqueId', user.boutiqueId);
formData.append('image', imageFile);

const response = await axios.post(
  `${API_BASE_URL}/products`,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  }
);

// PUT - Modifier un produit
const response = await axios.put(
  `${API_BASE_URL}/products/prod-123`,
  formData,
  {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
);

// DELETE - Supprimer un produit
const response = await axios.delete(
  `${API_BASE_URL}/products/prod-123`
);
```

---

## 📊 Structuration des données

### Objet Produit (côté Backend)
```typescript
interface Product {
  id: string;                    // UUID ou Mongo ObjectId
  name: string;                  // Nom du produit (1-100 chars)
  description?: string;          // Description optionnelle (0-500 chars)
  price: number;                 // Prix en DH (> 0)
  category: string;              // Catégorie (Vêtements, Accessoires, etc.)
  quantity: number;              // Quantité en stock (>= 0)
  tailles: string[];             // Array de tailles : ['XS','S','M','L','XL','XXL']
  imageUrl: string;              // URL de l'image stockée
  boutiqueId: string;            // ID de la boutique propriétaire
  createdAt: Date;               // Timestamp de création
  updatedAt: Date;               // Timestamp de dernière modification
}
```

### Objet FormData (envoyé par le composant)
```javascript
{
  name: "T-shirt blanc",
  description: "T-shirt coton 100%",
  price: "99.99",
  category: "Vêtements",
  quantity: "50",
  tailles: '["M","L","XL"]',     // STRING JSON
  boutiqueId: "boutique-456",
  image: File object              // Optionnel en modification
}
```

---

## 🎨 Personnalisation

### Modifier les couleurs
Éditez le fichier `boutique_utilisateur_enhanced.css` :

```css
:root {
  --color-primary: #EF3B3C;        /* Rouge principal */
  --color-success: #10B981;        /* Vert (bouton edit) */
  --color-danger: #EF4444;         /* Rouge (bouton delete) */
  --color-gray-*: ...              /* Gris divers */
}
```

### Ajouter des catégories
Dans le composant `boutique_utilisateur.jsx`, modifiez la liste des catégories :

```javascript
<select name="category" ...>
  <option value="Vêtements">Vêtements</option>
  <option value="Accessoires">Accessoires</option>
  <option value="Chaussures">Chaussures</option>
  <option value="Votre Catégorie">Votre Catégorie</option>
</select>
```

### Modifier les tailles disponibles
```javascript
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
// Remplacez par vos tailles
```

### Augmenter la limite de prix
```javascript
value={filters.maxPrice}
max="10000"  // ← Changez cette valeur
```

---

## 🐛 Dépannage

### Erreur: "boutiqueId is undefined"
**Cause :** `user.boutiqueId` n'est pas fourni par AuthContext
**Solution :** Vérifiez que AuthContext retourne bien cet attribut

### Erreur: "Cannot read property 'tailles' of undefined"
**Cause :** Le produit n'a pas l'attribut `tailles`
**Solution :** Assurez-vous que l'API retourne `tailles` comme array

### L'image n'est pas envoyée
**Cause :** `Content-Type: multipart/form-data` non défini
**Solution :** Le composant le définit automatiquement, vérifiez que Axios ne l'écrase pas

### La modal ne se ferme pas après soumission
**Cause :** Le rechargement de la liste prend trop de temps
**Solution :** Augmentez le timeout dans `handleSubmitProduct` (actuellement 1500ms)

### Erreur CORS
**Cause :** Backend ne permet pas les requêtes cross-origin
**Solution :** Configurez les CORS headers sur le backend

```java
// Spring Boot exemple
@Configuration
public class CorsConfig {
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
          .allowedOrigins("http://localhost:3000")
          .allowedMethods("GET", "POST", "PUT", "DELETE")
          .allowCredentials(true);
      }
    };
  }
}
```

---

## 📝 Notes importantes

1. **Validation côté serveur :** Implémentez également la validation côté backend
2. **Authentification :** Assurez-vous que chaque requête inclut un token JWT valide
3. **Permissions :** Vérifiez que l'utilisateur n'accède que à ses propres produits
4. **Taille d'image :** Limitez la taille maximale (ex: 5MB)
5. **Formats d'image :** Acceptez JPG, PNG, WebP
6. **Rate limiting :** Implémentez un rate limit pour éviter les abus

---

## 🚀 Améliorations futures

- [ ] Pagination des produits (si liste > 50 produits)
- [ ] Recherche par nom/description
- [ ] Édition en masse (sélection multiple)
- [ ] Import de produits (CSV/Excel)
- [ ] Export du catalogue
- [ ] Analytics (produits les plus vus)
- [ ] Gestion des variations (couleurs, styles)
- [ ] Galerie d'images multiples par produit
- [ ] Intégration avec système d'inventory

---

## 📧 Support

Pour toute question ou problème :
1. Consultez la [documentation Axios](https://axios-http.com)
2. Consultez la [documentation React](https://react.dev)
3. Consultez la [documentation Lucide Icons](https://lucide.dev)

---

**Version :** 1.0.0  
**Date :** Mai 2024  
**Auteur :** QAYSARIA Development Team
