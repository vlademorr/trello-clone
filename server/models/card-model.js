const mongoose = require("mongoose");

const { Schema } = mongoose;

const cardModel = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  header: String,
  description: String,
  boardId: Schema.Types.ObjectId,
  tags: [
    {
      _id: false,
      name: { type: String, lowercase: true, trim: true, required: true },
      checked: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("Card", cardModel);
