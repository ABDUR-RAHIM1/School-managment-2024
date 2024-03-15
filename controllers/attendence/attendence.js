const Attendance = require("../../models/attandence/attandence.model");

// this for admin and modarator
const getAllAttendence = async (req, res) => {
    try {
        const attendance = await Attendance.find()
        res.status(200).json(attendance)
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//  this for perticuler students who was login 
const getLoginStudentsAttendance = async (req, res) => {
    const { userid } = req.user;
    try {
        const attendance = await Attendance.find({ studentId: userid })
        res.status(200).json(attendance)
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addAttendence = async (req, res) => {

    try {
        const existingAttendance = await Attendance.find({ studentId: req.body.map(ad => ad.studentId), date: req.body.map(ad => ad.date) });

        if (existingAttendance.length > 0) {
            return res.status(400).json({ message: "Attendance records already exist for the student on this date" });
        } else {
            const attendance = await Attendance.insertMany(req.body);

            return res.status(201).json({ message: "Attendance records created successfully", attendance });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const editAttendence = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await Attendance.findByIdAndUpdate({ _id: id }, {
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

const deleteAttendence = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await Attendance.findOneAndDelete({_id:id});
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

module.exports = { getAllAttendence, getLoginStudentsAttendance, addAttendence, editAttendence, deleteAttendence }