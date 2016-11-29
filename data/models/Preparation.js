const mongoose = require('mongoose'),
    names = require('./modelNameConstants'),
    Schema = mongoose.Schema;

const preparationSchema = mongoose.Schema({
    name: { type: String, require: true },
    deadLine: { type: Date, require: true }
});

var Preparation = mongoose.model(names.preparationObjectName, preparationSchema);