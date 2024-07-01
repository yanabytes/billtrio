const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  jsonResponse: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Indexing createdAt field for faster queries
  },
});

const ReceiptModel = mongoose.model('Receipt', receiptSchema);

module.exports = ReceiptModel;
