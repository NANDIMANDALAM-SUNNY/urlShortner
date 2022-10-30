var express = require('express');
const { getUrls, postUrl, getShortUrl } = require('../controllers/url');
var router = express.Router();


router.get('/',getUrls)
router.post('/shortUrls',postUrl)
router.get('/:shortUrl',getShortUrl)

module.exports = router;
