const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const encryptPwd = async (password) => {
    try {
        const sPwd = await bcrypt.hash(password, 10);
        return sPwd;
    } catch(err) {
        res.status(400).send(err.message);
    }
}


const loadRegister = async (req, res) => {
    try {
        res.render("registration");
    } catch (err) {
        console.log(err.message);
    }
}

const registerUser = async (req, res) => {
    try {

        const encryptedPwd = await encryptPwd(req.body.password);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mno,
            image: req.file.filename,
            password: encryptedPwd,
            is_admin: 0
        })

        const user_data = await user.save();
        if (user_data) {
            res.render("registration", {message: "✅Registration successful!"});
        } else {
            res.render("registration", {message: "❌Registration failed!"});
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
    
}

module.exports = {
    loadRegister,
    registerUser
}

