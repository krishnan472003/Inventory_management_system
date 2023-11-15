// routes/user.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate'); 

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/create-admin', authenticate, UserController.createAdmin); 
router.post('/login-admin', authenticate, UserController.loginAdmin ); 
router.post('/create-user', authenticate, UserController.createUser ); 
router.post('/login-user', authenticate, UserController.loginUser); 


module.exports = router;
