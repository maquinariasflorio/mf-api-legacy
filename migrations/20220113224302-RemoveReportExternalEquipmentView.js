module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( {
            name: 'reports',
        }, {
            $pull: {
                children: {
                    name: 'report-external-equipment',
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'report-external-equipment' ] },
                },
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('view').updateOne( {
            name: 'reports',
        }, {
            $push: {
                children: {
                    $each: [
                        { name: 'report-external-equipment', label: 'Equipos externos' },
                    ],
                },
            },

            position: 2,
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [{
                        name    : 'report-external-equipment',
                        actions : [ 'insert', 'update', 'delete', 'view' ],
                    }],
                },
            },
        } )
    
    },
}
