const env = process.env.NODE_ENV
const isProd = env === 'production';

console.log('[+] Env = ' + env)

let config
if (isProd) {
	config = require('./config.prod.js')
} else {
	config = require('./config.dev.js')
}

config.env = env

module.exports = config