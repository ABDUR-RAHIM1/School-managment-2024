const Attendance = require("../../models/attandence/attandence.model");
const authModel = require("../../models/auth/studentAuth.model");
const profileModel = require("../../models/profile/studentProfile.model");

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

    const { studentId, dateByday, status } = req.body
    try {

        const student = await profileModel.findOne({ studentId });

  
        const isExist = await Attendance.findOne({ studentId });

        if (isExist) {
            const isExistDate = new Date(isExist.dateByday);
            const currentDate = new Date(dateByday);
           
            if (isExistDate.toISOString() === currentDate.toISOString()) {
                return res.status(400).json({
                    ok: false,
                    message: "Already Submitted!"
                });
            }

        }
        ;
        const newAttendance = await Attendance({
            studentId,
            studentName: student.name,
            classCode: student.classCode,
            group: student.group,
            roll: student.roll,
            dateByday,
            status
        });

        const attendance = await newAttendance.save();
        await authModel.updateOne({ _id: studentId }, {
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
        const isDelete = await Attendance.findOneAndDelete({ _id: id });
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