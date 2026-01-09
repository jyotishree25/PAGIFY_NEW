// routes/product.js
const express = require('express');
const { addProduct, getProducts, getPublicProducts, updateProduct, getProductById,   // ✅ ADD
  deleteProduct, } = require('../controllers/productController');
const router = express.Router();

// POST /api/v1/products/add
router.post('/add', addProduct);

// GET /api/v1/products/all
router.get('/all', getProducts);
router.get('/public', getPublicProducts);

router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);
router.get("/:productId", getProductById);


module.exports = router;
