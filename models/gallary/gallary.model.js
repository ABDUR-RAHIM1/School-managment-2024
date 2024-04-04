
const mongoose = require("mongoose");

const gallarySchema = mongoose.Schema({
    teacherId: {
        type: mongoose.Types.ObjectId,
        ref: 'teacherAuth',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "panding",
        enum: ["pending", "accept", "reject"]
    }
}, { timestamps: true });


const gallaryModel = mongoose.model("Gallary", gallarySchema);

module.exports = gallaryModel;