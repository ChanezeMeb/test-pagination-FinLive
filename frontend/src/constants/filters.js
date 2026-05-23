// Les categories disponibles
// value = ce qu'on envoie a l'API
// label = ce que l'utilisateur voit
export const CATEGORIES = [
    { value: '', label: 'Toutes les categories' },
    { value: 'shoes', label: 'Chaussures' },
    { value: 'clothing', label: 'Vetement' },
    { value: 'accessories', label: 'Accessoires' },
    { value: 'bags', label: 'Sacs' },
]

// Les options de tri
// value = ce qu'on envoie a l'API (sortBy-order)
// label = ce que l'utilisateur voit
export const SORT_OPTIONS = [
    { value: 'createdAt-desc', label: 'Plus recents' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix decroissant' },
    { value: 'name-asc', label: 'Nom A->Z' },
]

// Les limites de produits par page
export const LIMITS = [6, 12, 24, 48]