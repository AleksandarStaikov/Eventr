/* globals module */

function parseEventData(reqBody) {
    let {
        title,
        categories,
        preparation,
        priceInBGN,
    } = reqBody;

    if (!Array.isArray(categories)) {
        categories = [categories];
    }

    return {
        title,
        categories,
        preparation,
        priceInBGN
    };
}

module.exports = function(data) {
    const controller = {
        getEventDetails(req, res) {
            // To check if user is registered
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
            console.log(content);
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
            let {
                title,
                categories,
                preparation,
                priceInBGN
            } = parseEventData(req.body);
            return data.createEvent(
                    title,
                    categories,
                    preparation,
                    priceInBGN)
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
        }
    };

    return controller;
};