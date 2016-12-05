/* globals module */

let connectionString = {
    production: "mongodb://eventsrush:123456@ds119728.mlab.com:19728/eventsrush",
    development: "mongodb://localhost/eventsrush"
}
module.exports = {
    environment: process.env.NODE_ENV || "development",
    // connectionString: connectionString[process.env.NODE_ENV || "development"],
    connectionString: connectionString["production"],
    port: process.env.PORT || 3000
};