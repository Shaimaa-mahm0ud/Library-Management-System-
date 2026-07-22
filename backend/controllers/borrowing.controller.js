const Borrowing = require("../models/borrowing.model");
const Book = require("../models/book.model");

// ================= Borrow Book =================
const borrowBook = async (req, res, next) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        msg: "Book not found"
      });
    }

    if (book.availableCopies <= 0) {
  return res.status(400).json({
    msg: "Book is not available for borrowing"
  });
}

    const existingBorrowing = await Borrowing.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    });

    if (existingBorrowing) {
      return res.status(400).json({
        msg: "You have already borrowed this book"
      });
    }

    // due date after 14 days
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrowing = await Borrowing.create({
      user: userId,
      book: bookId,
      dueDate
    });

    book.availableCopies -= 1;
await book.save();

    res.status(201).json({
      msg: "Book borrowed successfully",
      borrowing: {
        _id: borrowing._id,
        book: book.title,
        borrowedAt: borrowing.borrowedAt,
        dueDate: borrowing.dueDate,
        status: borrowing.status
      }
    });

  } catch (err) {
    next(err);
  }
};

// ================= Return Book =================
const returnBook = async (req, res, next) => {
  try {

    const { bookId } = req.body;

    const userId = req.user._id;

    const borrowing = await Borrowing.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    });

    if (!borrowing) {
      return res.status(400).json({
        msg: "This book is not borrowed by you"
      });
    }

    borrowing.returnedAt = new Date();
    borrowing.status = "returned";

    await borrowing.save();

    const book = await Book.findById(bookId);

    if (book) {
  book.availableCopies += 1;
  await book.save();
}

    res.status(200).json({
      msg: "Book returned successfully",
      borrowing: {
        _id: borrowing._id,
        book: book ? book.title : "Unknown",
        borrowedAt: borrowing.borrowedAt,
        dueDate: borrowing.dueDate,
        returnedAt: borrowing.returnedAt,
        status: borrowing.status
      }
    });

  } catch (err) {
    next(err);
  }
};

// ================= Current Borrowed =================
const getMyBorrowedBooks = async (req, res, next) => {

  try {

    const userId = req.user._id;

    const borrowings = await Borrowing.find({
      user: userId,
      status: "borrowed"
    })
      .populate("book");

    res.status(200).json({
      results: borrowings.length,
      borrowings
    });

  } catch (err) {
    next(err);
  }

};

// ================= Borrow History =================
const getMyBorrowingHistory = async (req, res, next) => {

  try {

    const userId = req.user._id;

    const borrowings = await Borrowing.find({
      user: userId
    })
      .populate("book")
      .sort({
        borrowedAt: -1
      });

    const today = new Date();

    const books = borrowings

      // لو الكتاب اتحذف
      .filter(item => item.book)

      .map(item => {

        let status = item.status;

        if (
          status === "borrowed" &&
          item.dueDate &&
          item.dueDate < today
        ) {
          status = "late";
        }

        return {

          id: item.book._id,

          borrowingId: item._id,

          title: item.book.title,

          author: item.book.author,

          cover: item.book.image,

          borrowDate: item.borrowedAt,

          dueDate: item.dueDate,

          returnDate: item.returnedAt,

          status

        };

      });

    res.status(200).json({
      books
    });

  } catch (err) {
    next(err);
  }

};

module.exports = {
  borrowBook,
  returnBook,
  getMyBorrowedBooks,
  getMyBorrowingHistory
};