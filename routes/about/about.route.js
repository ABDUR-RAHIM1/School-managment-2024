const { getAllAbout, addAbout, editAbout, deleteAbout } = require("../../controllers/about/about.controller");

const router = require("express").Router();

router.get("/all", getAllAbout)
router.post("/add", addAbout)
router.put("/edit/:id", editAbout)
router.delete("/delete/:id", deleteAbout)

module.exports = router