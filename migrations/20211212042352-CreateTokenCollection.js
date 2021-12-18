module.exports = {
    async up(db, client) {

        const tokenCollection = await db.createCollection('token')

        await tokenCollection.createIndexes( [
            {
                key    : { token: 1, user: 1, type: 1 },
                name   : 'token_per_user_u',
                unique : true,
            },
            {
                key                : { expires: 1 },
                name               : 'expires_index',
                expireAfterSeconds : 0,
            },
        ] )
    
    },

    async down(db, client) {

        await db.dropCollection('token')
    
    },
}
