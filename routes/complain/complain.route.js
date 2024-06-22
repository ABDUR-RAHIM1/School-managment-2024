const { getAllComplain, addComplain, editComplain, deleteComplain, checkComplain, getCompalain } = require("../../controllers/complain/complain.controller");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();

router.get("/all", getAllComplain)
router.get("/user", checkLogin, getCompalain)
router.post("/add", checkLogin, addComplain)
router.put("/edit/:id", editComplain)
router.put("/:id/checking", checkComplain)
router.delete("/delete/:id", deleteComplain)


module.exports = router;