const tourModel = require("../../models/tourSlider/tourSlider.model")

const getAllSliders = async (req, res) => {
    try {
        const sliders = await tourModel.find();
        res.status(200).json(sliders)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addSlider = async (req, res) => {
    const { placeName, photo } = req.body
    try {
        const newTour = await tourModel({
            placeName,
            photo
        });
        await newTour.save();
        res.status(201).json({
            ok : true,
            message: "Tour Photo has been added"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        }) 
    }
}


const editSlider = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await tourModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdated) {
            res.status(200).json({
                ok : true,
                message: "Tour has been updated"
            })
        } else {
            res.status(404).json({
                ok : false,
                message: "Tour not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const deleteSlider = async (req, res) => {
    const {id} = req.params
    try {
        const isDeleted = await tourModel.findByIdAndDelete({ _id: id })
        if (isDeleted) {
            res.status(200).json({
                ok : true,
                message: "Tour has been deleted"
            })
        }else{
            res.status(404).json({
                ok : false,
                message: "not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = {getAllSliders , addSlider , editSlider , deleteSlider};