const teacherModel = require("../../models/auth/teacherAuth.model");
const classRoutineModel = require("../../models/classRoutine/classRoutine.model")


const getAllRoutine = async (req, res) => {
    try {
        const { search } = req.query;
        const regex = new RegExp(search, "i");
        const filter = {
            $or: [
                { teacherName: { $regex: regex } },
                { classCode: { $regex: regex } },
            ]
        }

        if (search) {
            const routines = await classRoutineModel.find(filter);
            res.status(200).json(routines)
        } else {
            const routines = await classRoutineModel.find();
            res.status(200).json(routines)
        }
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
        const teacher = await teacherModel.findOne({ _id: teacherId });

        const newRoutine = await classRoutineModel({
            teacherId,
            teacherName: teacher.username,
            classCode,
            subject,
            dayOfWeek,
            startTime,
            endTime
        });

        const routine = await newRoutine.save();
        await teacherModel.updateOne({ _id: teacherId }, {
            $push: {
                routine: routine._id
            }
        })
        res.status(201).json({
            message: "routine add successful",
            routine
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
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

            await teacherModel.updateOne({ _id: isDelete.teacherId }, {
                $pull: {
                    routine: isDelete._id
                }
            }, { new: true })

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

const deleteManyRoutine = async (req, res) => {
  
        const { ids } = req.body
        try {
            const isDeleted = await classRoutineModel.deleteMany({ _id: { $in: ids } })
            if (isDeleted) {

                res.status(200).json({ message: 'Documents deleted successfully', isDelete: true });
            } else {
                res.status(404).json({ message: 'Documents have not been deleted', isDelete: false });
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            })
        }

}

module.exports = { getAllRoutine, addRoutine, editRoutine, deleteRoutine, deleteManyRoutine }