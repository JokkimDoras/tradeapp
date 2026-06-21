const express = require('express')
const router = express.Router()
const { validateAddTrade,validateGetTrade,validateDeleteTrade, validateUpdateTrade,validateStats, validateScreenshot } = require('../middleware/validateTrade')
const { addTrade,getTrade,deleteTrade, updateTrade,getTradingAnalytics, addScreenshot }  = require('../controllers/tradeController')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/addtrade',validateAddTrade,addTrade)
router.get('/gettrade',validateGetTrade,getTrade)
router.delete('/deletetrade/:id',validateDeleteTrade,deleteTrade)
router.put('/updatetrade/:id',validateUpdateTrade,updateTrade)
router.get('/dashboard/stats',validateStats,getTradingAnalytics)
router.post(
    '/:id/screenshot', 
    upload.array('screenshots', 3), 
    validateScreenshot, 
    addScreenshot
  );


module.exports = router;