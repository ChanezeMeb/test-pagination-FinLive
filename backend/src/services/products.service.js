const { getDB } = require('../config/db')
const { buildFilter } = require('../utils/buildFilter')

async function findProducts({ page=1, limit=12, sortBy='createdAt', order='desc', category, minPrice, maxPrice})
{
    const db = getDB()
    const collection = db.collection('products')

    const filter = buildFilter({ category, minPrice, maxPrice })
    const skip = (page - 1) * limit
    const sortOrder = order === 'asc' ? 1 : -1

    // Promise.all lance les deux en meme temps
    const [products, total] = await Promise.all([
        collection
            .find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray(),
        collection.countDocuments(filter)
    ])

    return {
        products,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
            hasPrevPage: page > 1
        }
    }
}

module.exports = { findProducts }