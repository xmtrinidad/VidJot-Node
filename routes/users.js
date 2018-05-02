const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/usersController');

// User Login Route
router.get('/login', users_controller.get_user_login);

// User Register Route
router.get('/register', users_controller.get_user_register);

// User Register POST
router.post('/register', users_controller.post_user_register);

// Login Form POST
router.post('/login', users_controller.post_user_login);

// Logout User
router.get('/logout', users_controller.post_user_logout)

module.exports = router;