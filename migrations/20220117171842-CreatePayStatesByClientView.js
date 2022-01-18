module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( { name: 'pay-states' }, {
            $push: {
                children: {
                    $each: [
                        { name: 'pay-states-client', label: 'General' },
                    ],

                    $position: 0,
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [
                        { name: 'pay-states-client', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    ],
                },
            },

            $set: {
                initialView: 'pay-states-daily',
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('view').updateOne( { name: 'pay-states' }, {
            $pull: {
                children: {
                    name: { $in: [ 'pay-states-client' ] },
                },
            },
        } )
    
        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'pay-states-client' ] },
                },
            },

            $set: {
                initialView: 'report-daily',
            },
        } )
    
    },
}
