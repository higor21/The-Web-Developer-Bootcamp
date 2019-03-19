var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    passport    = require("passport")
    
// =============================================================================
// Auth Routes

router.get("/register", function(req, res) {
    res.render("register",{page: 'register'})
})

router.get("/registerAdmin", function(req, res) {
    res.render("registerAdmin")
})

router.post("/register", function(req, res) {
    var user = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    var msg = "Successfully Signed Up! Nice to meet you " + req.body.username;
    
    if(req.query.admin == 'true'){
        if(req.body.admin_code == 'ad_code_7496'){
            user.isAdmin = true;
            msg += ". LOGGED IN AS ADMINISTER"
        }else
            msg += ". LOGGED IN AS COMMOM USER"
    }
    
    User.register(user, req.body.password, function(err, user){
        if(err){
            return res.render("register", {error: err.message})
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", msg)
            res.redirect("/campgrounds")
        })
    })
})

router.get("/login", function(req, res) {
    res.render("login", {page: 'login'})
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){})

router.get("/logout", function(req, res) {
    req.logout()
    req.flash("success", "You were successfully logged out!")
    res.redirect("/login")
})

// =============================================================================

module.exports = router