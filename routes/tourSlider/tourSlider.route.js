const { getAllSliders, addSlider, editSlider, deleteSlider } = require("../../controllers/tourSlider/tourSlider.controller");

const router = require("express").Router();

router.get("/all", getAllSliders)
router.post("/add", addSlider)
router.put("/edit/:id", editSlider)
router.delete("/delete/:id", deleteSlider)

module.exports = router