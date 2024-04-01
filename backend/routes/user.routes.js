const express = require('express');
const { getUserProfileAndRepos, likeProfile, getLikes } = require('../controllers/user.controller');
const ensureAuthenticated = require('../middleware/ensureAuth');
const router = express.Router();

router.get('/profile/:username', getUserProfileAndRepos);
router.post('/like/:username', ensureAuthenticated, likeProfile);
router.get('/likes', ensureAuthenticated, getLikes); 

module.exports = router;
