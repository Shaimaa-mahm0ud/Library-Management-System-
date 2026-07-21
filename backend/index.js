const express = require("express")
require("dotenv").config();
const app = express()
const cors= require('cors')
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}))
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URI)
.then(()=>{console.log("connect DB")})
.catch((err)=>console.log(err))

const bookroute= require("./routes/book.route")
const authRoutes = require("./routes/auth.route");
const borrowingRoutes = require("./routes/borrowing.route");
const {errhandler} = require("./middlewares/errhandler.middleware")

app.use(express.json())
app.use("/books",bookroute)
app.use("/auth", authRoutes);
app.use("/borrowings", borrowingRoutes);
app.use(errhandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server running on ${PORT}`)
})
