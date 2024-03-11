const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    res.json({ message: 'User Profile Ready' });
});

module.exports = router;