const { getAllExamRoutine, addExamRoutine, editExamRoutine, deleteExamRoutine } = require("../../controllers/examRoutine/examRoutine.controller");

const router = require("express").Router();

router.get("/all", getAllExamRoutine)
router.post("/add", addExamRoutine)
router.put("/edit/:id", editExamRoutine)
router.post("/delete-many", deleteExamRoutine)

module.exports = router;