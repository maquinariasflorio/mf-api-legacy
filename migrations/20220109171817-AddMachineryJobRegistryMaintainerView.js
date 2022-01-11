module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( {
            name: 'machinery',
        }, {
            $push: {
                children: {
                    $each: [{
                        name  : 'machinery-job-registry-maintainer',
                        label : 'Mantenedor: registro de uso',
                    }],

                    $position: 2,
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [{
                        name    : 'machinery-job-registry-maintainer',
                        actions : [ 'insert', 'update', 'delete', 'view' ],
                    }],
                },
            },
        } )

        await db.collection('role').updateMany( {
            name: {
                $in: [ 'operator', 'construction_manager' ],
            },
        }, {
            $push: {
                allowedViews: {
                    $each: [{
                        name    : 'machinery-job-registry-maintainer',
                        actions : [ 'view' ],
                    }],
                },
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('view').updateOne( {
            name: 'machinery',
        }, {
            $pull: {
                children: {
                    name: 'machinery-job-registry-maintainer',
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'machinery-job-registry-maintainer' ] },
                },
            },
        } )

        await db.collection('role').updateMany( {
            name: {
                $in: [ 'operator', 'construction_manager' ],
            },
        }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'machinery-job-registry-maintainer' ] },
                },
            },
        } )
    
    },
}
