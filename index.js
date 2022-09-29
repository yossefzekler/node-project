const express = require('express');
require("dotenv").config()
const mongoose = require("mongoose")
const register = require('./routes/register');
const profil = require('./routes/profil');
const login = require('./routes/login');
const cards = require('./routes/cards');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.json())

mongoose.connect(process.env.db, { useNewUrlParser: true })
    .then(() => console.log('mongo db connected succesfully'))
    .catch((err) => console.log(err));

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/profil', profil);
app.use('/api/cards', cards);
app.use(cors());
app.listen(PORT, () => console.log("Server started on port", PORT))