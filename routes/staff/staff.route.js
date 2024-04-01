const { getAllStaff, addStaff, editStaff, deleteStaff } = require("../../controllers/staff/staff.controller");

const router = require("express").Router();


router.get("/all", getAllStaff)
router.post("/add", addStaff)
router.put("/edit/:id", editStaff)
router.post("/delete/", deleteStaff)



module.exports = router