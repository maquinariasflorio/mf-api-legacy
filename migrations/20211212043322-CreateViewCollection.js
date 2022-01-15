module.exports = {
    async up(db, client) {

        const viewCollection = await db.createCollection('view')

        await viewCollection.createIndexes( [
            {
                key    : { name: 1 },
                name   : 'name_u',
                unique : true,
            },
        ] )
    
    },

    async down(db, client) {

        await db.dropCollection('view')
    
    },
}
