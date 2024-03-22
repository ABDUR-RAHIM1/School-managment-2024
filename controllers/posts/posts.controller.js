const teacherModel = require("../../models/auth/teacherAuth.model");
const postModel = require("../../models/posts/posts.model");

const getAllPost = async (req, res) => {
    try {
        const posts = await postModel.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
};


const addPost = async (req, res) => {
    const { title, content, photo } = req.body;
    const { userid, username } = req.user;
    try {
        const newPost = await postModel({
            createdBy: userid,
            creator: username,
            title,
            content,
            photo
        });

        const post = await newPost.save();
        await teacherModel.updateOne({ _id: userid }, {
            $push: {
                posts: post._id
            }
        })
        res.status(201).json({
            message: "Post has been added"
        })
    } catch (error) {
        res.status(500).json({
            messgae: "Internal Server Error",
            error: error.message
        })
    }
};


const editPost = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdated = await postModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });
        if (isUpdated) {
            res.status(200).json({
                message: "Post Has been updated"
            })
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            messgae: "Internal Server Error",
            error: error.message
        })
    }
};


const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const isDelete = await postModel.findByIdAndDelete({ _id: id });
        if (isDelete) {
            await teacherModel.updateOne({ _id: isDelete.createdBy} , {
                $pull : {
                    posts : isDelete._id
                }
            })
            res.status(200).json({
                message: "Post has been deleted"
            })
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            messgae: "Internal Server Error",
            error: error.message
        })
    }
};

module.exports = { getAllPost, addPost, editPost, deletePost }