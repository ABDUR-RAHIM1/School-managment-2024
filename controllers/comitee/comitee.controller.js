const comiteeModel = require("../../models/comitee/comitee.model")

const getALlComitee = async (req, res) => {
    try {
        const comitee = await comiteeModel.find();
        res.status(200).json(comitee)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addComitee = async (req, res) => {
    const { name, email, title, position, photo } = req.body;
    try {
        const isComitee = await comiteeModel.findOne({email});
        if (isComitee) {
            return res.status(400).json({
                message :"This committee member has already been added"
            })
        }
        const newComitee = await comiteeModel({
            name,
            email,
            title,
            position,
            photo
        });
        await newComitee.save();

        res.status(201).json({
            message: "comitee added"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editComitee = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await comiteeModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });
        if (isUpdated) {
            res.status(200).json({
                message: "comitee has been updated"
            })
        } else {
            res.status(404).json({
                message: "comitee not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteComitee = async (req, res) => {
    const {id} = req.params;
    try {
        const isDelete = await comiteeModel.findByIdAndDelete({ _id: id });
        if (isDelete) {
            res.status(200).json({
                message: "comitee has been Deleted"
            })
        } else {
            res.status(404).json({
                message: "comitee not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getALlComitee, addComitee, editComitee, deleteComitee }