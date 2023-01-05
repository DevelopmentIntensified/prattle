const express = require('express');
const path = require('path');
const CONFIG = require('@prattle/config');

const app = express();

// TODO: Write API

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(CONFIG.PORT, () => console.log(`Listening on ${CONFIG.PORT}`));