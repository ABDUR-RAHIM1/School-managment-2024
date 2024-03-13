
const Jwt = require("jsonwebtoken");

const authGuard = async (req, res, next) => {
    const tokenScrate = "abdurrahim"
    const { authorization } = req.headers

    try {
        const token = authorization.split(" ")[1];
        const decoded = Jwt.verify(token, tokenScrate)
        const { userId, userName } = decoded;
        req.userName = userName,
        req.userId = userId;
        next() 
    } catch (error) {
         
        res.status(400).json({
             message: "Authentication Failed",
             error : error.message
        })
    }

}

module.exports =  authGuard;