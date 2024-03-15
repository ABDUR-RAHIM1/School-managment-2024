
const mongoose = require("mongoose");

const todosSchema = mongoose.Schema({
    studentId : {
        type : mongoose.Types.ObjectId,
        ref :"studentAuth",
        required :true
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    desc: {
        type: String,
        required: [true, "Description is required"]
    },
   
} ,  { timestamps: true });

const TodosModel = mongoose.model("Todos", todosSchema);


module.exports = TodosModel;