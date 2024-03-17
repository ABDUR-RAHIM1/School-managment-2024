
const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: "studentAuth"
    },
    studentName: {
        type: String,
        required: [true, "student Name is required"]
    },
    classCode: {
        type: String,
        required: [true, "class code is required"]
    },
    examName: {
        type: String,
        required: [true, "exam name is required"]
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