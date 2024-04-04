const teacherModel = require("../../models/auth/teacherAuth.model");
const gallaryModel = require("../../models/gallary/gallary.model")

const getAllGallary = async (req, res) => {
    const { search } = req.query; 
    try {
        if (search) {
            const gallary = await gallaryModel.find({ status: search });
            res.status(200).json(gallary)
        } else {
            const gallary = await gallaryModel.find();
            res.status(200).json(gallary)
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const gallaryController = async (req, res) => {
    const { id } = req.params;
    try {
        const isControlled = await gallaryModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true })

        if (isControlled) {
            res.status(200).json({
                message: `has been ${isControlled.status} successfully`,
                ok: true
            })
        } else {
            res.status(404).json({
                message: "Document not found",
                ok: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const addGallary = async (req, res) => {
    const { title, photo } = req.body
    const { userid, username } = req.user
    try {

        const newGallary = await gallaryModel({
            teacherId: userid,
            author: username,
            title,
            photo
        });
        const gallary = await newGallary.save();
        await teacherModel.updateOne({ _id: userid }, {
            $push: {
                gallary: gallary._id
            }
        }, { new: true })
        res.status(201).json({
            message: 'Gallary has been uploaded'
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editGallary = async (req, res) => {
    const { id } = req.params
    try {
        const isUpdated = await gallaryModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdated) {
            res.status(200).json({
                message: 'Gallary has been Updated'
            })
        } else {
            res.status(404).json({
                message: 'Gallary not found'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const deleteGallary = async (req, res) => {
    const { id } = req.params
    const { userid } = req.user;

    try {
        const isDelete = await gallaryModel.findByIdAndDelete({ _id: id });

        if (isDelete) {

            await teacherModel.updateOne({ _id: userid }, {
                $pull: {
                    gallary: isDelete._id
                }
            }, { new: true })

            res.status(200).json({
                message: 'Gallary has been Deleted',
                isDelete: true
            })
        } else {
            res.status(404).json({
                message: 'Gallary not found',
                isDelete: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server  Error",
            error: error.message
        })
    }
}

module.exports = { getAllGallary, gallaryController, addGallary, editGallary, deleteGallary }