const express = require('express');

const app = express();
const loginR = require('./routes/login');
const userR = require('./routes/user');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/login',loginR);
app.use(userR);

app.listen(4000);