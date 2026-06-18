const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade,validateDeleteTrade, validateUpdateTrade } = require('../middleware/validateTrade')
const { addTrade,getTrade,deleteTrade, updateTrade }  = require('../controllers/tradeController')

router.post('/addtrade',validateAddTrade,addTrade)
router.get('/gettrade',validateGetTrade,getTrade)
router.delete('/deletetrade/:id',validateDeleteTrade,deleteTrade)
router.put('/updatetrade/:id',validateUpdateTrade,updateTrade)


module.exports = router;