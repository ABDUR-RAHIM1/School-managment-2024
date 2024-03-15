const { getAllAttendence, addAttendence, editAttendence, deleteAttendence, getLoginStudentsAttendance } = require("../../controllers/attendence/attendence")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/all", getAllAttendence)
router.get("/login-student" , checkLogin , getLoginStudentsAttendance)
router.post("/create", addAttendence)
router.put("/edit/:id", editAttendence)
router.delete("/delete/:id", deleteAttendence)



module.exports = router