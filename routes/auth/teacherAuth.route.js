const { getAllTeachers, registerTeacher, loginTeacher, editTeacher, deleteOneTeacher, getLoginTeacher } = require("../../controllers/auth/teacherAuth.controller")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/auth/all", getAllTeachers)
router.get("/auth/user" , checkLogin , getLoginTeacher)
router.post("/auth/register" , registerTeacher)
router.post("/auth/login" , loginTeacher)
router.put("/auth/edit/:id" , editTeacher)
router.delete("/auth/delete/:id" , deleteOneTeacher)



module.exports = router