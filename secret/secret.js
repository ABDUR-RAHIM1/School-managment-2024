require('dotenv').config();

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL
const secretKey = process.env.SECRET_KEY

module.exports = {
    port,
    mongoUrl,
    secretKey
}