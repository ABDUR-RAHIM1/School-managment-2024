
const errorHandler = (err)=>{
    
    const errorServerHandler = (req, res) => {
         res.status(500).json({
             message :"Internal Server Error",
             error : err.message
         })
    }
 
    return errorServerHandler

}

module.exports = errorHandler
 