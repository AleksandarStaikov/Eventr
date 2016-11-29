const mongoose = require('mongoose'),

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