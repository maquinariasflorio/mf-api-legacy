module.exports = {
    async up(db, client) {

        await db.collection('ma_equipment').updateMany( { maintenanceClass: 0 }, {
            $set: {
                maintenanceClass: 'CLASS_A',
            },
        } )

        await db.collection('ma_equipment').updateMany( { maintenanceClass: 1 }, {
            $set: {
                maintenanceClass: 'CLASS_B',
            },
        } )

        await db.collection('ma_equipment').updateMany( { type: 0 }, {
            $set: {
                type: 'TRUCK',
            },
        } )

        await db.collection('ma_equipment').updateMany( { type: 1 }, {
            $set: {
                type: 'OTHER',
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('ma_equipment').updateMany( { maintenanceClass: 'CLASS_A' }, {
            $set: {
                maintenanceClass: 0,
            },
        } )

        await db.collection('ma_equipment').updateMany( { maintenanceClass: 'CLASS_B' }, {
            $set: {
                maintenanceClass: 1,
            },
        } )

        await db.collection('ma_equipment').updateMany( { type: 'TRUCK' }, {
            $set: {
                type: 0,
            },
        } )

        await db.collection('ma_equipment').updateMany( { type: 'OTHER' }, {
            $set: {
                type: 1,
            },
        } )
    
    },
}
