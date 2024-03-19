
const mongoose = require("mongoose");

const gallarySchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'teacherAuth',  
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
}, { timestamps: true });


const gallaryModel = mongoose.model("Gallary", gallarySchema);

module.exports = gallaryModel;