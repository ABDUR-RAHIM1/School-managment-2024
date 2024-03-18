const bookListModel = require("../../models/bookList/bookList.model")

const getAllBookLists = async (req, res) => {
    try {
        const bookLists = await bookListModel.find();
        res.status(200).json(bookLists)
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
                message: "Booklist has been updated!"
            })
        } else {
            res.status(404).json({
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
    const { id } = req.params;
    try {
        const isDelete = await bookListModel.findByIdAndDelete({ _id: id });
        if (isDelete) {
            res.status(200).json({
                message: "Booklist has been Deleted!"
            })
        } else {
            res.status(404).json({
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

module.exports = { getAllBookLists, addBookList, editBookLists, deleteBookLists }