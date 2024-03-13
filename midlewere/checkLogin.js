const jwt = require("jsonwebtoken");
const { secretKey } = require("../secret/secret");

const checkLogin = (req, res, next) => {
    try { 
        const { authorization } = req.headers;
         
        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Missing or invalid token" });
        }
         
        const token = authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = checkLogin;