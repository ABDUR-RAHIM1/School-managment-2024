const reviewModel = require("../../models/review/review.model")

const getAllReview = async (req, res) => {
    try {
        const review = await reviewModel.find();
        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const addReview = async (req, res) => {
    const { name, email, photo, review } = req.body
    try {
        const newReview = await reviewModel({
            name,
            email,
            photo,
            review
        });

        await newReview.save();
        res.status(201).json({
            ok: true,
            message: "Review Done!"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


//  for admin
const deleteReview = async (req, res) => {
    const { ids } = req.body;
    try {
        const isDelete = await reviewModel.deleteMany({ _id: { $in: ids } });

        if (isDelete) {
            res.status(200).json({
                ok: true,
                message: "Review has been deleted"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "Review not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};


module.exports = { getAllReview, addReview, deleteReview }