const NoticeModel = require("../../models/notice/notice.model")

const getAllNotice = async (req, res) => {
    const { search } = req.query;

    try {
        if (search) {
            const regex = new RegExp(search, "i")
            const notices = await NoticeModel.find({ subject: { $regex: regex } });
            res.status(200).json(notices)
        } else {
            const notices = await NoticeModel.find();
            res.status(200).json(notices)
        }
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
            ok: true,
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
                ok: true,
                message: "Notice updated",
            })
        } else {
            res.status(404).json({
                ok: false,
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
    const { ids } = req.body;
    try {
        const isDeleted = await NoticeModel.deleteMany({ _id: { $in: ids } })
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

module.exports = { getAllNotice, addNotice, editNotice, deleteNotice }