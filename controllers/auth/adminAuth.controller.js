const adminAuthModel = require("../../models/auth/adminAuth.model")
const bcrypt = require('bcryptjs');
const jwtToken = require("../../helpers/jwtToken");
const { secretKey } = require("../../secret/secret");

const getAllAdmin = async (req, res) => {
    const { search } = req.query;

    try {
        let admin;
        if (search) {
             admin = await adminAuthModel.find({ role: search }).select('-password');
          
        }else{
             admin = await adminAuthModel.find().select('-password');
          
        }

        res.status(200).json(admin)
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const registerAdmin = async (req, res) => {
    const { username, email, password, role } = req.body
    try {
        const hashPassword = bcrypt.hashSync(password, 10)
        const isEmailExist = await adminAuthModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                message: "Email Already Exist",
                isRegister: false
            })
        }

        const newAdmin = await adminAuthModel({
            username,
            email,
            password: hashPassword,
            role
        });
        await newAdmin.validate();
        await newAdmin.save();
        res.status(201).json({
            message: "Registration Successfull",
            isRegister: true,
            newAdmin
        });

    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    try {

        const isEmail = await adminAuthModel.findOne({ email });

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

const editAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await adminAuthModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdated) {
            res.status(200).json({
                message: "Updated successful", 
            })
        } else {
            res.status(200).json({
                message: "Record not found"
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const deleteAdmin = async (req, res) => {
    const { id } = req.params
    try {
        const isDelete = await adminAuthModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            res.status(200).json({
                message: 'Delete successful'
            })
        } else {
            res.status(200).json({
                message: 'Record not found'
            })
        }
    } catch (error) {
        res.status(200).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


module.exports = { getAllAdmin, registerAdmin, loginAdmin, editAdmin, deleteAdmin }




