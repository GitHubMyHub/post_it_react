const mongoose = require("mongoose");

const ReceiptSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("receipt", ReceiptSchema);
