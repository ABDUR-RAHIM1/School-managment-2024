const { getAllNotice, addNotice, editNotice, deleteNotice } = require("../../controllers/notice/notice.controller");

const router = require("express").Router();

router.get("/all", getAllNotice)
router.post("/add", addNotice)
router.put("/edit/:id", editNotice)
router.post("/delete-many", deleteNotice)


module.exports = router