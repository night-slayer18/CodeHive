const express = require('express');
const { getUserProfileAndRepos } = require('../controllers/user.controller');
const router = express.Router();

router.get('/profile/:username',getUserProfileAndRepos);

module.exports = router;