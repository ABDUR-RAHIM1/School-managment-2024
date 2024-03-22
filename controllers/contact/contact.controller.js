const contactModel = require("../../models/contact/contact.model")

const getAllContact = async (req, res) => {
    try {
        const contacts = await contactModel.find();
        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addContact = async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newContact = await contactModel({
            name,
            email,
            message
        });

        await newContact.save();
        res.status(201).json({
            messgae: "Message has been submited"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const editContact = async (req, res) => {
    const { id } = req.params
    try {
        const isUpdated = await contactModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        });
        if (isUpdated) {
            res.status(200).json({
                message: 'Contact Message has been updated'
            })
        } else {
            res.status(404).json({
                message: 'Contact Message not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const isDeleted = await contactModel.findByIdAndDelete({ _id: id });
        if (isDeleted) {
            res.status(200).json({
                message: 'Contact Message has been Deleted'
            })
        } else {
            res.status(404).json({
                message: 'Contact Message not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


module.exports = { getAllContact, addContact, editContact, deleteContact }