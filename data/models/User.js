const mongoose = require('mongoose'), 
      names = require('./modelNameConstants'),
      Schema = mongoose.Schema;

const userSchema = mongoose.Scheema({
    userName: { type: String, require: true },
    passwordHesh: { type: String, require: true },
    email: { type: String, require: true },
    dateCreated: { type: Date, require: true },
    subscriptions: [{type: Schema.Types.ObjectId, ref: names.subscriptionObjectName}]
}); 


var User = mongoose.model(names.userObjectName, userSchema);