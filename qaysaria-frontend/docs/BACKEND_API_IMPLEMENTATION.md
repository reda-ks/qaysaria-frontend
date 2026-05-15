# Guide d'implémentation Backend - API Produits

## 📋 Vue d'ensemble

Ce document détaille comment implémenter les endpoints API nécessaires pour le composant `BoutiqueUtilisateur`.

---

## 🏗️ Structure des Endpoints

### Base URL
```
http://localhost:8080/api
```

### Endpoints requis
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/products/productsboutiques` | Récupère les produits d'une boutique |
| POST | `/products` | Crée un nouveau produit |
| PUT | `/products/{id}` | Modifie un produit |
| DELETE | `/products/{id}` | Supprime un produit |

---

## 💾 Modèle de données (Spring Boot / JPA)

### Entity Product
```java
package com.qaysaria.backend.product.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "products", indexes = {
  @Index(name = "idx_boutique_id", columnList = "boutique_id"),
  @Index(name = "idx_category", columnList = "category")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false, length = 100)
  private String name;

  @Column(length = 500)
  private String description;

  @Column(nullable = false)
  private Double price;

  @Column(nullable = false, length = 50)
  private String category;

  @Column(nullable = false)
  private Integer quantity = 0;

  @ElementCollection(fetch = FetchType.EAGER)
  @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id"))
  @Column(name = "size")
  private List<String> tailles; // XS, S, M, L, XL, XXL

  @Column(nullable = false)
  private String imageUrl;

  @Column(nullable = false)
  private String boutiqueId;

  @Column(updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  private LocalDateTime updatedAt = LocalDateTime.now();

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }
}
```

### DTO - ProductDTO (Request/Response)
```java
package com.qaysaria.backend.product.dto;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
  private String id;
  private String name;
  private String description;
  private Double price;
  private String category;
  private Integer quantity;
  private List<String> tailles;
  private String imageUrl;
  private String boutiqueId;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {
  private String name;
  private String description;
  private Double price;
  private String category;
  private Integer quantity;
  private List<String> tailles;
  private String boutiqueId;
  private MultipartFile image;
}
```

---

## 🔌 Repository Interface

```java
package com.qaysaria.backend.product.repository;

import com.qaysaria.backend.product.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

  // Récupère tous les produits d'une boutique
  List<Product> findByBoutiqueId(String boutiqueId);

  // Récupère les produits par boutique ET catégorie
  List<Product> findByBoutiqueIdAndCategory(String boutiqueId, String category);

  // Vérifie si un produit appartient à une boutique
  boolean existsByIdAndBoutiqueId(String id, String boutiqueId);

  Optional<Product> findByIdAndBoutiqueId(String id, String boutiqueId);
}
```

---

## 📦 Service Layer

```java
package com.qaysaria.backend.product.service;

