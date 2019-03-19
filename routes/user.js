var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    Campground = require("../models/campground"),
    passport    = require("passport")
    
// =============================================================================
// User Routes

router.get("/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err)
            res.send("User was not found or don't exist anymore")
        else{
            Campground.find({author: {id: foundUser._id, username: foundUser.username}}, function(err, foundCamps){
                if(!err){
                    res.render("user/show", {user: foundUser, camps: foundCamps})
                }
            })
        }
    })
})

router.get("/:id/edit", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err)
            res.send("User was not found or don't exist anymore")
        else{
            res.render("user/edit", {user: foundUser})
        }
    })
})

// =============================================================================

module.exports = router