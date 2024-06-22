const ComplinModel = require("../../models/complain/complain.model")
const studentAuth = require("../../models/auth/studentAuth.model");

//  for admin
const getAllComplain = async (req, res) => {
    const { search } = req.query;
    const regex = new RegExp(search, 'i');
    const filter = {
        $or: [
            { studentName: { $regex: regex } },
            { isCheck: { $regex: regex } }
        ]
    }
    try {
        if (search) {
            const complains = await ComplinModel.find(filter);
            res.status(200).json(complains)
        } else {
            const complains = await ComplinModel.find();
            res.status(200).json(complains)
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}

//  get login student's complain

const getCompalain = async (req, res) => {
    const { userid } = req.user;
    try {

        const complain = await ComplinModel.find({ studentId: userid });
        res.status(200).json(complain)

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message,
        })

    }
}

// for student
const addComplain = async (req, res) => {
    const { subject, details, photo } = req.body;
    const { userid, username, email } = req.user;
    try {
        const newComplain = await ComplinModel({
            studentId: userid,
            studentName: username,
            studentEmail: email,
            subject,
            details,
            photo
        });

        const complain = await newComplain.save();

        await studentAuth.updateOne({ _id: userid }, {
            $push: {
                complains: complain._id
            }
        })

        res.status(201).json({
            message: "submited complain",
            ok: true,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message,
            ok: false,
        })
    }
}

//  for student
const editComplain = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await ComplinModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });


        if (isUpdate) {
            res.status(200).json({
                message: "Update successfull",
                ok: true,
            })
        } else {
            res.status(200).json({
                message: "Record not found",
                ok: false,
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message,
            ok: false,
        })
    }
}

// for admin 
const checkComplain = async (req, res) => {
    const { id } = req.params;
    const isChceking = await ComplinModel.findByIdAndUpdate({ _id: id },
        { isCheck: "checked" },
        { new: true });

    if (isChceking) {
        res.status(200).json({
            message: "Seen",
            ok: true,
        })
    } else {
        res.status(404).json({
            message: "complain not found",
            ok: false,
        })
    }
    try {

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//  for students
const deleteComplain = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await ComplinModel.findByIdAndDelete({ _id: id });
        if (isDelete) {

            await studentAuth.updateOne({ _id: isDelete.studentId }, {
                $pull: {
                    complains: isDelete._id
                }
            })

            res.status(200).json({
                message: "Delete successful",
                ok: true,
            })
        } else {
            res.status(200).json({
                message: "Record not found",
                ok: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message,
            ok: false,
        })
    }
}





module.exports = { getAllComplain, getCompalain, addComplain, checkComplain, editComplain, deleteComplain }