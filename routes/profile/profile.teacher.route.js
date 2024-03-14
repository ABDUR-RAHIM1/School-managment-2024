const { getAllProfiles, getLoginTechersProfile, createTechersProfile, editTechersProfile, deleteTechersProfile } = require("../../controllers/profile/teacher.profile.controller")
const checkLogin = require("../../midlewere/checkLogin")

const router = require("express").Router()

router.get("/all", getAllProfiles)
router.get("/teacher", checkLogin , getLoginTechersProfile)
router.post("/create", checkLogin, createTechersProfile)
router.put("/edit/:id", editTechersProfile)
router.delete("/delete/:id", deleteTechersProfile)

module.exports = router