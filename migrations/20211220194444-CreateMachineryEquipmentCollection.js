module.exports = {
    async up(db, client) {

        const machineryCollection = await db.createCollection('ma_equipment')

        await machineryCollection.createIndexes( [
            {
                key    : { code: 1 },
                name   : 'code_u',
                unique : true,
            },
            {
                key    : { patent: 1 },
                name   : 'patent_u',
                unique : true,
            },
        ] )
    
    },

    async down(db, client) {

        await db.dropCollection('ma_equipment')
    
    },
}
