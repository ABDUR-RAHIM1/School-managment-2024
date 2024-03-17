const { getAllFee, addFee, editFee, deleteFee } = require("../../controllers/fee/fee.controller");

const router = require("express").Router();

router.get("/all", getAllFee)
router.post("/add", addFee)
router.put("/edit/:id", editFee)
router.delete("/delete/:id", deleteFee)


module.exports = router;