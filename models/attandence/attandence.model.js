
const mongoose = require('mongoose');

// Schema for attendance
const attendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true
    },
    dateByday: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', "Late"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
