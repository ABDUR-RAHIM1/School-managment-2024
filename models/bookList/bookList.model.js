const mongoose = require("mongoose");


const bookListSchema = mongoose.Schema({
    classCode: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        required: true
    },
    subjectList: {
        type: [String],
        required: true
    },
    optional: {
        type: String,
        required: true
    }
}, { timestamps: true });

const bookListModel = mongoose.model("Booklist", bookListSchema);

module.exports = bookListModel;