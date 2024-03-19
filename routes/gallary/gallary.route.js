const { getAllGallary, addGallary, editGallary, deleteGallary } = require("../../controllers/gallary/gallary.controller");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();

router.get("/all", getAllGallary)
router.post("/add", checkLogin, addGallary)
router.put("/edit/:id", checkLogin, editGallary)
router.delete("/delete/:id", checkLogin, deleteGallary)

module.exports = router;