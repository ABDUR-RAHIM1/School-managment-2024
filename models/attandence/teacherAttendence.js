
const mongoose = require('mongoose');

// Schema for attendance
const teacherAttendanceSchema = new mongoose.Schema({
    teacherId: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
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

const TeahcerAttendance = mongoose.model('TeacherAttendance', teacherAttendanceSchema);

module.exports = TeahcerAttendance;
