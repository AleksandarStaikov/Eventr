const mongoose = require('mongoose');
const userModel = require('./models/User.js');
const userData = require('./data/user-data.js')(userModel);

const protocol = 'mongodb:/';
const server = 'localhost:27017';
const databaseName = 'abc';

const connectionString = `${protocol}/${server}/${databaseName}`;

mongoose.connect(connectionString)

const db = mongoose.connection;

db.on('open', () => {
    console.log('connected');

    userData.createUser('Pesho', 'heshche', 'emailchence')
    .then((user) => {
        //User not saved I think
        console.log(user); 
    })
});

db.on('error', (err) => {
    console.log(err);
});


