var mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    date_of_birth: Date,
    gender: {type: String, default: '1'},
    status: {type: String, default: '1'},
    description: String,
    phone_number: String,
    facebook_link: String,
    linkedin_link: String,
    github_link: String,
    password: String,
    email: String,
    isAdmin: {type: Boolean, default: false}
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)