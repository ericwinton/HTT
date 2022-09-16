const express = require('express');
const session = require('express-session');
const app = express();
const port = 5000;

global.BASE_DIR = __dirname + '/backend';

app.use('/assets', express.static('frontend/dist'));

app.use(express.json());

app.use(session({
    secret: 'htt-scada-app',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.get('/api/:collection/:id', (req, res) => {
    require(__dirname + '/backend/scripts/api')(req, res);
});

app.get('/api/:collection', (req, res) => {
    require(__dirname + '/backend/scripts/api')(req, res);
});

app.post('/api/:collection', (req, res) => {
    require(__dirname + '/backend/scripts/api')(req, res);
});

app.put('/api/:collection/:id', (req, res) => {
    require(__dirname + '/backend/scripts/api')(req, res);
});

app.delete('/api/:collection/:id', (req, res) => {
    require(__dirname + '/backend/scripts/api')(req, res);
});

app.post('/scripts/login', (req, res) => {
    require(__dirname + '/backend/scripts/login')(req, res);
});

app.post('/scripts/logout', (req, res) => {
    req.session = null;

    return res.json({
        status: 'Success'
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});