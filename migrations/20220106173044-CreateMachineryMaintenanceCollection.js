module.exports = {
    async up(db, client) {

        const collection = await db.createCollection('ma_maintenance')

        await collection.createIndexes( [
            {
                key    : { uid: 1, equipment: 1 },
                name   : 'uid_equipment_u',
                unique : true,
            },
        ] )
    
    },

    async down(db, client) {

        await db.dropCollection('ma_maintenance')
    
    },
}
