const aboutModel = require("../../models/about/about.model")

const getAllAbout = async (req, res) => {
    try {
        const about = await aboutModel.find();
        res.status(200).json(about)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addAbout = async (req, res) => {
    const { title, content, photo } = req.body;
    try {
        const newAbout = await aboutModel({
            title,
            content,
            photo
        });

        await newAbout.save();
        res.status(201).json({
            ok: true,
            message: "about Pages Content Uploaded"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editAbout = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await aboutModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdate) {
            res.status(200).json({
                ok: true,
                message: "About pages content has been updated"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "About pages content not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteAbout = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await aboutModel.deleteMany({ _id: { $in: ids } })
        if (isDeleted) {
            res.status(200).json({ message: 'Documents deleted successfully', ok: true });
        } else {
            res.status(404).json({ message: 'Documents have not been deleted', ok: false });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getAllAbout, addAbout, editAbout, deleteAbout }