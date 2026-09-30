const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade,validateDeleteTrade, validateUpdateTrade,validateStats,validateDeleteAllTrade } = require('../middleware/validateTrade')
const { addTrade,getTrade,deleteTrade, updateTrade,getTradingAnalytics,deleteAllTrade }  = require('../controllers/tradeController')

router.post('/',validateAddTrade,addTrade)
router.get('/:id',validateGetTrade,getTrade)
// router.get('/trade/:id',)
router.delete('/:id',validateDeleteTrade,deleteTrade)
router.put('/:id',validateUpdateTrade,updateTrade)
router.get('/dashboard/stats/:id',validateStats,getTradingAnalytics)
router.delete('/account/:account_id',validateDeleteAllTrade,deleteAllTrade)

module.exports = router;