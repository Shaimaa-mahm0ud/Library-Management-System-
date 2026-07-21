const Book = require("../models/book.model");

// =================== Create Book ===================
const createBook = async (req, res, next) => {
    try {
        const {
            title,
            author,
            description,
            image,
            category,
            price,
            rating,
            totalCopies,
            availableCopies,
            available,
            featured,
        } = req.body;

        const newBook = await Book.create({
            title,
            author,
            description,
            image,
            category,
            price,
            rating,
            totalCopies,
            availableCopies: availableCopies !== undefined ? availableCopies : (totalCopies || 1),
            available: available !== undefined ? available : true,
            featured,
        });

        res.status(201).json(newBook);
    } catch (err) {
        next(err);
    }
};

// =================== Get All Books ===================
const getAllBooks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const { keyword, category, available, sort } = req.query;

        let filter = {};

        // Search
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
            ];
        }

        // Category Filter
        if (category) {
            filter.category = category;
        }

        // Availability Filter
        if (available === "true") {
            filter.available = true;
        }

        // Sorting
        let sortOption = { createdAt: -1 };
        if (sort === "rating") sortOption = { rating: -1 };
        if (sort === "title") sortOption = { title: 1 };

        const totalBooks = await Book.countDocuments(filter);

        const books = await Book.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            page,
            limit,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            books,
        });
    } catch (err) {
        next(err);
    }
};

// =================== Get Book By Id ===================
const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

// =================== Search Books ===================
const searchBook = async (req, res, next) => {
    try {
        const keyword = req.query.keyword || "";
        const books = await Book.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
            ],
        });
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

// =================== Update Book ===================
const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            updatedBook,
        });
    } catch (err) {
        next(err);
    }
};

// =================== Partial Update Book ===================
const partialUpdate = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            updatedBook,
        });
    } catch (err) {
        next(err);
    }
};

// =================== Delete Book ===================
const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createBook,
    createbook: createBook,
    getAllBooks,
    getallbooks: getAllBooks,
    getBookById,
    getbyid: getBookById,
    searchBook,
    searchbook: searchBook,
    updateBook,
    updatebook: updateBook,
    partialUpdate,
    partialupdate: partialUpdate,
    deleteBook,
    deletebook: deleteBook,
};
