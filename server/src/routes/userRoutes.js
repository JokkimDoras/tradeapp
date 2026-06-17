const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/userContoller')
const  authenticatUser  = require('../middleware/authenticateUser')


router.post('/update',authenticatUser,updateUser)

module.exports=router