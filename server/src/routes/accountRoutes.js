const express = require('express');
const router = express.Router();
const {validateCreateAccount, validateDeleteAccount} = require('../middleware/validateAccount')
const {createAccount, deleteAccount} = require('../controllers/accountController')


router.post('/create',validateCreateAccount,createAccount);
router.delete('/delete/:id',validateDeleteAccount,deleteAccount)


module.exports = router