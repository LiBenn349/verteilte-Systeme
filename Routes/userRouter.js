// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Beispielhafte Benutzerliste
const users = [
  { id: 1, username: "testuser", password: "1234" }
];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token });
});

module.exports = router;
