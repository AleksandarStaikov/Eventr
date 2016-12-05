/* globals module require Promise */

const MIN_PATTERN_LENGTH = 3;

module.exports = function(models) {
    let {
        User,
        Event,
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
                            categoryName: categ.name,
                            _id: categ._id
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
        createEvent(title, location, description,
            isPublic, priceInBGN, date,
            categoriesIds, creator) {

            return new Promise((resolve, reject) => {
                findCategoriesByIds(categoriesIds)
                    .then(categories => {

                        let event = new Event({
                            title: title,
                            location: location,
                            description: description,
                            isPublic: isPublic,
                            price: priceInBGN,
                            startTime: date,
                            creator: creator,
                            categories: categories
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
                        console.log(err);
                        return reject(err);
                    });
            });
        },
        searchEvents({ pattern, page, pageSize }) {
            let query = {};
            if (typeof pattern === "string" && pattern.length >= MIN_PATTERN_LENGTH) {
                query.$or = [{
                    title: new RegExp(`.*${pattern}.*`, "gi")
                }, {
                    category: new RegExp(`.*${pattern}.*`, "gi")
                }];
            }

            let skip = (page - 1) * pageSize,
                limit = page * pageSize;

            return new Promise((resolve, reject) => {
                Event.find()
                    .where(query)
                    .skip(skip)
                    .limit(limit)
                    .exec((err, events) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(events || []);
                    });
            });
        }
    };
};