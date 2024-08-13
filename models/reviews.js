const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const Review = new Schema({
    comment : {
        type: String
    },
    rating :{
        type: Number,
        min:1, 
        max:5
    },
    createdAt :{
        type:Date ,
        default:Date.now()
    } ,
    author :{
        type:Schema.Types.ObjectId,
        ref :"User"
    }
})

exports.Review = mongoose.model("Review", Review)