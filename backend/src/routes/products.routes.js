const express = require('express')
const router = express.Router()
const { getProducts } = require('../controllers/products.controller')
const { validateQuery } = require('../middlewares/validateQuery')

router.get('/', validateQuery, getProducts)

module.exports = router