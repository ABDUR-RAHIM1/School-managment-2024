
const bcrypt = require('bcryptjs');
const jwt = require("../../helpers/jwtToken");
const { secretKey } = require("../../secret/secret");
const authModel = require('../../models/auth/studentAuth.model');

// this route only for admin 
const getAllAccount = async (req, res) => {

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
            const allStudent = await authModel.find(filter).select("-password")
            res.status(200).json(allStudent)
        } else {
            const allStudent = await authModel.find().select("-password")
            res.status(200).json(allStudent)
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// get profile all details using  id
const getStudentProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const isProfile = await authModel.findOne({ _id: id })
            .select("-password")
            .populate("profile")
            .populate("attendance")
            .populate("results")
            .populate("todos")
            .populate("complains")
            .populate("fee")
        res.send(isProfile)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}


//  get login user information for login persons
// const getLoginAccount = async (req, res) => {
//     const { userid, email } = req.user;

//     try {
//         const allStudent = await authModel.findOne({ _id: userid, email })
//             .select("-password")
//             .populate("profile")
//             .populate("results")
//             .populate("todos")
//             .populate("attendance")
//             .populate("complains")
//             .populate("fee")
//         res.status(200).json(allStudent)

//     } catch (error) {
//         res.status(500).json({
//             message: "Internal Server Error 2",
//             error: error.message
//         })
//         console.log(error)
//     }
// }

const getLoginAccount = async (req, res) => {
    const { userid, email } = req.user;

    try {
        const loginStudent = await authModel.findOne({ _id: userid, email })
            .select("-password")
        // .populate("profile")
        // .populate("attendance")
        // .populate("results")
        // .populate("todos")
        // .populate("complains")
        // .populate("fee")
        res.status(200).json(loginStudent)

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        console.log(error)
    }
}

const register = async (req, res) => {
    const { username, email, password, photo } = req.body
    try {
        const hashPassword = bcrypt.hashSync(password, 10)
        const isEmailExist = await authModel.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                message: "Email Already Exist",
                ok: false
            })
        }

        const newStudent = await authModel({
            username,
            email,
            password: hashPassword,
            photo
        });
        await newStudent.validate();
        await newStudent.save();
        res.status(201).json({
            message: "Registration Successfull",
            ok: true,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            isRegister: false
        })
    }
}


//  approve account -> used this api for admin
const controllAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await authModel.findByIdAndUpdate(id,
            {
                $set: req.body
            },
            { new: true });

        if (!isUpdate) {
            return res.status(404).json({ message: "teacher not found", ok: false });
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



//  login 
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isEmail = await authModel.findOne({ email });

        if (isEmail) {
            if (isEmail.status !== "active") {
                return res.status(400).json({
                    message: "Your account has not been activated yet. Please contact with admin!",
                    ok: false
                });
            }
            const isPassword = bcrypt.compareSync(password, isEmail.password);

            if (isPassword) {
                const token = jwt(
                    {
                        userid: isEmail._id,
                        username: isEmail.username,
                        email: isEmail.email
                    },
                    secretKey,
                    { expiresIn: '1h' } // Adding token expiration time
                );

                // Set token in cookies
                // await res.cookie('student_auth_token', token, {
                //     httpOnly: true,
                //     secure: false, // Set to true if using HTTPS
                //     sameSite: 'Strict',
                // });

                const studentInfo = {
                    username: isEmail.username,
                    email: isEmail.email,
                    photo: isEmail.photo || "",
                    role: isEmail.role
                }
                console.log(isEmail.role)
                res.status(200).json({
                    message: "Login Successful",
                    token: token,
                    info: studentInfo,
                    ok: true
                });
            } else {
                return res.status(404).json({
                    message: "Invalid Credential",
                    ok: false
                });
            }
        } else {
            return res.status(404).json({
                message: "Invalid Credential",
                ok: false,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            ok: false,
        });
    }
};



const edit = async (req, res) => {
    const { id } = req.params;

    try {

        const isUser = await authModel.findById(id);

        if (!isUser) {
            return res.status(404).json({
                ok: false,
                message: "User not found"
            });
        }

        const exitsEmail = await authModel.findOne({ email: req.body.email });

        if (exitsEmail && exitsEmail._id.toString() !== id) {
            return res.status(400).json({
                ok: false,
                message: "Email already exists"
            });
        }

        const updatedUser = await authModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (updatedUser) {
            return res.status(200).json({
                ok: true,
                message: "Update successful",
            });
        } else {
            return res.status(404).json({
                ok: false,
                message: "Update failed, user not found"
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



const deleteOne = async (req, res) => {
    const { id } = req.params
    try {
        const isDelete = await authModel.findByIdAndDelete(id)
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
        const isDeleted = await authModel.deleteMany({ _id: { $in: ids } })
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

module.exports = { getAllAccount, getStudentProfile, getLoginAccount, register, controllAccount, login, edit, deleteOne, deleteMany }