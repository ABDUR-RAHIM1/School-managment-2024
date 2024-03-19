const { getAllLogo, addLogo, editLogo, deletLogo } = require("../../controllers/logo/logo.controller");

const router = require("express").Router();

router.get("/all", getAllLogo)
router.post("/add", addLogo)
router.put("/edit/:id", editLogo)
router.delete("/delete/:id", deletLogo)

module.exports = router;