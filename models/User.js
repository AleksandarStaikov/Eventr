const mongoose = require('mongoose'),
    names = require('./modelNameConstants'),
    Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    userName: { type: String, require: true },
    passwordHesh: { type: String, require: true },
    email: { type: String, require: true },
    dateCreated: { type: Date, require: true },
    events: [{
        eventId: String ,
        name: String,
        startDate: Date
    }],
    preparations: [{
        preparationId: String,
        name: String,
        deadline: Date
    }]
});


mongoose.model(names.userObjectName, userSchema);

let userModel = mongoose.model(names.userObjectName);

module.exports = userModel;