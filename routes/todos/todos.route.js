const { getAllTodos, getUsersTodos, addTodo, editTodo, deleteTodo } = require("../../controllers/todos/todos.controller");
const checkLogin = require("../../midlewere/checkLogin")
const router = require("express").Router();

router.get("/all", getAllTodos)
router.get("/users", checkLogin, getUsersTodos)
router.post("/add", checkLogin, addTodo)
router.put("/edit/:id", editTodo)
router.delete("/delete/:id", deleteTodo)


module.exports = router