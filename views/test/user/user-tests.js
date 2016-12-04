/* globals require describe it */
"use strict";

const chai = require("chai");
const sinon = require("sinon");
let expect = chai.expect;
const User = require("../../models/user-model");

describe("User Tests", () => {
    it("Should create a new user", (done) => {
        const UserMock = sinon.mock(new User({ email: "vici_n@abv.bg", password: "passwordyo" }));
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
});