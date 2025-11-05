const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true, trim: true },
  shopName: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  contact: { type: String, trim: true },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
