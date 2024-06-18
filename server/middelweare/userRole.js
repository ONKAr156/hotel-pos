const jwt = require("jsonwebtoken");

exports.validateAdmin = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token received:", token); // Debugging log

    if (!token) {
        return res.status(401).json({ message: "Unauthorized Access. Please Provide Token" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired" });
            } else {
                console.log("Token verification error:", err); // Detailed logging
                return res.status(401).json({ message: "Invalid token" });
            }
        }

        req.userRole = decoded.role;
        console.log("User role:", decoded.role); // Debugging log
        next();
    });
};