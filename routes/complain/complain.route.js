const { getAllComplain, addComplain, editComplain, deleteComplain, checkComplain } = require("../../controllers/complain/complain.controller");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();

router.get("/all", getAllComplain)
router.post("/add", checkLogin, addComplain)
router.put("/edit/:id",checkLogin, editComplain)
router.put("/:id/checking", checkComplain)
router.delete("/delete/:id", checkLogin, deleteComplain)


module.exports = router;