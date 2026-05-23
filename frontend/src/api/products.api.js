const BASE_URL = '/api'

export async function fetchProducts(params) {
    // Etape 1 - construire les parametres de l'URL
    const searchParams = new URLSearchParams()

    // On parcourt chaque parametre
    // Object.entries transforme un objet en tableau de [cle, valeur]
    // exemple : {page:1, category:'shoes'} -> [['page',1], ['category'], ['shoes']]
    Object.entries(params).forEach(([key, value]) => {
        // On n'ajoute que les valeurs non vides
        if (value !== undefined && value !== '' && value !== null) {
            searchParams.append(key, value)
        }
    })

    // Etape 2 - faire la requete
    const res = await fetch(`${BASE_URL}/products?${searchParams.toString()}`)

    // Etape 3 - gerer les erreurs HTTP
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.errors?.[0] || `Erreur ${res.status}`)
    }

    // Etape 4 - retourner les donnees
    return res.json()
}