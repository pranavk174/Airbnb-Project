const mongoose = require("mongoose");
const Schema = mongoose.Schema
const {Review} = require("./reviews.js")

// const lists = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     image : {
//         type:String,
//         default : "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
//         set : (v) => v=== "" ? "default link" : v
//     },
//     price :{
//         type:Number,
//         required:true
//     },
//     location :{
//         type:String,
//         required:true
//     },
//     country : {
//         type:String,
//         required:true
//     }
    
// })


// const lists = new mongoose.Schema({
//     title: {
//         type: String,
//         required:true,
//     },
//     description: String,
//     image : {
//       type :  String,
//         default : "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//         set : (v) => v=== "" ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v
//     },
//     price : Number, 
//     location : String ,
//     country :  String,
        
// })


const lists = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      url: String,
      filename : String
      
    },
    price: Number,
    location: String,
    country: String,
    reviews: [ {
      type:Schema.Types.ObjectId,
      ref :"Review",
    }],
    owner :{
    type : Schema.Types.ObjectId,
    ref : "User"
    },
    geometry : {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'       jo data aayega usko issme me sotore krenge in the form of points
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  });


  lists.post("findOneAndDelete",async(listing)=>{      // ye code issliye hai ki agr hamne koi listing delete kri to usse related jitne v reviews honge vo saaare delete hojayenge
   if(listing){
    await Review.deleteMany({ _id : {$in : listing.reviews}})
   }
  })

exports.lists = mongoose.model("lists", lists);