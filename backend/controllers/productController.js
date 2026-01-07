// controllers/productController.js
const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      id,
      title,
      price,
      stock,
      status,
      description,
      author,
      category,
      publisher,
      isbn,
      publicationDate,
      language,
      pageCount,
      dimensions,
      coverType
    } = req.body;

    // Basic validation
    if (!title || price === undefined || stock === undefined) {
      return res.status(400).json({ message: 'Title, price, and stock are required.' });
    }

    // Check duplicate ID (optional safeguard)
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product ID already exists.' });
    }

    // Create new product
    const newProduct = new Product({
      id,
      title,
      price,
      stock,
      status,
      description,
      author,
      category,
      publisher,
      isbn,
      publicationDate,
      language,
      pageCount,
      dimensions,
      coverType
    });

    await newProduct.save();
    res.status(201).json({ message: '✅ Product added successfully', product: newProduct });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: '❌ Server error while adding product' });
  }
};

// Optional: Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};
