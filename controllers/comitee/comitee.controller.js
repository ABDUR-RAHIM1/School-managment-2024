const comiteeModel = require("../../models/comitee/comitee.model")

const getALlComitee = async (req, res) => {
    const { search } = req.query
   
    try {
        if (search) {
            const regex = new RegExp(search, "i")
            const filter = {
                $or: [
                    { name: { $regex: regex } },
                    { position: { $regex: regex } },
                ]
            }
            const comitee = await comiteeModel.find(filter);
            res.status(200).json(comitee)
        } else {
            const comitee = await comiteeModel.find();
            res.status(200).json(comitee)
        }
    } catch (error) {
        res.status(500).json({
            message: error._message,
            error: error.message
        })
    }
}

const addComitee = async (req, res) => {
    const { name, email, phone, title, position, photo } = req.body;
    try {
        const isComitee = await comiteeModel.findOne({ email });
        if (isComitee) {
            return res.status(400).json({
                ok: false,
                message: "This Email has already been used !"
            })
        }
        const newComitee = await comiteeModel({
            name,
            email,
            phone,
            title,
            position,
            photo
        });
        await newComitee.save();

        res.status(201).json({
            ok: true,
            message: "comitee added"
        })
    } catch (error) {
        res.status(500).json({
            message: error._message,
            error: error._message
        });

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
                ok: true,
                message: "comitee has been updated"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "comitee not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error._message,
            error: error.message
        })
    }
}

const deleteComitee = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await comiteeModel.deleteMany({ _id: { $in: ids } })
        if (isDeleted) {
            res.status(200).json({ message: 'Documents deleted successfully', ok: true });
        } else {
            res.status(404).json({ message: 'Documents have not been deleted', ok: false });
        }
    } catch (error) {
        res.status(500).json({
            message: error._message,
            error: error.message
        })
    }
}

module.exports = { getALlComitee, addComitee, editComitee, deleteComitee }