const axios = require('axios');
const base64Img = require('base64-img');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ReceiptModel = require('../models/Receipt');

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('Error: OPENAI_API_KEY is not defined.');
  process.exit(1);
}

const encodeImage = (imagePath) => {
  return base64Img.base64Sync(imagePath);
};

const handleFileUpload = async (req, res) => {
  const imagePath = req.file.path;
  const base64Image = encodeImage(imagePath);
  const base64ImageContent = base64Image.split(',')[1];

   headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };


  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      data: {
        "model": "gpt-4o",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Scan the receipt and return a raw JSON array text not encapsulated by text formatting as the result. The JSON must have these fields: items{name, price, quantity}, total_num_items, total_cost, payment: number or null, change: number or null"
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:image/jpeg;base64,${base64ImageContent}`
                }
              }
            ]
          }
        ],
        "max_tokens": 300
    }
    });

    const messageContent = response.data.choices[0].message.content;

    // Save the processed data to MongoDB
    console.log(messageContent);
    const processedData = JSON.parse(`{ "items": ${messageContent}}`);
    const newReceipt = new ReceiptModel({
      filename: req.file.originalname,
      imagePath: req.file.path,
      jsonResponse: processedData
    });
    await newReceipt.save();

    res.json({ message: 'Image processed and data saved to MongoDB successfully!', data: processedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the image' });
  }
};

module.exports = { handleFileUpload };
