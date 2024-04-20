const teacherModel = require("../../models/auth/teacherAuth.model");
const teacherProfile = require("../../models/profile/teacherProfile.model")

const getAllProfiles = async (req, res) => {
    const { search } = req.query;
    try {

        if (search) {
            const regex = new RegExp(search, "i")
            const filter = {
                name: { $regex: regex }
            }
            const profile = await teacherProfile.find(filter);
            res.status(200).json(profile)
        } else {
            const profile = await teacherProfile.find();
            res.status(200).json(profile)
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//  login teachers profile

const getLoginTechersProfile = async (req, res) => {
    const { userid, email } = req.user;
    try {
        const profile = await teacherProfile.find({ userId: userid, email });
        res.status(200).json({
            teacherProfile: profile
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//  create teachers profile

const createTechersProfile = async (req, res) => {

    const { name, dateOfBirth, gender, qualification, experience, subjects, photo } = req.body;

    const { userid, email } = req.user;

    const isExistProfile = await teacherProfile.findOne({ userId: userid });

    if (isExistProfile) {
        return res.status(400).json({
            message: "you have create already a profile"
        })
    }

    try {
        const newProfile = await teacherProfile({
            teacherId: userid,
            name,
            email: email,
            dateOfBirth,
            gender,
            qualification,
            experience,
            subjects,
            photo
        })

        const profile = await newProfile.save();

        await teacherModel.updateOne({ _id: userid }, {
            $push: {
                profile: profile._id
            }
        })

        res.status(201).json({
            message: "Profile Create Successful",
            profile
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


//  edit prifiles

const editTechersProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const isEdit = await teacherProfile.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (isEdit) {
            res.status(200).json({
                message: "Update successful"
            })
        } else {
            res.status(200).json({
                message: "profile not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


//  delete profiles


const deleteTechersProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const isDelete = await teacherProfile.findByIdAndDelete(id);
        if (isDelete) {
            res.status(200).json({
                message: 'Delete successful'
            })
        } else {
            res.status(200).json({
                message: 'Profile not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}




module.exports = { getAllProfiles, getLoginTechersProfile, createTechersProfile, editTechersProfile, deleteTechersProfile }