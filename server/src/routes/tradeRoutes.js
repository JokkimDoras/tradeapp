const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade,validateDeleteTrade } = require('../middleware/validateTrade')
const { addTrade,getTrade,deleteTrade }  = require('../controllers/tradeController')

router.post('/addtrade',validateAddTrade,addTrade)
router.get('/gettrade',validateGetTrade,getTrade)
router.delete('/deletetrade/:id',validateDeleteTrade,deleteTrade)


module.exports = router;