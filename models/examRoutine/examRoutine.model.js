const mongoose = require("mongoose");

const examRoutineSchema = mongoose.Schema({
    classCode: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    examTime: {
        type: Date,
        required: true
    }
}, { timestamps: true });


const examRoutineModel = mongoose.model("examRoutine", examRoutineSchema);

module.exports = examRoutineModel;