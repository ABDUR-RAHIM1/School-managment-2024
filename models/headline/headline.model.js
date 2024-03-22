
const mongoose = require("mongoose");

const headlineSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});


const headlineModel = mongoose.model("headline" , headlineSchema);

module.exports = headlineModel;