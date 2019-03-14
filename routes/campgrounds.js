var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    methodOverride  = require("method-override"),
    middleware  = require("../middleware/index")


router.use(methodOverride("_method"))
// =============================================================================
// Routes for Campgrounds

router.get("/", function(req, res){
    console.log(req.user)
    Campground.find({}, function(err, all_camps){
        if(err){
            res.send("Error to find campgrounds!")
        }else{
            console.log("campgrounds returned as success: " + all_camps)
            res.render("campgrounds/campgrounds", {camps: all_camps, page: 'campgrounds'})
        }
    })
})

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, camp){
        if(!err){
            //console.log("\n\nOi: \n " + camp)
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, req.body.camp, function(err, camp){
        if(!err){
            res.redirect("/campgrounds")
        }
    })
})

router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.create({
        name: req.body.name,
        image: req.body.url,
        price: req.body.price,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function(err, camp){
        if(err)
            console.log("Something went wrong");
        else{
            console.log("Campground added: ", camp);
            res.redirect("/campgrounds")
        }
    })
    
})

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new")
})

router.get("/:id", function(req, res) {
    // The 'populate("attribute").exec(function(vars ...){...})' serves to become "attribute" ids into their value
    Campground.findById(req.params.id).populate("comments").exec(function(err, obj){
        if(err)
            console.log("Something went wrong!")
        else{
            console.log("camp: " + obj)
            res.render("campgrounds/show", {camp: obj})
        }
    })
})

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, camp){
        if(!err){
            res.render("campgrounds/edit", {camp: camp})
        }
    })
})


// =============================================================================

module.exports = router