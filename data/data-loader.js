/* globals require module __dirname global */

"use strict";

const mongoose = require("mongoose");

const fs = require("fs"),
    path = require("path");

mongoose.Promise = global.Promise;

module.exports = function(connectionString) {
    mongoose.connect(connectionString);

    let User = require("../models/user-model.js");
    let Event = require("../models/event-model");
    let Category = require("../models/category-model.js");

    let models = { User, Event, Category };

    let data = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-data"))
        .forEach(file => {
            let modulePath = path.join(__dirname, file);
            let dataModule = require(modulePath)(models);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });
    return data;
};