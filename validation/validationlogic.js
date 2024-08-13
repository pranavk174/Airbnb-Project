const Error = require("../utils/errors")

const {listingSchema, reviewSchema } = require("../models/SchemaValidation")
const utils = require("../utils/wrapAsync")

exports.validateListings = (req,res,next)=>{
    const {error} = listingSchema.validate(req.body)       // this is for server side form validation
   
    if(error){
        console.log(error)
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new Error(400 , errMsg)
    }
    else{
       
        next()
    }
}


exports.validateReview =utils.asyncWrap (async(req,res,next)=>{
    const {error} = reviewSchema.validate(req.body)       // this is for server side form validation
    if(error){
        console.log(error)
        let errMsg = error.details.map((el)=> el.message).join(",")
        return next(new Error(400, errMsg)); 
    }
    else{
        next()
    }
})


// error handler middleware
exports.errorHandler = (err, req, res, next) => {
    let {
        status = 401, message = "data not found"
    } = err; //  ye defauly value iss liye set krte hai qki if hmaare middleware ne aisa error generate kiya jiska status code undefined hai to uss case me ye default value ka status code  & message use hoga
    res.status(status).render("ngnix/error.ejs", {
        err
    })
    // res.status(status).send(message)
}

const validationErr = (err) => { // this api is for
    console.log("This was a validation Error please follow Rules");
    console.dir(err);
    return err;
}

exports.errorHandle = (err, req, res, next) => {
    console.log(err.name)
    if (err.name === "ValidationError") {
        err = validationErr(err)
    }
    next(err)
}


exports.ngnix = (req, res, next) => {

    next(new Error(404, "Page Not Found"))
    // res.render("ngnix/notFounds.ejs")
}
