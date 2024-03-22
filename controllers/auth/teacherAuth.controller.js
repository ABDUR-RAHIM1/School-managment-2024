const teacherModel = require("../../models/auth/teacherAuth.model")
const bcrypt = require('bcryptjs');
const jwtToken = require("../../helpers/jwtToken");
const { secretKey } = require("../../secret/secret");

const getAllTeachers = async (req, res) => {
    try {
        const allTeachers = await teacherModel.find()
        res.status(200).json(allTeachers)
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

const registerTeacher = async (req, res) => {
    const { username, email, password } = req.body
    try {

        const hashPassword = bcrypt.hashSync(password, 10)
        const isEmailExist = await teacherModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                message: "Email Already Exist"
            })
        }

        const newTeacher = await teacherModel({
            username,
            email,
            password: hashPassword
        });

        const teacher = await newTeacher.save();

        res.status(201).json({
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



const loginTeacher = async (req, res) => {
    const { email, password } = req.body
    try {

        const isEmail = await teacherModel.findOne({ email });

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
                    isLogin: true
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
                isLogin: false
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
    const { username, email, password } = req.body;
    const { id } = req.params

    try {
        const updatedUser = await teacherModel.findByIdAndUpdate(id,
            { username, email, password },
            { new: true });

        if (updatedUser) {
            res.status(200).json({
                message: "Update Successful"
            })
        } else {
            res.status(404).json({
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
                message: "Delete Successfull"
            })
        } else {
            res.status(200).json({
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


module.exports = { getAllTeachers, getLoginTeacher, registerTeacher, loginTeacher, editTeacher, deleteOneTeacher }