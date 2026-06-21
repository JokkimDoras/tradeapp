const express = require('express');
const router = express.Router();
const { validategetScreenshot, validateaddScreenshot, validateDeleteScreenshot } = require('../middleware/validateScreenshot')
const { addScreenshot, getScreenshot, deleteScreenshot } = require('../controllers/screenshotController')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.post(
    '/trades/:id/screenshot', 
    upload.array('screenshots', 3), 
    validateaddScreenshot, 
    addScreenshot
  );

router.get('/trades/:id/screenshot',validategetScreenshot,getScreenshot)
router.delete('/trades/delete/screenshot',validateDeleteScreenshot,deleteScreenshot)
  module.exports = router