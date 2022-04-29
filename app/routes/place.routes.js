const express  = require('express');
const places = require("../controllers/place.controller");
const userInfo = require("../controllers/regUserInfo.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(places.findAll)
        .post(places.create)
        .delete(places.deleteAll);
    
    router.route("/register/")
        .get(userInfo.findAll)
        .post(userInfo.create)

    router.route("/:id")
        .get(places.findOne)
        .put(places.update)
        .delete(places.delete);
        
    

    app.use("/api/places", router);
}