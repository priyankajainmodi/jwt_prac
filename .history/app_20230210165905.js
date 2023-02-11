require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());
app.post("/register", async(req, res) => {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
        res.status(400).send("All fields are required");
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
        res.status(409).send("user already exists with this email");
    }
    let encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,

    });
    const token = jwt.sign({ user_id: user._id, email },
        process.env.TOKEN_KEY, {
            expiresIn: "2h",
        }
    );
    user.token = token;
    res.status(201).json(user);
});
app.post("/login", (req, res) => {

})


module.exports = app;