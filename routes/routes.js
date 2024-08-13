const express = require("express")

const  T_route = express.Router({mergeParams : true});    // hame jo problems aati thi routes ki ordering vo isse solve ho jayegi
const listLogic = require("../controllers/listinglogic.js")
const validation = require("../validation/validationlogic.js")

const reviewroute = require("./reviewroute.js")
const userroute = require("./userrouter.js")
const listroute = require("./listingroute.js")
const passport = require("passport")
const LocalStrategy = require("passport-local");
const User = require("../models/user.js")
const flash = require("connect-flash")
const Session = require("express-session")
const mongoStore = require("connect-mongo")


const store = mongoStore.create({
    mongoUrl : process.env.URL ,
    crypto :{
        secret: process.env.SECRET_CODE ,
    },
    touchAfter : 24 *3600    // iss variable ka mtlb ye hua ki hm jb facebook pe login hote haiand fir agr hmne tab close v kr diya to v hmaara session related details store rhte hai usme hme baar baar login nhi krna prta hai , to sesion k and kch change v na ho to wo save rahti hai to by default ye hota hai ki agr session ke andr change na v kre to refresh hone pe update hota rhta hai, but hm chahte hai ki refresh hone pe baar baar update na ho to uske liye ye use krte hai jisme hm ek specific time limit lga dete hai taaki vo srf uss time k khtm hone k baad update ho 
})

store.on("error",()=>{
    console.log("error in  mongo session",err)
}) 

sessionObject = { 
    store,     // isse e hoga ki ab session ki information database me store hone wali hai
    secret:process.env.SECRET_CODE,
    resave:false,
    saveUninitialized:true,
    cookie :{         // object ka mtlb hai hamne cookie ki expiry date fix kr di ki vo itne din baad expire ho jaayega
        expires :Date.now() + 7 /* days */  * 24 /* hours */ * 60 /* minutes */ *60 /* seconds */ *1000 /* miliseconds */ ,
        maxAge : 7 /* days */  * 24 /* hours */ * 60 /* minutes */ *60 /* seconds */ *1000 /* miliseconds */  ,
        httpOnly :true  // isko ham security purpose ke liye sav krte hai.
    }
}
T_route.use(Session(sessionObject))
T_route.use(flash())

// for sercurity authentication and authorization
T_route.use(passport.initialize())       
T_route.use(passport.session())
passport.use(new LocalStrategy(User.authenticate())) ;  // iska matlb ye hai ki  koi v naya user aayega to usko yaha se authenticate ho ke jaaana prega...
passport.serializeUser(User.serializeUser());      // user jb login hota h to uske related info ko session me store krne ka kaam krta hai ye
passport.deserializeUser(User.deserializeUser());    // user jb logout hota hai to usko related info ko session se remove krne ka kaam krta hai ye



 

T_route.use(listLogic.flashMsg)    // isko hmesha routes list k pahle hi rkhna wrna run nhi hoga properly

// user section
T_route.use("/user",userroute)

// listing setion
T_route.use("/",listroute)

// review section
T_route.use("/reviews",reviewroute)  


// error handelling
T_route.all("*",validation.ngnix)
T_route.use(validation.errorHandle);
T_route.use(validation.errorHandler)



       
    
  


   

module.exports = T_route;