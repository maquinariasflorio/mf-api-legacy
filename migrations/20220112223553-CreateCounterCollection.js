module.exports = {
    async up(db, client) {

        const collection = await db.createCollection('counter')

        await collection.createIndexes( [
            {
                key    : { name: 1 },
                name   : 'name_u',
                unique : true,
            },
        ] )

        await db.collection('counter').insertOne( {
            name      : 'jobRegistryFolio',
            lastFolio : 0,
        } )
    
    },

    async down(db, client) {

        await db.dropCollection('counter')
    
    },
}
