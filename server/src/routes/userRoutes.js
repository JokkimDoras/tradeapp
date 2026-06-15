const express = require('express');
const router = express.Router();
const { sayHello,updateUser } = require('../controllers/userContoller')
const  authenticatUser  = require('../middleware/authenticateUser')
router.get('/profile',sayHello)
router.post('/update',authenticatUser,updateUser)

module.exports=router