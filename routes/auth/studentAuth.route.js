const { getAllAccount, register, login, getLoginAccount, edit, deleteOne, approveAccount } = require("../../controllers/auth/studentAuth.controller")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/auth/all", getAllAccount)
router.get("/auth/user" , checkLogin , getLoginAccount)
router.post("/auth/register" , register)
router.put("/auth/:id/approve" , approveAccount)
router.post("/auth/login" , login)
router.put("/auth/edit/:id" , edit)
router.delete("/auth/delete/:id" , deleteOne)



module.exports = router