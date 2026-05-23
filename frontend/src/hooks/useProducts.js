import { useState, useEffect, useCallback } from 'react'
import { fetchProducts } from '../api/products.api'

// Les filtres par defaut au demarrage
const INITIAL_FILTERS = {
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    order: 'desc',
    category: '',
}

export function useProducts() {
    // Les donnees
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState(null)

    // L'etat de l'interface
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Les filtres actifs
    const [filters, setFilters] = useState(INITIAL_FILTERS)

    // La fonction qui appelle l'API
    const load = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await fetchProducts(filters)
            setProducts(result.data)
            setPagination(result.pagination)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
            // finnaly s'execute toujours
            // meme si try plante -> loading repasse a false
        }
    }, [filters])

    // Quand filters change -> on recharge
    useEffect(() => {
        load()
    }, [load])

    // Mettre a jour un filtre
    function updateFilter(key, value) {
        setFilters(prev => ({
            ...prev,
            [key]: value,
            page: key === 'page' ? value : 1
        }))
    }

    // Tout reinitialiser
    function resetFilters() {
        setFilters(INITIAL_FILTERS)
    }

    return { products, pagination, loading, error, filters, updateFilter, resetFilters }
}