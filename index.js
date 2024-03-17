const express = require("express");
const dotenv = require("dotenv")
const cors = require('cors');
const connetcDB = require("./config/database");
const { port } = require("./secret/secret");
const authrouter = require("./routes/auth/studentAuth.route");
const profileRouter = require("./routes/profile/profile.route");
const teacherRouter = require("./routes/auth/teacherAuth.route");
const techerProfileRouter = require("./routes/profile/profile.teacher.route");
const adminRouter = require("./routes/auth/adminAuth.route");
const attendenceRouter = require("./routes/attandence/attandence");
const taecherAttendanceouter = require("./routes/attandence/teacherAttendance.route");
const todosRouter = require("./routes/todos/todos.route");
const complainRouter = require("./routes/complain/complain.route");
const noticeRouter = require("./routes/notice/notice.route");
const resultsRouter = require("./routes/result/result.route");

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
dotenv.config();

const PORT = port || 9000

//  students
app.use("/api/student", authrouter)
app.use("/api/profile", profileRouter)

//  teachers
app.use("/api/teachers", teacherRouter)
app.use("/api/teachers/profile", techerProfileRouter)

//  admin 
app.use("/api/admin", adminRouter)


//  attendence 
app.use("/api/attendence", attendenceRouter)
app.use("/api/attendence/teacher", taecherAttendanceouter)

//  todos 
app.use("/api/todos", todosRouter)

//  complain
app.use("/api/complain", complainRouter)

//  notice
app.use("/api/notice", noticeRouter)

//  results
app.use("/api/results", resultsRouter)

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


//  connecting
app.listen(PORT, async () => {
    console.log('Server is running');
    await connetcDB()
})