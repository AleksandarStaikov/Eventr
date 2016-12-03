/* globals module require */

const express = require("express");
let Router = express.Router;

module.exports = function({ app, data }) {

    let controller = require("../controllers/event-controller")(data);

    let router = new Router();

    router
    // .get("/newest", controller.getNewestEventsAjax)
        .get("/mySchedule", controller.getUserScheduledEvents)
        .get("/create", controller.getCreateEventForm)
        .get("/edit/:id", controller.getEditEventForm)
        .get("/:id", controller.getEventDetails)
        .get("/", controller.getAllPublicEvents)
        .post("/", controller.createEvent)
        .post("/edit/:id", controller.editEventById)
        .post("/:id", controller.addComment);

    app.use("/events", router);

    return router;
};