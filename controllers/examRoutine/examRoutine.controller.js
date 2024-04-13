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
    const { examName, classCode, subject, examDate, examTime } = req.body;
    try {

        const isExist = await examRoutineModel.findOne({ examName });

        // const condition = isExist && isExist.examTime === examTime && isExist.subject === subject
        const condition = false
        if (condition) {
            return res.status(400).json({
                ok: false,
                message: "Routine already exists for this class and subject at the same time"
            });
        } else {
            const newRoutine = await examRoutineModel({
                examName,
                classCode,
                subject,
                examDate,
                examTime
            });
            await newRoutine.save();
            res.status(201).json({
                ok: true,
                message: 'Routine has been created successfully'
            })
        }


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
        console.log(error)
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
                ok: true,
                message: "routine has been updated"
            })
        } else {
            res.status(404).json({
                ok: false,
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
    const { ids } = req.body
    try {
        const isDeleted = await examRoutineModel.deleteMany({ _id: { $in: ids } })
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


module.exports = { getAllExamRoutine, addExamRoutine, editExamRoutine, deleteExamRoutine }