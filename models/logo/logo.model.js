const mongoose = require("mongoose");

const logoSchema = mongoose.Schema({
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    radius: {
        type: Number,
        required: true
    },
    photo: {
        type: String,
        required: true
    }

}, { timestamps: true });

const logoModel = mongoose.model("logo", logoSchema);

module.exports = logoModel;