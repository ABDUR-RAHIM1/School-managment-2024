const { getAllComplain, addComplain, editComplain, deleteComplain } = require("../../controllers/complain/complain.controller");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();

router.get("/all", getAllComplain)
router.post("/add", checkLogin, addComplain)
router.put("/edit/:id",checkLogin, editComplain)
router.delete("/delete/:id", checkLogin, deleteComplain)


module.exports = router;