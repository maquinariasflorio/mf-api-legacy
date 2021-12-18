module.exports = {
    async up(db, client) {

        const roleCollection = await db.createCollection('role')

        await roleCollection.createIndexes( [
            {
                key    : { name: 1 },
                name   : 'name_u',
                unique : true,
            },
        ] )
    
    },

    async down(db, client) {

        await db.dropCollection('role')
    
    },
}
