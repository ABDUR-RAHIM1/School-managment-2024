const StaffModel = require("../../models/staff/staff.model")
const getAllStaff = async (req, res) => {
    const { search } = req.query;
    try {
        let query = {};

        if (search) {
            const regEx = new RegExp(search, "i");
            query = { username: { $regex: regEx } };
        }

        const staffs = await StaffModel.find(query);
        res.status(200).json(staffs);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        });
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
            message: "staff create successful"
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
    const { ids } = req.body
    try {
        if (ids.length < 0) {
            return res.status(400).json({
                message: "Not selected "
            })
        }
        const isDeleted = await StaffModel.deleteMany({ _id: { $in: ids } })
        if (isDeleted) {
            res.status(200).json({ message: 'Documents deleted successfully', isDelete: true });
        } else {
            res.status(404).json({ message: 'Documents have not been deleted', isDelete: false });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
};


module.exports = { getAllStaff, addStaff, editStaff, deleteStaff };