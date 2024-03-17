const { getAllNotice, addNotice, editNotice, deleteNotice } = require("../../controllers/notice/notice.controller");

const router = require("express").Router();

router.get("/all", getAllNotice)
router.post("/add", addNotice)
router.put("/edit/:id", editNotice)
router.delete("/delete/:id", deleteNotice)


module.exports = router