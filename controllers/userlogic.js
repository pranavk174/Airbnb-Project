
const User = require("../models/user.js")

const utils = require("../utils/wrapAsync.js")

const authentication = require("../middlewares/authentication.js")
const middleware = require("../middlewares/authentication.js")



exports.registerPage = (req,res)=>{
    res.render("users/signup.ejs")
}

exports.loginPage = (req,res)=>{
    res.render("users/login.ejs")
}

exports.signUp = utils.asyncWrap(async(req,res)=>{

    try{
    const {username , email , password} = req.body;
    const userData = new User({username,email})
   const registeredUser = await User.register(userData,password)     // ye method passport library dwara diya gya hai

   req.login(registeredUser,(err)=>{     // ye inbuilt method hai login ka.. ye use hoga jb user register krlega to vo automatically login v ho jayega... usko register krne k baad login krne ki jrurt nhi prega.... 
    if(err){
        return next(err)
    }
    req.flash("success","Welcome To WanderLust")
    res.redirect("/lists")
   })
   
    }
    catch(err){ 
        req.flash("error" , "User Already exists")
        res.redirect("/user/register")
    }
}
) 
 



exports.login = [ middleware.redirectPath, authentication.auth ,async(req,res)=>{                     // agr authentication success rha tbhi ye flash messsage show hoga
    req.flash("success" , "Login Success ! , welcome to WanderLust.. ")
    const redirectUrl =  res.locals.redirectpath || "/lists"            // ye hamne issliye kiya ki agr originalUrl store nhi hua to hm direct lists page pe redirect krenge
    res.redirect(redirectUrl)
    }
]


exports.logOut = (req,res,next)=>{
    req.logout((err)=>{      // ye middlware passport library ka inbuilt hai jo logout krta hai   and ye session object ka use krta hai internllyy 
        if(err){
          return  next(err)
        }
        req.flash("success","you are successfully Logged Out!")
        res.redirect("/lists")
    })
}