import com.qaysaria.backend.product.dto.ProductDTO;
import com.qaysaria.backend.product.dto.ProductCreateRequest;
import com.qaysaria.backend.product.model.Product;
import com.qaysaria.backend.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Value("${app.upload.dir:uploads/products}")
  private String uploadDir;

  @Value("${app.upload.max-size:5242880}") // 5MB par défaut
  private long maxFileSize;

  // 1. RÉCUPÉRER LES PRODUITS D'UNE BOUTIQUE
  public List<ProductDTO> getProductsByBoutique(String boutiqueId) {
    List<Product> products = productRepository.findByBoutiqueId(boutiqueId);
    return products.stream()
      .map(this::convertToDTO)
      .collect(Collectors.toList());
  }

  // 2. CRÉER UN PRODUIT
  public ProductDTO createProduct(ProductCreateRequest request) throws IOException {
    // Validation
    if (request.getName() == null || request.getName().trim().isEmpty()) {
      throw new IllegalArgumentException("Le nom du produit est obligatoire");
    }
    if (request.getPrice() == null || request.getPrice() <= 0) {
      throw new IllegalArgumentException("Le prix doit être supérieur à 0");
    }
    if (request.getImage() == null || request.getImage().isEmpty()) {
      throw new IllegalArgumentException("L'image est obligatoire");
    }

    // Valider la taille du fichier
    if (request.getImage().getSize() > maxFileSize) {
      throw new IllegalArgumentException("Le fichier image dépasse la taille maximale");
    }

    // Sauvegarder l'image
    String imageUrl = saveImage(request.getImage());

    // Créer le produit
    Product product = new Product();
    product.setName(request.getName());
    product.setDescription(request.getDescription());
    product.setPrice(request.getPrice());
    product.setCategory(request.getCategory() != null ? request.getCategory() : "Autre");
    product.setQuantity(request.getQuantity() != null ? request.getQuantity() : 0);
    product.setTailles(request.getTailles() != null ? request.getTailles() : List.of());
    product.setImageUrl(imageUrl);
    product.setBoutiqueId(request.getBoutiqueId());

    Product saved = productRepository.save(product);
    return convertToDTO(saved);
  }

  // 3. MODIFIER UN PRODUIT
  public ProductDTO updateProduct(String id, ProductCreateRequest request, String boutiqueId) throws IOException {
    // Vérifier que le produit appartient à la boutique
    Optional<Product> existing = productRepository.findByIdAndBoutiqueId(id, boutiqueId);
    if (existing.isEmpty()) {
      throw new IllegalArgumentException("Produit non trouvé ou accès refusé");
    }

    Product product = existing.get();

    // Mettre à jour les champs
    if (request.getName() != null) {
      product.setName(request.getName());
    }
    if (request.getDescription() != null) {
      product.setDescription(request.getDescription());
    }
    if (request.getPrice() != null && request.getPrice() > 0) {
      product.setPrice(request.getPrice());
    }
    if (request.getCategory() != null) {
      product.setCategory(request.getCategory());
    }
    if (request.getQuantity() != null) {
      product.setQuantity(request.getQuantity());
    }
    if (request.getTailles() != null) {
      product.setTailles(request.getTailles());
    }

    // Si une nouvelle image est fournie
    if (request.getImage() != null && !request.getImage().isEmpty()) {
      // Supprimer l'ancienne image
      deleteImage(product.getImageUrl());
      // Sauvegarder la nouvelle
      String newImageUrl = saveImage(request.getImage());
      product.setImageUrl(newImageUrl);
    }

    Product updated = productRepository.save(product);
    return convertToDTO(updated);
  }

  // 4. SUPPRIMER UN PRODUIT
  public void deleteProduct(String id, String boutiqueId) {
    Optional<Product> product = productRepository.findByIdAndBoutiqueId(id, boutiqueId);
    if (product.isEmpty()) {
      throw new IllegalArgumentException("Produit non trouvé ou accès refusé");
    }

    // Supprimer l'image
    deleteImage(product.get().getImageUrl());

    // Supprimer le produit
    productRepository.deleteById(id);
  }

  // ── UTILITAIRES ──

  // Sauvegarder une image
  private String saveImage(MultipartFile file) throws IOException {
    // Générer un nom unique
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    
    // Créer le répertoire s'il n'existe pas
    File uploadDirFile = new File(uploadDir);
    if (!uploadDirFile.exists()) {
      uploadDirFile.mkdirs();
    }

    // Sauvegarder le fichier
    File destFile = new File(uploadDir + "/" + fileName);
    file.transferTo(destFile);

    // Retourner l'URL (à adapter selon votre infrastructure)
    return "/uploads/products/" + fileName;
    // OU si vous utilisez S3/Cloud Storage:
    // return uploadToS3(file); // À implémenter
  }

  // Supprimer une image
  private void deleteImage(String imageUrl) {
    try {
      // Si c'est une URL locale
      if (imageUrl != null && imageUrl.startsWith("/uploads/")) {
        String filePath = imageUrl.substring(1); // Enlever le /
        File file = new File(filePath);
        if (file.exists()) {
          file.delete();
        }
      }
      // Si c'est S3/Cloud Storage, implémenter la suppression
    } catch (Exception e) {
      e.printStackTrace(); // Log l'erreur mais ne bloquez pas l'opération
    }
  }

  // Convertir Product → ProductDTO
  private ProductDTO convertToDTO(Product product) {
    ProductDTO dto = new ProductDTO();
    dto.setId(product.getId());
    dto.setName(product.getName());
    dto.setDescription(product.getDescription());
    dto.setPrice(product.getPrice());
    dto.setCategory(product.getCategory());
    dto.setQuantity(product.getQuantity());
    dto.setTailles(product.getTailles());
    dto.setImageUrl(product.getImageUrl());
    dto.setBoutiqueId(product.getBoutiqueId());
    dto.setCreatedAt(product.getCreatedAt());
    dto.setUpdatedAt(product.getUpdatedAt());
    return dto;
  }
}
```

---

## 🛣️ Controller Layer

```java
package com.qaysaria.backend.product.controller;

