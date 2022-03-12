module.exports = {
    async up(db, client) {

        const collection = await db.collection('ma_job_registry')

        await collection.createIndexes( [
            {
                key  : { date: 1 },
                name : 'date_sort',
            },
        ] )
    
    },

    async down(db, client) {

        const collection = await db.collection('ma_job_registry')
        await collection.dropIndex("date_sort")
    
    },
}
