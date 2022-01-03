module.exports = {
    async up(db, client) {

        await db.collection('view').updateOne( {
            name: 'operator-next-job',
        }, {
            $set: {
                name: 'next-job',
            },
        } )

        await db.collection('role').updateOne( {
            name: 'operator',
        }, {
            $set: {
                "initialView"         : 'next-job',
                "allowedViews.0.name" : 'next-job',
            },
        } )

        await db.collection('role').updateOne( {
            name: 'construction_manager',
        }, {
            $set: {
                "initialView"         : 'next-job',
                "allowedViews.0.name" : 'next-job',
            },
        } )
    
    },

    async down(db, client) {

        await db.collection('view').updateOne( {
            name: 'next-job',
        }, {
            $set: {
                name: 'operator-next-job',
            },
        } )

        await db.collection('role').updateOne( {
            name: 'operator',
        }, {
            $set: {
                "initialView"         : 'operator-next-job',
                "allowedViews.0.name" : 'operator-next-job',
            },
        } )

        await db.collection('role').updateOne( {
            name: 'construction_manager',
        }, {
            $set: {
                "initialView"         : 'operator-next-job',
                "allowedViews.0.name" : 'operator-next-job',
            },
        } )
    
    },
}
