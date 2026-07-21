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
       const page = parseInt(req.query.page) || 1
       const limit = parseInt(req.query.limit) || 5
       const skip = ( page - 1 ) * limit
       const totalbooks = await book.countDocuments()
       const books = await book.find()
                     .sort({createdAt : -1})
                     .skip(skip)
                     .limit(limit)
       res.status(200).json({
            page,
            limit,
            totalbooks,
            totalPages: Math.ceil(totalbooks / limit),
            books
       })

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

const deletebook = async(req,res,next)=>{
   try{
   const myid = req.params.id 
   const deletedbook = await book.findByIdAndDelete(myid)
    if (!deletedbook) {
            return res.status(404).json({ msg: "Book not found" });
    }
   res.status(200).json({msg:"book deleted"})
   }catch(err){
     next(err)
    }
}

const updatebook = async(req,res,next)=>{
    try{
    const myid = req.params.id
    const {title,author,price,category,available}= req.body
    const updatedbook = await book.findByIdAndUpdate(myid, {title,author,price,category,available},{new:true})
    if (!updatedbook) {
            return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json({msg:"book updated"},updatedbook)
    }catch(err){
     next(err)
    }
}

const partialupdate = async(req,res,next)=>{
     try{
    const myid = req.params.id
    const updates = req.body
    const updatedbook = await book.findByIdAndUpdate(myid, updates,{new:true})
    if (!updatedbook) {
            return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json({msg:"book updated"},updatedbook)
    }catch(err){
     next(err)
    }
}


const searchbook = async(req,res,next)=>{
   try{
    const keyword = req.query.keyword
    const books = await book.find({
        $or : [
            {
                title :{
                    $regex:keyword,
                    $options: "i"
                }
            },
            {
                author:{
                    $regex:keyword,
                    $options: "i"
                }
            },
            {
                category:{
                    $regex:keyword,
                    $options: "i"
                }
            }
        ]
    })
       res.status(200).json(books)
    }catch(err){
     next(err)
    }
}



module.exports = {createbook,getallbooks,getbyid,searchbook,updatebook,deletebook,partialupdate}
