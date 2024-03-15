const studentsAuth = require("../../models/auth/studentAuth.model");
const TodosModel = require("../../models/todos/todos.model")


const getAllTodos = async (req, res) => {
    try {
        const todos = await TodosModel.find();
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}


const getUsersTodos = async (req, res) => {
    const { userid } = req.user;
    try {
        const todos = await TodosModel.find({ studentId: userid });
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}

const addTodo = async (req, res) => {
    const { title, desc } = req.body;
    const { userid } = req.user
    try {
        const newTodo = await TodosModel.create({
            studentId: userid,
            title,
            desc
        });

        const todos = await newTodo.save();
        await studentsAuth.updateOne({ _id: userid }, {
            $push: {
                todos: todos._id
            }
        }, { new: true });

        res.status(201).json({
            message: "Todo add successful",
            todos
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}

const editTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const isUpdate = await TodosModel.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        if (isUpdate) {
            res.status(200).json({
                message: "Update successful"
            })
        } else {
            res.status(200).json({
                message: "Record not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const {userid} = req.params
    try {
        const isDelete = await TodosModel.findByIdAndDelete({ _id: id });

        if (isDelete) {
            await studentsAuth.updateOne({_id:userid}, {
                $pull : {
                    todos : isDelete._id
                }
            })
            res.status(200).json({
                message: "Delete successful"
            })
        } else {
            res.status(200).json({
                message: "Record not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
};


module.exports = { getAllTodos, getUsersTodos, addTodo, editTodo, deleteTodo }