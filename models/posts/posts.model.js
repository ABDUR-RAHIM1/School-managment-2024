
const mongoose = require("mongoose");

const postsSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "teacherAuth"
    },
    creator: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const postModel = mongoose.model("Posts", postsSchema);

module.exports = postModel;