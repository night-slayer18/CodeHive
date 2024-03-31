const express = require('express');
const { exploreReposWithLanguage } = require('../controllers/explore.controller');
const router = express.Router();

router.get('/repos/:language',exploreReposWithLanguage);

module.exports = router;