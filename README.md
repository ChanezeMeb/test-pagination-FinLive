# FinLive Shop — Test technique

Application e-commerce avec pagination côté serveur, filtres et tris.

## Stack technique

- **Frontend** : React + Vite
- **Backend** : Node.js + Express
- **Base de données** : MongoDB (driver natif, sans Mongoose)
- **Docker** : 3 services (frontend, backend, mongo)

## Lancer le projet

\`\`\`bash
docker compose up --build
\`\`\`

| Service  | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3001 |

## API

### Endpoint principal

\`\`\`
GET /api/products
\`\`\`

### Paramètres disponibles

| Paramètre | Type | Description | Exemple |
|---|---|---|---|
| page | entier | Numéro de page (défaut: 1) | page=2 |
| limit | entier | Produits par page, max 100 (défaut: 12) | limit=6 |
| sortBy | string | Champ de tri : price, name, createdAt | sortBy=price |
| order | string | Sens du tri : asc ou desc | order=asc |
| category | string | shoes, clothing, accessories, bags | category=shoes |
| minPrice | nombre | Prix minimum | minPrice=50 |
| maxPrice | nombre | Prix maximum | maxPrice=200 |

### Exemples de requêtes

\`\`\`bash
# Tous les produits
GET /api/products

# Page 2 avec 6 produits par page
GET /api/products?page=2&limit=6

# Chaussures triées par prix croissant
GET /api/products?category=shoes&sortBy=price&order=asc

# Fourchette de prix
GET /api/products?minPrice=50&maxPrice=200

# Vérifier que le serveur tourne
GET /health
\`\`\`

### Format de réponse

\`\`\`json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 5000,
    "page": 1,
    "limit": 12,
    "totalPages": 417,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
\`\`\`

## Architecture

**Backend**
- `src/config/db.js` → connexion MongoDB native
- `src/routes/products.routes.js` → définition des routes
- `src/controllers/products.controller.js` → logique HTTP
- `src/services/products.service.js` → logique métier + requêtes MongoDB
- `src/middlewares/validateQuery.js` → validation des paramètres
- `src/middlewares/errorHandler.js` → gestion d'erreurs globale
- `src/utils/buildFilter.js` → construction des filtres MongoDB

**Frontend**
- `src/api/products.api.js` → appels fetch centralisés
- `src/hooks/useProducts.js` → logique état + fetch
- `src/components/ProductCard.jsx` → carte produit
- `src/components/ProductGrid.jsx` → grille de produits
- `src/components/Pagination.jsx` → navigation entre pages

**Base de données**
- `mongo-seed/seed.js` → 5000 produits générés au démarrage

