const mongoose = require("mongoose");

const logoSchema = mongoose.Schema({
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    rounded: {
        type: Number,
    },
    photo: {
        type: String,
        required: true
    }

}, { timestamps: true });

const logoModel = mongoose.model("logo", logoSchema);

module.exports = logoModel;