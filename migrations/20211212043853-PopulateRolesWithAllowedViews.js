module.exports = {
    async up(db, client) {

        await db.collection('role').updateOne( { name: 'administrator' }, {
            $set: {
                allowedViews: [
                    { name: 'clients', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'staff', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'machinery' },
                    { name: 'machinery-equipment', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'machinery-job-registry', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'machinery-fuel-registry', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'machinery-maintenance', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'booking', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'reports' },
                    { name: 'report-daily', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'report-external-equipment', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'report-equipment', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'report-fuel', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'report-maintenance', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'pay-states' },
                    { name: 'pay-states-machinery', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'pay-states-truck-by-travels', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'pay-states-truck-by-day', actions: [ 'insert', 'update', 'delete', 'view' ] },
                    { name: 'pay-states-daily', actions: [ 'insert', 'update', 'delete', 'view' ] },
                ],

                initialView: 'reports',
            },
        } )

        await db.collection('role').updateOne( { name: 'operator' }, {
            $set: {
                allowedViews: [
                    { name: 'operator-next-job' },
                    { name: 'machinery' },
                    { name: 'machinery-job-registry' },
                ],

                initialView: 'operator-next-job',
            },
        } )

        await db.collection('role').updateOne( { name: 'supplier' }, {
            $set: {
                allowedViews: [
                    { name: 'machinery' },
                    { name: 'machinery-fuel-registry' },
                ],

                initialView: 'machinery-fuel-registry',
            },
        } )

        await db.collection('role').updateOne( { name: 'construction_manager' }, {
            $set: {
                allowedViews: [
                    { name: 'operator-next-job' },
                    { name: 'machinery' },
                    { name: 'machinery-job-registry' },
                ],

                initialView: 'operator-next-job',
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('role').updateMany( {
            name: {
                $in: [ 'administrator', 'operator', 'supplier', 'construction_manager' ],
            },
        }, {
            $unset: {
                allowedViews : true,
                initialView  : true,
            },
        } )
    
    },
}
