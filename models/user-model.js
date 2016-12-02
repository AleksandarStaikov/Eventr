/* globals require module */

const modelRegistrator = require("./utils/model-registrator");

module.exports = modelRegistrator.register("User", {
    username: { type: String, require: true },
    passwordHash: { type: String, require: true },
    email: { type: String, require: true },
    dateCreated: { type: Date, require: true },
    events: [{
        eventId: String,
        name: String,
        startDate: Date
    }],
    preparations: [{
        preparationId: String,
        name: String,
        deadline: Date
    }]
});