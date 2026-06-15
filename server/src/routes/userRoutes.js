const express = require('express');
const router = express.Router();
const { sayHello,updateUser } = require('../controllers/userContoller')

router.get('/profile',sayHello)
router.post('/update',updateUser)

module.exports=router