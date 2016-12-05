/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {

    let controller = require("../controllers/event-controller")(data);

    let router = new Router();

    router
        .get("/mySchedule", controller.getUserScheduledEvents)
        .get("/create", controller.getCreateEventForm)
        .get("/:id", controller.getEventDetails)
        .get("/", controller.getAllPublicEvents)
        .post("/", controller.createEvent);

    app.use("/events", router);

    return router;
};