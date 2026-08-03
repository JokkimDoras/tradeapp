const express = require('express');
const router = express.Router();
const { newsController } = require('../controllers/newsController');
const { validateNews } = require('../controllers/newsController');



router.get('/trade',newsController);

module.exports =  router 