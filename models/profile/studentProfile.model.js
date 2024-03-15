
const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    pob: {
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
    classOfAdmission: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
   
});


const profileModel = mongoose.model("Profile", profileSchema);

module.exports = profileModel;