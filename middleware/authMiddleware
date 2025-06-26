// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET; // Das gleiche Secret wie im User-Service

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token fehlt' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // z. B. { userID: "name", rolle: "manager" }
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token ungültig' });
    }
}

module.exports = authMiddleware;
