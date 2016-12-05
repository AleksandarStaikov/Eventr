"use strict";

const User = require("../models/user-model");

module.exports = function(data) {
    return {
        getAccount(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect("/unauthorized");
                    } else {
                        res.render("authentication/profile", { user: req.user });
                    }
                });
        },
        postUpdateProfile(req, res, next) {
            req.assert("email", "Enter a valid email!").isEmail();
            req.sanitize("email").normalizeEmail({ remove_dots: false });

            const errors = req.validationErrors();

            if (errors) {
                req.flash("errors", errors);
                return res.redirect("/user/profile");
            }
            User.findById(req.user.id, (err, user) => {
                if (err) { return next(err); }
                user.email = req.body.email || "";
                user.profile.name = req.body.name || "";
                user.save((err) => {
                    if (err) {
                        if (err.code === 9999) {
                            req.flash("errors", { msg: "Email is used by another user!" });
                            return res.redirect("/user/profile");
                        }
                        return next(err);
                    }
                    req.flash("success", { msg: "Information has been changed!" });
                    res.redirect("/user/profile");
                });
            });
        }
    };
};