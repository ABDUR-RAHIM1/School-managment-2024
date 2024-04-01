const { getAllAdmin, registerAdmin, loginAdmin, editAdmin, deleteAdmin, deleteManyAdmins } = require("../../controllers/auth/adminAuth.controller")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/auth/all", getAllAdmin)
// router.get("/auth/user" , checkLogin , getLoginAccount)
router.post("/auth/register" , registerAdmin)
router.post("/auth/login" , loginAdmin)
router.put("/auth/edit/:id" , editAdmin)
router.delete("/auth/delete/:id" , deleteAdmin)
router.post("/auth/delete-many" , deleteManyAdmins)



module.exports = router