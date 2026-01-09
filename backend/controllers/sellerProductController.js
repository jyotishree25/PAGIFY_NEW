const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');

exports.sellerAddProduct = async (req, res) => {
  try {
    const { title, description, price, offer } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    // ✅ Upload cover image
    let coverImageUrl = "";
    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(
        `data:${req.files.coverImage[0].mimetype};base64,${req.files.coverImage[0].buffer.toString("base64")}`,
        { folder: "pagify/books" }
      );
      coverImageUrl = result.secure_url;
    }

    // ✅ Upload PDF
    let bookPdfUrl = "";
    if (req.files?.bookPdf) {
      const result = await cloudinary.uploader.upload(
        `data:${req.files.bookPdf[0].mimetype};base64,${req.files.bookPdf[0].buffer.toString("base64")}`,
        {
          folder: "pagify/pdfs",
          resource_type: "raw",
        }
      );
      bookPdfUrl = result.secure_url;
    }

    const product = await Product.create({
         id: `SL-${Date.now()}`, 
      title,
      description,
      price,
      offer,
      status: "Pending Approval",
      stock: 1,

      coverImage: coverImageUrl,
      bookPdf: bookPdfUrl,

      createdBy: req.user.id,
      createdByModel: "Seller",
    });

    res.status(201).json({
      message: "Book added successfully",
      product,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// GET seller's own products
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({
      createdBy: req.user.id,
      createdByModel: "Seller",
    }).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch seller products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// UPDATE seller product
exports.updateSellerProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // 🔐 seller can update only own product
    const product = await Product.findOne({
      _id: productId,
      createdBy: req.user.id,
      createdByModel: "Seller",
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    /* =========================
       TEXT FIELDS UPDATE
    ========================= */
    const updatableFields = [
      "title",
      "description",
      "price",
      "offer",
      "stock",
      "status",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    /* =========================
       ✅ IMAGE: UPDATE ONLY IF NEW FILE UPLOADED
    ========================= */
    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(
        `data:${req.files.coverImage[0].mimetype};base64,${req.files.coverImage[0].buffer.toString("base64")}`,
        { folder: "pagify/books" }
      );
      product.coverImage = result.secure_url;
    }
    // ❌ ELSE: do NOTHING → old image stays

    /* =========================
       ✅ PDF: UPDATE ONLY IF NEW FILE UPLOADED
    ========================= */
    if (req.files?.bookPdf) {
      const result = await cloudinary.uploader.upload(
        `data:${req.files.bookPdf[0].mimetype};base64,${req.files.bookPdf[0].buffer.toString("base64")}`,
        {
          folder: "pagify/pdfs",
          resource_type: "raw",
        }
      );
      product.bookPdf = result.secure_url;
    }
    // ❌ ELSE: keep old PDF

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("Seller update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE seller product
exports.deleteSellerProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const deleted = await Product.findOneAndDelete({
      _id: productId,
      createdBy: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted permanently" });
  } catch (err) {
    console.error("Seller delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
