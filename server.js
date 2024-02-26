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

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try{
        const user = await RegisterModel.findOne({ email: email });
        if (user) {
            return res.status(400).json('User already exists'); // Added return to prevent execution of further code
        } else {
            const result = await RegisterModel.create({ name: name, email: email, password: password });
            return res.status(200).json('Registered successfully'); // Added return to prevent execution of further code
        }
    }catch (error) {
        return res.status(500).json('Error creating user'); // Added return and corrected the syntax for error handling
    }
});


const port = 4000;
app.listen(port, () => {
    console.log('Server is running on port', port);
});