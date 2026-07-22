const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.get("/", bookController.getAllBooks);
router.get("/search", bookController.searchbook);
router.get("/:id", bookController.getBookById);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    bookController.createBook
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    bookController.updateBook
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    bookController.partialUpdate
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    bookController.deleteBook
);

module.exports = router;