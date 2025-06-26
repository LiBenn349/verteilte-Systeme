const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Du brauchst Zugriff auf secret und users! Diese musst du importieren oder als Parameter übergeben.
// Für den Anfang kannst du sie testweise direkt hier definieren oder später sauber importieren:
const secret = process.env.SECRET || "defaultSecret";
const users = [
    { username: "test", password: "test2" },
    { username: "zweiterUser", password: "hallo" }
];

// Middleware zur Prüfung des gültigen Logins
function auth (req, res, next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message: "Unathorized"});
    }
    try{
        const decoded = jwt.verify(token.split(' ')[1], secret);
        req.username = decoded.userID;
        next();
    }catch(err){
        return res.status(401).json({message: "Authorization failed"});
    }
}

// Geheimnis-Route
router.get('/geheimnis', auth, (req, res) => {
    res.status(200).json({geheimnis: secret});
});

// LOGIN Schnittstelle
router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find(user => user.username == username && user.password == password);
    if(!user){
        return res.status(401).json({message: "Invalid credentials"});
    }
    const token = jwt.sign({userID: username, rolle: "manager"}, secret);
    res.status(200).json(token);
});

module.exports = router;