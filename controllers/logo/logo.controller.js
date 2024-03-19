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
    const { width, height, rounded, photo } = req.body;
    try {
        const newLogo = await logoModel({
            width,
            height,
            rounded,
            photo
        });

        await newLogo.save();

        res.status(201).json({
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
                message: "logo has been Updated"
            })
        } else {
            res.status(404).json({
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
    const { id } = req.params;
    try {
        const isDeleted = await logoModel.findByIdAndDelete({ _id: id });

        if (isDeleted) {
            res.status(200).json({
                message: "logo has been Deleted"
            })
        } else {
            res.status(404).json({
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


module.exports = {getAllLogo , addLogo , editLogo ,deletLogo}