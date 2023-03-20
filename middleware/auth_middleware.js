let jwt = require("jsonwebtoken");
require('dotenv').config();
const secret = process.env.TOKEN_KEY;

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, secret);
        next();
    } catch {
        res.status(401).json({message: "Token Invalide"})
    }
}