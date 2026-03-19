const userModel = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistToken = require('../models/blacklist.model');





/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */


// function that will handle the registration of a new user
async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'please provide all the required fields username,email,password'
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: 'User with the same username or email already exists'
        })
    }
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash

    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @route GET /api/auth/login
 * @description Login a user
 * @access Public
 */
//function That will handle user login session
async function loginUserController(req, res) {


    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const ispasswordValid = await bcrypt.compare(password, user.password)

    if (!ispasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )

    res.cookie('token', token)
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

//function that will handle user logout session
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistToken.create({ token })
    }
    res.clearCookie('token')

    res.status(200).json({
        message: 'User logged out successfully'
    })
}


//function that will handle get the current logged in user details
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: 'User details fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    getMeController,
    logoutUserController
}
    

