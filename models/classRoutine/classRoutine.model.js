const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Types.ObjectId, ref: "teacherAuth" },
    teacherName: { type: String, required: true },
    classCode: { type: String, required: true },
    dayOfWeek: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'], required: true }, // Day of the week
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true }
}, { timestamps: true });

const classRoutineModel = mongoose.model('classRoutine', routineSchema);

module.exports = classRoutineModel;