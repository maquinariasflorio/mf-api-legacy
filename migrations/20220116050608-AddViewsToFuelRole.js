module.exports = {
    async up(db, client) {

        await db.collection('role').updateOne( { name: 'supplier' }, {
            $push: {
                allowedViews: {
                    $each: [
                        { name: 'reports' },
                        { name: 'report-fuel', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    ],
                },
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('role').updateOne( { name: 'supplier' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'reports', 'report-operator' ] },
                },
            },
        } )
    
    },
}
