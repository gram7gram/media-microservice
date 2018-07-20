const hashManager = require('jshashes')
const md5File = require('md5-file')

const md5 = new hashManager.MD5;

module.exports = {
    string: value => md5.hex(value),
    file: (path, callback) => md5File(path, (err, hash) => {
        if (err) throw err

        callback(hash)
    }),
}