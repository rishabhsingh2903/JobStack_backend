const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json("Access Denied");

    try {
        const verification = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verification.userId;
        next();
    } catch (err) {
        res.status(400).json("Invalid token");
        // console.log("token expired");
    }
};

module.exports = authenticateToken;
