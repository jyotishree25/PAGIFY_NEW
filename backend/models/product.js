const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    id: {
  type: String,
  required: true,
},

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    offer: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ['Active', 'Draft', 'Archived', 'Pending Approval'],
      default: 'Active',
    },

    stock: {
      type: Number,
      default: 0,
    },

   
    author: String,
    category: String,
    publisher: String,
    isbn: String,
    publicationDate: Date,
    language: String,
    pageCount: Number,
    dimensions: String,
    coverType: {
      type: String,
      enum: ['Paperback', 'Hardcover'],
    },

    
    coverImage: {
      type: String, // URL
    },

    bookPdf: {
      type: String, // URL
    },

    // =====================
    // OWNERSHIP & CONTROL
    // =====================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdByModel',

      // required ONLY if seller created it
      required: function () {
        return this.createdByModel === 'Seller';
      },
    },

    createdByModel: {
      type: String,
      enum: ['Admin', 'Seller'],
      default: 'Admin', // IMPORTANT default
      required: true,
    },

    blocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Product ||
  mongoose.model('Product', productSchema);

