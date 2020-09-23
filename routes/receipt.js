const express = require("express");
const app = express.Router();

const Receipt = require("../models/Receipt");

// @route   POST api/receipt
// @desc    Create receipt
// @access  Private
app.post("/", async (req, res) => {
  const { title, preparation, difficulty } = req.body;

  try {
    const newReceipt = new Receipt({
      title,
      preparation,
      difficulty,
    });

    const receipt = await newReceipt.save();
    res.json(receipt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/receipt
// @desc    Read all receipts
// @access  Private
app.get("/", async (req, res) => {
  try {
    const receipts = await Receipt.find({});
    res.json(receipts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/receipt
// @desc    Read single receipt
// @access  Private
app.get("/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const receipt = await Receipt.find({ _id: req.params.id });
    res.json(receipt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/receipt
// @desc    Update receipt
// @access  Private
app.put("/:id", async (req, res) => {
  const { duration, status, preparation, ingredients } = req.body;

  // Build contact object
  const receiptFields = {};
  if (duration) receiptFields.duration = duration;
  if (status) receiptFields.status = status;
  if (preparation) receiptFields.preparation = preparation;
  if (ingredients) receiptFields.ingredients = ingredients;

  try {
    let receipt = await Receipt.findById(req.params.id);

    if (!receipt) return res.status(404).json({ msg: "Receipt not found" });

    receipt = await Receipt.findByIdAndUpdate(
      req.params.id,
      { $set: receiptFields },
      { new: true }
    );

    res.json(receipt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Delete api/receipt/:id
// @desc    Delete receipt
// @access  Private
app.delete("/:id", async (req, res) => {
  try {
    let receipt = await Receipt.findById(req.params.id);

    if (!receipt) return res.status(404).json({ msg: "Receipt not found" });

    await Receipt.findByIdAndRemove(req.params.id);

    res.json({ msg: "Receipt removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = app;
