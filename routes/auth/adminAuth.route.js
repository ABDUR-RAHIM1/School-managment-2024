const { getAllAdmin, registerAdmin, loginAdmin, editAdmin, deleteAdmin } = require("../../controllers/auth/adminAuth.controller")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/auth/all", getAllAdmin)
// router.get("/auth/user" , checkLogin , getLoginAccount)
router.post("/auth/register" , registerAdmin)
router.post("/auth/login" , loginAdmin)
router.put("/auth/edit/:id" , editAdmin)
router.delete("/auth/delete/:id" , deleteAdmin)



module.exports = router