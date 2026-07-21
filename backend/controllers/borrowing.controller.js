const Borrowing = require("../models/borrowing.model");
const Book = require("../models/book.model");

const borrowBook = async (req, res, next) => {
  try {
    const {bookId} = req.body;
    const userId = req.user._id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({msg: "Book not found"})
    }
    if (!book.available) {
      return res.status(400).json({msg: "Book is not available for borrowing"})
    }
    const existingBorrowing = await Borrowing.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    })
    if (existingBorrowing) {
      return res.status(400).json({msg: "You have already borrowed this book"})
    }
    const borrowing = await Borrowing.create({
      user: userId,
      book: bookId
    })
    book.available = false
    await book.save()
    res.status(201).json({msg: "Book borrowed successfully",borrowing:{
        _id: borrowing._id,
        book: book.title,
        borrowedAt: borrowing.borrowedAt,
        status: borrowing.status}
    })
  } catch (err) {
    next(err)
  }
}

const returnBook = async (req, res, next) => {
  try {
    const {bookId} = req.body;
    const userId = req.user._id;
    const borrowing = await Borrowing.findOne({
      user: userId,
      book: bookId,
      status: "borrowed"
    })
    if (!borrowing) {
      return res.status(400).json({msg:"This book is not borrowed by you"})
    }
    borrowing.returnedAt = new Date()
    borrowing.status = "returned"
    await borrowing.save()
    const book = await Book.findById(bookId)
    if (book) {
      book.available = true
      await book.save()
    }
    res.status(200).json({msg: "Book returned successfully",borrowing:{
        _id: borrowing._id,
        book: book ? book.title : "Unknown",
        borrowedAt: borrowing.borrowedAt,
        returnedAt: borrowing.returnedAt,
        status: borrowing.status
      }
    })
  } catch (err) {
    next(err);
  }
};

const getMyBorrowedBooks = async (req, res, next) => {
  try {
    const userId = req.user._id
    const borrowings = await Borrowing.find({
      user: userId,
      status: "borrowed"
    }).populate("book", "title author category price")
    res.status(200).json({results: borrowings.length,borrowings})
  } catch (err) {
    next(err)
  }
}

const getMyBorrowingHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const borrowings = await Borrowing.find({user: userId}).populate("book", "title author category").sort({ borrowedAt: -1 })
    res.status(200).json({results: borrowings.length,borrowings})
   }catch (err) {
    next(err)
  }
}
module.exports = {borrowBook,returnBook,getMyBorrowedBooks,getMyBorrowingHistory}
