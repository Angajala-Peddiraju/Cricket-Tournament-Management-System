const User = require("../models/user");

const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatetoken");

const registerUser = async (req, res) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all required fields"
        });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
    return res.status(400).json({
        message: "User already exists"
    });
}
const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });
      if (user) {
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token: generateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }

    return res.status(500).json({
        success: false,
        message: "User Registration Failed"
    });

};
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome to your profile",
        user: req.user
    });

};


module.exports = {
    registerUser,loginUser,getProfile
};