const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade,validateDeleteTrade, validateUpdateTrade,validateStats, } = require('../middleware/validateTrade')
const { addTrade,getTrade,deleteTrade, updateTrade,getTradingAnalytics, }  = require('../controllers/tradeController')

router.post('/',validateAddTrade,addTrade)
router.get('/:id',validateGetTrade,getTrade)
router.delete('/:id',validateDeleteTrade,deleteTrade)
router.put('/:id',validateUpdateTrade,updateTrade)
router.get('/dashboard/stats/:id',validateStats,getTradingAnalytics)


module.exports = router;