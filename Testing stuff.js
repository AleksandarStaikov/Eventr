const mongoose = require('mongoose'),
    eve = require('./data/models/Event');

const protocol = 'mongodb:/';
const server = 'localhost:27017';
const databaseName = 'abc';

const connectionString = `${protocol}/${server}/${databaseName}`;

mongoose.connect(connectionString)

const db = mongoose.connection;

db.on('open', () => {
    console.log('succes bace');
});

db.on('error', (err) => {
    console.log(err);
});


const modelSchema = mongoose.Schema({
    model: String,
    releseDate: Date,
    priceInDollars: Number,
    displaySizeInInches: Number,
    smth: [{ type: Number }]
});

const modelName = "Laptop";

const Laptop = mongoose.model(modelName, modelSchema);

const asus = new Laptop({
    model: "Asus GTXK",
    releseDate: new Date(2014, 12, 22),
    priceInDollars: 1123,
    displaySizeInInches: 33,
});


asus.save((err, entry, numAffected) => {
    console.log(entry);
}).then(() => {
    asus.smth.push(4);
    asus.smth.push(8);
    asus.smth.push(2);
}).then((err, entry, numAffected) => {
    asus.save().then((err, pc) => {
        console.log(pc);
        console.log(err);
    }).then(() => {
        db.close();
    });
});



// const mongodb = require('mongodb');
// const mongoClient = mongodb.MongoClient
// mongoClient.connect(connectionString)
//     .then((databaseConnection) => {
//         console.log('successs')
//         databaseConnection.collection('spge')
//             .insert({
//                 firstName: 'Nakov',
//                 lastName: 'e gei',
//                 age: 69
//             }).then((result) =>{
//                 console.log(result);
//             })
//     })
//     .catch((error) => {
//         console.log(error)
//     });

