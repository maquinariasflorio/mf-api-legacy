module.exports = {
    async up(db, client) {

        let lastFolio = 0

        const registries = await db.collection('ma_job_registry').find().sort( { createdAt: 1 } )

        while (await registries.hasNext() ) {

            const doc = await registries.next()

            await db.collection('ma_job_registry').updateOne( {
                _id: doc._id,
            }, {
                $set: {
                    folio: lastFolio + 1,
                },
            } )

            lastFolio++
        
        }

        await db.collection('counter').updateOne( { name: 'jobRegistryFolio' }, {
            $set: {
                lastFolio,
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('ma_job_registry').updateMany( {}, {
            $unset: {
                folio: true,
            },
        } )
    
    },
}
