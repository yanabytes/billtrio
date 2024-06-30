const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  filename: String,
  imagePath: String,
  jsonResponse: mongoose.Schema.Types.Mixed,
});

const ReceiptModel = mongoose.model('Receipt', receiptSchema);

module.exports = ReceiptModel;
