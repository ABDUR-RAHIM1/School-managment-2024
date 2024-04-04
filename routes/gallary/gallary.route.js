const { getAllGallary, addGallary, editGallary, deleteGallary, gallaryController } = require("../../controllers/gallary/gallary.controller");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();

router.get("/all", getAllGallary)
router.post("/add", checkLogin, addGallary)
router.put("/:id/controll", gallaryController)
router.put("/edit/:id", checkLogin, editGallary)
router.delete("/delete/:id", checkLogin, deleteGallary)

module.exports = router;