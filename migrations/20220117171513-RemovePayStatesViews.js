module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( { name: 'pay-states' }, {
            $pull: {
                children: {
                    name: { $in: [ 'pay-states-machinery', 'pay-states-truck-by-travels', 'pay-states-truck-by-day' ] },
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $pull: {
                allowedViews: {
                    name: { $in: [ 'pay-states-machinery', 'pay-states-truck-by-travels', 'pay-states-truck-by-day' ] },
                },
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('view').updateOne( { name: 'pay-states' }, {
            $push: {
                children: {
                    $each: [
                        { name: 'pay-states-machinery', label: 'Maquinaria' },
                        { name: 'pay-states-truck-by-travels', label: 'Camión por viajes' },
                        { name: 'pay-states-truck-by-day', label: 'Camión por jornada' },
                    ],

                    $position: 0,
                },
            },
        } )

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $push: {
                allowedViews: {
                    $each: [
                        { name: 'pay-states-machinery', actions: [ 'insert', 'update', 'delete', 'view' ] },
                        { name: 'pay-states-truck-by-travels', actions: [ 'insert', 'update', 'delete', 'view' ] },
                        { name: 'pay-states-truck-by-day', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    ],

                    $position: 12,
                },
            },
        } )
    
    },
}
