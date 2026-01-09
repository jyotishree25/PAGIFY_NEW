// index.js (Main server file)
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product'); // ✅ already there
const userRoutes = require('./routes/user');
const sellerRoutes = require('./routes/seller');
const sellerProductRoutes = require('./routes/sellerProduct');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));


app.use(express.json());


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.DATABASE_URL);
    console.log('✅ MongoDB connected successfully. Database: user');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sellers', sellerRoutes);
app.use('/api/v1/sellers/products', sellerProductRoutes);





app.get('/', (req, res) => {
  res.send('Backend Service is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server at http://localhost:${PORT}`);
});
