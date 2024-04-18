const mongoose = require("mongoose");

const studentAuthSchema = mongoose.Schema({
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
    status: {
        type: String,
        enum: ["active", "pending", "banned"],
        default: "pending"
    },
    role: {
        type: String,
        default: "student"
    },
    photo: {
        type: String,
    },
    profile: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Profile"
        }
    ],
    attendance: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Attendance"
        }
    ],
    results: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Results"
        }
    ],
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Todos"
        }
    ],
    complains: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Complain"
        }
    ],
    fee: [
        {
            type: mongoose.Types.ObjectId,
            ref: "fee"
        }
    ],

}, { timestamps: true });


const authModel = mongoose.model("studentAuth", studentAuthSchema);

module.exports = authModel