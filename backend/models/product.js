// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Archived', 'Out of Stock'],
    default: 'Active',
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  category: {
    type: String,
  },
  publisher: {
    type: String,
  },
  isbn: {
    type: String,
  },
  publicationDate: {
    type: Date,
  },
  language: {
    type: String,
  },
  pageCount: {
    type: Number,
  },
  dimensions: {
    type: String,
  },
  coverType: {
    type: String,
    enum: ['Paperback', 'Hardcover'],
    default: 'Paperback',
  },
  blocked: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
