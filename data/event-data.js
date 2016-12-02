/* globals module require Promise */

const MIN_PATTERN_LENGTH = 3;

module.exports = function(models) {
    let {
        Event,
        //User,
        Category
    } = models;

    function findCategoriesByIds(categoriesIds) {
        return new Promise((resolve, reject) => {
            Category.find({ _id: { $in: categoriesIds } })
                .select("name")
                .then(categories => {
                    let eventCategories = [];

                    for (let categ of categories) {
                        let categInEvent = {
                            name: categ.name,
                            id: categ._id
                        };

                        eventCategories.push(categInEvent);
                    }

                    return resolve(eventCategories);
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    function addEventToCategories(categoriesIds, event) {
        return new Promise((resolve, reject) => {
            if (categoriesIds[0]) {
                let eventInfo = {
                    id: event._id,
                    title: event.title
                };

                categoriesIds.forEach(categId => {
                    Category.findByIdAndUpdate(
                        categId, { $push: { events: eventInfo } }, { safe: true },
                        err => {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                        });
                });
            }

            return resolve(event);
        });
    }

    function removeEventFromItsCategories(event) {
        return new Promise((resolve, reject) => {
            event.categories.forEach(categ => {
                Category.findByIdAndUpdate(
                    categ.id, { $pull: { events: { id: event._id } } }, { safe: true, new: true },
                    (err, c) => {
                        if (err) {
                            console.log(err);
                            return reject(err);
                        }
                    });
            });

            return resolve(event);
        });
    }

    return {
        getEventById(id) {
            return new Promise((resolve, reject) => {
                Event.findOne({ _id: id }, (err, event) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(event);
                });
            });
        },
        addCommentToEvent(id, content, author) {
            return new Promise((resolve, reject) => {
                let newComment = {
                    content,
                    author: { username: author }
                };

                Event.findByIdAndUpdate(id, { $push: { comments: newComment } }, { safe: true, upsert: true }, (err, event) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(event);
                });
            });
        },
        createEvent(title, categoriesIds, preparation,
            priceInBGN, author) {

            return new Promise((resolve, reject) => {
                findCategoriesByIds(categoriesIds)
                    .then(categories => {
                        let event = new Event({
                            title,
                            categories,
                            preparation,
                            priceInBGN,
                            author
                        });

                        return new Promise((resolve, reject) => {
                            event.save(err => {
                                if (err) {
                                    return reject(err);
                                }

                                return resolve(event);
                            });
                        });
                    })
                    .then(event => {
                        addEventToCategories(categoriesIds, event)
                            .then(resolve)
                            .catch(reject);
                    })
                    .catch(err => {
                        return reject(err);
                    });
            });
        },
        editEventById(id, title, categoriesIds, preparation,
            priceInBGN) {
            return new Promise((resolve, reject) => {
                Event.findById(id, (err, event) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }

                        return event;
                    })
                    .then(removeEventFromItsCategories)
                    .then(() => {
                        findCategoriesByIds(categoriesIds)
                            .then(categories => {
                                return new Promise((resolve, reject) => {
                                    Event.findByIdAndUpdate(id, {
                                            title,
                                            categories,
                                            preparation,
                                            priceInBGN
                                        }, { safe: true, new: true },
                                        (err, event) => {
                                            if (err) {
                                                console.log(err);
                                                return reject(err);
                                            }

                                            return resolve(event);
                                        });
                                });
                            })
                            .then(event => {
                                addEventToCategories(categoriesIds, event)
                                    .then(resolve)
                                    .catch(reject);
                            })
                            .catch(err => {
                                return reject(err);
                            });
                    });
            });
        }
    };
};