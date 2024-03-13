const { getAllProfile, createProfile, getUserProfile, editProfile, deleteProfile } = require("../../controllers/profile/profile.controller")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/all", getAllProfile)
router.get("/user" , checkLogin , getUserProfile)
router.post("/create" ,checkLogin , createProfile) 
router.put("/edit/:id" , checkLogin , editProfile)
router.delete("/delete/:id" , checkLogin , deleteProfile)



module.exports = router