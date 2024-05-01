
const mongoose = require("mongoose");

const headlineSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const headlineModel = mongoose.model("headline", headlineSchema);

module.exports = headlineModel;