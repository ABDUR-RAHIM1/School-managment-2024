const authModel = require("../../models/auth/studentAuth.model");
const feeModel = require("../../models/fee/fee.model");
const profileModel = require("../../models/profile/studentProfile.model");

const getAllFee = async (req, res) => {
    const { search } = req.query;
    try {

        if (search) {
            const regex = new RegExp(search, "i");
            const filter = {
                $or: [
                    { studentName: { $regex: regex } },
                    { classCode: { $regex: regex } }
                ]
            }
            const fees = await feeModel.find(filter);
            res.status(200).json(fees)
        } else {
            const fees = await feeModel.find();
            res.status(200).json(fees)
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const addFee = async (req, res) => {
    const { studentId, feeAmount, feePaid, feeFor } = req.body;
    try {

        const studentInfo = await profileModel.findOne({ studentId });
        const existingFee = await feeModel.findOne({ studentId, feeFor });

        if (!studentInfo) {
            return res.status(404).json({ ok: false, message: "student not found" })
        }

        if (existingFee && existingFee.feeFor === feeFor) {
            return res.status(400).json({
                ok: false,
                message: "Fee already exists for this student"
            })
        }

        const newFee = await feeModel({
            studentId,
            studentName: studentInfo.name,
            classCode: studentInfo.classCode,
            group: studentInfo.group,
            roll: studentInfo.roll,
            feeAmount,
            feePaid,
            feeFor
        });
        const fee = await newFee.save();

        await authModel.updateOne({ _id: studentId }, {
            $push: {
                fee: fee._id
            }
        })

        res.status(201).json({
            ok: true,
            message: "fee added successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editFee = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await feeModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdate) {
            res.status(200).json({
                ok: true,
                message: 'Fee has been updated'
            })
        } else {
            res.status(404).json({
                ok: false,
                message: 'Fee not found'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteFee = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await feeModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            res.status(200).json({
                ok: true,
                message: "Delete successful"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "record not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};



module.exports = { getAllFee, addFee, editFee, deleteFee };