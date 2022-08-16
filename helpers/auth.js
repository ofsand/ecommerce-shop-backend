const jwt = require("jsonwebtoken");

module.exports = () => {
    return (req, res, next) => {
        try {
            const token = req.headers("Authorization");
            if (!token) return res.status(403).send("Access denied.");

            const decoded = jwt.verify(token, process.env.secret);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).send("Invalid token");
        }
    };
};