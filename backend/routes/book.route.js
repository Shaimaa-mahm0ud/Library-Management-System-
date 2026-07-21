const express = require("express");
const router = express.Router();

const bookController = require("../controllers/book.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// ====================== Public Routes ======================

// Get all books
router.get("/", bookController.getAllBooks);
// search 
router.get("/search", bookController.searchbook);
// Get single book by id
router.get("/:id", bookController.getBookById);

// ====================== Admin Routes ======================

// Create new book
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    bookController.createBook
);

// Update all book data
router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    bookController.updateBook
);

// Update specific fields
router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    bookController.partialUpdate
);

// Delete book
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    bookController.deleteBook
);

module.exports = router;