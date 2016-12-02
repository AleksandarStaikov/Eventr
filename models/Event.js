/* globals require module*/

const mongoose = require('mongoose'),
    names = require('./modelNameConstants'),
    Schema = mongoose.Schema;

const eventSchema = mongoose.Schema({
    name: { type: String, require: false },
    location: { type: String, require: false },
    description: { type: String },
    isPublic: { type: Boolean, require: false },
    startTime: { type: Date, require: false },
    creator: {
        creatorId: { type: String, require: false },
        name: { type: String, require: false }
    },
    subscribers: [{
        subscriberId: { type: String, require: false },
        name: { type: String, require: false }
    }]
});

mongoose.model(names.eventObjectName, eventSchema);

let eventModel = mongoose.model(names.eventObjectName);

module.exports = eventModel;