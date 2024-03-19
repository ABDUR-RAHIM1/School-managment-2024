const examRoutineModel = require("../../models/examRoutine/examRoutine.model")

const getAllExamRoutine = async (req, res) => {
    try {
        const routine = await examRoutineModel.find();
        res.status(200).json(routine)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const addExamRoutine = async (req, res) => {
    const { classCode, subject, examTime } = req.body;
    try {

        const isExist = await examRoutineModel.findOne({ classCode, examTime, subject });

        if (isExist) {
            return res.status(400).json({
                message: "Routine already exists for this class and subject at the same time"
            });
        }

        const newRoutine = await examRoutineModel({
            classCode,
            subject,
            examTime
        });
        await newRoutine.save();
        res.status(201).json({
            message: 'Routine has been created successfully'
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const editExamRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await examRoutineModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdate) {
            res.status(200).json({
                message: "routine has been updated"
            })
        } else {
            res.status(200).json({
                message: "routine not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteExamRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await examRoutineModel.findByIdAndDelete({ _id: id });
        if (isDelete) {
            res.status(200).json({
                message: "routine has been Deleted"
            })
        } else {
            res.status(200).json({
                message: "routine not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


module.exports = { getAllExamRoutine, addExamRoutine, editExamRoutine, deleteExamRoutine }