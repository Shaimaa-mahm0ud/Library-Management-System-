const mongoose = require("mongoose");
const borrowingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
      required: [true, "Book ID is required"],
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Borrowing", borrowingSchema);
