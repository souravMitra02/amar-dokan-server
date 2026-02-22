const User = require('../models/Users');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "email already used" });
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            number,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: "Registration successful!" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = register;