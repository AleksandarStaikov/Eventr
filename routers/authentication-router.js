/* globals module require */

const express = require("express");
const passport = require("passport");

let Router = express.Router;

module.exports = function({ app, data }) {
    let controller = require("../controllers/authentication-controller")(data);

    let router = new Router();

    router
        .get("/sign-up", controller.getSignUpForm)
        .get("/sign-in", controller.getSignInForm)
        .get("/:id", controller.getUserDetails)
        .post("/sign-up", controller.signUp)
        .post("/sign-in",
            passport.authenticate("local", { failureRedirect: "/user/sign-in" }),
            (req, res) => res.redirect("/"))
        .post("/sign-out", controller.signOut);

    app.use("/user", router);

    return router;
};