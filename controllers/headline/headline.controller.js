const headlineModel = require("../../models/headline/headline.model");

 
const getAllHeadline = async (req, res) => {
    try {
        const headline = await headlineModel.find();
        res.status(200).json(headline)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addHeadline = async (req, res) => {
    const { text } = req.body;
    try {
        const newHeadline = await headlineModel({
            text
        });

        await newHeadline.save();
        res.status(201).json({
            message: "Headline has been added"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteHeadline = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await headlineModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            res.status(200).json({
                message: "headline has been deleted"
            })
        } else {
            res.status(404).json({
                message: "headline not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};


module.exports = {getAllHeadline , addHeadline , deleteHeadline}