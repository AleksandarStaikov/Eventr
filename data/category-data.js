/* globals module require Promise */

"use strict";

const MIN_PATTERN_LENGTH = 3;

module.exports = function (models) {
    let {
        Category
    } = models;

    return {
        createCategory(name) {
            let category = new Category({ name });
            if (3 > name.length || name.length > 20 ) {
                console.log("ïnvalid title length.", name.length);
                return Promise.reject({ reason: "Name must be between 3 and 20 characters long." });
            }

            return new Promise((resolve, reject) => {
                category.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(category);
                });
            });
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