const express = require('express');
const router = express.Router();
const { sayHello } = require('../controllers/userController');

router.get('/updateuser', sayHello);

module.exports = router;