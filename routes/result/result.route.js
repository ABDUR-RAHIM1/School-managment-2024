const { editResult } = require("../../controllers/result/result.controller");
const { deleteResult } = require("../../controllers/result/result.controller");
const { addResult } = require("../../controllers/result/result.controller");
const { getAllResult } = require("../../controllers/result/result.controller");

const router = require("express").Router();

router.get("/all", getAllResult)
router.post("/add", addResult)
router.put("/edit/:id", editResult)
router.delete("/delete/:id", deleteResult)

module.exports = router