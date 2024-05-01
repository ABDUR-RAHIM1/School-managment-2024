const sliderModel = require("../../models/sliders/sliders.model")

const getAllSliders = async (req, res) => {
    try {
        const sliders = await sliderModel.find();
        res.status(200).json(sliders)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addSlider = async (req, res) => {
    const { photo } = req.body;
    try {
        const newSlider = await sliderModel({
            photo
        });

        await newSlider.save();
        res.status(201).json({
            ok:true,
            message: "Slider has been added"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteSlider = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await sliderModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            res.status(200).json({
                ok:true,
                message: "slider has been deleted"
            })
        } else {
            res.status(404).json({
                ok:false,
                message: "slider not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};


module.exports = {getAllSliders , addSlider , deleteSlider}