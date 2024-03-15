const { getAllTeahcerAttandance, deleteTeahcerAttandance, editTeahcerAttandance, addTeahcerAttandance, getloginTeahcerAttandance } = require("../../controllers/attendence/teacherAttendance");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();

router.get("/all", getAllTeahcerAttandance)
router.get("/login-teacher", checkLogin, getloginTeahcerAttandance)
router.post("/add", addTeahcerAttandance)
router.put("/edit/:id", editTeahcerAttandance)
router.delete("/delete/:id", deleteTeahcerAttandance)

module.exports = router;