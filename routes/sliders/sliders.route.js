const { getAllSliders, addSlider, deleteSlider } = require("../../controllers/sliders/sliders.controller");

const router = require("express").Router();

router.get("/all", getAllSliders)
router.post("/add", addSlider)
router.delete("/delete/:id", deleteSlider)

module.exports = router