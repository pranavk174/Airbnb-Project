const express = require("express")
const  U_route = express.Router({mergeParams : true});    // hame jo problems aati thi routes ki ordering vo isse solve ho jayegi
const userlogic = require("../controllers/userlogic")


U_route.get("/register",userlogic.registerPage)
U_route.post("/signup",userlogic.signUp)
U_route.get("/loginpage",userlogic.loginPage)
U_route.post("/login", userlogic.login)
U_route.get("/logout",userlogic.logOut )

module.exports = U_route 