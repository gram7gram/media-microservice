const builder = mongoose => {
    const schema = mongoose.Schema({
        hash: {
            type: String,
            index: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        desription: {
            type: String,
            trim: true
        },
        context: {
            type: String,
            trim: true
        },
        path: {
            type: String,
            trim: true
        },
        mimeType: {
            type: String,
            lowercase: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        size: {
            type: Number,
            min: 0,
            get: v => Math.round(v),
            set: v => Math.round(v)
        },
        width: {
            type: Number,
            min: 0,
            get: v => Math.round(v),
            set: v => Math.round(v)
        },
        height: {
            type: Number,
            min: 0,
            get: v => Math.round(v),
            set: v => Math.round(v)
        },
    });

    return mongoose.model('Media', schema);
}

module.exports = builder