
const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    group: {
        type: String,
        enum: ["Science", "Commerce", "Arts"],
        required: true
    },
    session: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    pob: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    relationWith: {
        type: String,
        required: true
    },
    relationContact: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    scholarship: {
        type: String,
        required: true,
        enum: ["yes", "no"]
    },
    photo: {
        type: String,
        required: true
    },

}, { timestamps: true });


const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;