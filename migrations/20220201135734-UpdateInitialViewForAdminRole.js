module.exports = {
    async up(db, client) {

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $set: {
                initialView: 'report-daily',
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $set: {
                initialView: 'pay-states-daily',
            },
        } )
    
    },
}
