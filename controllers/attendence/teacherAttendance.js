const TeahcerAttendance = require("../../models/attandence/teacherAttendence")

//  get all for admin
const getAllTeahcerAttandance = async (req, res) => {
    try {
        const teacherAt = await TeahcerAttendance.find();
        res.status(200).json(teacherAt)
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
    const attendanceData = req.body;

    const attendances = attendanceData.map(attendance => ({
        teacherId: attendance.teacherId,
        email: attendance.email,
        date: attendance.date,
        status: attendance.status
    }));
    try {
        const existingAttendance = await TeahcerAttendance.find({ teacherId: req.body.map(ad => ad.teacherId), date: req.body.map(ad => ad.date) });



        if (existingAttendance.length > 0) {
            return res.status(400).json({ message: "Attendance records already exist for the Teacher on this date" });
        } else {

            const newAttendances = await TeahcerAttendance.insertMany(attendances)
            res.status(201).json({
                message: "Teacher attendance created successfully",
                attendances: newAttendances
            });
        }


    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
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
                message: "Updated Successful"
            })
        } else {
            res.status(404).json({
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
    const { id } = req.params;
    try {
        const isDelete = await TeahcerAttendance.findOneAndDelete({ _id: id });
        if (isDelete) {
            res.status(200).json({
                message: "Delete successful"
            })
        } else {
            res.status(404).json({
                message: "Record Not found"
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getAllTeahcerAttandance, getloginTeahcerAttandance, addTeahcerAttandance, editTeahcerAttandance, deleteTeahcerAttandance }