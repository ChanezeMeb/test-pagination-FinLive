const { findProducts } = require('../services/products.service')

async function getProducts(req, res, next)
{
    try {
        // Etape 1 : Recuperer les parametres depuis l'URL
        const { page, limit, sortBy, order, category, minPrice, maxPrice } = req.query

        // Etape 2 : Appeler le service avec les bons types
        const result = await findProducts({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 12,
            sortBy,
            order,
            category,
            minPrice,
            maxPrice,
        })

        // Etape 3 : Renvoyer la reponse formatee
        res.json({
            success: true,
            data: result.products,
            pagination: result.pagination
        })
    } catch (err) {
        next(err) // passer l'erreur a errorHandler
    }
}

module.exports = { getProducts }