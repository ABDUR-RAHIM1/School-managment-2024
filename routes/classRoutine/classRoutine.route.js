const { getAllRoutine, addRoutine, editRoutine, deleteRoutine } = require('../../controllers/classRoutine/classRoutine.controller');

const router = require('express').Router();

router.get("/all", getAllRoutine)
router.post("/add", addRoutine)
router.put("/edit/:id", editRoutine)
router.delete("/delete/:id", deleteRoutine)

module.exports = router;