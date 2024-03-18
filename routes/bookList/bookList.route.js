const { getAllBookLists, addBookList, editBookLists, deleteBookLists } = require("../../controllers/bookList/bookList.controller");

const router = require("express").Router();

router.get("/all", getAllBookLists)
router.post("/add", addBookList)
router.put("/edit/:id", editBookLists)
router.delete("/delete/:id", deleteBookLists)

module.exports = router;