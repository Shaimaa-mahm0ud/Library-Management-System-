const express = require("express")
const app = express()
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/library")
.then(()=>{console.log("connect DB")})
.catch((err)=>console.log(err))

const bookroute= require("./routes/book.route")
const {errhandler} = require("./middlewares/errhandler.middleware")

app.use(express.json())
app.use("/books",bookroute)
app.use(errhandler)

app.listen(5000,"127.0.0.1",()=>{
    console.log("server listen")
})