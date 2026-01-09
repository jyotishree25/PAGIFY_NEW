const express = require('express');
const sellerController = require('../controllers/sellerController');
const sellerAuth = require('../middleware/sellerAuth');

const router = express.Router();

router.post('/signup', sellerController.sellerSignup);
router.post('/login', sellerController.sellerLogin);
router.get('/me', sellerAuth, sellerController.getSellerMe);

module.exports = router;
