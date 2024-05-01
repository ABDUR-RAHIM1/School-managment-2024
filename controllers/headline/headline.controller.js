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
    const { title, text } = req.body;
    try {
        const newHeadline = await headlineModel({
            title,
            text
        });

        await newHeadline.save();
        res.status(201).json({
            ok: true,
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
    const { ids } = req.body
    try {
        const isDeleted = await headlineModel.deleteMany({ _id: { $in: ids } })
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


module.exports = { getAllHeadline, addHeadline, deleteHeadline }