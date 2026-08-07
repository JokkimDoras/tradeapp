const express = require('express');
const router = express.Router();


const {validateGoogleRegister} = require('../middleware/validateGoogleAuth')
const {registerWithGoogle} = require('../controllers/googleAuthController')


router.post('/register',validateGoogleRegister,registerWithGoogle)

module.exports = router