/* globals require module*/

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("Event",{
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
    }],
    comments: [{
        creatorId: { type: String, require: true },
        creatorName: { type: String, require: true },
        dateCreated: { type: Date, require: true },
        content: { type: String, require: true }
    }]
});