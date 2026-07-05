const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade,validateDeleteTrade, validateUpdateTrade,validateStats, } = require('../middleware/validateTrade')
const { addTrade,getTrade,deleteTrade, updateTrade,getTradingAnalytics, }  = require('../controllers/tradeController')

router.post('/addtrade',validateAddTrade,addTrade)
router.get('/gettrade/:id',validateGetTrade,getTrade)
router.delete('/deletetrade/:id',validateDeleteTrade,deleteTrade)
router.put('/updatetrade/:id',validateUpdateTrade,updateTrade)
router.get('/dashboard/stats/:id',validateStats,getTradingAnalytics)


module.exports = router;