const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts } = require('../controllers/productController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

router.get('/all', getAllProducts);
router.post('/add', authMiddleware, adminMiddleware, createProduct);

module.exports = router;