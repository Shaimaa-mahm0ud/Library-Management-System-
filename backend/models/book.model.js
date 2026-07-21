const mongoose = require("mongoose")
const bookshcema=new mongoose.Schema({
    title:{type:String,required:[true, "You must enter a title"]},
    author:{type:String,required:[true, "You must enter author"]},
    price:{type:Number,required:[true, "You must enter price"]},
    category:{type:String},
    available:{type:Boolean, default:true}
}, {timestamps:true})
module.exports=mongoose.model("Books",bookshcema)
