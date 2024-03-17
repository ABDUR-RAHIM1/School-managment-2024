const NoticeModel = require("../../models/notice/notice.model")

const getAllNotice = async (req, res) => {
    try {
        const notices = await NoticeModel.find();
        res.status(200).json(notices)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addNotice = async (req, res) => {
    const { subject, details } = req.body;
    try {
        const newNotice = await NoticeModel({
            subject,
            details
        });

        await newNotice.save();
        res.status(201).json({
            message: "notice added successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editNotice = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await NoticeModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdated) {
            res.status(200).json({
                message: "Notice updated"
            })
        } else {
            res.status(404).json({
                message: "Notice not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteNotice = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await NoticeModel.findByIdAndDelete({ _id: id });
        if (isDelete) {
            res.status(200).json({
                message: "Notice has been Deleted"
            })
        } else {
            res.status(404).json({
                message: "Notice not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getAllNotice, addNotice, editNotice, deleteNotice }