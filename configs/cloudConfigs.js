const cloudinary = require("cloudinary").v2       // iska matlb ki cloudinary ke version2 ko require kr rhe hai
const {CloudinaryStorage } =require("multer-storage-cloudinary")      


cloudinary.config({       // ye hamne configiration ke liye daalaa hai taaki ham cloudinary storage k sath configuration setup kr le
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

const storage = new CloudinaryStorage({    // storage define kri hai hamne cloudinary me
    cloudinary: cloudinary ,
    params:{
        folder : "wanderlust_DEV",     // isii folder me data save hoga  
        allowed_Format : async(req,file)=>[ 'png' ,'jpg' , 'jpeg']   // uss file me ye formats ki fil save krwa skte hai
      
    },
})



module.exports = {
    cloudinary,storage
}