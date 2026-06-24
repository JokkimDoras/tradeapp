const express = require('express');
const router = express.Router();
const {validateCreateAccount, validateDeleteAccount, validategetAccount} = require('../middleware/validateAccount')
const {createAccount, deleteAccount, getAccount} = require('../controllers/accountController');


router.post('/create',validateCreateAccount,createAccount);
router.delete('/delete/:id',validateDeleteAccount,deleteAccount);
router.get('/',validategetAccount,getAccount)


module.exports = router