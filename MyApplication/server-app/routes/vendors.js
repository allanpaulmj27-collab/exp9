const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendor');
const auth = require('../middleware/auth');

// Create vendor (protected - only logged in users can add)
router.post('/addVendor', auth, async (req, res) => {
  try {
    const { vendorName, shopName, category, contact, rating } = req.body;
    const v = new Vendor({ vendorName, shopName, category, contact, rating });
    await v.save();
    res.status(201).json({ status: 'Vendor added', vendor: v });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Error adding vendor' });
  }
});

// Get all vendors (public)
router.get('/getVendors', async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete vendor (protected)
router.post('/deleteVendor', auth, async (req, res) => {
  try {
    const { id } = req.body;
    await Vendor.findByIdAndDelete(id);
    res.json({ status: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ status: 'Error deleting vendor' });
  }
});

module.exports = router;
