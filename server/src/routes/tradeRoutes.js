const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade } = require('../middleware/validateTrade')
const { addTrade,getTrade }  = require('../controllers/tradeController')

router.post('/addtrade',validateAddTrade,addTrade)
router.get('/gettrade',validateGetTrade,getTrade)

module.exports = router;