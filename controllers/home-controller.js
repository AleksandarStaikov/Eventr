/* globals module */

"use strict";

module.exports = function(data) {
    return {
        home(req, res) {
            return res.render("home/home", {
                user: req.user
            });
        }
    };
};