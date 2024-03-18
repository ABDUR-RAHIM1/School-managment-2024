const StaffModel = require("../../models/staff/staff.model")

const getAllStaff = async (req, res) => {
    try {
        const staffs = await StaffModel.find();
        res.status(200).json(staffs)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const addStaff = async (req, res) => {
    const { username, position, photo } = req.body
    try {
        const newStaff = await StaffModel({
            username,
            position,
            photo
        });
        await newStaff.save();

        res.status(201).json({
            message :"staff create successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const editStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await StaffModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });
 
        if (isUpdated) {
            res.status(200).json({
                message: "staff has been updated", 
            })
        } else {
            res.status(404).json({
                message: "staff not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const deleteStaff = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await StaffModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            res.status(200).json({
                message: "staff has been deleted"
            })
        } else {
            res.status(404).json({
                message: "staff not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};


module.exports = { getAllStaff, addStaff, editStaff, deleteStaff };