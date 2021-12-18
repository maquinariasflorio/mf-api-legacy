module.exports = {
    async up(db, client) {

        const userCollection = await db.createCollection('user')

        await userCollection.createIndexes( [
            {
                key    : { rut: 1 },
                name   : 'rut_u',
                unique : true,
            },
        ] )
    
    },

    async down(db, client) {

        await db.dropCollection('user')
    
    },
}
