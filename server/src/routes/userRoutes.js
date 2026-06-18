const express = require('express');
const router = express.Router();
const { updateUser, getUser } = require('../controllers/userContoller')
const  {authenticatUser,validateGetUser,}  = require('../middleware/authenticateUser')



router.post('/update',authenticatUser,updateUser)
router.get('/me',validateGetUser,getUser)

module.exports=router