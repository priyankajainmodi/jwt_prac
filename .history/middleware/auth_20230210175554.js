const jwt = require("jsonwebtoken");
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        console.log(config.TOKEN_KEY);
        console.log(token);
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;