const { getAllPost, addPost, editPost, deletePost } = require("../../controllers/posts/posts.controller");
const checkLogin = require("../../midlewere/checkLogin");

const router = require("express").Router();


router.get("/all", getAllPost)
router.post("/add", checkLogin, addPost)
router.put("/edit/:id", editPost)
router.delete("/delete/:id", deletePost)

module.exports = router;