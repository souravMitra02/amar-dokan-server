const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const googleLogin = async (req, res) => {
    try {
        const { name, email, image } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                image,
                role: 'user', 
            });
            await user.save();
        }
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Google login successful",
            token,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image
            }
        });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Server-error during google login", error: error.message });
    }
};


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


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Password wrong" });
        }
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server-error", error: error.message });
    }
};

module.exports = {register, login, googleLogin};