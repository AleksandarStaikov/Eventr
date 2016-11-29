const mongoose = require('mongoose'),
    names = require('./modelNameConstants'),
    Schema = mongoose.Schema;

const subscriptionSchema = mongoose.Schema({
    dateSubscibed: {type: Date, require: true},
    subscriber: {type: Schema.Types.ObjectId, ref: names.userObjectName},
    event: {type: Schema.Types.ObjectId, ref: names.eventObjectName},
    preparations: [{type: Schema.Types.ObjectId, ref: names.preparationObjectName}]
});


var Subscription = mongoose.model(names.subscriptionObjectName, subscriptionSchema);