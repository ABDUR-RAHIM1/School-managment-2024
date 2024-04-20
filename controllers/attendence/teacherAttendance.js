const TeahcerAttendance = require("../../models/attandence/teacherAttendence");
const teacherModel = require("../../models/auth/teacherAuth.model");
const teacherProfile = require("../../models/profile/teacherProfile.model");

//  get all for admin
const getAllTeahcerAttandance = async (req, res) => {
    const { search } = req.query;
    try {
        if (search) {
            const regex = new RegExp(search, "i");
            const filter = {
                teacherName: { $regex: regex }
            }
            const teacherAt = await TeahcerAttendance.find(filter);
            res.status(200).json(teacherAt)
        } else {
            const teacherAt = await TeahcerAttendance.find();
            res.status(200).json(teacherAt)
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

//  get for teacher  
const getloginTeahcerAttandance = async (req, res) => {
    const { userid } = req.user;
    try {
        const attendance = await TeahcerAttendance.find({ teacherId: userid })
        res.status(200).json(attendance)
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//  add for admin
const addTeahcerAttandance = async (req, res) => {
    const { teacherId, dateByday, status } = req.body

    try {

        const isExist = await TeahcerAttendance.findOne({ teacherId });

        if (isExist) {
            const isExistDate = new Date(isExist.dateByday);
            const currentDate = new Date(dateByday);

            if (isExistDate.toISOString() === currentDate.toISOString()) {
                return res.status(400).json({
                    ok: false,
                    message: "Already Submitted!"
                });
            }

        };


        const teacher = await teacherProfile.findOne({ teacherId });

        const newAttendance = await TeahcerAttendance({
            teacherId,
            teacherName: teacher.name,
            email: teacher.email,
            dateByday,
            status
        });

        const attendance = await newAttendance.save();
        await teacherModel.updateOne({ _id: teacherId }, {
            $push: {
                attendance: attendance._id
            }
        }, { new: true })
        res.status(201).json({
            ok: true,
            message: "attendance submited"
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
        console.log(error)
    }
}

// edit for admin
const editTeahcerAttandance = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await TeahcerAttendance.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true })
        if (isUpdated) {
            res.status(200).json({
                ok: true,
                message: "Updated Successful"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "Attendance not found"
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}
//  delete for admin
const deleteTeahcerAttandance = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await TeahcerAttendance.deleteMany({ _id: { $in: ids } })
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

module.exports = { getAllTeahcerAttandance, getloginTeahcerAttandance, addTeahcerAttandance, editTeahcerAttandance, deleteTeahcerAttandance }