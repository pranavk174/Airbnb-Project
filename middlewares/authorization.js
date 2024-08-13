
const ListingSchema = require("../models/listing")
const Lists = ListingSchema.lists
const {Review} = require("../models/reviews")


exports.isOwner = async (req,res,next)=>{
    const data = await Lists.findById(req.params.id)
    if( !data.owner._id.equals(res.locals.currentUser._id)){

        req.flash("error",`you dont have permission to do this Operation`)
        return res.redirect(`/${data.id}`)
    }
    next()
}

exports.isReviewAuthor = async (req,res,next)=>{
    const {reviewId , id}  = req.params
    const rData = await Review.findById(reviewId)

    if( !rData.author.equals(res.locals.currentUser._id)){
        req.flash("error",`you are not the author to delete`)
        return res.redirect(`/${id}`)
    }
    next()
}


