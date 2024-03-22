const { getAllReview, addReview, deleteReview } = require("../../controllers/review/review.controller");

const router = require("express").Router();

router.get("/all", getAllReview)
router.post("/add", addReview)
router.delete("/delete/:id", deleteReview)

module.exports = router;