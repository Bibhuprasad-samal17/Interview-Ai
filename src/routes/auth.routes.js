const express = require('express');
const authController = require('../controllers/auth.controller');
const authUser = require('../middlewares/auth.middleware');

const authrouter = express.Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authrouter.post('/register', authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */
authrouter.post('/login', authController.loginUserController);
 

/**
 * @route GET /api/auth/logout
 * @description Logout a user and clear the token cookie from the client and token in blacklist
 * @access public
 */
authrouter.get('/logout', authController.logoutUserController);


/**
 * @route GET /api/auth/get-me
 * get the current logged in user details
 * @access private
 */
authrouter.get('/get-me', authUser, authController.getMeController)


module.exports = authrouter;