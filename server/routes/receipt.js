const express = require('express');
const ReceiptModel = require('../models/Receipt');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const receipt = await ReceiptModel.findOne().sort({ _id: -1 }).exec();
    if (!receipt) {
      return res.status(404).json({ error: 'Receipt not found' });
    }

    const { jsonResponse, total_num_items, total_cost, payment } = receipt;
    console.log('Fetched receipt data from MongoDB:', {
      items: jsonResponse.items,
      total_num_items,
      total_cost,
      payment
    });

    res.json({
      items: jsonResponse.items,
      total_num_items,
      total_cost,
      payment,
      change: jsonResponse.change
    });
  } catch (error) {
    console.error('Error fetching receipt data:', error);
    res.status(500).json({ error: 'Error fetching receipt data' });
  }
});

module.exports = router;
