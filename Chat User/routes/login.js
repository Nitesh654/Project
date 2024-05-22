const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('<form action="/login" method="POST"><input type="text" name="username"/><button type="submit">Login</button></form>'
    );
});
router.post('/', (req, res) => {
    const username = req.body.username;
    res.redirect(`/message?username=${username}`);
});

module.exports = router;
