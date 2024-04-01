const express = require('express');
const { exploreReposWithLanguage } = require('../controllers/explore.controller');
const ensureAuthenticated = require('../middleware/ensureAuth');

const router = express.Router();

router.get('/repos/:language',ensureAuthenticated, exploreReposWithLanguage);

module.exports = router;