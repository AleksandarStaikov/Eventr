/* globals require describe it beforeEach afterEach*/

"use strict";

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test categories data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Category {
        constructor(propeties) {
            this.name = propeties.name;
        }

        save() {

        }

        static find() {}
        static findOne() {}
    }

    let data = require("../../data/category-data")({
        Category
    });

    describe("getCategoryById", () => {
        let existingCategoryId = 1;

        let category = {
            _id: existingCategoryId,
            name: "Something"
        };

        let categories = [category];

        beforeEach(() => {
            sinon.stub(Category, "findOne", (query, cb) => {
                let id = query._id;
                let foundCategory = categories.find(fr => fr._id === id);
                cb(null, foundCategory);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Should return the category", done => {
            data.getCategoryById(existingCategoryId)
                .then((actualCategory => {
                    expect(actualCategory).to.equal(category);
                    done();
                }))
                .catch(err => {
                    console.log(err);
                });
        });
    });

    describe("createCategory", () => {
        beforeEach(() => {
            sinon.stub(Category.prototype, "save", cb => {
                cb(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Should save the Category, when parameters are valid ", done => {
            let name = "Something";

            data.createCategory(name)
                .then(actualCategory => {
                    expect(actualCategory.name).to.equal(name);
                    done();
                });
        });

        it("Should fail, when name is empty", done => {
            let name = "";

            data.createCategory(name)
                .catch(err => {
                    expect(err);
                    done();
                });
        });

        it("Should fail, when name length is 2 characters long", done => {
            let name = "AA";

            data.createCategory(name)
                .catch(err => {
                    expect(err);
                    done();
                });
        });

        it("Should fail, when name length is 40 characters long", done => {
            let name = "A".repeat(40);

            data.createCategory(name)
                .catch(err => {
                    expect(err);
                    done();
                });
        });
    });
});