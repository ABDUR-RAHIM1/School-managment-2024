const authModel = require("../../models/auth/studentAuth.model");
const profileModel = require("../../models/profile/studentProfile.model");
const ResutlsModel = require("../../models/result/result.model");


//  for admin 
const getAllResult = async (req, res) => {
    try {
        const results = await ResutlsModel.find();
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const addResult = async (req, res) => {
    const { studentId, year, examName, subjects, marks } = req.body;
     
    try {
        const isExist = await ResutlsModel.findOne({ studentId });
      
        if (isExist && isExist.year === String(year) && isExist.examName === examName) {
           res.status(400).json({
            message : "Already Published !"
           })
           return ;
        } 
        const studentInfo = await profileModel.findOne({ studentId });

        const newResutls = await ResutlsModel({
            studentId,
            year,
            studentName: studentInfo.name,
            classCode: studentInfo.classCode,
            roll: studentInfo.roll,
            group: studentInfo.group,
            examName,
            subjects,
            marks
        });

        await newResutls.save();
        await authModel.updateOne({ _id: studentId }, {
            $push: {
                results: newResutls._id
            }
        }, { new: true });

        res.status(201).json({
            ok: true,
            message: "result Published",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const editResult = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await ResutlsModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdate) {
            res.status(200).json({
                ok: true,
                message: "Result has been updated"
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "Result not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteResult = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await ResutlsModel.deleteMany({ _id: { $in: ids } })
        if (isDeleted) {
            res.status(200).json({ message: 'Documents deleted successfully', ok: true });
        } else {
            res.status(404).json({ message: 'Documents have not been deleted', ok: false });
        }
    } catch (error) {
        res.status(500).json({
            message: error._message,
            error: error.message
        })
    }
}


module.exports = { getAllResult, addResult, editResult, deleteResult }