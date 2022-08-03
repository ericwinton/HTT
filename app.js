const express = require('express');
const session = require('express-session');
const app = express();
const port = 5000;

app.use('/assets', express.static('assets'));

app.use(express.json());

app.use(session({
    secret: 'htt-scada-app',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.post('/scripts/login', (req, res) => {
    require(__dirname + req.url)(req, res);
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