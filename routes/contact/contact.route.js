const { getAllContact, addContact, editContact, deleteContact } = require("../../controllers/contact/contact.controller");

const router = require("express").Router();

router.get("/all", getAllContact)
router.post("/add", addContact)
router.put("/edit/:id", editContact)
router.post("/delete", deleteContact)

module.exports = router