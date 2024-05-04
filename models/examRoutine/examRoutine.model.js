const mongoose = require("mongoose");

const examRoutineSchema = mongoose.Schema({
    examName: {
        type: String,
        required: true,
        default: "final"
    },
    classCode: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    examDate: {
        type: Date,
        required: true
    },
    examTime: {
        type: String,
        required: true
    },
    examDuration: {
        type: String,
        required: true
    },
}, { timestamps: true });


const examRoutineModel = mongoose.model("examRoutine", examRoutineSchema);

module.exports = examRoutineModel;