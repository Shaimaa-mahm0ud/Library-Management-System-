const User = require("../models/user.model");
const Borrowing = require("../models/borrowing.model");
const Book = require("../models/book.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const register = async (req, res, next) => {
    try {
        const { name, email, password,role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let userRole = role || 'user';
        if (email === 'admin@gmail.com') {
            userRole = 'admin';
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        const userResponse = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt,
};

res.status(201).json({
    message: "User created successfully",
    user: userResponse,
});

    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        next(err);
    }
};

const profile = async (req, res, next) => {
    try {
        const userId = req.user._id
        const totalBorrowed = await Borrowing.countDocuments({ user: userId });
        const activeCount = await Borrowing.countDocuments({ 
            user: userId, 
            status: "borrowed" 
        })
        const returnedCount = await Borrowing.countDocuments({ 
            user: userId, 
            status: "returned" 
        })
        const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
        
        const overdueCount = await Borrowing.countDocuments({
            user: userId,
            status: "borrowed",
            borrowedAt: { $lt: fourteenDaysAgo }
        })
        const recentBorrowings = await Borrowing.find({ user: userId })
            .populate("book", "title author coverImage image")
            .sort({ borrowedAt: -1 })
            .limit(3);

        const recentActivity = recentBorrowings.map(item => {
            const isOverdue = item.status === "borrowed" && item.borrowedAt < fourteenDaysAgo;
            
            return {
                _id: item._id,
                title: item.book ? item.book.title : "Unknown Book",
                author: item.book ? item.book.author : "Unknown Author",
                cover: item.book ? (item.book.coverImage || item.book.image) : "",
                borrowedAt: item.borrowedAt,
                status: isOverdue ? "Overdue" : (item.status === "borrowed" ? "Active" : "Returned")
            };
        });
        res.status(200).json({
            user: req.user,
            stats: {
                borrowed: totalBorrowed,
                active: activeCount,
                returned: returnedCount,
                overdue: overdueCount
            },
            recentActivity
        })

    } catch (err) {
        next(err);
    }
};

const updateprofile = async(req, res, next) =>{
    try{
        const {name , email} = req.body
        const currentuser = await User.findById(req.user._id)
        if(!currentuser){
            return res.status(404).json({msg :"User not found"})
        }
        if (email && email !== currentuser.email) {
            const existinguser = await User.findOne({ email });
            if (existinguser) {
                return res.status(400).json({
                    message: "Email already exists",
                })
            }
        }
        currentuser.name = name || currentuser.name
        currentuser.email = email || currentuser.email

        await currentuser.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: currentuser._id,
                name: currentuser.name,
                email: currentuser.email,
                role: currentuser.role,
            },
        })


    }catch(err){
       next(err)
    }
};

module.exports = { register,login,profile,updateprofile}
