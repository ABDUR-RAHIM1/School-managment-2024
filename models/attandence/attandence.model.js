
const mongoose = require('mongoose');

// Schema for attendance
const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', "late"],
        required: true
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
