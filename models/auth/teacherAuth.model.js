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
    role: {
        type: String,
        default: "teacher"
    },
    // profile: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "Profile"
    //     }
    // ]

}, { timestamps: true });


const teacherModel = mongoose.model("teacherAuth", teacherAuthSchema);

module.exports = teacherModel