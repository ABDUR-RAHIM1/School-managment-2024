const { getALlComitee, addComitee, editComitee, deleteComitee } = require('../../controllers/comitee/comitee.controller');

const router = require('express').Router();

router.get("/all", getALlComitee)
router.post("/add", addComitee)
router.put("/edit/:id", editComitee)
router.post("/delete-many", deleteComitee)

module.exports = router