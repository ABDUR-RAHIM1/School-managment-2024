
const bcrypt = require('bcryptjs');
const jwtToken = require("../../helpers/jwtToken");
const { secretKey } = require("../../secret/secret");
const authModel = require('../../models/auth/studentAuth.model');

// this route only for admin 
const getAllAccount = async (req, res) => {
    try {
        const allStudent = await authModel.find()
        res.status(200).json(allStudent)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

//  get login user information for login persons
const getLoginAccount = async (req, res) => {
    const { userid, email } = req.user;
    try {
        const allStudent = await authModel.find({ _id: userid, email })
        .populate("profile")
        .populate("todos");
        res.status(200).json(allStudent)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


const register = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        const hashPassword = bcrypt.hashSync(password, 10)
        const isEmailExist = await authModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                message: "Email Already Exist",
                isRegister: false
            })
        }

        const newStudent = await authModel({
            username,
            email,
            password: hashPassword,
            role
        });
        await newStudent.validate();
        await newStudent.save();
        res.status(201).json({
            message: "Registration Successfull",
            isRegister: true,
            newStudent
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            isRegister: false
        })
    }
}

//  login 
const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const isEmail = await authModel.findOne({ email });

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
            }else{
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


const edit = async (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params

    try {
        const updatedUser = await authModel.findByIdAndUpdate(id,
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


const deleteOne = async (req, res) => {
    const { id } = req.params
    try {
        const isDelete = await authModel.findByIdAndDelete(id)
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


module.exports = { getAllAccount, getLoginAccount, register, login, edit, deleteOne }