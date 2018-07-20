const path = require('path')
const moment = require('moment')
const fs = require('fs-extra')

const DEFAULT_CONTEXT = 'default'
const SMALL_CONTEXT = 'small'
const NORMAL_CONTEXT = 'normal'
const LARGE_CONTEXT = 'large'

const publicDir = path.resolve('./public')

const upload = (media, file, callback) => {
    const now = moment()

    media.originalName = file.originalname
    media.mimeType = file.mimetype
    media.size = file.size
    media.context = DEFAULT_CONTEXT

    const ext = media.originalName.substr(media.originalName.lastIndexOf('.') + 1, media.originalName.length - 1);
    const hash = media.hash
    const uploadDir = '/uploads/' + now.format('YYYY/MM/DD')

    media.path = uploadDir + '/' + hash + '.' + ext

    fs.ensureDir(publicDir + uploadDir, e => {
        if (e) throw e

        fs.copy(file.path, publicDir + media.path, e => {
            if (e) throw e

            callback()
        })
    })
}

module.exports = {
    upload
}