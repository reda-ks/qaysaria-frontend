# Exemples de Requêtes API - Collection de Tests

Ce document contient des exemples prêts à l'emploi pour tester tous les endpoints de l'API Produits.

---

## 📚 Table des matières
1. [Avec cURL](#avec-curl)
2. [Avec Postman](#avec-postman)
3. [Avec JavaScript/Fetch](#avec-javascriptfetch)
4. [Avec Python](#avec-python)

---

## 💬 Avec cURL

### 1. Récupérer les produits d'une boutique

```bash
curl -X GET \
  "http://localhost:8080/api/products/productsboutiques?boutiqueId=boutique-456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

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
    "imageUrl": "/uploads/products/1715681400_shirt.jpg",
    "boutiqueId": "boutique-456",
    "createdAt": "2024-05-14T10:30:00",
    "updatedAt": "2024-05-14T10:30:00"
  }
]
```

---

### 2. Créer un produit (avec image)

```bash
curl -X POST \
  http://localhost:8080/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=T-shirt blanc" \
  -F "description=T-shirt coton 100% premium" \
  -F "price=99.99" \
  -F "category=Vêtements" \
  -F "quantity=50" \
  -F 'tailles=["S","M","L","XL"]' \
  -F "boutiqueId=boutique-456" \
  -F "image=@/path/to/your/image.jpg"
```

**Note :** Remplacez `/path/to/your/image.jpg` par le chemin réel du fichier.

**Réponse (201 Created) :**
```json
{
  "id": "prod-new-123",
  "name": "T-shirt blanc",
  "description": "T-shirt coton 100% premium",
  "price": 99.99,
  "category": "Vêtements",
  "quantity": 50,
  "tailles": ["S", "M", "L", "XL"],
  "imageUrl": "/uploads/products/1715681400_image.jpg",
  "boutiqueId": "boutique-456",
  "createdAt": "2024-05-14T10:35:00",
  "updatedAt": "2024-05-14T10:35:00"
}
```

---

### 3. Modifier un produit (sans image)

```bash
curl -X PUT \
  http://localhost:8080/api/products/prod-123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=T-shirt blanc édité" \
  -F "description=T-shirt coton 100% réédité" \
  -F "price=89.99" \
  -F "category=Vêtements" \
  -F "quantity=45" \
  -F 'tailles=["M","L","XL"]' \
  -F "boutiqueId=boutique-456"
```

**Réponse (200 OK) :**
```json
{
  "id": "prod-123",
  "name": "T-shirt blanc édité",
  "description": "T-shirt coton 100% réédité",
  "price": 89.99,
  "category": "Vêtements",
  "quantity": 45,
  "tailles": ["M", "L", "XL"],
  "imageUrl": "/uploads/products/1715681400_image.jpg",
  "boutiqueId": "boutique-456",
  "createdAt": "2024-05-14T10:30:00",
  "updatedAt": "2024-05-14T10:40:00"
}
```

---

### 4. Modifier un produit (avec nouvelle image)

```bash
curl -X PUT \
  http://localhost:8080/api/products/prod-123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=T-shirt blanc édité" \
  -F "price=89.99" \
  -F "boutiqueId=boutique-456" \
  -F "image=@/path/to/new/image.jpg"
```

---

### 5. Supprimer un produit

```bash
curl -X DELETE \
  "http://localhost:8080/api/products/prod-123?boutiqueId=boutique-456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Réponse (204 No Content)** - Pas de corps de réponse

---

## 📮 Avec Postman

### Importer la collection

Créez une nouvelle collection Postman avec les requêtes suivantes :

### Request 1: GET - List Products
```
Method: GET
URL: {{base_url}}/products/productsboutiques?boutiqueId=boutique-456
Headers:
  - Authorization: Bearer {{jwt_token}}
  - Content-Type: application/json
```

### Request 2: POST - Create Product
```
Method: POST
URL: {{base_url}}/products
Headers:
  - Authorization: Bearer {{jwt_token}}
  
Body (form-data):
  - name: T-shirt blanc
  - description: T-shirt coton premium
  - price: 99.99
  - category: Vêtements
  - quantity: 50
  - tailles: ["S","M","L","XL"]
  - boutiqueId: boutique-456
  - image: (fichier)
```

### Request 3: PUT - Update Product
```
Method: PUT
URL: {{base_url}}/products/prod-123
Headers:
  - Authorization: Bearer {{jwt_token}}

Body (form-data):
  - name: T-shirt blanc édité
  - price: 89.99
  - boutiqueId: boutique-456
  - image: (optionnel)
```

### Request 4: DELETE - Delete Product
```
Method: DELETE
URL: {{base_url}}/products/prod-123?boutiqueId=boutique-456
Headers:
  - Authorization: Bearer {{jwt_token}}
```

### Variables Postman (Environment)
```json
{
  "base_url": "http://localhost:8080/api",
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "boutique_id": "boutique-456"
}
```

---

## 🌐 Avec JavaScript/Fetch

### 1. Récupérer les produits

```javascript
const fetchProducts = async (boutiqueId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/productsboutiques?boutiqueId=${boutiqueId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) throw new Error('Erreur API');
    const data = await response.json();
    console.log('Produits:', data);
    return data;
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Utilisation
fetchProducts('boutique-456');
```

---

### 2. Créer un produit

```javascript
const createProduct = async (productData, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('quantity', productData.quantity || 0);
    formData.append('tailles', JSON.stringify(productData.tailles || []));
    formData.append('boutiqueId', productData.boutiqueId);
    formData.append('image', imageFile);

    const response = await fetch(
      'http://localhost:8080/api/products',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        },
        body: formData
      }
    );

    if (!response.ok) throw new Error('Erreur création');
    const newProduct = await response.json();
    console.log('Produit créé:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Utilisation
const imageInput = document.querySelector('input[type="file"]');
const imageFile = imageInput.files[0];

await createProduct({
  name: 'T-shirt blanc',
  description: 'T-shirt coton premium',
  price: 99.99,
  category: 'Vêtements',
  quantity: 50,
  tailles: ['M', 'L', 'XL'],
  boutiqueId: 'boutique-456'
}, imageFile);
```

---

### 3. Modifier un produit

```javascript
const updateProduct = async (productId, productData, imageFile = null) => {
  try {
    const formData = new FormData();
    
    if (productData.name) formData.append('name', productData.name);
    if (productData.description) formData.append('description', productData.description);
    if (productData.price) formData.append('price', productData.price);
    if (productData.category) formData.append('category', productData.category);
    if (productData.quantity !== undefined) formData.append('quantity', productData.quantity);
    if (productData.tailles) formData.append('tailles', JSON.stringify(productData.tailles));
    
    formData.append('boutiqueId', productData.boutiqueId);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(
      `http://localhost:8080/api/products/${productId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        },
        body: formData
      }
    );

    if (!response.ok) throw new Error('Erreur modification');
    const updated = await response.json();
    console.log('Produit modifié:', updated);
    return updated;
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Utilisation
await updateProduct('prod-123', {
  name: 'T-shirt blanc édité',
  price: 89.99,
  boutiqueId: 'boutique-456'
}, null);
```

---

### 4. Supprimer un produit

```javascript
const deleteProduct = async (productId, boutiqueId) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${productId}?boutiqueId=${boutiqueId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
        }
      }
    );

    if (!response.ok) throw new Error('Erreur suppression');
    console.log('Produit supprimé');
    return true;
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Utilisation
await deleteProduct('prod-123', 'boutique-456');
```

---

## 🐍 Avec Python

### Installation des dépendances
```bash
pip install requests python-dotenv
```

### 1. Configuration
```python
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

BASE_URL = os.getenv('API_URL', 'http://localhost:8080/api')
JWT_TOKEN = os.getenv('JWT_TOKEN')
BOUTIQUE_ID = os.getenv('BOUTIQUE_ID', 'boutique-456')

headers = {
    'Authorization': f'Bearer {JWT_TOKEN}',
    'Content-Type': 'application/json'
}
```

### 2. Récupérer les produits
```python
def get_products():
    url = f'{BASE_URL}/products/productsboutiques'
    params = {'boutiqueId': BOUTIQUE_ID}
    
    response = requests.get(url, params=params, headers=headers)
    
    if response.status_code == 200:
        products = response.json()
        print(json.dumps(products, indent=2))
        return products
    else:
        print(f'Erreur: {response.status_code}')
        return None

# Utilisation
get_products()
```

### 3. Créer un produit
```python
def create_product(name, description, price, category, quantity, tailles, image_path):
    url = f'{BASE_URL}/products'
    
    files = {
        'image': open(image_path, 'rb')
    }
    
    data = {
        'name': name,
        'description': description,
        'price': price,
        'category': category,
        'quantity': quantity,
        'tailles': json.dumps(tailles),
        'boutiqueId': BOUTIQUE_ID
    }
    
    headers_multipart = {'Authorization': f'Bearer {JWT_TOKEN}'}
    
    response = requests.post(url, files=files, data=data, headers=headers_multipart)
    
    if response.status_code == 201:
        product = response.json()
        print(f'Produit créé: {product}')
        return product
    else:
        print(f'Erreur: {response.status_code} - {response.text}')
        return None

# Utilisation
create_product(
    name='T-shirt blanc',
    description='T-shirt coton premium',
    price=99.99,
    category='Vêtements',
    quantity=50,
    tailles=['S', 'M', 'L', 'XL'],
    image_path='/path/to/image.jpg'
)
```

### 4. Modifier un produit
```python
def update_product(product_id, name=None, price=None, quantity=None, image_path=None):
    url = f'{BASE_URL}/products/{product_id}'
    
    data = {
        'boutiqueId': BOUTIQUE_ID
    }
    
    if name:
        data['name'] = name
    if price:
        data['price'] = price
    if quantity is not None:
        data['quantity'] = quantity
    
    files = {}
    if image_path:
        files['image'] = open(image_path, 'rb')
    
    headers_multipart = {'Authorization': f'Bearer {JWT_TOKEN}'}
    
    response = requests.put(url, files=files, data=data, headers=headers_multipart)
    
    if response.status_code == 200:
        product = response.json()
        print(f'Produit modifié: {product}')
        return product
    else:
        print(f'Erreur: {response.status_code} - {response.text}')
        return None

# Utilisation
update_product(
    product_id='prod-123',
    name='T-shirt blanc édité',
    price=89.99
)
```

### 5. Supprimer un produit
```python
def delete_product(product_id):
    url = f'{BASE_URL}/products/{product_id}'
    params = {'boutiqueId': BOUTIQUE_ID}
    
    response = requests.delete(url, params=params, headers=headers)
    
    if response.status_code in [200, 204]:
        print(f'Produit {product_id} supprimé')
        return True
    else:
        print(f'Erreur: {response.status_code} - {response.text}')
        return False

# Utilisation
delete_product('prod-123')
```

---

## 📝 Fichier .env d'exemple

```env
# Backend
API_URL=http://localhost:8080/api
JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Frontend
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_JWT_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Boutique
BOUTIQUE_ID=boutique-456
```

---

## 🔍 Réponses d'erreur communes

### 400 Bad Request
```json
{
  "error": "Le nom du produit est obligatoire",
  "timestamp": "2024-05-14T10:35:00Z",
  "status": 400
}
```

### 401 Unauthorized
```json
{
  "error": "Token JWT invalide ou expiré",
  "timestamp": "2024-05-14T10:35:00Z",
  "status": 401
}
```

### 403 Forbidden
```json
{
  "error": "Vous n'avez pas accès à ce produit",
  "timestamp": "2024-05-14T10:35:00Z",
  "status": 403
}
```

### 404 Not Found
```json
{
  "error": "Produit non trouvé",
  "timestamp": "2024-05-14T10:35:00Z",
  "status": 404
}
```

### 413 Payload Too Large
```json
{
  "error": "Le fichier image dépasse la taille maximale (5MB)",
  "timestamp": "2024-05-14T10:35:00Z",
  "status": 413
}
```

### 500 Internal Server Error
```json
{
  "error": "Erreur serveur interne",
  "timestamp": "2024-05-14T10:35:00Z",
  "status": 500
}
```

---

## ✅ Checklist de test

- [ ] GET - Récupérer les produits (réponse 200)
- [ ] POST - Créer un produit sans image (réponse 400)
- [ ] POST - Créer un produit avec image (réponse 201)
- [ ] PUT - Modifier sans image (réponse 200)
- [ ] PUT - Modifier avec image (réponse 200)
- [ ] PUT - Modifier produit inexistant (réponse 404)
- [ ] DELETE - Supprimer un produit (réponse 204)
- [ ] DELETE - Supprimer produit inexistant (réponse 404)
- [ ] Vérifier validation prix > 0
- [ ] Vérifier validation nom obligatoire
- [ ] Vérifier taille fichier < 5MB

---

**Version :** 1.0.0  
**Dernière mise à jour :** Mai 2024
