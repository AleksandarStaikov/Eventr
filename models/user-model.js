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
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String,
        picture: String
    },
    preparations: [{
        preparationId: String,
        name: String,
        deadline: Date
    }]
});