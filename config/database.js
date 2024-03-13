
const { mongoUrl } = require("../secret/secret")
const mongoose = require("mongoose")


const connetcDB = async () => {
    try {
        await mongoose.connect(mongoUrl)
        console.log("Databse is Connect")

    } catch (error) {
        console.log("Database Is Not Connect", error.message)
    }
}

module.exports = connetcDB