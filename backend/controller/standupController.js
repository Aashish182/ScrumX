const mongoose = require("mongoose");

const COLLECTION_NAME = "standups";

const getStandups = async (req, res) => {
  try {
    const db = mongoose.connection;
    const collection = db.collection(COLLECTION_NAME);

    const standups = await collection
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    res.json({
      success: true,
      data: standups
    });

  } catch (err) {
    console.error("Standup Fetch Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { getStandups };