const express = require('express')
const router = express.Router()
const { validateAddTrade } = require('../middleware/validateTrade')
const { addTrade }  = require('../controllers/tradeController')

router.post('/addtrade',validateAddTrade,addTrade)

module.exports = router;