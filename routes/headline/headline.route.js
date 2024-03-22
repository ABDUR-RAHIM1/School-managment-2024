const { addHeadline, getAllHeadline, deleteHeadline } = require("../../controllers/headline/headline.controller");

 
const router = require("express").Router();

router.get("/all", getAllHeadline)
router.post("/add", addHeadline)
router.delete("/delete/:id", deleteHeadline)

module.exports = router