
const authModel = require("../../models/auth/studentAuth.model");
const profileModel = require("../../models/profile/studentProfile.model")

const getAllProfile = async (req, res) => {


    const { search } = req.query;
    try {
        const regex = new RegExp(search, 'i');
        const filter = {
            $or: [
                { name: { $regex: regex } },
                { classCode: { $regex: regex } },
                { group: { $regex: regex } },
            ]
        }
        if (search) {
            const profiles = await profileModel.find(filter)
            res.status(200).json(profiles)
        } else {
            const profiles = await profileModel.find()
            res.status(200).json(profiles)
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


//  based on login users
const getUserProfile = async (req, res) => {
    const { userid, email } = req.user;
    
    try {
        const profiles = await profileModel.find({ studentId: userid, email }); 
        res.status(200).json(profiles)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const createProfile = async (req, res) => {
    const {

        classCode,
        roll,
        group,
        session,
        dob,
        pob,
        address,
        city,
        postalCode,
        email,
        phone,
        emergencyContact,
        bloodGroup,
        religion,
        guardianName,
        occupation,
        relationWith,
        relationContact,
        photo,
        scholarship
    } = req.body;

    try {
        const isProfileExist = await profileModel.findOne({ studentId: req.user.userid })
        if (isProfileExist) {
            return res.status(400).json({
                message: "you have Create Already a Profile",
                ok: false,
            })
        }
        const newProfile = await profileModel({
            studentId: req.user.userid,
            name: req.user.username,
            classCode,
            roll,
            group,
            session,
            dob,
            pob,
            address,
            city,
            postalCode,
            email: req.user.email,
            phone,
            emergencyContact,
            bloodGroup,
            religion,
            guardianName,
            occupation,
            relationWith,
            relationContact,
            photo,
            scholarship
        });



        const profile = await newProfile.save();
        await authModel.find({ _id: req.user.userid });


        await authModel.updateOne({
            _id: req.user.userid
        }, {
            $push: {
                profile: profile._id
            }
        }, { new: true })

        res.status(201).json({
            message: "Profile Create Successfull",
            ok: true, 
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            ok:false
        })
    }
}

const editProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const updateProfile = await profileModel.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        if (updateProfile) {
            res.status(200).json({
                message: "Proifle Has been Updated"
            })
        } else {
            res.status(200).json({
                message: "Proifle not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteProfile = async (req, res) => {
    const { id } = req.params
    try {
        const isDelete = await profileModel.findByIdAndDelete(id);
        if (isDelete) {
            await authModel.updateOne(
                { _id: req.user.userid },
                { $pull: { profile: isDelete._id } },
                { new: true }
            );
            res.status(200).json({
                message: "Profile has been Delete"
            })
        } else {
            res.status(200).json({
                message: "Profile not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getAllProfile, getUserProfile, createProfile, editProfile, deleteProfile }