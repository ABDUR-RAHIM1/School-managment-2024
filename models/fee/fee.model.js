const mongoose = require("mongoose");

const feeSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: "studentAuth"
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
    feeAmount: {
        type: String,
        required: true
    },
    feePaid: {
        type: Boolean,
        default: false
    },
    feeFor: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

const feeModel = mongoose.model("fee", feeSchema);
module.exports = feeModel