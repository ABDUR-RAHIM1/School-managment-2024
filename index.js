const express = require("express");
const dotenv = require("dotenv")
const cors = require('cors');
const connetcDB = require("./config/database");
const { port } = require("./secret/secret");
const authrouter = require("./routes/auth/auth.route");
const profileRouter = require("./routes/profile/profile.route");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
dotenv.config();

const PORT = port || 9000

app.use("/api", authrouter)
app.use("/api/profile", profileRouter)


//  test route
app.get("/test", async (req, res) => {
    try {
        res.status(200).json({
            message: "This is Test Route for School Managment"
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Side Problem",
            error: error.message
        })
    }
})


// Global error handler
app.use(async (err, req, res, next) => {
    try {
        res.status(404).json({
            message: "Route not found",
            error: err
        });
    } catch (error) {
        res.status(500).json({
            message: "Server-side problem",
            error: error.message
        });
    }
});


app.listen(PORT, async () => {
    console.log('Server is running');
    await connetcDB()
})