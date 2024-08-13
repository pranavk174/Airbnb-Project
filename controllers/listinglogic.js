const listing = require("../models/listing")
const Schema = listing.lists
const utils = require("../utils/wrapAsync")
const validation = require("../validation/validationlogic.js")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const multer = require("multer") // ye form data ko parse krne k liye jisme ham file type data ko parse krte hai
const {
    storage
} = require("../configs/cloudConfigs.js")
const upload = multer({
    storage
}) // iska mtlb ki ye storage naam ke folder me store hoga jo cloudinary me hai
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding'); // ye api use ho rh ahai taaki ham koi location daale to uska coordinates save ho jaaye map me


mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxGeoCoding({
    accessToken: mapToken
}); // isme hm geocoding ka credntials define krte hai



exports.home = (req, res) => {
    res.render("listings/home.ejs")
}



exports.listings = utils.asyncWrap(async (req, res) => {
    const dataList = await Schema.find();

    res.render("listings/index.ejs", {
        dataList
    })

})


exports.showdata = [authentication.isLoggedIn, utils.asyncWrap(async (req, res, next) => {


    const data = await Schema.findById(req.params.id)
        .populate({
            path: "reviews", // hmne nested populate method ka use kiya hai.... taaki review ke sath uske author ka naam v show kre
            populate: {
                path: "author",
            }
        })
        .populate("owner");
    if (!data) {
        req.flash("error", "The requested Data does not exist!")
        res.redirect("/")
    }
    res.render("listings/show.ejs", {
        data
    })
})]


exports.createNew = [authentication.isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
}]

exports.flashMsg = (req, res, next) => {
    res.locals.messages = req.flash("success") //  "res.locals" iske help se hm koi v variable use kr skte hai ejs me khi v
    res.locals.error = req.flash("error")
    res.locals.currentUser = req.user
    next()
}

exports.insertNew = [authentication.isLoggedIn, upload.single("image"), validation.validateListings, utils.asyncWrap(async (req, res, next) => {

    let response = await geocodingClient.forwardGeocode({ // ye code ka matlb ye banta hai ki ham query me location ka naam denge and vo return me coordinates wapas krega
            query: req.body.location,
            limit: 1 // ye limit issliye hai ki boht jagah ka e hota hai ki multiple coordinates hote hai to issliye hamne limit lga diya ki srf 1 hi coordinate response me aayega
        })
        .send()


    let url = req.file.path;
    let filename = req.file.filename // form daata ke liye hai jisme image file k sath deal kr rhe hai
    const data = new Schema(req.body)
    data.geometry = response.body.features[0].geometry
    data.owner = req.user._id // ye hmne isliye kiya jb v new listing create hogi to usko create krne wale ka naamv v isme save ho jayega
    data.image = {
        url,
        filename
    } // image ki url and image ka naam save hoga
    const done = await data.save();
    req.flash("success", "new Listings created!")
    res.redirect("/lists")

})]

exports.getEditPage = [authentication.isLoggedIn, authorization.isOwner, utils.asyncWrap(async (req, res, next) => {
    const data = await Schema.findById(req.params.id)


    if (!data) {
        req.flash("error", "The requested Data can't be edited because ,it does not exist !")
        res.redirect("/")
    }
    let dataimage = data.image.url
    dataimage = dataimage.replace("/upload", "/upload/h_200,w_300/")


    res.render("listings/edit.ejs", {
        data,
        dataimage
    });
})]

exports.editPage = [authentication.isLoggedIn, authorization.isOwner, upload.single("image"), validation.validateListings, utils.asyncWrap(async (req, res) => {
    let response = await geocodingClient.forwardGeocode({ // ye code ka matlb ye banta hai ki ham query me location ka naam denge and vo return me coordinates wapas krega
        query: req.body.location,
        limit: 1 // ye limit issliye hai ki boht jagah ka e hota hai ki multiple coordinates hote hai to issliye hamne limit lga diya ki srf 1 hi coordinate response me aayega
    })
    .send()

   
    const data = await Schema.findById(req.params.id)
    const url = req.file.path
    const filename = req.file.filename
    data.title = req.body.title;
    data.description = req.body.description;
    data.price = req.body.price;
    data.image = {
        url,
        filename
    }
    data.geometry = response.body.features[0].geometry
    data.location = req.body.location;
    data.country = req.body.country;
    await data.save()

    req.flash("success", "Editing Successfull  ")
    res.redirect(`/${data.id}`)
})]

exports.deleteData = [authentication.isLoggedIn, authorization.isOwner, utils.asyncWrap(async (req, res) => {
    await Schema.findByIdAndDelete(req.params.id)
    req.flash("success", "Data Deleted ")
    res.redirect("/lists")
})]