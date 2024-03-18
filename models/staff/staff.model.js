const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: 5
    },
    position: {
        type: String,
        required: [true, "Position is required"],
        minLength: 5
    },
    role: {
        type: String,
        default: "Staff"
    },
    photo: {
        type: String
    }
}, { timestamps: true });

const StaffModel = mongoose.model("Stuff", staffSchema);

module.exports = StaffModel;
