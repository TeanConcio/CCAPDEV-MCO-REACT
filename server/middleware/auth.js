/* IMPORTS */

// Modules
import jwt from "jsonwebtoken";





/* VERIFY TOKEN */

export const verifyToken = async (req, res, next) => {

    try {

        // Get token from request header
        let token = req.header("Authorization");

        // If no token: respond with error
        if (!token)
            return res.status(403).send("Access Denied");

        // If token starts with "Bearer ": remove it
        if (token.startsWith("Bearer "))
            token = token.slice(7, token.length).trimLeft();

        // Verify token and assign user
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } 
    catch (err) {

        // Respond with error
        res.status(500).json({ error: err.message });
    }
};
