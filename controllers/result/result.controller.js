const authModel = require("../../models/auth/studentAuth.model");
const ResutlsModel = require("../../models/result/result.model");


//  for admin 
const getAllResult = async (req, res) => {
    try {
        const results = await ResutlsModel.find();
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addResult = async (req, res) => {
    const { studentId, studentName, classCode, examName, subjects, marks } = req.body;
    try {
        const newResutls = await ResutlsModel({
            studentId,
            studentName,
            classCode,
            examName,
            subjects,
            marks
        });

        await newResutls.save();
        await authModel.updateOne({ _id: studentId }, {
            $push: {
                results: newResutls._id
            }
        }, { new: true });

        res.status(201).json({
            message: "result Published",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editResult = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await ResutlsModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdate) {
            res.status(200).json({
                message: "Result has been updated"
            })
        } else {
            res.status(404).json({
                message: "Result not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteResult = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await ResutlsModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            res.status(200).json({
                message: "Result has been Deleted"
            })
        } else {
            res.status(404).json({
                message: "Result not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


module.exports = { getAllResult, addResult, editResult, deleteResult }