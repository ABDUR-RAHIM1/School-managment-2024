const teacherModel = require("../../models/auth/teacherAuth.model");
const classRoutineModel = require("../../models/classRoutine/classRoutine.model")


const getAllRoutine = async (req, res) => {
    try {
        const routines = await classRoutineModel.find();
        res.status(200).json(routines)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};

const addRoutine = async (req, res) => {
    const { classCode, dayOfWeek, startTime, endTime, subject, teacherName, teacherId } = req.body;
    try {
        const newRoutine = await classRoutineModel({
            classCode,
            dayOfWeek,
            startTime,
            endTime,
            subject,
            teacherName,
            teacherId
        });

        const routine = await newRoutine.save();
        await teacherModel.updateOne({ _id: teacherId }, {
            $push: {
                routine: routine._id
            }
        })
        res.status(201).json({
            message: "routine add successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await classRoutineModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdated) {
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
};

const deleteRoutine = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await classRoutineModel.findByIdAndDelete({ _id: id });
        if (isDelete) {
          
            res.status(200).json({
                message: "routine has been deleted"
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

module.exports = { getAllRoutine, addRoutine, editRoutine, deleteRoutine }