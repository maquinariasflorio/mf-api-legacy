module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( {
            name: 'machinery',
        }, {
            $push: {
                children: {
                    $each: [{
                        name  : 'machinery-fuel-registry-maintainer',
                        label : 'Mantenedor: combustible',
                    }],

                    $position: 4,
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [{
                        name    : 'machinery-fuel-registry-maintainer',
                        actions : [ 'insert', 'update', 'delete', 'view' ],
                    }],
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'supplier' }, {
            $push: {
                allowedViews: {
                    $each: [{
                        name    : 'machinery-fuel-registry-maintainer',
                        actions : [ 'insert', 'update', 'delete', 'view' ],
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
                    name: 'machinery-fuel-registry-maintainer',
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'machinery-fuel-registry-maintainer' ] },
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'supplier' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'machinery-fuel-registry-maintainer' ] },
                },
            },
        } )
    
    },
}
