
const mongoose = require("mongoose");

const comiteeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [5, "minimum name character is 5"]
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    title: {
        type: String,
        required: true,
        minLength: [5, "Title Is Required"]
    },
    position: {
        type: String,
        required: true, 
        minLength: [5, "Position Is Required"]
    },
    photo: {
        type: String,
    },
}, { timestamps: true });

const comiteeModel = mongoose.model("comitee", comiteeSchema);

module.exports = comiteeModel;