const mongoose = require('mongoose'),
    names = require('./modelNameConstants'),
    Schema = mongoose.Schema;

const eventSchema = mongoose.Schema({
    name: { type: String, require: true },
    location: { type: String, require: true },
    description: { type: String },
    isPublic: { type: Boolean, require: true },
    startTime: { type: Date, require: true },
    subscriptions: { type: Schema.Types.ObjectId, ref: names.subscriptionObjectName}
});

const Event = mongoose.model(names.eventObjectName, eventSchema);
