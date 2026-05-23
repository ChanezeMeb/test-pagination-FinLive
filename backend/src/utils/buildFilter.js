// Cette fonction sert de traducteur

function buildFilter({ category, minPrice, maxPrice })
{
    const filter = {}

    if (category)
        filter.category = category;

    if(minPrice !== undefined || maxPrice !== undefined)
    {
        filter.price = {};
        //gte = greater than or equal
        //lte = less than or equal
        if (minPrice !== undefined)
            filter.price.$gte = parseFloat(minPrice);
        if (maxPrice !== undefined)
            filter.price.$lte = parseFloat(maxPrice);
    }

    return filter;
}

module.exports = { buildFilter }