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
    photo: {
        type: String,
        default: "https://img.freepik.com/free-photo/clueless-disappointed-angry-male-client-shocked-with-bad-service-spread-hands-sideways-dismay-distressed-arguing-looking-questioned-frustrated-complain-condone-someone_176420-51814.jpg?w=740"
    },
    isCheck: {
        type: String,
        enum: ["checked", "pending"],
        default: "pending"
    }
}, { timestamps: true });


const ComplinModel = mongoose.model("Complain", complainSchema);

module.exports = ComplinModel;