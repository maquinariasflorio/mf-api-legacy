module.exports = {
    async up(db, client) {

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'machinery-job-registry', 'machinery-fuel-registry' ] },
                },
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [
                        { name: 'machinery-job-registry', actions: [ 'insert', 'update', 'delete', 'view' ] },
                        { name: 'machinery-fuel-registry', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    ],
                },
            },
        } )
    
    },
}
