
const mongoose = require("mongoose");
//  for admin 
const tourSliderSchema = mongoose.Schema({
    placeName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
}, { timestamps: true });

const tourModel = mongoose.model("TourSlider" , tourSliderSchema);

module.exports = tourModel;
