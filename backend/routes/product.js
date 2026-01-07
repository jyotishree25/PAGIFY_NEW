// routes/product.js
const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

// POST /api/v1/products/add
router.post('/add', addProduct);

// GET /api/v1/products/all
router.get('/all', getProducts);

module.exports = router;
