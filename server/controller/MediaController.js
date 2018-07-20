const FileManager = require('../../services/FileManager')
const HashManager = require('../../services/HashManager')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})

module.exports = env => {

    const limits = {
        files: 1, // allow only 1 file per request
        fileSize: env.config.fileSize
    }

    const multipartParser = multer({
        storage,
        limits,
        fileFilter: (req, file, cb) => {
            const isAllowed = env.config.mimeTypes.indexOf(file.mimetype) !== -1

            console.log(file.originalname, file.mimetype, isAllowed);

            cb(null, isAllowed)
        }
    })

    env.server.get('/api/v1/media/:hash', (req, res) => {
        const hash = req.params.hash

        env.db.schemas.Media
            .findOne({hash})
            .exec((e, model) => {
                if (e) {
                    res.status(500).json({
                        message: e
                    });
                    return;
                }

                if (!model) {
                    res.status(404).json({
                        message: 'Not found'
                    });
                    return;
                }

                res.status(200).json(model);
            })

    })

    env.server.post('/api/v1/media', multipartParser.single('file'), (req, res) => {

        const file = req.file
        if (!file) {
            res.status(400).json({
                message: 'Missing file'
            })
            return
        }

        HashManager.file(file.path, hash => {
            const media = new env.db.schemas.Media()
            media.hash = hash

            env.db.schemas.Media
                .findOne({hash})
                .exec((e, model) => {
                    if (e) {
                        res.status(500).json({
                            message: e
                        });
                        return;
                    }

                    if (model) {
                        res.status(200).json(model)
                        return;
                    }

                    FileManager.upload(media, file, () => {
                        media.save(e => {
                            if (e) {
                                res.status(500).json({
                                    message: e
                                });
                                return;
                            }

                            res.status(201).json(media)
                        })
                    })
                })
        })
    })
}