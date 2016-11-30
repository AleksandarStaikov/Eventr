/* globals require module*/

const mongoose = require('mongoose'),
    names = require('./modelNameConstants'),
    Schema = mongoose.Schema;

const eventSchema = mongoose.Schema({
    name: { type: String, require: true },
    location: { type: String, require: true },
    description: { type: String },
    isPublic: { type: Boolean, require: true },
    startTime: { type: Date, require: true },
    creator: {
        creatorId: { type: String, require: true },
        name: { type: String, require: true }
    },
    subscribers: [{
        subscriberId: { type: String, require: true },
        name: { type: String, require: true }
    }]
});

mongoose.model(names.eventObjectName, eventSchema);

let eventModel = mongoose.model(names.eventObjectName);

module.exports = eventModel;