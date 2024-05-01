const { getAllAbout, addAbout, editAbout, deleteAbout } = require("../../controllers/about/about.controller");

const router = require("express").Router();

router.get("/all", getAllAbout)
router.post("/add", addAbout)
router.put("/edit/:id", editAbout)
router.post("/delete-many", deleteAbout)

module.exports = router