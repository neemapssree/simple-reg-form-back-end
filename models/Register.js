const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { collection: 'register' }); // Define the collection name here

const Registermodel = mongoose.model("Register", RegisterSchema); // Use 'Register' as model name
module.exports = Registermodel;