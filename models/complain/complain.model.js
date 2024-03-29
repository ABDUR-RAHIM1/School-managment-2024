const mongoose = require("mongoose");

const complainSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: "studentAuth",
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentEmail: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: [true, "title is Required"]
    },
    details: {
        type: String,
        required: [true, "details is Required"]
    },
}, { timestamps: true });


const ComplinModel = mongoose.model("Complain", complainSchema);

module.exports = ComplinModel;