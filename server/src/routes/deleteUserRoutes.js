const express = require('express');
const router = express.Router();
const { validateDeleteUser } = require('../middleware/validateDeleteUser')
const { deleteUserController } = require('../controllers/deleteUserController');


router.delete('/me',validateDeleteUser,deleteUserController) 

module.exports = router