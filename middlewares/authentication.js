
const passport = require("passport")

module.exports.isLoggedIn = (req,res , next)=>{
if(!req.isAuthenticated()){      // ye chek krega ki user logged in hai ya nahi.. ye passport ka method hai authentication ka
   req.session.redirectUrl = req.originalUrl           // hmne original path ko session ke new variable me store krwa liya.  
    req.flash("error","you must be logged in")
    return res.redirect("/user/loginpage")
}
next();
}

exports.redirectPath =(req,res,next)=>{
    if(req.session.redirectUrl){

        res.locals.redirectpath = req.session.redirectUrl              // isko hmne issliye kiya qki login hone ke baad passport  session ko reset kr deta hai.. to issliye usko res.locals me store krwa liya taaki delet hone k baad v vo isme saved rhe..
    }
    next()
}

exports.auth =  passport.authenticate("local",      // hamne strategy daali hai "local"
    { failureFlash : true  ,
        failureRedirect : "/user/loginpage" ,      // ye code authentication ke liye hai... agr login fail hota hai kisi wajah se to direct login page pe redirect krega... 
                         // authentication fail hone pe flash messsage me show hoga fail hone ka reason    
    })

 