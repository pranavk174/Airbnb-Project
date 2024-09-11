const express = require("express")
const  L_route = express.Router({mergeParams : true});    // hame jo problems aati thi routes ki ordering vo isse solve ho jayegi
const listLogic = require("../controllers/listinglogic.js")



L_route.get("/",listLogic.home)
L_route.get("/lists",listLogic.listings)
L_route.route("/new").get(listLogic.createNew).post(listLogic.insertNew)       // ye L_route.route ek middleware hai jo same path wale get/post routes ko ek sath likhne ka option deta hai jisse code jyada bulky na lge


L_route.route("/edit/:id").get(listLogic.getEditPage).patch(listLogic.editPage)
L_route.get("/show", listLogic.searchData )
L_route.get("/:id",listLogic.showdata  )
L_route.delete("/delete/:id",listLogic.deleteData);


module.exports = L_route;


 