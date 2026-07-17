const book = require("../models/book.model")

const createbook = async(req,res,next)=>{
    try{
        const {title,author,price,category,available}=req.body
        const newbook = await book.create({title,author,price,category,available})
        res.status(201).json(newbook)
    }
    catch(err){
        next(err)
    }
}

const getallbooks = async(req,res,next)=>{
    try{
        const allbooks = await book.find()
        res.status(200).json(allbooks)
    }
    catch(err){
        next(err)
    }
}

const getbyid = async(req,res,next)=>{
    try{
        const myid = req.params.id
        const mybook = await book.findById(myid)
        if(!mybook) return res.status(404).json("Book not found")
        res.status(200).json(mybook)
    }
    catch(err){
        next(err)
    }
}
module.exports = {createbook,getallbooks,getbyid}