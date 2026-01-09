const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

const signToken = (id) => {
  return jwt.sign(
    { id, role: 'seller' },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '1d' }
  );
};

// ✅ SELLER SIGNUP
exports.sellerSignup = async (req, res) => {
  try {
    const existingSeller = await Seller.findOne({ email: req.body.email });

    if (existingSeller) {
      return res.status(400).json({
        status: 'fail',
        message: 'Seller already exists. Please login.',
      });
    }

    const seller = await Seller.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Signup successful. Please login.',
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// ✅ SELLER LOGIN
exports.sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email and password required',
    });
  }

  const seller = await Seller.findOne({ email }).select('+password');

  if (!seller || !(await seller.correctPassword(password, seller.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid email or password',
    });
  }

  const token = signToken(seller._id);

  res.status(200).json({
    status: 'success',
    token,
    seller: {
      id: seller._id,
      name: seller.name,
      email: seller.email,
    },
  });
};

// ✅ SELLER PROFILE (PROTECTED)
exports.getSellerMe = async (req, res) => {
  const seller = await Seller.findById(req.user.id).select('-password');

  if (!seller) {
    return res.status(404).json({
      status: 'fail',
      message: 'Seller not found',
    });
  }

  res.status(200).json({
    status: 'success',
    seller,
  });
};
