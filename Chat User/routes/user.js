const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the root path!');
});

router.get('/message', (req, res, next) => {
    const username = req.query.username;
    fs.readFile('message.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading message file:', err);
            return res.status(500).send('Error reading messages');
        }
        const messages = data.split(', ').filter(Boolean);
        let messageHTML = '';

        let currentUser = null;

        messages.forEach(message => {
            const [user, msg] = message.split(': ');
            if (currentUser !== user) {
                messageHTML += `${user}: `;
                currentUser = user;
            }
            messageHTML += `${msg} `;
        });

        res.send(`
            ${messageHTML}
            <form action="/" method="POST">
                <input type="text" name="miMsg"/>
                <input type="hidden" name="username" value="${username}"/>
                <button type="submit">Send</button>
            </form>
        `);
    });
});

router.post('/', (req, res) => {
    const username = req.body.username;
    const message = `${username}: ${req.body.miMsg}`;

    fs.appendFile('message.txt', `${message}, `, (err) => {
        if (err) {
            console.error('Error saving message:', err);
            return res.status(500).send('Error saving message');
        }
        console.log('Message saved:', message);
        res.redirect(`/message?username=${username}`);
    });
});

module.exports = router;
