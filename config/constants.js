/* globals module */

"use strict";

let connectionString = {
    production: "mongodb://eventsrush:123456@ds119728.mlab.com:19728/eventr-8080",
    development: "mongodb://localhost/eventsrush"
};
module.exports = {
    environment: process.env.NODE_ENV || "development",
    connectionString: connectionString[process.env.NODE_ENV || "development"],
    port: process.env.PORT || 3000
};