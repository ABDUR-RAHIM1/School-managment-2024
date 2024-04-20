const teacherModel = require("../../models/auth/teacherAuth.model")
const bcrypt = require('bcryptjs');
const jwtToken = require("../../helpers/jwtToken");
const { secretKey } = require("../../secret/secret");

const getAllTeachers = async (req, res) => {
    const { search } = req.query;
    try {
        const regex = new RegExp(search, 'i');
        const filter = {
            $or: [
                { username: { $regex: regex } },
                { status: { $regex: regex } }
            ]
        }
        if (search) {
            const allTeachers = await teacherModel.find(filter).select("-password")
            res.status(200).json(allTeachers)
        } else {
            const allTeachers = await teacherModel.find().select("-password")
            res.status(200).json(allTeachers)
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const getLoginTeacher = async (req, res) => {
    const { userid, email } = req.user;
    try {
        const allStudent = await teacherModel.find({ _id: userid, email })
            .populate("profile")
            .populate("posts")
            .populate("routine")
            .populate("gallary")
        res.status(200).json(allStudent)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// get profile all details using  id
const getTeacherProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const isProfile = await teacherModel.findOne({ _id: id })
            .populate("profile")
            .populate("attendance")
            .populate("posts")
            .populate("routine")
            .populate("gallary")
        res.send(isProfile)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const registerTeacher = async (req, res) => {
    const { username, email, position, password, photo } = req.body
    try {

        const hashPassword = bcrypt.hashSync(password, 10)
        const isEmailExist = await teacherModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                ok: false,
                message: "Email Already Exist"
            })
        }

        const newTeacher = await teacherModel({
            username,
            email,
            position,
            password: hashPassword,
            photo
        });

        const teacher = await newTeacher.save();

        res.status(201).json({
            ok: true,
            message: "Register Successfull",
            teacher
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


//  isApprove

const controllTeacher = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await teacherModel.findByIdAndUpdate(id,
            {
                $set: req.body
            },
            { new: true });

        if (!isUpdate) {
            return res.status(404).json({ message: "User not found", ok: false });
        }
        res.status(200).json({
            message: `has been ${isUpdate.status} successfully`,
            ok: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}


const loginTeacher = async (req, res) => {
    const { email, password } = req.body

    try {

        const isEmail = await teacherModel.findOne({ email });

        if (isEmail.status !== "active") {
            return res.status(400).json(
                {
                    message: "Your account has not been activated yet. Please contact with admin!",
                    ok: false,
                }
            )
        }

        if (isEmail) {
            const isPassword = bcrypt.compareSync(password, isEmail.password);

            if (isPassword) {
                res.status(200).json({
                    message: "Login Successful",
                    token: jwtToken({
                        userid: isEmail._id,
                        username: isEmail.username,
                        email: isEmail.email
                    }, secretKey),
                    ok: true,
                })
            } else {
                return res.status(404).json({
                    message: "Invalid Credential",
                    isLogin: false
                })
            }

        } else {
            return res.status(404).json({
                message: "Invalid Credential",
                ok: false,
            })
        }


    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            isRegister: false
        })
    }
}


const editTeacher = async (req, res) => {
    const { id } = req.params

    try {
        const updatedUser = await teacherModel.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        if (updatedUser) {
            res.status(200).json({
                ok: true,
                message: "Update Successful",
                updatedUser
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "user Not Found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const deleteOneTeacher = async (req, res) => {
    const { id } = req.params
    try {
        const isDelete = await teacherModel.findByIdAndDelete(id)
        if (isDelete) {
            res.status(200).json({
                ok: true,
                message: "Delete Successfull"
            })
        } else {
            res.status(200).json({
                ok: false,
                message: "user not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteMany = async (req, res) => {
    const { ids } = req.body
    try {
        const isDeleted = await teacherModel.deleteMany({ _id: { $in: ids } })
        if (isDeleted) {
            res.status(200).json({ message: 'Documents deleted successfully', ok: true });
        } else {
            res.status(404).json({ message: 'Documents have not been deleted', ok: false });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { getAllTeachers, getLoginTeacher, getTeacherProfile, registerTeacher, controllTeacher, loginTeacher, editTeacher, deleteOneTeacher, deleteMany }