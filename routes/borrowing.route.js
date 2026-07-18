const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const borrowingController = require("../controllers/borrowing.controller");
router.use(authMiddleware);

router.post("/borrow", borrowingController.borrowBook);
router.post("/return", borrowingController.returnBook);
router.get("/myBorrows", borrowingController.getMyBorrowedBooks);
router.get("/myHistory", borrowingController.getMyBorrowingHistory);

module.exports = router;
