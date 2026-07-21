const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "You must enter a title"],
            trim: true,
        },

        author: {
            type: String,
            required: [true, "You must enter author"],
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        image: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            default: 0,
        },

        totalCopies: {
            type: Number,
            required: true,
            default: 1,
        },

        availableCopies: {
            type: Number,
            required: true,
            default: 1,
        },

        featured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema);