const mongoose = require("mongoose");

const { Schema } = mongoose;

const boardMobel = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  backgroundColor: String,
  boardStatus: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("Board", boardMobel);
