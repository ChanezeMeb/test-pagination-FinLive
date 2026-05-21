const VALID_SORT_FIELDS = ['price', 'name', 'createdAt']
const VALID_ORDERS = ['asc', 'desc']

function validateQuery(req, res, next) 
{
    const errors = []
    const { page, limit, sortBy, order } = req.query
    // Recupere les 4 params de l'URL

    // Verification 1 : page
    if (page !== undefined)
    {
        const p = parseInt(page)
        if (isNaN(p) || p < 1)
            errors.push('page doit etre un entier positif')
    }
    
    // Verification 2 : limit
    if (limit !== undefined)
    {
        const l = parseInt(limit)
        if (isNaN(l) || l < 1 || l > 100)
            errors.push('limit doit etre entre 1 et 100')
    }
    
    // Verification 3 : sortBy
    if (sortBy && !VALID_SORT_FIELDS.includes(sortBy))
        errors.push('sortBy invalide')
    
    // Verification 4 : order
    if (order && !VALID_ORDERS.includes(order))
        errors.push('order doit etre asc ou desc')

    // S'il y a des erreurs on bloque
    if (errors.length > 0)
        return res.status(400).json({ success: false, errors })

    // Sinon on laisse passer
    next()
}

module.exports = { validateQuery }