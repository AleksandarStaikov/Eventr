/* globals require module */

"use strict";

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Category", {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    events: [{}]
});