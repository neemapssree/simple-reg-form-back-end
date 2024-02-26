// server.js or your route file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.status(400).json({ message: 'User already exists' });
            } else {
                RegisterModel.create({ name: name, email: email, password: password })
                    .then(result => res.status(201).json(result))
                    .catch(err => res.status(500).json({ message: 'Error creating user', error: err }));
            }
        })
        .catch(err => res.status(500).json({ message: 'Server error', error: err }));
});


const port = 4000;
app.listen(port, () => {
    console.log('Server is running on port', port);
});