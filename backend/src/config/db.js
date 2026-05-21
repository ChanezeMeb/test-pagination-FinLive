const { MongoClient } = require('mongodb')

let db

async function connectDB()
{
    const client = new MongoClient(process.env.MONGO_URI)
    await client.connect()
    db = client.db('shop')
    console.log('DB connectee')

    // Creer les index pour accelerer les requetes
    const collection = db.collection('porducts')
    await collection.createIndex({ category: 1 })
    await collection.createIndex({ price: 1 })
    await collection.createIndex({ createdAt: -1 })
    console.log('Index crees')
}

function getDB()
{
    if (!db)
        throw new Error('DB non initialisee')
    return db
}

module.exports = { connectDB, getDB }