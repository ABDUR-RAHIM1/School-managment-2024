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
    role: {
        type: String,
        default: "student"
    },
    profile: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Profile"
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
}, { timestamps: true });


const authModel = mongoose.model("studentAuth", studentAuthSchema);

module.exports = authModel