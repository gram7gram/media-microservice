'use strict';

const path = require('path');
const express = require('express');
const config = require('../config');
const logger = require('morgan');

const PORT = config.web.port;
const app = express();

app.use(logger(config.env === 'development' ? 'dev' : 'prod'));

app.use(express.static(path.resolve('./public')))

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err
    })
})

app.listen(config.web.port, () => {
    console.log(`[+] Server started at port ${PORT}`);
});

module.exports = app