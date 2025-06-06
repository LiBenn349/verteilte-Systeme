require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Auth-Service running on port ${process.env.PORT}`);
});
