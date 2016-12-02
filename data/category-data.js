/* globals module require Promise */

const dataUtils = require("./utils/data-utils");

const MIN_PATTERN_LENGTH = 3;

module.exports = function(models) {
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
        }
    };
};