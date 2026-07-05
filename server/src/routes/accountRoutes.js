const express = require('express');
const router = express.Router();
const {validateCreateAccount, validateDeleteAccount, validategetAccount, validategetParticularAccount} = require('../middleware/validateAccount')
const {createAccount, deleteAccount, getAccount, getParticularAccount} = require('../controllers/accountController');


router.post('/create',validateCreateAccount,createAccount);
router.delete('/delete/:id',validateDeleteAccount,deleteAccount);
router.get('/',validategetAccount,getAccount)
router.get('/:id',validategetParticularAccount,getParticularAccount)


module.exports = router