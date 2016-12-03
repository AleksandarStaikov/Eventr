/* globals module */

function parseEventData(reqBody) {
    let {
        title,
        location,
        description,
        isPublic,
        priceInBGN,
        date,
        categories,
    } = reqBody;

    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    return {
        title,
        location,
        description,
        isPublic,
        priceInBGN,
        date,
        categories,
    };
}

module.exports = function(data) {
    const controller = {
        getEventDetails(req, res) {
            let id = req.params.id;
            data.getEventById(id)
                .then(event => {
                    if (!event) {
                        return res.redirect("/");
                    }

                    return res.render("event/details", {
                        model: event,
                        user: req.user
                    });
                })
                .catch(err => {
                    console.log("Error finding event by ID: " + err);
                    return res.redirect("/");
                });
        },
        addComment(req, res) {
            let id = req.params.id;
            let content = req.body.content;
            data.addCommentToEvent(id, content)
                .then(event => {
                    return res.redirect(`/events/${id}`);
                });
        },
        getCreateEventForm(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }

            data.getAllCategories()
                .then(categories => {
                    return res.render("event/create", {
                        categories,
                        user: req.user
                    });
                });
        },
        createEvent(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/")
            }

            let {
                title,
                location,
                description,
                isPublic,
                priceInBGN,
                date,
                categories
            } = parseEventData(req.body);

            let creator = {
                creatorId: req.user._id,
                name: req.user.username
            };

            return data.createEvent(title, location, description,
                isPublic, priceInBGN, date,
                categories, creator)
                .then(event => {
                    return res.redirect(`/events/${event.id}`);
                })
                .catch(err => {
                    res.status(400)
                        .send(err);
                });

        },
        getEditEventForm(req, res) {
            if (!req.isAuthenticated()) {
                return res.redirect("/");
            }

            let id = req.params.id;
            data.getEventById(id)
                .then(event => {
                    if (!event) {
                        return res.redirect("/");
                    }

                    data.getAllCategories()
                        .then(categories => {
                            return res.render("event/edit", {
                                categories,
                                event,
                                user: req.user
                            });
                        })
                        .catch(err => {
                            return err;
                        });
                })
                .catch(err => {
                    return err;
                });
        },
        editEventById(req, res) {
            let id = req.params.id;
            let {
                title,
                categories,
                preparation,
                priceInBGN
            } = parseEventData(req.body);

            data.editEventById(
                id,
                title,
                categories,
                preparation,
                priceInBGN)
                .then(event => {
                    if (!event) {
                        return res.redirect("/");
                    }

                    return res.render("events/details", {
                        model: event,
                        user: req.user
                    });
                })
                .catch(err => {
                    console.log("Error finding and editing event by ID: " + err);
                    return res.redirect("/");
                });
        },
        getAllPublicEvents(req, res) {
            res.render("not-ready", { user: req.user })
        },
        getUserScheduledEvents(req, res) {
            res.render("not-ready", { user: req.user })
        }
    };

    return controller;
};