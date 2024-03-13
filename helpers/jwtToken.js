
const jwt = require("jsonwebtoken");

const jwtToken = (data , secretKey)=>{
     const token = jwt.sign(data , secretKey)

     return token
}

module.exports = jwtToken