import com.qaysaria.backend.product.dto.ProductDTO;
import com.qaysaria.backend.product.dto.ProductCreateRequest;
import com.qaysaria.backend.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

  @Autowired
  private ProductService productService;

  // 1. GET /api/products/productsboutiques?boutiqueId=X
  @GetMapping("/productsboutiques")
  public ResponseEntity<List<ProductDTO>> getProductsByBoutique(
    @RequestParam String boutiqueId
  ) {
    List<ProductDTO> products = productService.getProductsByBoutique(boutiqueId);
    return ResponseEntity.ok(products);
  }

  // 2. POST /api/products
  @PostMapping(consumes = "multipart/form-data")
  public ResponseEntity<ProductDTO> createProduct(
    @RequestParam String name,
    @RequestParam(required = false) String description,
    @RequestParam Double price,
    @RequestParam(defaultValue = "Autre") String category,
    @RequestParam(required = false) Integer quantity,
    @RequestParam(required = false) String tailles, // JSON string ["M","L","XL"]
    @RequestParam String boutiqueId,
    @RequestPart MultipartFile image
  ) {
    try {
      ProductCreateRequest request = new ProductCreateRequest();
      request.setName(name);
      request.setDescription(description);
      request.setPrice(price);
      request.setCategory(category);
      request.setQuantity(quantity);
      
      // Parser le JSON des tailles
      if (tailles != null && !tailles.isEmpty()) {
        request.setTailles(parseJsonArray(tailles));
      }
      
      request.setBoutiqueId(boutiqueId);
      request.setImage(image);

      ProductDTO created = productService.createProduct(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(created);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  // 3. PUT /api/products/{id}
  @PutMapping(value = "/{id}", consumes = "multipart/form-data")
  public ResponseEntity<ProductDTO> updateProduct(
    @PathVariable String id,
    @RequestParam(required = false) String name,
    @RequestParam(required = false) String description,
    @RequestParam(required = false) Double price,
    @RequestParam(required = false) String category,
    @RequestParam(required = false) Integer quantity,
    @RequestParam(required = false) String tailles,
    @RequestParam String boutiqueId,
    @RequestPart(required = false) MultipartFile image
  ) {
    try {
      ProductCreateRequest request = new ProductCreateRequest();
      request.setName(name);
      request.setDescription(description);
      request.setPrice(price);
      request.setCategory(category);
      request.setQuantity(quantity);
      
      if (tailles != null && !tailles.isEmpty()) {
        request.setTailles(parseJsonArray(tailles));
      }
      
      request.setImage(image);

      ProductDTO updated = productService.updateProduct(id, request, boutiqueId);
      return ResponseEntity.ok(updated);
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  // 4. DELETE /api/products/{id}
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteProduct(
    @PathVariable String id,
    @RequestParam String boutiqueId
  ) {
    try {
      productService.deleteProduct(id, boutiqueId);
      return ResponseEntity.noContent().build();
    } catch (Exception e) {
      return ResponseEntity.badRequest().build();
    }
  }

  // ── UTILITAIRE ──
  private List<String> parseJsonArray(String json) {
    // Exemple: "[\"M\",\"L\",\"XL\"]"
    // Utilisez une librarie JSON comme Jackson
    ObjectMapper mapper = new ObjectMapper();
    try {
      return mapper.readValue(json, new TypeReference<List<String>>() {});
    } catch (Exception e) {
      return List.of();
    }
  }
}
```

---

## ⚙️ Configuration Spring Boot

### application.properties
```properties
# Upload
app.upload.dir=uploads/products
app.upload.max-size=5242880

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Multipart
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=10MB
```

### CORS Configuration
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins("http://localhost:3000", "http://localhost:3001")
      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
      .allowedHeaders("*")
      .allowCredentials(true)
      .maxAge(3600);
  }
}
```

---

## 🔐 Sécurité

### Points importants

1. **Authentification :** Utilisez JWT ou OAuth2
2. **Autorisation :** Vérifiez que `boutiqueId` appartient à l'utilisateur actuel
3. **Validation :** Validez tous les inputs
4. **Injection SQL :** Utilisez les prepared statements (JPA fait cela)
5. **File Upload :** Validez le type et la taille des fichiers

### Exemple d'une classe Security
```java
@Component
@Aspect
public class ProductSecurityAspect {

  @Before("@annotation(ProductOwnerOnly)")
  public void checkProductOwnership(JoinPoint joinPoint) {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    String currentUserId = auth.getName();
    
    // Vérifier que l'utilisateur n'accède que à ses propres produits
    // Implémentation dépend de votre système d'authentification
  }
}
```

---

## 🧪 Tests Unitaires

```java
@SpringBootTest
class ProductServiceTest {

  @Autowired
  private ProductService productService;

  @MockBean
  private ProductRepository productRepository;

  @Test
  void testGetProductsByBoutique() {
    String boutiqueId = "boutique-123";
    List<Product> mockProducts = List.of(
      new Product(/*...*/),
      new Product(/*...*/)
    );

    when(productRepository.findByBoutiqueId(boutiqueId))
      .thenReturn(mockProducts);

    List<ProductDTO> result = productService.getProductsByBoutique(boutiqueId);

    assertEquals(2, result.size());
    verify(productRepository, times(1)).findByBoutiqueId(boutiqueId);
  }

  @Test
  void testCreateProductWithInvalidPrice() {
    ProductCreateRequest request = new ProductCreateRequest();
    request.setPrice(-50.0); // Invalid

    assertThrows(IllegalArgumentException.class, 
      () -> productService.createProduct(request));
  }
}
```

---

## 📋 Checklist de déploiement

- [ ] Endpoints implémentés et testés
- [ ] Validation des données côté serveur
- [ ] Authentification et autorisation activées
- [ ] CORS configuré correctement
- [ ] Upload de fichiers sécurisé
- [ ] Limite de taille des fichiers définie
- [ ] Logs d'erreurs implémentés
- [ ] Base de données migrée
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Documentation API (Swagger/OpenAPI)
- [ ] Performance optimisée (indexes, lazy loading)

---

## 🔗 Ressources

- [Spring Boot File Upload](https://spring.io/guides/gs/uploading-files/)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Security](https://spring.io/projects/spring-security)
- [Lombok](https://projectlombok.org/)

---

**Version :** 1.0.0  
**Date :** Mai 2024
