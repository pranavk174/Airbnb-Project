const express = require("express")
const  R_route = express.Router({mergeParams : true});    // hame jo problems aati thi routes ki ordering vo isse solve ho jayegi
const reviewlogic = require("../controllers/reviewLogic");


R_route.get("/reviewpage/:id", reviewlogic.getReviewPage);
R_route.post("/addreview/:id",reviewlogic.addReview)
R_route.delete("/:id/review/:reviewId", reviewlogic.deleteReview)






module.exports = R_route
