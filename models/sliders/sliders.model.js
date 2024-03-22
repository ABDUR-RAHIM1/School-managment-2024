
const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
    photo: {
        type: String,
        required: true
    }
});


const sliderModel = mongoose.model("slider" , sliderSchema);

module.exports = sliderModel;