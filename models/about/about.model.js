const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});


const aboutModel = mongoose.model("About", aboutSchema);

module.exports = aboutModel