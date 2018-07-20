const mongoose = require('mongoose');
const Media = require('./schema/Media')(mongoose);

const config = require('../config')

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}`, {
    user: config.db.username,
    pass: config.db.password,
    dbName: config.db.database
});

const db = mongoose.connection;

db.on('error', (e) => {
    console.error('[-] Database connection error', e)
});

db.once('open', function () {
    console.error('[+] Connected to database')
});

module.exports = {
    connection: () => db,
    schemas: {
        Media
    }
}