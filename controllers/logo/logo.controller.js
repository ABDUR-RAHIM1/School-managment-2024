const logoModel = require("../../models/logo/logo.model")

const getAllLogo = async (req, res) => {
    try {
        const logo = await logoModel.find();
        res.status(200).json(logo)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

const addLogo = async (req, res) => {
    const { width, height, radius, photo } = req.body;
    try {
        const newLogo = await logoModel({
            width,
            height,
            radius,
            photo
        });

        await newLogo.save();

        res.status(201).json({
            ok: true,
            message: "logo has been uploaded"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
}

const editLogo = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await logoModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdated) {
            res.status(200).json({
                ok: true,
                message: "logo has been Updated"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "logo not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error
        })
    }
};


const deletLogo = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await logoModel.deleteMany({ _id: { $in: ids } })
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
};


module.exports = { getAllLogo, addLogo, editLogo, deletLogo }