
const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: "studentAuth"
    },

    year: {
        type: String,
        required: true
    },

    studentName: {
        type: String,
        required: [true, "student Name is required"]
    },
    classCode: {
        type: String,
        required: [true, "class code is required"]
    },
    roll: {
        type: String,
        required: [true, "Roll is required"]
    },
    group: {
        type: String,
        required: [true, "group is required"]
    },
    examName: {
        type: String,
        required: [true, "Exam name is required"]
    },
    subjects: {
        type: [String],
        required: [true, "subjects are Required"]
    },
    marks: {
        type: [String],
        required: [true, "marks are Required"]
    },
}, { timestamps: true });


const ResutlsModel = mongoose.model("Results", resultSchema);

module.exports = ResutlsModel;