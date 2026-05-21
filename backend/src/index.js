const { connectDB } = require('./config/db')
const productsRouter = require('./routes/products.routes')
const errorHandler = require('./middlewares/errorHandler')
const express  = require("express");
const cors     = require("cors");
require("dotenv").config();

const app       = express();
const PORT      = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

async function start() {
  await connectDB()

  app.use(cors());
  app.use(express.json());

  app.use('/api/products', productsRouter)

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
  })

  app.use(errorHandler)

  app.listen(PORT, () => console.log("Serveur demarre sur http://localhost:" + PORT));
}

start().catch((err) => {
  console.error("Erreur de connexion MongoDB :", err.message);
  process.exit(1);
});
