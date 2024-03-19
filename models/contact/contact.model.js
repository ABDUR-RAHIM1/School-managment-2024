const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "name is required"]
    },
    message: {
        type: String,
        minLength: 20,
        required: [true, "message is required"]
    }

}, { timestamps: true });



const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;