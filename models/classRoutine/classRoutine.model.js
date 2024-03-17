const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    classCode: { type: String, required: true },
    dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true }, // Day of the week
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true },
    teacherName: { type: String, required: true },
    teacherId: { type: mongoose.Types.ObjectId, ref :"teacherAuth" },
}, { timestamps: true });

const classRoutineModel = mongoose.model('classRoutine', routineSchema);

module.exports = classRoutineModel;