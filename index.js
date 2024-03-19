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
const classRotineRouter = require("./routes/classRoutine/classRoutine.route");
const feeRouter = require("./routes/fee/fee.route");
const staffRouter = require("./routes/staff/staff.route");
const comiteeRouter = require("./routes/comitee/comitee.route");
const bookListRouter = require("./routes/bookList/bookList.route");
const examRoutineRouter = require("./routes/examRoutine/examRoutine.route");
const gallaryRouter = require("./routes/gallary/gallary.route");
const logoRouter = require("./routes/logo/logo.route");
const aboutRouter = require("./routes/about/about.route");
const contactRouter = require("./routes/contact/contact.route");
 
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

//  routine
app.use("/api/routine", classRotineRouter)


//  fee's

app.use("/api/fee", feeRouter)

// staff's
app.use("/api/staffs", staffRouter)

//  comitee 
app.use("/api/comitee", comiteeRouter)

// booklists
app.use("/api/booklist" , bookListRouter)

//  exam routine
app.use("/api/examroutine", examRoutineRouter)

//  gallary 
app.use("/api/gallary", gallaryRouter)

//  logo
app.use("/api/logo", logoRouter)

//  about pages
app.use("/api/about", aboutRouter)

//  contact
app.use("/api/contact", contactRouter)



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