/* IMPORTS */

// Modules
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// Models
import User from "../models/User.js"





/* REGISTER USER */

export const register = async (req, res) => {

    try {

        // Get data from request body json
        const {
            email,
            password,
            username,
            picturePath,
        } = req.body

        // Check if email exists, respond with error if user exists
        if ((await User.find({ email: email })).length > 0)
            return res.status(400).json({ msg: "email taken", success: false })

        // Check if username exists, respond with error if user exists
        if ((await User.find({ username: username })).length > 0)
            return res.status(400).json({ msg: "username taken", success: false })

        // Get random decryption key to Hash password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // Create new user with data
        const newUser = new User({
            email: email,
            password: passwordHash,
            username: username,
            picturePath: picturePath,
        })

        // Save new user to database
        const savedUser = await newUser.save()

        // Respond with saved user
        res.status(201).json(savedUser)
    } 
    catch (err) {

        // Respond with error
        res.status(500).json({ error: err.message })
    }
}





/* LOGGING IN */

export const login = async (req, res) => {

    try {

        // Get data from request body json
        const { email, password, rememberMe } = req.body

        // Get user if user exists, if not: respond with error
        const user = await User.findOne({ email: email })
        if (!user) 
            return res.status(400).json({ msg: "User does not exist. ", success: false})

        // Check if password is correct, if not: respond with error
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) 
            return res.status(400).json({ msg: "Invalid credentials. ", success: false})

        // Create signed token with user id
        let expiresIn = rememberMe ? '7d' : '60s';
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: expiresIn,})
        //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        // Delete password from user and respond with token and user
        delete user.password
        return res.status(200).json({ msg: "Login Successful.", success: true, token, user });
    } 
    catch (err) {
        // Respond with error message 
        res.status(500).json({ error: err.message });
    }
}