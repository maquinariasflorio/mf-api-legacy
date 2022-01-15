const MONGO_URI = process.env.MONGO_URI || `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?authSource=admin`

const MONGO_OPTIONS = {
    useNewUrlParser    : true,
    useUnifiedTopology : true,
    keepAlive          : true,
}

module.exports = {
    MONGO_URI,
    MONGO_OPTIONS,
}
