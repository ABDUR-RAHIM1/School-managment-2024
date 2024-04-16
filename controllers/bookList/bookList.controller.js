const bookListModel = require("../../models/bookList/bookList.model")

const getAllBookLists = async (req, res) => {
    const { search } = req.query;

    try {
        if (search) {
            const regex = new RegExp(search, "i");
            const filter = {
                $or: [
                    { group: { $regex: regex } },
                    { classCode: { $regex: regex } }
                ]
            }
            const bookLists = await bookListModel.find(filter);
            res.status(200).json(bookLists)
        } else {
            const bookLists = await bookListModel.find();
            res.status(200).json(bookLists)
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addBookList = async (req, res) => {
    const { classCode, group, subjectList, optional } = req.body;
    try {

        const isExist = await bookListModel.findOne({ classCode, group })

        if (isExist) {
            return res.status(400).json({
                ok: false,
                message: "Booklist have already Exist!"
            })
        }

        const newList = await bookListModel({
            classCode,
            group,
            subjectList,
            optional
        });

        await newList.save();
        res.status(201).json({
            ok: true,
            message: "booklist added"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editBookLists = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await bookListModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });
        if (isUpdated) {
            res.status(200).json({
                ok: true,
                message: "Booklist has been updated!"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "Booklist not found!"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteBookLists = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await bookListModel.deleteMany({ _id: { $in: ids } })
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

module.exports = { getAllBookLists, addBookList, editBookLists, deleteBookLists }