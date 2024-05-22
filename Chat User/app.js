const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];

    if (url === '/') {
        if (!req.headers.username) {
            res.statusCode = 302;
            res.setHeader('Location', '/login');
            return res.end();
        }

        fs.readFile('message.txt', { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log(err);
            }
            console.log(`data: ` + data);
            res.write('<html>');
            res.write('<head><title>Enter message</title></head>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name="miMessage"><button type="submit">Send</button></form></body>');

            res.write('<html>');
            return res.end();
        });
    } else if (url === '/message' && method === 'POST') {
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = querystring.parse(Buffer.concat(body).toString());
            console.log("parsedBody: ", parsedBody);
            const message = parsedBody.miMessage;
            fs.appendFile('message.txt', `${message}\n`, (err) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                } else {
                    res.statusCode = 302;
                    res.setHeader('Location', '/');
                    return res.end();
                }
            });
        });
    } else if (url === '/login' && method === 'GET') {
        res.write('<html>');
        res.write('<head><title>Login</title></head>');
        res.write('<body><form action="/login" method="POST"><input type="text" name="username" placeholder="Enter your username"><button type="submit">Login</button></form></body>');
        res.write('<html>');
        return res.end();
    } else if (url === '/login' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = querystring.parse(Buffer.concat(body).toString());
            const username = parsedBody.username;
            res.setHeader('username', username);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Node js res</title></head>');
        res.write('<body><h1>cbcxnb cbx</h1></body>');
        res.write('<html>');
        res.end();
    }

});
server.listen(4000);
