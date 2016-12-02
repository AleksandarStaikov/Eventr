/* globals require module */

const modelRegistrator = require("./utils/model-registrator");
const units = ["гр.", "мл.", "ч. л.", "с. л.", "щипка", "бр."];

module.exports = modelRegistrator.register("Recept", {
    title: {
        type: String,
        required: true
    },
    categories: [{}],
    // to do custom validator
    preparation: {
        type: String,
        required: true,
        min: 10,
        max: 2000
    },
    priceInBGN: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
    comments: [{
        created: {
            type: Date,
            required: true,
            default: Date.now
        },
        content: {
            type: String,
            required: true,
            min: 10,
            max: 200
        }
    }]
});