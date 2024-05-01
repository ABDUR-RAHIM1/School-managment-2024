
const mongoose = require("mongoose")

const teacherProfileSchema = mongoose.Schema({
    teacherId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
        enum: ["principle", "assistent teacher"],
        default: "assistent teacher"
    },
    experience: {
        type: Number,
        required: true
    },
    subjects: {
        type: [String],
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

const teacherProfile = mongoose.model("TeacherProfile", teacherProfileSchema);

module.exports = teacherProfile