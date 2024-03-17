const mongoose = require("mongoose");

const noticeSchema = mongoose.Schema({
    subject: {
        type: String,
        required: [true, "subject is required"]
    },
    details: {
        type: String,
        required: [true, " notice details is required"]
    },

}, { timestamps: true });

const NoticeModel = mongoose.model("Notice", noticeSchema);

module.exports = NoticeModel;