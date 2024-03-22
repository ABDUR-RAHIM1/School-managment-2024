const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    photo: {
        type: String, 
    },
    review: {
        type: String,
        required: [true, "Review is Required"]
    },
}, { timestamps: true });

const reviewModel = mongoose.model("Review" , reviewSchema);

module.exports = reviewModel;