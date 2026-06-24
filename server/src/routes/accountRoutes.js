const express = require('express');
const router = express.Router();
const {validateCreateAccount} = require('../middleware/validateAccount')
const {createAccount} = require('../controllers/accountController')


router.post('/create',validateCreateAccount,createAccount);


module.exports = router