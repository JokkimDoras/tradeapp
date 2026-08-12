const express = require('express');
const router = express.Router();
const { newsController } = require('../controllers/newsController');
const { validateNews } = require('../middleware/validateNews');



router.get('/trade',validateNews,newsController);

module.exports =  router 