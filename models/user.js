


const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email : {
        type : String ,
        required :true
    }
   
});

UserSchema.plugin(passportLocalMongoose);      // isko hamne issliye plugin kiya qki ye automatically (hashing , hash password , salting ) sb add kr deta hai khud se isss schema me and iss wajh se hame manually define nhi krna pra isko


module.exports = mongoose.model('User', UserSchema);

