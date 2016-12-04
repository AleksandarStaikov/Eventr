/* globals require describe it */
"use strict";

const chai = require("chai");
const sinon = require("sinon");
let expect = chai.expect;
const User = require("../../models/user-model");

describe("User Tests", () => {
    it("Should create a new user", (done) => {
        const UserMock = sinon.mock(new User({ email: "vici_n@abv.bg", password: "password" }));
        const user = UserMock.object;

        UserMock
            .expects("save")
            .yields(null);

        user.save(function(err) {
            UserMock.verify();
            UserMock.restore();
            expect(err).to.be.null;
            done();
        });
    });

    it("Should not create a user with unique email", (done) => {
        const UserMock = sinon.mock(User({ email: "vici_n@gmail.com", password: "password" }));
        const user = UserMock.object;
        const expectedError = {
            name: "SomeError",
            code: 99999
        };

        UserMock
            .expects("save")
            .yields(expectedError);

        user.save((err, result) => {
            UserMock.verify();
            UserMock.restore();
            expect(err.name).to.equal("SomeError");
            expect(err.code).to.equal(99999);
            expect(result).to.be.undefined;
            done();
        });
    });

    it("Should find user by email", (done) => {
        const userMock = sinon.mock(User);
        const expectedUser = {
            _id: "5842eb38a0c3802b0055df6f",
            email: "vici_n@abv.bg"
        };

        userMock
            .expects("findOne")
            .withArgs({ email: "vici_n@abv.bg" })
            .yields(null, expectedUser);

        User.findOne({ email: "vici_n@abv.bg" }, (err, result) => {
            userMock.verify();
            userMock.restore();
            expect(result.email).to.equal("vici_n@abv.bg");
            done();
        });
    });
});