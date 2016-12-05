/* globals module require */

"use strict";

const passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    FacebookStrategy = require("passport-facebook").Strategy,
    OAuth = require("../config/facebook-oauth"),
    User = require("../models/user-model");

module.exports = function({ app, data }) {
    app.use(passport.initialize());
    app.use(passport.session());

    const strategy = new LocalStrategy((username, password, done) => {
        data.findUserByCredentials(username, password)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, null));
    });

    passport.use(new FacebookStrategy({
        clientID: OAuth.facebookOauth.clientID,
        clientSecret: OAuth.facebookOauth.clientSecret,
        callbackURL: OAuth.facebookOauth.callbackURL,
        profileFields: ["name", "email", "link", "locale", "timezone"],
        passReqToCallback: true
    }, (req, accessToken, refreshToken, profile, done) => {

        User.findOne({ facebook: profile.id }, (err, existingUser) => {

            process.nextTick(function() {
                User.findOne({ "facebook.id": profile.id }, function(err, user) {

                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, user);
                    } else {
                        let newUser = new User();

                        newUser.email = profile.emails[0].value;
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
                        newUser.facebook.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            }

                            return done(null, newUser);
                        });
                    }
                });
            });
        });
    }));

    passport.use(strategy);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        // use the id serialized in the session to retrieve the use from the database
        data.findUserById(id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    });
};