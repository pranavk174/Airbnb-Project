const express = require("express")
const app = express()
const mongoose = require("mongoose")

const {Schema}  = mongoose;

const dataSchema = require("../models/listing.js")
const d_Schema = dataSchema.lists

const initData = require("./data.js")

const connect = async() =>{
    const uri = "mongodb+srv://pranavbharadwaj174:Pranav%40!2@cluster0.lhizwoh.mongodb.net/WanderLust"
    const yes = await mongoose.connect(uri)
    try{
        if (yes){
            console.log("connected to Database")
        }
    }
    catch(err){
        console.log("not connected",err)
    }
}
connect()




const listData = initData.data



const insertmany = async () => {
    await d_Schema.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj, 
        owner : "66af12d27f2681bb0f008332"
    }))
   const done = await d_Schema.insertMany(initData.data)
   if(done){
    console.log("inserted successfully")
   }
}

insertmany()           
