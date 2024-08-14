const newReview = require("../models/reviews");
const Reviews = newReview.Review;
const utils = require("../utils/wrapAsync");
const listing = require("../models/listing");
const Schema = listing.lists;
const validation = require("../validation/validationlogic.js");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

exports.getReviewPage = async (req, res) => {
  const data = await Schema.findById(req.params.id);

  res.render("listings/review.ejs", { data });
};

exports.addReview = [
  authentication.isLoggedIn,
  validation.validateReview,
  async (req, res) => {
    const listing = await Schema.findById(req.params.id);
    let newReview = new Reviews(req.body);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
     await listing.save();
    await newReview.save();
    req.flash("success", "new Review Added! ");
    res.redirect(`/listings/${listing._id}`);
  },
];

exports.deleteReview = [
  authentication.isLoggedIn,
  authorization.isReviewAuthor,
  utils.asyncWrap(async (req, res) => {
    let { id, reviewId } = req.params;
    const rvw = await Schema.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    }); // iss code ka mtlb ye hua ki "review" array se jo v reviewid match karega usko pull krke delete kr denge , isss operato ka yahi kaam hai...
    const data = await Reviews.findByIdAndDelete(reviewId);

    if (rvw && data) {
      req.flash("success", "Review Deleted!");

      res.redirect(`/listings/${id}`);
    } else {
        req.flash("error", "Review Not Deleted");
        res.redirect(`/listings/${id}`);
    }
  }),
];
