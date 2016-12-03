/* globals module require Promise */

const dataUtils = require("./utils/data-utils");

const MIN_PATTERN_LENGTH = 3;

module.exports = function (models) {
    let {
        Category
    } = models;

    return {
        createCategory(name) {
            return dataUtils.loadOrCreateCategory(Category, name);
        },
        getAllCategories() {
            return new Promise((resolve, reject) => {
                Category.find()
                    .exec((err, categories) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(categories);
                    });
            });
        },
        getCategoryByName(name) {
            return new Promise((resolve, reject) => {
                Category.findOne({
                    name
                }, (err, category) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        },
        getCategoryById(id) {
            return new Promise((resolve, reject) => {
                Category.findOne({
                    _id: id
                }, (err, category) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
        },
        searchCategories({
            pattern,
            page,
            pageSize
        }) {
            let query = {};
            if (typeof pattern === "string" && pattern.length >= MIN_PATTERN_LENGTH) {
                query.$or = [{
                    name: new RegExp(`.*${pattern}.*`, "gi")
                }];
            }

            let skip = (page - 1) * pageSize,
                limit = page * pageSize;

            return new Promise((resolve, reject) => {
                Category.find()
                    .where(query)
                    .skip(skip)
                    .limit(limit)
                    .exec((err, categories) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(categories || []);
                    });
            });
        }
    };
};




// getCategoriesByIds(ids) {
//     return new Promise((resolve, reject) => {
//         Category.find({ _id: { $in: ids } }, )

//     });
// };


// function Solve(err, data) {
//     if (err) {
//         return reject(err);
//     }

//     return resolve(data);
// }