module.exports = {
    async up(db, client) {

        await db.collection('role').updateOne( { name: 'operator' }, {
            $set: {
                initialView: 'machinery-job-registry',
            },
        } )

        await db.collection('role').updateOne( { name: 'construction_manager' }, {
            $set: {
                initialView: 'machinery-job-registry',
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('role').updateOne( { name: 'operator' }, {
            $set: {
                initialView: 'next-job',
            },
        } )

        await db.collection('role').updateOne( { name: 'construction_manager' }, {
            $set: {
                initialView: 'next-job',
            },
        } )
    
    },
}
