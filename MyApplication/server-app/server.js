require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendors');
const productRoutes = require('./routes/Products');

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marketplace';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connect error:', err.message));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', vendorRoutes);
app.use('/api', productRoutes);

// Root
app.get('/', (req, res) => res.send('Multi-Vendor Marketplace API running'));

// Start
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
