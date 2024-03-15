const Attendance = require("../../models/attandence/attandence.model"); 

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

const addAttendence = async (req, res) => {

    try {
        const existingAttendance = await Attendance.find({ student: req.body.map(ad => ad.student), date: req.body.map(ad => ad.date) });

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
    try {
        res.send("edit")
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteAttendence = async (req, res) => {
    try {
        res.send("delete")
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getAllAttendence, addAttendence, editAttendence, deleteAttendence }