const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Vendor = require('../models/vendor');
const auth = require('../middleware/auth');

// Add product (protected)
router.post('/addProduct', auth, async (req, res) => {
  try {
    const { productName, description, price, category, vendorId, available } = req.body;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(400).json({ error: 'Vendor not found' });

    const p = new Product({ productName, description, price, category, vendor: vendorId, available });
    await p.save();
    res.status(201).json({ status: 'Product added', product: p });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Error adding product' });
  }
});

// Get all products (public)
router.get('/getProducts', async (req, res) => {
  try {
    const products = await Product.find().populate('vendor').sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product (protected)
router.post('/deleteProduct', auth, async (req, res) => {
  try {
    const { id } = req.body;
    await Product.findByIdAndDelete(id);
    res.json({ status: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ status: 'Error deleting product' });
  }
});

module.exports = router;
