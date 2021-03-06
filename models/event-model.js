/* globals require module*/

"use strict";

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Event", {
    title: { type: String, require: true },
    location: { type: String, require: true },
    description: { type: String },
    isPublic: { type: Boolean, require: true },
    price: { type: Number },
    startTime: { type: Date, require: true },
    creator: {
        creatorId: { type: String, require: true },
        name: { type: String, require: true }
    },
    categories: [{
        _id: { type: String, require: true },
        categoryName: { type: String, require: true }
    }],
    subscribers: [{
        subscriberId: { type: String, require: true },
        name: { type: String, require: true }
    }]
});