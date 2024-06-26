const mongoose = require("mongoose");

const teacherAuthSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        lowercase: true,
        minlength: [5, "username is Minimum 5 character"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        unique: [true, "Email Already Exist"]
    },
    password: {
        type: String,
        minlength: [8, "password is Minimum 8 character"],
        required: [true, "Password is required"],
    },

    photo: {
        type: String,
    },
    role: {
        type: String,
        default: "teacher"
    },
    status: {
        type: String,
        enum: ["active", "pending"],
        default: "pending"
    },
    profile: [
        {
            type: mongoose.Types.ObjectId,
            ref: "TeacherProfile"
        }
    ],
    attendance: [
        {
            type: mongoose.Types.ObjectId,
            ref: "TeacherAttendance"
        }
    ],
    routine: [
        {
            type: mongoose.Types.ObjectId,
            ref: "classRoutine"
        }
    ],
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Posts"
        }
    ],
    gallary: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Gallary"
        }
    ],
}, { timestamps: true });


const teacherModel = mongoose.model("teacherAuth", teacherAuthSchema);

module.exports = teacherModel