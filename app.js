const express = require("express")
const app = express()
const mongoose = require("mongoose");

// ek '.env' file hm use krenge jisme ham credentials store krte hai and isko ham kisi se share ni krenge isme credentials ko key value format (KEY=value) me store krte hai and isme koi spce ya special caharecter nhi hota 



if(process.env.NODE_ENV != "production"){    // ye condition denee ka matlb ye hua ki ham nhi chahte ki production level pe hmaara credential kisi ko dikhe to issliye... qki '.env' file me secret data save hote hai and kbhi v hm agr project ko github pe deploye kr rhe hai to '.env wali file ko nhi krenge deploy
require("dotenv").config()
}

 

const path = require("path") 
 
const engine = require("ejs-mate"); 
app.engine("ejs" , engine)
const route = require("./routes/routes")

 
const methodOverride = require("method-override")
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"/public"))) 
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "views")))




app.set("view engine", "ejs")

  



const connect = async() =>{
    const uri = process.env.URL
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

app.listen(4000 , ()=>{
    console.log("server started")
})




app.use("/listings",route)



