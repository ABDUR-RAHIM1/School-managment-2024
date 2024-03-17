const ComplinModel = require("../../models/complain/complain.model")
const studentAuth = require("../../models/auth/studentAuth.model"); 
 
//  for admin
const getAllComplain = async (req, res) => {
    try {
        const complains = await ComplinModel.find();
        res.status(200).json(complains)
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}


// for student
const addComplain = async (req, res) => {
    const {subject , details} = req.body;
    const {userid , username , email} = req.user;
    try {
       const newComplain = await ComplinModel({
           studentId : userid,
           studentName : username,
           studentEmail:email,
           subject,
           details
       });

       const complain = await newComplain.save();

       await studentAuth.updateOne({_id:userid}, {
             $push : {
                complains : complain._id
             }
       })
       
       res.status(201).json({
        message : "submited complain",
        complain
       })
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}

//  for student
const editComplain = async (req, res) => {
    const {id} = req.params;
    try {
         const isUpdate = await ComplinModel.findByIdAndUpdate({_id :id}, {
            $set : req.body
         }, {new :true} );


         if (isUpdate) {
             res.status(200).json({
                message :"Update successfull"
             })
         }else{
            res.status(200).json({
                message :"Record not found"
             })
         }

    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}


//  for students
const deleteComplain = async (req, res) => {
    const {id} = req.params;
    const {userid} = req.user;
    try {
         const isDelete = await ComplinModel.findByIdAndDelete({_id : id});
         if (isDelete) {

            await studentAuth.updateOne({_id : userid}, {
                    $pull:{
                        complains : isDelete._id
                    }
            })

             res.status(200).json({
                message :"Delete successful"
             })
         }else{
            res.status(200).json({
                message :"Record not found"
             })
         }
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error",
            error: error.message
        })
    }
}


module.exports ={getAllComplain , addComplain , editComplain , deleteComplain}