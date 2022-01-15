module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( {
            name: 'reports',
        }, {
            $push: {
                children: {
                    $each: [{
                        name  : 'report-operator',
                        label : 'Reporte de horas operador',
                    }],

                    $position: 0,
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [{
                        name    : 'report-operator',
                        actions : [ 'insert', 'update', 'delete', 'view' ],
                    }],
                },
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('view').updateOne( {
            name: 'reports',
        }, {
            $pull: {
                children: {
                    name: 'report-operator',
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'report-operator' ] },
                },
            },
        } )
    
    },
}
